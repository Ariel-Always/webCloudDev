import DataChange from '../action/data/DataChange'

export default (state = {

    semesterInfo: {},

    semesterloading: true,
    schoolInfo: {},
    subsystemInfo: {}


}, action) => {

    switch (action.type) {
        case DataChange.GET_CURRENT_SEMESTER_INFO:

            return {
                ...state,
                semesterInfo: action.data


            }
        case DataChange.SEMESTER_LOADING_HIDE:


            return {
                ...state,
                semesterloading: false


            }
        case DataChange.REFRESH_SEMESTER_INFO: 
        return{
            ...state,
            semesterInfo: action.data
        }    
        case DataChange.GET_CURRENT_SCHOOL_INFO:
            //    console.log( action.data);
            return {
                ...state,
                schoolInfo: action.data
            }
        case DataChange.REFRESH_SCHOOL_INFO:
            return {
                ...state,
                schoolInfo: action.data
            }
        case DataChange.CET_CURRENT_SUBSYSTEM_INFO:
            return {
                ...state,
                subsystemInfo: action.data
            }
        case DataChange.REFRESH_SUBSYSTEM_INFO:
            return {
                ...state,
                subsystemInfo: action.data
            }

        default:
            return state;
    }
};