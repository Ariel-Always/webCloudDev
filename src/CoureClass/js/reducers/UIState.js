import {combineReducers} from 'redux'
import AppLoading from './ui/AppLoading';
import AppAlert from './ui/AppAlert';
import SubjectDetailsMsgModalShow from './ui/SubjectDetailsMsgModalShow';
import SubjectTableLoading from './ui/SubjectTableLoading';
import ChangeSubjectModal from './ui/ChangeSubjectModal';
import SetSubjectTeacher from './ui/SetSubjectTeacher';
import SetCourseClassDetailsModalShow from './ui/SetCourseClassDetailsModalShow';
const  UIState = combineReducers({
    AppLoading,
    AppAlert,
    SubjectTableLoading,
    SubjectDetailsMsgModalShow,
    ChangeSubjectModal,
    SetSubjectTeacher,
    SetCourseClassDetailsModalShow
});

export default UIState;


