import { SAVE_PHASE_DATA, SAVE_PROCESS_DATA, SAVE_MAP_NAME  } from '../actions/phaseStore';

const initialState = {
    phases: [],
    processInfo: null,
    mapName: 'Map name'
}

const phaseData = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_PHASE_DATA: 
            return {
                ...state,
                phases: action.data
            }
        case SAVE_PROCESS_DATA: 
            return {
                ...state,
                processInfo: action.data
            }
        case SAVE_MAP_NAME: 
            return {
                ...state,
                mapName: action.name
            }
        default:
            return state;
    }
};

export default phaseData;