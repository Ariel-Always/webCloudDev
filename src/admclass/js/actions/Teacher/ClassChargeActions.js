//界面初始化

import ApiActions from "../ApiActions";

import AppLoadingActions from '../AppLoadingActions';

import ModuleActions from '../ModuleActions';

import TeacherLogo from '../../../images/teacher-logo.png';

import AppAlertActions from "../AppAlertActions";

import PaginationActions from "../PaginationActions";

const  TEACHER_CLASS_CHARGE_PAGE_INIT = 'TEACHER_CLASS_CHARGE_PAGE_INIT';

const  TEACHER_CLASS_CHARGE_CLASS_ACTIVE = 'TEACHER_CLASS_CHARGE_CLASS_ACTIVE';

const  TEACHER_CLASS_CHARGE_ACTIVE_CLASS_INFO_INIT = 'TEACHER_CLASS_CHARGE_ACTIVE_CLASS_INFO_INIT';

const  TEACHER_CLASS_CHARGE_LOADING_SHOW = 'TEACHER_CLASS_CHARGE_LOADING_SHOW';

const  TEACHER_CLASS_CHARGE_LOADING_HIDE = 'TEACHER_CLASS_CHARGE_LOADING_HIDE';


//教师

const TEACHER_CLASS_CHARGE_TEACHER_LOADING_SHOW = 'TEACHER_CLASS_CHARGE_TEACHER_LOADING_SHOW';

const TEACHER_CLASS_CHARGE_TEACHER_LOADING_HIDE = 'TEACHER_CLASS_CHARGE_TEACHER_LOADING_HIDE';

const TEACHER_CLASS_CHARGE_TEACHER_LIST_UPDATE = 'TEACHER_CLASS_CHARGE_TEACHER_LIST_UPDATE';


//学生变化

const TEACHER_CLASS_CHARGE_STUDENT_LIST_UPDATE = 'TEACHER_CLASS_CHARGE_STUDENT_LIST_UPDATE';

const TEACHER_CLASS_CHARGE_STUDENT_SEARCH_VALUE_CHANGE = 'TEACHER_CLASS_CHARGE_STUDENT_SEARCH_VALUE_CHANGE';

const TEACHER_CLASS_CHARGE_STUDENT_PAGE_INDEX_UPDATE = 'TEACHER_CLASS_CHARGE_STUDENT_PAGE_INDEX_UPDATE';

const TEACHER_CLASS_CHARGE_STUDENT_SEARCH_RESULT_SHOW = 'TEACHER_CLASS_CHARGE_STUDENT_SEARCH_RESULT_SHOW';

const TEACHER_CLASS_CHARGE_STUDENT_SEARCH_RESULT_HIDE = 'TEACHER_CLASS_CHARGE_STUDENT_SEARCH_RESULT_HIDE';


const TEACHER_CLASS_CHARGE_STUDENT_SEARCH_CANCEL_SHOW = 'TEACHER_CLASS_CHARGE_STUDENT_SEARCH_CANCEL_SHOW';

const TEACHER_CLASS_CHARGE_STUDENT_SEARCH_CANCEL_HIDE = 'TEACHER_CLASS_CHARGE_STUDENT_SEARCH_CANCEL_HIDE';

const TEACHER_CLASS_CHARGE_STUDENT_LOADING_SHOW = 'TEACHER_CLASS_CHARGE_STUDENT_LOADING_SHOW';

const TEACHER_CLASS_CHARGE_STUDENT_LOADING_HIDE = 'TEACHER_CLASS_CHARGE_STUDENT_LOADING_HIDE';





