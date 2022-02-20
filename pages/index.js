
import React, { useState, useRef } from 'react';
import Board, { createTranslate } from 'react-trello';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { CSVLink } from 'react-csv';
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

const Home = () => {

    const dispatch = useDispatch();

    // Use of Refs to target an element
    const btnRef = useRef();
    const downloadRef = useRef();

    // Data from store
    const thePhaseData = useSelector(state => state.phaseData.phases);
    const mapName = useSelector(state => state.phaseData.mapName);
    const theProcessData = useSelector(state => state.phaseData.processInfo);

    // All state management
    const [phaseData, setPhaseData] = useState(thePhaseData);
    const [csvData, setCsvData] = useState([]);
    const [currentCard, setCurrentCard] = useState(null);
    const [currentPhase, setCurrentPhase] = useState([]);
    const [phaseIndex, setPhaseIndex] = useState(null);
    const [generatedFile, setGeneratedFile] = useState(null);
    const [exportedDataFrame, setExportedDataFrame] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [exporting, setExporting] = useState(false);
    const [loading, setLoading] = useState(false);
    const [generatedUrl, setGeneratedUrl] = useState(null);
    const [showDownload, setShowDownload] = useState(false);
    const [docUrl, setDocUrl] = useState('');

    // console.log({phaseData});

    // All phases data object
    const data = {
        lanes: phaseData
    };
    
    // [
    //     {
    //         cards: [{
    //             description: "Responsible",
    //             id: "424c56d0-8ea5-11ec-8ee7-4f791edb4eb4",
    //             label: "aozibclQ",
    //             laneId: "3abf8220-8ea5-11ec-8ee7-4f791edb4eb4",
    //             metadata: "",
    //             title: ""
    //         }],
    //         currentPage: 1,
    //         id: "3abf8220-8ea5-11ec-8ee7-4f791edb4eb4",
    //         title: "Yea"
    //     },
    //     {
    //         cards: [
    //             {
    //                 description: "SIngle",
    //                 id: "67884f90-8ea4-11ec-8ee7-4f791edb4eb4",
    //                 label: "Test",
    //                 laneId: "5d8f0ec0-8ea4-11ec-8ee7-4f791edb4eb4",
    //                 metadata: "The notes",
    //                 title: "Hi there"
    //             },
    //             {
    //                 id: "2ac8e640-8ea5-11ec-8ee7-4f791edb4eb4",
    //                 laneId: "5d8f0ec0-8ea4-11ec-8ee7-4f791edb4eb4",
    //                 title: "Silly me"   
    //             }
    //         ],
    //         currentPage: 1,
    //         id: "5d8f0ec0-8ea4-11ec-8ee7-4f791edb4eb4",
    //         title: "Test data"
    //     }
    // ]

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
        {label: 'Notes', key: 'notes'},
        {label: 'Phase ID', key: 'phaseId'},
        {label: 'Action ID', key: 'actionId'}
    ];

    // Csv export object
    const csvReport = {
        filename: mapName.split(' ').join('_') + '.csv',
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


    const exportToDataFrame = async () => {
        if (phaseData.length === 0) {
            return
        }
        setExporting(true);
        let dataToExport = [];
        phaseData.forEach(phase => {
            dataToExport.push({
                'title': phase.title,
                'cards': phase.cards.map(card => {
                    return {
                        'action': card.title,
                        'responsible': card.description,
                        'output': card.label ? card.label : '',
                        'notes': card.metadata ? card.metadata : ''
                    }
                })
            })

            // phase.cards.forEach(card => {
                
            //     dataToExport.push({
            //         'title': phase.title,
            //         'cards': card
            //         'action': card.title,
            //         'responsible': card.description,
            //         'output': card.label ? card.label : '',
            //         'notes': card.metadata ? card.metadata : ''
            //     });
            // })
        });

        try {
            const {data} = await axiosInstance.post('processes', {
                phase: dataToExport,
                process_name: mapName
            });
            setExporting(false);
            console.log({data});
        } catch(e) {
            console.log(e);
            setExporting(false);
        }
    }

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
                    'notes': card.metadata ? card.metadata : '',
                    'actionId': card.id,
                    'phaseId': phase.id
                });
            })
        });

        await setCsvData(dataToExport);
        btnRef.current.link.click();
        // setPhaseData([]);
        // dispatch(savePhaseData([]));
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

    // Collect exported data frame file and store
    const collectExportedDataFrame = async (files) => {
        const uploadedFiles = files.map(fileItem => fileItem.file);
        if (uploadedFiles.length === 0) {
            setExportedDataFrame(null);
            return;
        } else {
            setExportedDataFrame(uploadedFiles);
        }
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

    // Upload eported data frame and get back the url and store
    const uploadDataFrame = async () => {
        if (!exportedDataFrame) {
            return;
        }
        setUploading(true);
        const formData = new FormData();
        formData.append('csv_file', exportedDataFrame[0]);
        
        try {
            const { data : { data } } = await axiosInstance.post('upload-csv', formData);
            setPhaseData(data.phases);
            dispatch(saveMapName(data.process_name));
            setExportedDataFrame(null);
            $('#uploadCSVData').modal('hide');
            setUploading(false);
            NotificationManager.success('Process retrieved', '', 5000);
        } catch (e) {
            console.log(e);
            setUploading(false);
        }
    };

    // Show generate modal popup
    const showGenerateSOPModal = () => {
        $('#uploadSOPModal').modal('show');
    };

    // Show generate modal popup
    const showExportedDataFrameModal = () => {
        $('#uploadCSVData').modal('show');
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

    // Function to download generated template and set all state and data back to normal
    const downloadGeneratedDoc = () => {  
        downloadRef.current.click();
        setShowDownload(false);
        setGeneratedUrl(null);
        setGeneratedFile(null);
        dispatch(saveProcessData(null));
        // dispatch(savePhaseData([]));
        // setPhaseData([]);
        dispatch(saveMapName('Map name'));
        setDocUrl('');
        $('#uploadSOPModal').modal('hide');
    };

    const clearData = () => {
        setPhaseData([]);
        dispatch(savePhaseData([]));
        dispatch(saveMapName('Map name'));
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
                    <div className="col">
                        <button onClick={clearData} className='btn'>Clear Phases</button>
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
                    <div className="col-md-3 mb-4">
                        <button onClick={gotoProcessBginfoHandler} className="btn">Add Process Background</button>
                    </div>
                    <div className="col-md-3 mb-4">
                        <CSVLink className='d-none' ref={btnRef} {...csvReport}>Export</CSVLink>
                        <button onClick={exportDataHandler} className="btn">{exporting ? 'Exporting' : 'Export to Data Frame'}</button>
                    </div>         
                    <div className="col-md-3 mb-4">
                        <button onClick={showGenerateSOPModal} className="btn">Generate Document</button>
                    </div>  

                    <div className="col-md-3 mb-4">
                        <button onClick={showExportedDataFrameModal} className="btn">Upload Exported Data Frame</button>
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
                                                {showDownload && <button onClick={downloadGeneratedDoc} className="btn">Download</button>}
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

            <div className="modal fade" id="uploadCSVData" tabIndex="-1" role="dialog"
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
                                            <h2>Upload exported data frame</h2>
                                                    <div className="col-12 text-center">
                                                    <FilePond
                                                        className="file-pond-upload"
                                                        onupdatefiles={collectExportedDataFrame}
                                                        allowMultiple={false}
                                                        files={exportedDataFrame}
                                                        maxFiles={1}
                                                        name="files"
                                                        maxFileSize={'20MB'}
                                                        acceptedFileTypes={'application/csv, text/csv, .csv, application/vnd.ms-excel'}
                                                        labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
                                                    />
                                                </div>
                                            <div className="text-center mb-3">
                                                <button onClick={uploadDataFrame} className="btn">{uploading ? 'Uploading...' : 'Upload'}</button>
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

