import React, { useState, useRef, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { CSVLink } from 'react-csv';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import {FilePond, registerPlugin} from 'react-filepond';
import {NotificationManager} from 'react-notifications';

import { convertObjectToArray } from '../../helpers/convertObjectArray';
import { saveMapName, saveProcessData, savePhaseData } from '../../store/actions/phaseStore';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import axiosInstance from '../../config/axios';


registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginImageCrop, FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

const ProcessBackgroundInformation = () => {
    const {register, errors, handleSubmit, reset, setValue} = useForm();

    const dispatch = useDispatch();

    // Use of Refs to target an element
    const btnRef = useRef();
    const saveRef = useRef();
    const downloadRef = useRef();

    // Data from store
    const theProcessData = useSelector(state => state.phaseData.processInfo);
    const thePhaseData = useSelector(state => state.phaseData.phases);
    const mapName = useSelector(state => state.phaseData.mapName);

    // All state management
    const [exportData, setExportData] = useState(true);
    const [ csvData, setCsvData ] = useState([]);
    const [sopData, setSopData] = useState(null);
    const [generatedFile, setGeneratedFile] = useState(null);
    const [generatedUrl, setGeneratedUrl] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [showDownload, setShowDownload] = useState(false);
    const [docUrl, setDocUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [exportedDataFrame, setExportedDataFrame] = useState(null);

    
    useEffect(() => {
        // Check if there is a process data stored upon page load and set to each textareaa respectively
        if (theProcessData && theProcessData.title) {
            setValue('title', theProcessData.title);
        }  

        if (theProcessData && theProcessData.doc_num) {
            setValue('doc_num', theProcessData.doc_num);
        } 

        if (theProcessData && theProcessData.purpose) {
            setValue('purpose', theProcessData.purpose);
        }

        if (theProcessData && theProcessData.scope) {
            setValue('scope', theProcessData.scope);
        } 
        if (theProcessData && theProcessData.accountability) {
            setValue('accountability', theProcessData.accountability);
        }  

        if (theProcessData && theProcessData.responsibility) {
            setValue('responsibility', theProcessData.responsibility);
        } 

        if (theProcessData && theProcessData.references) {
            setValue('references', theProcessData.references);
        }

        if (theProcessData && theProcessData.definitions) {
            setValue('definitions', theProcessData.definitions);
        } 
    }, [theProcessData]);  

    // Headers for csv export
    const headers = [
        {label: 'Information', key: 'information'},
        {label: 'Value', key: 'value'}
    ];

    // CSV export object
    const csvReport = {
        filename: 'process_background.csv',
        headers: headers,
        data: csvData
    };

    // Function to export process background information
    const exportBackgroundInformation = async (data) => {  
        // Convert Object to an array for easy export
        const array = convertObjectToArray(data)
        await setCsvData(array);
        btnRef.current.link.click();
        reset({});

        // if export data is true, clear export data that is stored
        if (exportData) {
            dispatch(saveProcessData(null));
        }
    };

    // Function to save process background information
    const saveprocessBackgroundInfo = async (data) => {
        // If exporting data is set to false upon initiating go back, store data to store
        data['appendices'] = '';
        await dispatch(saveProcessData(data));  
        if (!exportData) {
            await setSopData(data);
            return;
        }
        // Else export data immediately
        await exportBackgroundInformation(data);
    };

    // Function to intiate going back
    const gotoHome = async () => {
        await setExportData(false);
        await saveRef.current.click();
        setTimeout(() => {
            Router.push('/');     
        }, 200);
    };

    // Show generate modal popup
    const showGenerateSOPModal = () => {
        $('#uploadSOPModal').modal('show');
    };

    // Function to to call the generateSOPHandler
    const getGeneratedProcessBgInfo = async () => {
        await setExportData(false);
        setTimeout(async () => {
            await saveRef.current.click();
        }, 600);
        setTimeout(async () => {
            if(sopData) {
                await generateSOPHandler();
            }
           setExportData(true);   
        }, 1000);
    };
  
    // Function to generate SOP Data and download
    const generateSOPHandler = async (sop) => {
        if (thePhaseData.length === 0) {
            NotificationManager.error(`Sorry, you can't generate without adding any phase`, '', 3000);
            return;
        }
        setLoading(true);
        setShowDownload(false);

        let dataToExport = [];
        await thePhaseData.forEach(phase => {
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
       
        const allData = {
            ...sopData,
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

    // Function to download generated template and set all state and data back to normal
    const downloadGeneratedDoc = () => {  
        downloadRef.current.click();
        setShowDownload(false);
        setGeneratedUrl(null);
        setGeneratedFile(null);
        dispatch(saveProcessData(null));
        // dispatch(savePhaseData([]));
        dispatch(saveMapName('Map name'));
        setDocUrl('');
        $('#uploadSOPModal').modal('hide');
        reset({});
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

        // Upload eported data frame and get back the url and store
    const uploadDataFrame = async () => {
        if (!exportedDataFrame) {
            return;
        }
        setUploading(true);
        const formData = new FormData();
        formData.append('csv_file', exportedDataFrame[0]);
        
        try {
            const { data : { data } } = await axiosInstance.post('process-background/upload-csv ', formData);
            dispatch(saveProcessData(data));  
            $('#uploadCSVProcssData').modal('hide');
            setUploading(false);
            setExportedDataFrame(null);
            NotificationManager.success('Process retrieved', '', 5000);
        } catch (e) {
            console.log(e);
            setUploading(false);
        }
    };

        // Show generate modal popup
    const showExportedDataFrameModal = (e) => {
        e.preventDefault();
        $('#uploadCSVProcssData').modal('show');
    };

    return (
        <>
            <section className='process-bg'>
                <div className="container">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 mt-5">
                                <a onClick={gotoHome} className="go-back">
                                    Go back
                                </a>
                            </div>
                            <div className="col-12">
                                <h1>Process Background Information</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <form onSubmit={handleSubmit(saveprocessBackgroundInfo)}>
                                    <div className="row">
                                        <div className="col-md-3 pr-sm-0 mb-2">
                                            <p className='thead pl-3'>Information</p>        
                                        </div>
                                        <div className="col-md-7 pl-sm-2 pr-sm-0 mb-2">
                                            <p className='thead pl-3'>Value</p>
                                        </div>
                                        <div className="col-md-3 pr-sm-0">
                                            <p className='thead bg-green pl-3'>Title</p>        
                                        </div>
                                        <div className="col-md-7 pl-sm-2">
                                            <textarea ref={register()} className='input-field' name="title" id="title" cols="30" rows="3" placeholder='User inputs'/>
                                            {/* <input ref={register()} className='input-field' type="text" name="title" placeholder='User inputs' /> */}
                                        </div>
                                        <div className="col-md-3 pr-sm-0 mt-2">
                                            <p className='thead bg-green pl-3'>Doc_Num</p>        
                                        </div>
                                        <div className="col-md-7 pl-sm-2 mt-2">
                                            <textarea ref={register()} className='input-field' name="doc_num" id="doc_num" cols="30" rows="3" placeholder='User inputs'></textarea>
                                            {/* <input ref={register()} className='input-field' type="text" name="doc_num" placeholder='User inputs' /> */}
                                        </div>
                                        <div className="col-md-3 pr-sm-0 mt-2">
                                            <p className='thead bg-green pl-3'>Purpose</p>        
                                        </div>
                                        <div className="col-md-7 pl-sm-2 mt-2">
                                            <textarea ref={register()} className='input-field' name="purpose" id="purpose" cols="30" rows="3" placeholder='User inputs'/>
                                            {/* <input ref={register()} className='input-field' type="text" name="purpose" placeholder='User inputs' /> */}
                                        </div>
                                        <div className="col-md-3 pr-sm-0 mt-2">
                                            <p className='thead bg-green pl-3'>Scope</p>        
                                        </div>
                                        <div className="col-md-7 pl-sm-2 mt-2">
                                            <textarea ref={register()} className='input-field' name="scope" id="scope" cols="30" rows="3" placeholder='User inputs'/>
                                            {/* <input ref={register()} className='input-field' type="text" name="scope" placeholder='User inputs' /> */}
                                        </div>
                                        <div className="col-md-3 pr-sm-0 mt-2">
                                            <p className='thead bg-green pl-3'>Accountability</p>        
                                        </div>
                                        <div className="col-md-7 pl-sm-2 mt-2">
                                            <textarea ref={register()} className='input-field' name="accountability" id="accountability" cols="30" rows="3" placeholder='User inputs'/>
                                            {/* <input ref={register()} className='input-field' type="text" name="accountability" placeholder='User inputs' /> */}
                                        </div>
                                        <div className="col-md-3 pr-sm-0 mt-2">
                                            <p className='thead bg-green pl-3'>Responsibility</p>        
                                        </div>
                                        <div className="col-md-7 pl-sm-2 mt-2">
                                            <textarea ref={register()} className='input-field' name="responsibility" id="responsibility" cols="30" rows="3" placeholder='User inputs'/>
                                            {/* <input ref={register()} className='input-field' type="text" name="responsibility" placeholder='User inputs' /> */}
                                        </div>
                                        <div className="col-md-3 pr-sm-0 mt-2">
                                            <p className='thead bg-green pl-3'>References</p>        
                                        </div>
                                        <div className="col-md-7 pl-sm-2 mt-2">
                                            <textarea ref={register()} className='input-field' name="references" id="references" cols="30" rows="3" placeholder='User inputs'/>
                                            {/* <input ref={register()} className='input-field' type="text" name="references" placeholder='User inputs' /> */}
                                        </div>
                                        <div className="col-md-3 pr-sm-0 mt-2">
                                            <p className='thead bg-green pl-3'>Definitions</p>        
                                        </div>
                                        <div className="col-md-7 pl-sm-2 mt-2">
                                            <textarea ref={register()} className='input-field' name="definitions" id="definitions" cols="30" rows="3" placeholder='User inputs'/>
                                            {/* <input ref={register()} className='input-field' type="text" name="definitions" placeholder='User inputs' /> */}
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <button ref={saveRef} type='submit' className="btn btn-green mt-4">Export to Data Frame</button>
                                        <button onClick={showGenerateSOPModal} type={'button'} className="btn btn-green mt-4">Generate Document</button>
                                        <button onClick={showExportedDataFrameModal} className="btn mt-4">Upload Exported Data Frame</button>
                                    </div>
                                </form>
                                <CSVLink className='d-none' ref={btnRef} {...csvReport}>Export</CSVLink>
                            </div>
                           
                        </div>
                    </div>
                </div>
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
                                                {/* <input type="file" onChange={collectGeneratedFile} /> */}
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
                                                   <button onClick={uploadFile} className="btn">{uploading ? 'Uploading' : 'Upload'}</button>
                                                </div>
                                                <div className="text-center">
                                                   <p className='mb-0 mx-3 mb-3'>Note: Upload a new template, generate and download the uploaded template or just generate and download from the current template.</p>
                                                   {!showDownload && <button onClick={getGeneratedProcessBgInfo} className="btn">{loading ? 'Generating...' : sopData ? 'Generate Document' : 'Start Generating' }</button>}
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

                <div className="modal fade" id="uploadCSVProcssData" tabIndex="-1" role="dialog"
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
                                                            acceptedFileTypes={'application/csv, text/csv, .csv'}
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
        </>
    )
};

export default ProcessBackgroundInformation;