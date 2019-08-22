import UpUIState from '../../actions/UpUIState';
import UpDataState from '../../actions/UpDataState';
const  AddTeacherModal = (state={
    show:false,
    loaingShow:true,
    teacherList:[],
    subjects:[]
},actions) =>{
    switch (actions.type) {
        case UpUIState.ADD_TEACHER_MODAL_SHOW:
            return {...state,show:true,loadingShow:true,teacherList:[],subjects:[]};
        case UpUIState.ADD_TEACHER_MODAL_HIDE:
            return {...state,show:false};
        case UpUIState.ADD_TEACHER_LOADING_HIDE:
            return {...state,loadingShow:false};
        case UpDataState.ADD_TEACHER_UPDATA_TEACHERLIST:
            return {...state,teacherList:actions.list};
        case UpDataState.ADD_TEACHER_UPDATA_SUBJECTS:
            return {...state,subjects:actions.list};
        default:
            return state;
    }
};
export default AddTeacherModal;