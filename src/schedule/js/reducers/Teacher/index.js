import { combineReducers } from 'redux';
//教师reducer
import SubjectTeacherSubjectSchedule from './SubjectTeacherSubjectSchedule';

import SubjectCourseGradeClassRoom from './SubjectCourseGradeClassRoom';

import SubjectTeacherTeacherSchedule from './SubjectTeacherTeacherSchedule';

import PersonalSchedule from "./PersonalSchedule";

const Teacher = combineReducers({

    SubjectTeacherSubjectSchedule,

    SubjectCourseGradeClassRoom,

    SubjectTeacherTeacherSchedule,

    PersonalSchedule

});

export default Teacher;