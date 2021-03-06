import React,{Component} from 'react';

import {connect} from 'react-redux';

import { Modal,DropDown,Loading } from "../../../../common";

import ASMActions from '../../actions/Manager/AddScheduleModalActions'

import { Tooltip } from 'antd';

class AddScheduleModal extends Component{

    //学科选项改变
    subjectChange(e) {

        const {dispatch, AddScheduleModal} = this.props;

        dispatch({type: ASMActions.ADD_SHEDULE_MODAL_SUBJECT_CHANGE, data: e});

        dispatch({type: ASMActions.ADD_SCHEDULE_MODAL_SUBJECT_ERROR_HIDE});

        const { subject,gradeClass,teachers,classDisabled,teacherDisabled,checkedClass,checkedTeacher } = AddScheduleModal;

        if (classDisabled||teacherDisabled){

            dispatch({type: ASMActions.MANAGER_ADD_SCHEDULE_MODAL_CLASS_TEACHER_DROP_ABLED});

        }

        const SubjectGrades = subject.find(item=>item.value===e.value).Grades;

        const SubjectGradeList = SubjectGrades.split(',');

        const classList = gradeClass.map(item=>{

            if (SubjectGradeList.findIndex(i=>i===item.id)>=0){

                return item

            }else{

                return;

            }

        }).filter(item=>item!==undefined);

        const teacherList = teachers.map(item=>{

            if (item.SubjectID===e.value){

                return {

                    value:item.TeacherID,

                    title:<span className="teacher-id-name" title={`${item.TeacherName}[${item.TeacherID}]`}><span className="teacher-name">{item.TeacherName}</span><span className="teacher-id" style={{color:'#999'}}>[{item.TeacherID}]</span></span>

                }

            }else{

                return;

            }

        }).filter(i=>i!==undefined);

        dispatch({type: ASMActions.MANAGER_ADD_SCHEDULE_MODAL_CLASS_TEACHER_DROP_CHANGE});

        dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_CLASS_TEACHER_LIST_UPDATE,data:{teacherList,classList}});

        if (teacherList.length===0){

               dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_TEACHER_DROP_DISABLED});

               dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_TEACHER_DROP_CHANGE,data:{value:"none",title:"该学科下暂无教师"}});

        }

        //切换学科清除搜索输入的内容

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_CLASS_SEARCH_CLOSE});

        $('.select-class .search_cancel_input').hide();

        $('.select-class .search_text_input').val('');

        $('.select-class .dropdown_item1_name.slide .dropdown_item3_li.active').removeClass('.active');

        $('.select-class .dropdown_item1_name.slide').removeClass('slide');

        $('.select-class .dropdown_item1_name').next('.dropdown_list_ul3').hide();


    }



    //班级选项改变
    classChange(e){

        const {dispatch} = this.props;

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_CLASS_CHANGE,data:{title:e.value,value:e.id}});

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_CLASS_ERROR_HIDE});

    }

    //老师改变
    teacherChange(e){

        const {dispatch} = this.props;

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_TEACHER_CHANGE,data:e});

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_TEACHER_ERROR_HIDE});

    }
    //周次变更
    weekChange(e){

        const {dispatch} = this.props;

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_WEEK_CHANGE,data:e});

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_DATE_ABLED});

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_WEEK_ERROR_HIDE});

    }

    //星期变更
    dateChange(e){

        const {dispatch} = this.props;

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_DATE_CHANGE,data:e});

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_CLASSHOUR_ABLED});

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_DATE_ERROR_HIDE});

    }

    //课时变更
    classHourChange(e){

        const {dispatch} = this.props;

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_CLASSHOUR_CHANGE,data:e});

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_CLASSHOUR_ERROR_HIDE});

    }

    //教室变更
    classRoomChange(e){

        const {dispatch} = this.props;

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_CLASSROOM_CHANGE,data:{title:e.value,value:e.id}});

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_HIDE});

    }
    //点击OK按钮
    ok(e) {

        const {AddScheduleModal,dispatch} = this.props;

        if (Object.keys(AddScheduleModal.checkedSubject).length <= 0){

            dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_SUBJECT_ERROR_SHOW});

        }

        if (Object.keys(AddScheduleModal.checkedClass).length <= 0){

            dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_CLASS_ERROR_SHOW});

        }

        if (Object.keys(AddScheduleModal.checkedTeacher).length <= 0||AddScheduleModal.checkedTeacher.value==='none'){

            dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_TEACHER_ERROR_SHOW});

        }

        if (Object.keys(AddScheduleModal.checkedWeek).length <= 0){

            dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_WEEK_ERROR_SHOW});

        }

        if (Object.keys(AddScheduleModal.checkedDate).length <= 0){

            dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_DATE_ERROR_SHOW});

        }

        if (Object.keys(AddScheduleModal.checkedClassHour).length <= 0){

            dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_CLASSHOUR_ERROR_SHOW});

        }

        if (Object.keys(AddScheduleModal.checkedClassRoom).length <= 0){

            dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_SHOW});

        }

        if (

            (Object.keys(AddScheduleModal.checkedSubject).length > 0)&&

            (Object.keys(AddScheduleModal.checkedClass).length > 0)&&

            (Object.keys(AddScheduleModal.checkedTeacher).length > 0&&AddScheduleModal.checkedTeacher.value!=='none')&&

            (Object.keys(AddScheduleModal.checkedWeek).length > 0)&&

            (Object.keys(AddScheduleModal.checkedDate).length > 0)&&

            (Object.keys(AddScheduleModal.checkedClassHour).length>0)&&

            (Object.keys(AddScheduleModal.checkedClassRoom).length > 0)

        ){

            dispatch(ASMActions.commitInfo());

        }

    }

    //点击取消交互
    cancel(){

        const {dispatch} = this.props;

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_HIDE});

    }

    //点击班级的搜索
    classSearchClick(e){

        const { dispatch } = this.props;

        const {value} = e;

        dispatch(ASMActions.classSearch(value));

    }

    //取消班级搜索
    classSearchClose(){

        const {dispatch} = this.props;

        dispatch(ASMActions.classSearchClose());

    }


    //点击教室搜索
    classRoomSearchClick(e){

        const { dispatch } = this.props;

        const {value} = e;

        dispatch(ASMActions.classRoomSearch(value));

    }

    //取消教室搜索
    classRoomSearchClose(){

        const {dispatch} = this.props;

        dispatch(ASMActions.classRoomSearchClose());

    }

    //点击教师
    teacherSearchClick(e){

        const { dispatch } = this.props;

        const {value} = e;

        dispatch(ASMActions.teacherSearch(value));

    }

    //教师取消搜索
    teacherSearchClose(){

        const {dispatch} = this.props;

        dispatch(ASMActions.teacherSearchClose());

    }


    render() {

        const { AddScheduleModal } =this.props;

        return (

            <Modal className="add-schedule-modal-wrapper" visible={AddScheduleModal.show}
                   title="添加临时课程"
                   type={1}
                   width={680}
                   bodyStyle={{height:286}}
                   mask={true}
                   maskClosable={false}
                   cancelText="取消"
                   onOk={this.ok.bind(this)}
                   onCancel={this.cancel.bind(this)}
                   destroyOnClose={true}>

                <div className="ModalContent">

                    <Loading spinning={AddScheduleModal.loadingShow} tip="加载中...">

                        <table className="modalTable">

                        <tbody>

                            <tr>

                                <td className="props">学科:</td>

                                <td style={{position:"relative",zIndex:5}}>

                                    <Tooltip title="请选择学科" getPopupContainer={trigger =>trigger.parentNode} visible={AddScheduleModal.subjectErrorShow} placement="right">

                                        <DropDown
                                            width={150}
                                            height={200}
                                            onChange={this.subjectChange.bind(this)}
                                            style={{zIndex:10}}
                                            dropSelectd={AddScheduleModal.checkedSubject?AddScheduleModal.checkedSubject:{value:"none",title:"请选择学科"}}
                                            dropList = {AddScheduleModal.subject}>

                                        </DropDown>

                                    </Tooltip>

                                </td>

                            </tr>

                            <tr>

                                <td className="props">上课班级:</td>

                                <td style={{position:"relative",zIndex:4}}>

                                    <Tooltip title="请选择班级" getPopupContainer={trigger =>trigger.parentNode} visible={AddScheduleModal.classErrorShow} placement="right">

                                        <DropDown

                                        className="select-class"

                                        width={150}

                                        type="multiple"

                                        disabled={AddScheduleModal.classDisabled}

                                        dropSelectd={AddScheduleModal.checkedClass?AddScheduleModal.checkedClass:{value:"none",title:"请选择班级"}}

                                        mutipleOptions={{
                                            range:2,
                                            dropSelectd:AddScheduleModal.checkedClass?AddScheduleModal.checkedClass:{value:'none'},
                                            dropMultipleList:AddScheduleModal.classList,
                                            dropMultipleChange:this.classChange.bind(this),
                                            dropClickSearch:this.classSearchClick.bind(this),
                                            dropCancelSearch:this.classSearchClose.bind(this),
                                            searchList:AddScheduleModal.classSearchList,
                                            searchPlaceholder:"请输入班级名称进行搜索...",
                                            searchOpen:AddScheduleModal.classSearchOpen,
                                            searchLoadingShow:AddScheduleModal.classSearchLoadingShow,
                                            CancelBtnShow:AddScheduleModal.classSearchCancelShow
                                        }}
                                        style={{zIndex:9}}>

                                    </DropDown>

                                    </Tooltip>

                                </td>

                            </tr>

                            <tr>

                                <td className="props">上课老师:</td>

                                <td style={{position:"relative",zIndex:3}}>

                                    <Tooltip title="请选择教师" getPopupContainer={trigger =>trigger.parentNode} visible={AddScheduleModal.teacherErrorShow} placement="right">

                                        <DropDown
                                        width={150}
                                        type="simple"
                                        TitleShow={false}
                                        disabled={AddScheduleModal.teacherDisabled}
                                        dropSelectd={AddScheduleModal.checkedTeacher?AddScheduleModal.checkedTeacher:{value:"none",title:"请选择老师"}}
                                        dropList={AddScheduleModal.teacherList}
                                        onChange={this.teacherChange.bind(this)}
                                        height={200}
                                        style={{zIndex:8}}>

                                    </DropDown>

                                    </Tooltip>

                                </td>

                            </tr>

                            <tr>

                                <td className="props">上课时间:</td>

                                <td style={{position:"relative",zIndex:2}}>

                                    <Tooltip title="请选择周次" getPopupContainer={trigger =>trigger.parentNode} visible={AddScheduleModal.weekErrorShow} placement="right">

                                        <DropDown
                                        width={150}
                                        style={{zIndex:7}}
                                        height={200}
                                        className="week"
                                        TitleShow={false}
                                        dropSelectd={AddScheduleModal.checkedWeek?AddScheduleModal.checkedWeek:{value:"none",title:"请选择周次"}}
                                        dropList={AddScheduleModal.week}
                                        onChange={this.weekChange.bind(this)}>

                                    </DropDown>

                                    </Tooltip>

                                    <Tooltip title="请选择星期" getPopupContainer={trigger =>trigger.parentNode} visible={AddScheduleModal.dateErrorShow} placement="right">

                                        <DropDown
                                        width={150}
                                        style={{zIndex:7}}
                                        height={108}
                                        className="date"
                                        disabled={AddScheduleModal.dateDisabled}
                                        dropSelectd={AddScheduleModal.checkedDate?AddScheduleModal.checkedDate:{value:"none",title:"请选择星期"}}
                                        dropList={AddScheduleModal.date}
                                        onChange={this.dateChange.bind(this)}>

                                    </DropDown>

                                    </Tooltip>

                                    <Tooltip title="请选择课时" getPopupContainer={trigger =>trigger.parentNode} visible={AddScheduleModal.classHourErrorShow} placement="right">

                                        <DropDown
                                        width={150}
                                        style={{zIndex:7}}
                                        height={108}
                                        TitleShow={false}
                                        className="classHour"
                                        disabled={AddScheduleModal.classHourDisabled}
                                        dropSelectd={AddScheduleModal.checkedClassHour?AddScheduleModal.checkedClassHour:{value:"none",title:"请选择课时"}}
                                        dropList={AddScheduleModal.classHour}
                                        onChange={this.classHourChange.bind(this)}>

                                    </DropDown>

                                    </Tooltip>

                                </td>

                            </tr>

                            <tr>

                                <td className="props">上课教室:</td>

                                <td style={{position:"relative",zIndex:1}}>

                                    <Tooltip title="请选择教室" getPopupContainer={trigger =>trigger.parentNode} visible={AddScheduleModal.classRoomErrorShow} placement="right">

                                        <DropDown
                                        width={470}
                                        type="multiple"
                                        dropSelectd={AddScheduleModal.checkedClassRoom?AddScheduleModal.checkedClassRoom:{value:"none",title:"请选择教室"}}
                                        mutipleOptions={{
                                            range:2,
                                            dropMultipleList:AddScheduleModal.classRoom,
                                            dropMultipleChange:this.classRoomChange.bind(this),
                                            dropClickSearch:this.classRoomSearchClick.bind(this),
                                            searchList:AddScheduleModal.classRoomSearchList,
                                            searchPlaceholder:"请输入教室名称或ID进行搜索...",
                                            searchLoadingShow:AddScheduleModal.classRoomSearchLoadingShow,
                                            dropCancelSearch:this.classRoomSearchClose.bind(this),
                                            searchOpen:AddScheduleModal.classRoomSearchOpen,
                                            CancelBtnShow:AddScheduleModal.classRoomSearchCancelShow
                                        }}
                                        style={{zIndex:6}}>

                                    </DropDown>

                                    </Tooltip>

                                </td>

                            </tr>

                        </tbody>

                    </table>

                    </Loading>

                </div>

            </Modal>

        );

    }

}

const mapStateToState = (state) => {

    const { AddScheduleModal } = state.Manager;

    return{

        AddScheduleModal

    }

};

export default connect(mapStateToState)(AddScheduleModal);