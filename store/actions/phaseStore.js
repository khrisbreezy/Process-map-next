export const SAVE_PHASE_DATA = 'SAVE_PHASE_DATA';
export const SAVE_PROCESS_DATA = 'SAVE_PROCESS_DATA';

export const savePhaseData = (data) => ({
    type: SAVE_PHASE_DATA,
    data
});

export const saveProcessData = (data) => ({
    type: SAVE_PROCESS_DATA,
    data
});