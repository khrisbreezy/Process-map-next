export const SAVE_PHASE_DATA = 'SAVE_PHASE_DATA';
export const SAVE_PROCESS_DATA = 'SAVE_PROCESS_DATA';
export const SAVE_MAP_NAME = 'SAVE_MAP_NAME';


export const savePhaseData = (data) => ({
    type: SAVE_PHASE_DATA,
    data
});

export const saveProcessData = (data) => ({
    type: SAVE_PROCESS_DATA,
    data
});

export const saveMapName = (name) => ({
    type: SAVE_MAP_NAME,
    name
});