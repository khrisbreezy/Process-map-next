
import React, { useState, useRef } from 'react';
import Board, { createTranslate } from 'react-trello';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { CSVLink } from 'react-csv';
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";
import {FilePond, registerPlugin} from 'react-filepond';
import {NotificationManager} from 'react-notifications';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import { saveMapName, savePhaseData, saveProcessData } from '../store/actions/phaseStore';
import SingleActionCard from "../components/SingleActionCard";
import axiosInstance from '../config/axios';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginImageCrop, FilePondPluginFileValidateType, FilePondPluginFileValidateSize);


let PizZipUtils = null;
if (typeof window !== "undefined") {
    import("pizzip/utils/index.js").then(function (r) {
        PizZipUtils = r;
    });
}

function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
}

const Home = () => {

    const dispatch = useDispatch();

     // Use of Refs to target an element
    const btnRef = useRef();
    const downloadRef = useRef();

    const thePhaseData = useSelector(state => state.phaseData.phases);
    const mapName = useSelector(state => state.phaseData.mapName);
    const theProcessData = useSelector(state => state.phaseData.processInfo);

    const [phaseData, setPhaseData] = useState(thePhaseData);
    const [csvData, setCsvData] = useState([]);
    const [currentCard, setCurrentCard] = useState(null);
    const [currentPhase, setCurrentPhase] = useState([]);
    const [phaseIndex, setPhaseIndex] = useState(null);
    const [generatedFile, setGeneratedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sopData, setSopData] = useState(null);
    const [generatedUrl, setGeneratedUrl] = useState(null);
    const [showDownload, setShowDownload] = useState(false);
    const [docUrl, setDocUrl] = useState('');

    // All phases data object
    const data = {
        lanes: phaseData
    };
    
    const TEXTS = {
        "Add another lane": "+ Add Phase",  
        "Click to add card": "Add actions",
        "Delete lane": "Delete phase",
        "Lane actions": "Phase actions",
        "button": {
          "Add lane": "Add Phase",
          "Add card": "Add Action",
          "Cancel": "Cancel"
        },
        "placeholder": {
          "title": "action",
          "description": "responsible",
          "label": "output"
        }
    };


    // Function to Generate SOP data into Word Document
    const generateDocument = (phase) => {
        loadFile(
            generatedUrl ? generatedUrl : `/lib/SOP-template.docx`,
            function (error, content) {
                if (error) {
                    throw error;
                }
                const zip = new PizZip(content);
                const doc = new Docxtemplater().loadZip(zip);
                // render the document (replace all occurences example {first_name} by John, {last_name} by Doe, ...)
                if(sopData) {
                    doc.render({
                       ...sopData,
                       phases: phase
                    });
                    const out = doc.getZip().generate({
                        type: "blob",
                        mimeType:
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    });
                    // Output the document using Data-URI
                    saveAs(out, `${mapName.split(' ').join('-')}.docx`);
                    setSopData(null);
                    setGeneratedUrl(null);
                    setGeneratedFile(null);
                    dispatch(saveProcessData(null));
                    dispatch(savePhaseData([]));
                    setPhaseData([]);
                    dispatch(saveMapName('Map name')); 
                }
            }
        );
    };  

    // set export name
    const mapNameHandler = (e) => {
        dispatch(saveMapName(e.target.value));
    };

    // Headers for csv export
    const headers = [
        {label: 'Phase', key: 'phase'},
        {label: 'Action', key: 'action'},
        {label: 'Responsible', key: 'responsible'},
        {label: 'Output', key: 'output'},
        {label: 'Notes', key: 'notes'}
    ];

    // Csv export object
    const csvReport = {
        filename: mapName.split(' ').join('-') + '.csv',
        headers: headers,
        data: csvData
    };

    const dataChange = (data) => {
        setPhaseData(data.lanes);
        dispatch(savePhaseData([]));
    };

    // Funtion to open single action modal for edit (its important to pass the args => cardId, metadata and laneId)
    const cardClickHandler = (cardId, metadata, laneId) => {
        const currentPhase = phaseData.filter((phase) => phase.id === laneId);
        const currentCard = currentPhase[0].cards.find((card) => card.id === cardId);
        const currentPhaseIndex = phaseData.findIndex(phase => phase.id === laneId);

        setCurrentCard(currentCard);
        setCurrentPhase(currentPhase);
        setPhaseIndex(currentPhaseIndex);

        $('#actionModal').modal('show');

    };

    // Function to goto process background information page
    const gotoProcessBginfoHandler = () => {
        dispatch(savePhaseData(phaseData));
        Router.push('/process-background-information');
    };

    // Export data function
    const exportDataHandler = async () => {
        let dataToExport = [];
        phaseData.forEach(phase => {
            phase.cards.forEach(card => {
                dataToExport.push({
                    'phase': phase.title,
                    'action': card.title,
                    'responsible': card.description,
                    'output': card.label ? card.label : '',
                    'notes': card.metadata ? card.metadata : ''
                });
            })
        });

        await setCsvData(dataToExport);
        btnRef.current.link.click();
        setPhaseData([]);
        dispatch(savePhaseData([]));
    };

    // Function to reset current Action card after an update/change
    const resetDataAfterUpdate = () => {
        setCurrentCard(null);
        setCurrentPhase([]);
        setPhaseIndex(null);
    };

    // Function to store edited data to state
    const storeEdittedDataToState = (data) => {
        setPhaseData(data);
    };

     // Collect generated files and store
    const collectGeneratedFile = async (files) => {
        const uploadedFiles = files.map(fileItem => fileItem.file);
        if (uploadedFiles.length === 0) {
            setGeneratedFile(null);
            return;
        } else {
            setGeneratedFile(uploadedFiles);
        }
        setShowDownload(false);
    };


    // Upload generated files and get back the url and store
    const uploadFile = async () => {
        setGeneratedUrl(null);
        if (!generatedFile) {
            return;
        }
        setUploading(true);
        const formData = new FormData();
        formData.append('file', generatedFile[0]);
        
        try {
            const { data : { data: data} } = await axiosInstance.post('upload', formData);
            setGeneratedUrl(data.url);
            setUploading(false);
            NotificationManager.success('Template uploaded', '', 5000);
            setTimeout(() => {
                NotificationManager.success('Generate and download the uploaded template', '', 5000);
            }, 500);
        } catch (e) {
            console.log(e);
            setUploading(false);
        }
    };

    const showGenerateSOPModal = () => {
        $('#uploadSOPModal').modal('show');
    };

     // Function to to call the generateSOPHandler
     const getGeneratedProcessBgInfo = async () => {
        if (phaseData.length === 0) {
            NotificationManager.error(`Sorry, you can't generate without adding any phase`, '', 3000);
            return;
        }
        setLoading(true);
        setShowDownload(false);
        let data;
        if (!theProcessData) {
            data = {
                accountability: "",
                appendices: "",
                definitions: "",
                doc_num: "",
                purpose: "",
                references: "",
                responsibility: "",
                scope: "",
                title: ""
            }
        } else {
            data = {...theProcessData}
        }
        // setSopData(data);

        let dataToExport = [];
        await  phaseData.forEach(phase => {
            phase.cards.forEach(card => {
                dataToExport.push({
                    'phase': phase.title,
                    'action': card.title,
                    'responsible': card.description,
                    'output': card.label ? card.label : '',
                    'notes': card.metadata ? card.metadata : ''
                });
            })
        });

        const newData = data;

        const allData = {
            ...newData,
            file: generatedUrl,
            cards: dataToExport,
            process_name: mapName
        };

        try {
            const {data : {data}} = await axiosInstance.post('generate-document', allData);
            NotificationManager.success('Template generated', '', 5000);
            setShowDownload(true);
            setDocUrl(data.url);
            setTimeout(() => {
                NotificationManager.success('Download the generated template', '', 5000);
            }, 500);
            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
            setShowDownload(false);
            NotificationManager.error(e.response.data.message, '', 5000);
        }
    };

    const downloadGeneratedDoc = () => {  
        downloadRef.current.click();
        setShowDownload(false);
        setGeneratedUrl(null);
        setGeneratedFile(null);
        dispatch(saveProcessData(null));
        dispatch(savePhaseData([]));
        setPhaseData([]);
        dispatch(saveMapName('Map name'));
        setDocUrl('');
        $('#uploadSOPModal').modal('hide');
    };
  

    return (
        <section className='page_manager'>
            <div className="container-fluid">  
                <div className="row">
                    <div className="col-12 text-center d-flex align-items-center justify-content-center">
                        <input className='mapName_input mx-3' type="text" value={mapName} onChange={mapNameHandler} />
                    </div>
                </div>

                <div className="row">
                   <Board data={data}
                    editLaneTitle
                    editable
                    canAddLanes={true}
                    onDataChange={dataChange}
                    t={createTranslate(TEXTS)}
                    onCardClick={cardClickHandler}
                    laneDraggable
                    /> 
                </div>

                <div className="row text-center">
                    <div className="col-md-4 mb-4">
                        <button onClick={gotoProcessBginfoHandler} className="btn">Add process background</button>
                    </div>
                    <div className="col-md-4 mb-4">
                        <CSVLink className='d-none' ref={btnRef} {...csvReport}>Export</CSVLink>
                        <button onClick={exportDataHandler} className="btn">Export to data frame</button>
                    </div>         
                    <div className="col-md-4 mb-4">
                        <button onClick={showGenerateSOPModal} className="btn">Generate Document</button>
                    </div>         
                </div>
            </div>
            {/* Single Action Modal and its properties */}
            <SingleActionCard 
            currentCard={currentCard} 
            currentPhase={currentPhase}
            phaseData={phaseData}
            phaseIndex={phaseIndex}
            resetDataAfterUpdate={resetDataAfterUpdate}
            storeEdittedDataToState={storeEdittedDataToState}
           />

            <div className="modal fade" id="uploadSOPModal" tabIndex="-1" role="dialog"
                aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <button style={{ fontSize: '3rem' }} type="button" className="close" data-dismiss="modal"
                                aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body mb-5">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="text-center">
                                            <h2>Upload a new template</h2>
                                                    <div className="col-12 text-center">
                                                    <FilePond
                                                        className="file-pond-upload"
                                                        onupdatefiles={collectGeneratedFile}
                                                        allowMultiple={false}
                                                        files={generatedFile}
                                                        maxFiles={1}
                                                        name="files"
                                                        maxFileSize={'20MB'}
                                                        acceptedFileTypes={'application/vnd.openxmlformats-officedocument.wordprocessingml.document'}
                                                        labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
                                                    />
                                                </div>
                                            <div className="text-center mb-3">
                                                <button onClick={uploadFile} className="btn">{uploading ? 'Uploading...' : 'Upload'}</button>
                                            </div>
                                            <div className="text-center">
                                                <p className='mb-0 mx-3 mb-3'>Note: Upload a new template, generate and download the uploaded template or just generate and download from the current template.</p>
                                                {!showDownload && <button onClick={getGeneratedProcessBgInfo} className="btn">{loading ? 'Generating...' : 'Generate document'}</button>}
                                                {showDownload && <button onClick={downloadGeneratedDoc} className="btn">Donwload</button>}
                                                <a className='d-none' ref={downloadRef} href={docUrl} download={`${mapName.split(' ').join('-')}`}></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
  
};

export default Home;