//界面初始化
const PageInit = () =>{

    return (dispatch,getState)=>{

        const { UserID } = getState().DataState.LoginUser;

        ApiActions.GetClassAndPower({UserID,dispatch}).then(data=>{

            if (data){

                const ActiveClassID = data.Class[0].ClassID;

                let StudentPower = true;

                let TeacherPower = true;

                data.Power.map((item,key)=>{

                    if (item.PowerID==='Ganger_Student_CURD'){

                        if (item.Status===1){

                            StuPower = true;

                        }

                    }

                    if (item.PowerID==='Ganger_CourseClassTeacher_CURD'){

                        if (item.Status===1){

                            TeacherPower = true;

                        }

                    }

                });

                if (!StudentPower&&!TeacherPower){

                    dispatch({type:ModuleActions.MODULE_SETTING_INFO_UPDATE,data:{

                            ShowLeftMenu:false,

                            ShowBarner:false,

                            ModuleInfo:{

                                cnname:'班级管理',

                                enname:"Class management",

                                image:TeacherLogo

                            }

                        }});

                }

                dispatch({type:TEACHER_CLASS_CHARGE_PAGE_INIT,data:{...data,StudentPower,TeacherPower}});

                dispatch({type:TEACHER_CLASS_CHARGE_CLASS_ACTIVE,data:ActiveClassID});

                dispatch(ClassInfoUpdate(ActiveClassID));


            }

        })

    }

};


//整个班级界面更新

const ClassInfoUpdate  = (ClassID) =>{

    return dispatch=>{

        dispatch({type:TEACHER_CLASS_CHARGE_LOADING_SHOW});

        const GetClassTeacher = ApiActions.GetClassTeacher({ClassID,dispatch});

        const GetStudentToPage = ApiActions.GetStudentToPage({ClassID,Keyword:'',PageIndex:0,PageSize:20,dispatch});

        Promise.all([GetClassTeacher,GetStudentToPage]).then(res=>{

            const json1 = res[0];

            const json2 = res[1];

            let Teacher,Student = {};

            if (json1){

                Teacher = json1;

            }

            if (json2){

                Student = json2;

            }

            dispatch({type:TEACHER_CLASS_CHARGE_ACTIVE_CLASS_INFO_INIT,data:{Teacher,Student}});

            dispatch({type:TEACHER_CLASS_CHARGE_LOADING_HIDE});

            dispatch(AppLoadingActions.hide());

        });

    }

};


//教师更新

const TeacherUpdate = () =>{

    return (dispatch,getState)=>{

        dispatch({type:TEACHER_CLASS_CHARGE_TEACHER_LOADING_SHOW});

        const { ActiveClassID } = getState().Teacher.ClassCharge;

        ApiActions.GetClassTeacher({ClassID:ActiveClassID,dispatch}).then(data=>{

            if (data){

                dispatch({type:TEACHER_CLASS_CHARGE_TEACHER_LIST_UPDATE,data:data});

            }

            dispatch({type:TEACHER_CLASS_CHARGE_TEACHER_LOADING_HIDE});

        })

    }

};

//学生更新

const StudentUpdate = (PageIndex) =>{

    return (dispatch,getState)=>{

        dispatch({type:TEACHER_CLASS_CHARGE_STUDENT_LOADING_SHOW});

        const { ActiveClassID,StudentPage,StudentSearchOpen,StudentSearchValue } = getState().Teacher.ClassCharge;

        let Keyword = StudentSearchOpen?StudentSearchValue:'';

        ApiActions.GetStudentToPage({ClassID:ActiveClassID,Keyword,PageIndex,PageSize:20,dispatch}).then(data=>{

            if (data){

                dispatch({type:TEACHER_CLASS_CHARGE_STUDENT_LIST_UPDATE,data:data});

            }

            dispatch({type:TEACHER_CLASS_CHARGE_STUDENT_LOADING_HIDE});

        })

    }

};


//班级变化

const ClassChange = (ClassID) =>{

    return (dispatch,getState)=>{

        dispatch({type:TEACHER_CLASS_CHARGE_CLASS_ACTIVE,data:ClassID});

        dispatch(ClassInfoUpdate(ClassID));

    }

};



