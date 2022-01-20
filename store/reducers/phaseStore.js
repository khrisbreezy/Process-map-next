import { SAVE_PHASE_DATA, SAVE_PROCESS_DATA  } from '../actions/phaseStore';

const initialState = {
    phases: [],
    processInfo: null
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
        default:
            return state;
    }
};

export default phaseData;