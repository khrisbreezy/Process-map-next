
import React, { useState, useRef } from 'react';
import Board, { createTranslate } from 'react-trello';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { CSVLink } from 'react-csv';

import { savePhaseData } from '../store/actions/phaseStore';
import SingleActionCard from "../components/SingleActionCard";


const Home = () => {
    const dispatch = useDispatch();
    const btnRef = useRef();

    const thePhaseData = useSelector(state => state.phaseData.phases);

    const [ mapName, setMapName ] = useState('Map Name');
    const [phaseData, setPhaseData] = useState(thePhaseData);
    const [csvData, setCsvData] = useState([]);
    const [currentCard, setCurrentCard] = useState(null);
    const [currentPhase, setCurrentPhase] = useState([]);
    const [phaseIndex, setPhaseIndex] = useState(null);

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

    // set export name
    const mapNameHandler = (e) => {
        setMapName(e.target.value);
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
                    <div className="col-md-6 mb-4">
                        <button onClick={gotoProcessBginfoHandler} className="btn">Add process background</button>
                    </div>
                    <div className="col-md-6 mb-4">
                        <CSVLink className='d-none' ref={btnRef} {...csvReport}>Export</CSVLink>
                        <button onClick={exportDataHandler} className="btn">Export to data frame</button>
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
        </section>
    )
  
};

export default Home;