//设置取消班长
const SetMonitor = ({UserID,isMonitor}) =>{

    return (dispatch,getState) => {

        let MonitorID = '';

        const { List,Total } = getState().Teacher.ClassCharge.Student;

        const { ActiveClassID } = getState().Teacher.ClassCharge;

        if (!isMonitor){

            MonitorID = UserID;

        }

        ApiActions.SetMonitor({UserID:MonitorID,ClassID:ActiveClassID,dispatch}).then(data=>{

            if (data===0){

               /* let StudentList = List.map(item=>{

                    if (item.UserID === UserID){

                        let UserClass = isMonitor?0:1;

                        return {

                            ...item,

                            UserClass

                        }

                    }else{

                        return {

                            ...item,

                            UserClass:0

                        };

                    }

                 });

                let Student = { Total,List:StudentList };

                dispatch({type:TEACHER_CLASS_CHARGE_STUDENT_LIST_UPDATE,data:Student});*/

                dispatch(AppAlertActions.alertSuccess({title:`成功${isMonitor?'取消':'设置'}班长`}));

                dispatch(StudentUpdate(0));

            }

        });

    }

};


//搜索学生

const StuSearchClick = ()=>{

    return dispatch=>{

        dispatch({type:TEACHER_CLASS_CHARGE_STUDENT_SEARCH_RESULT_SHOW});

        dispatch({type:TEACHER_CLASS_CHARGE_STUDENT_SEARCH_CANCEL_SHOW});

        dispatch(StudentUpdate(0));

    }

};

//学生取消搜索

const StuCancelSearch = () => {

    return (dispatch,getState)=>{

        dispatch({type:TEACHER_CLASS_CHARGE_STUDENT_SEARCH_RESULT_HIDE});

        dispatch({type:TEACHER_CLASS_CHARGE_STUDENT_SEARCH_CANCEL_HIDE});

        dispatch({type:TEACHER_CLASS_CHARGE_STUDENT_SEARCH_VALUE_CHANGE,data:''});

        dispatch(StudentUpdate(0));

    }

};



//学生页码发生变化

const StudentPageChange = (PageIndex) => {

    return (dispatch,getState)=>{

        dispatch({type:TEACHER_CLASS_CHARGE_STUDENT_PAGE_INDEX_UPDATE,data:PageIndex});

        dispatch(StudentUpdate(PageIndex-1));

    }

};



export default {

    TEACHER_CLASS_CHARGE_PAGE_INIT,

    TEACHER_CLASS_CHARGE_CLASS_ACTIVE,

    TEACHER_CLASS_CHARGE_ACTIVE_CLASS_INFO_INIT,

    TEACHER_CLASS_CHARGE_LOADING_SHOW,

    TEACHER_CLASS_CHARGE_LOADING_HIDE,

    TEACHER_CLASS_CHARGE_STUDENT_LIST_UPDATE,

    TEACHER_CLASS_CHARGE_STUDENT_SEARCH_VALUE_CHANGE,

    TEACHER_CLASS_CHARGE_STUDENT_PAGE_INDEX_UPDATE,

    TEACHER_CLASS_CHARGE_STUDENT_SEARCH_CANCEL_SHOW,

    TEACHER_CLASS_CHARGE_STUDENT_SEARCH_CANCEL_HIDE,

    TEACHER_CLASS_CHARGE_STUDENT_SEARCH_RESULT_SHOW,

    TEACHER_CLASS_CHARGE_STUDENT_SEARCH_RESULT_HIDE,

    TEACHER_CLASS_CHARGE_STUDENT_LOADING_SHOW,

    TEACHER_CLASS_CHARGE_STUDENT_LOADING_HIDE,

    TEACHER_CLASS_CHARGE_TEACHER_LIST_UPDATE,

    TEACHER_CLASS_CHARGE_TEACHER_LOADING_SHOW,

    TEACHER_CLASS_CHARGE_TEACHER_LOADING_HIDE,

    PageInit,

    ClassChange,

    SetMonitor,

    StuSearchClick,

    StuCancelSearch,

    StudentPageChange,

    TeacherUpdate

}