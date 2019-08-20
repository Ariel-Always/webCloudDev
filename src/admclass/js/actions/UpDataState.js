import {postData,getData} from "../../../common/js/fetch";
import UpUIState from './UpUIState';
import CONFIG from '../../../common/js/config';
import 'whatwg-fetch';



//操作常量
//获取登录用户信息
const GET_LOGIN_USER_INFO = 'GET_LOGIN_USER_INFO';
//获取所有年级总览信息
const  GET_ALL_GRADE_PREVIEW = 'GET_ALL_GRADE_PREVIEW';
//获取年级班级信息
const GET_SHCOOL_GRADE_CLASSES = 'GET_SHCOOL_GRADE_CLASSES';
//获取某一年级总览数据
const  GET_THE_GRADE_PREVIEW = 'GET_THE_GRADE_PREVIEW';
//获取某一班级的教师列表
const GET_THE_CLASS_THEACHERS = 'GET_THE_CLASS_THEACHERS';
//获取某一班级的学生列表
const GET_THE_CLASS_STUDENTS = 'GET_THE_CLASS_STUDENTS';
//初始所有的学生选项
const INIT_STUDEUNT_PLAIN_OPTIONS = 'INIT_STUDEUNT_PLAIN_OPTIONS';
//学生多选框变化
const STUDENTS_CHECK_LIST_CHANGE = 'STUDENTS_CHECK_LIST_CHANGE';
//学生的全选和全不选
const STUDENTS_CHECKED_ALL = 'STUDENTS_CHECKED_ALL';
const STUDENTS_CHECKED_NONE = 'STUDENTS_CHECKED_NONE';


//操作的执行
//获取界面初始信息
const  getPageInit = () => {
    return (dispatch,getState) => {

        fetch(`${CONFIG.proxy}/Login?method=GetUserInfo`).then(res => res.json()).then(json => {

            dispatch({type:GET_LOGIN_USER_INFO,data:json.data.result});

            const GradesClassesPromise = getXuGetData('/GradesClasses');

            GradesClassesPromise.then((res)=>{

                if (res.Status===200){

                    dispatch({type:GET_SHCOOL_GRADE_CLASSES,data:res.Data});

                }else if (res.Status===400||res.Status===500) {

                    dispatch({type:UpUIState.SHOW_ERROR_ALERT,title:res.Msg});

                    //Status不是200的情况

                }

            });

        });
    }
};

//获取所有的年纪总览数据
const getAllGradePreview = () => {

    return dispatch =>{

        dispatch({type:UpUIState.GRADE_LOADING_SHOW});

        const AdmAllGradePreviewPromise =  getXuGetData('/AdmAllGradePreview?Token=Token&SchoolID=SchoolID');

        AdmAllGradePreviewPromise.then((res)=>{

            if (res.Status===200){

                dispatch({type:GET_ALL_GRADE_PREVIEW,data:res.Data});

                dispatch({type:UpUIState.GRADE_LOADING_HIDE});

                dispatch({type:UpUIState.APP_LOADING_CLOSE});

            }else if (res.Status===400||res.Status===500){

                dispatch({type:UpUIState.SHOW_ERROR_ALERT,title:res.Msg});
                //Status不是200的情况

            }

        });

    }

};

//获取某一年纪的所有总览数据
const getTheGradePreview = ()=> {

    return dispatch => {

        dispatch({type:UpUIState.CLASS_LOADING_SHOW});

       let AdmTheGradePreviewPromise =  getXuGetData('/AdmTheGradePreview?Token=Token&GradeID=GradeID&PageIndex=PageIndex&PageSize=9');

       AdmTheGradePreviewPromise.then((res)=>{

           if (res.Status===200){

               dispatch({type:GET_THE_GRADE_PREVIEW,data:res.Data});

               dispatch({type:UpUIState.CLASS_LOADING_HIDE});

               dispatch({type:UpUIState.APP_LOADING_CLOSE});

           }

       });

    }

};
//获取某一班级的数据
const getTheClassPreview = () =>{
    return dispatch => {

        dispatch({type:UpUIState.STUDENT_LOADING_SHOW});

        let getAmdClassTeachersPromise = getXuGetData('/AmdClassTeachers');

        let getAmdClassStudentPromise = getXuGetData('/AmdClassStudents');

        Promise.all([getAmdClassStudentPromise,getAmdClassTeachersPromise]).then((res) => {

            dispatch({type:GET_THE_CLASS_STUDENTS,data:res[0].Data});

            dispatch({type:GET_THE_CLASS_THEACHERS,data:res[1].Data});

            dispatch({type:UpUIState.STUDENT_LOADING_HIDE});

            dispatch({type:UpUIState.APP_LOADING_CLOSE});

        });

    }
};




//从徐工那边获取的数据以及数据格式
 const getXuGetData =  async (url) =>{
    try {
        let fetchAsync = '';
        try {
            fetchAsync = await getData(CONFIG.proxy+url);
        }
        catch (e) {
            return  e;
        }

        let json = await fetchAsync.json();

        return  json;

    }
    catch (e) {

       return e;

    }
};



export default {
    getPageInit,
    getAllGradePreview,
    getTheGradePreview,
    getTheClassPreview,
    GET_LOGIN_USER_INFO,
    GET_ALL_GRADE_PREVIEW,
    GET_SHCOOL_GRADE_CLASSES,
    GET_THE_GRADE_PREVIEW,
    GET_THE_CLASS_THEACHERS,
    GET_THE_CLASS_STUDENTS,
    STUDENTS_CHECK_LIST_CHANGE,
    STUDENTS_CHECKED_ALL,
    STUDENTS_CHECKED_NONE,
    INIT_STUDEUNT_PLAIN_OPTIONS
}