import React,{Component} from 'react';

import TermPick from "../../component/TermPick";

import STSAction from "../../actions/Teacher/SubjectTeacherSubjectActions";

import {connect} from 'react-redux';

import TeacherIndexActions from "../../actions/Teacher/TeacherIndexActions";

import {DropDown, Loading} from "../../../../common";

import DoubleSingleTable from "../../component/DoubleSingleTable";

import $ from 'jquery';

import ComPageRefresh from "../../actions/ComPageRefresh";

import {message} from "antd";


import SDActions from "../../actions/ScheduleDetailActions";

class Subject extends Component{

    constructor(props) {

        super(props);

        const {PeriodWeekTerm,dispatch} = this.props;

        /*ComPageRefresh.ComPageInit(dispatch,TeacherIndexActions.STSPageInit());*/

        /*dispatch(TeacherIndexActions.STSPageInit());*/

        dispatch(ComPageRefresh.ComPageInit(TeacherIndexActions.STSPageInit()));

    }

    //选择某一周次
    weekPickEvent(e){

        const {dispatch} = this.props;

        dispatch({type:STSAction.STS_NOW_WEEK_CHANGE,data:e.value});

        $('#tb').find('div.ant-table-body').scrollTop(0);

        dispatch(STSAction.STSPageUpdate());

    }

    //选择下一周次
    weekNextEvent(){

        const {dispatch,Teacher} = this.props;

        const {NowWeekNo} = Teacher.SubjectTeacherSubjectSchedule;

        dispatch({type:STSAction.STS_NOW_WEEK_CHANGE,data:(NowWeekNo+1)});

        $('#tb').find('div.ant-table-body').scrollTop(0);

        dispatch(STSAction.STSPageUpdate());

    }

    //选择上一周次
    weekPrevEvent(){

        const {dispatch,Teacher} = this.props;

        const {NowWeekNo} = Teacher.SubjectTeacherSubjectSchedule;

        dispatch({type:STSAction.STS_NOW_WEEK_CHANGE,data:(NowWeekNo-1)});

        $('#tb').find('div.ant-table-body').scrollTop(0);

        dispatch(STSAction.STSPageUpdate());

    }

    //滚动到底部

    scrollToBottom(e){

        const {dispatch,Teacher} = this.props;

        let { TeacherCount,pageIndex } = Teacher.SubjectTeacherSubjectSchedule;

        if (pageIndex < Math.ceil(TeacherCount/10)){

            dispatch(STSAction.STSPageUpdate({nextPage:true}));

        }else if (Math.ceil(TeacherCount/10)>0){

            message.info('已经是最后一页了！',0.2);

            message.config({maxCount:1,top:200});

        }

    }

    //表格点击某一行
    clickRow(record){

        const { Teacher,dispatch } = this.props;

        const { schedule } = Teacher.SubjectTeacherSubjectSchedule;

        let rID  = record.id;

        schedule.map((item,key)=>{

            if (item.id === rID){

                schedule[key]['active'] = true;

            }else{

                schedule[key]['active'] = false;

            }

        });

        dispatch({type:STSAction.SUBJECT_TEACHER_SCHEDULE_UPDATE,data:schedule});

    }

    //切换不同的学科

    subjectChange(e){

        const { dispatch } = this.props;

        dispatch({type:STSAction.TEACHER_STS_SUBJECT_DROP_CHANGE,data:e});

        dispatch(STSAction.STSPageUpdate())

    }


    //弹出课程详情弹窗

    ScheduleDetailShow(Params){

        const { dispatch,Teacher } = this.props;

        /*dispatch(STSAction.ScheduleDetailShow(Params));*/

        const { SubjectTeacherSubjectSchedule,SubjectCourseGradeClassRoom } = Teacher;

        const { ItemClassHour,ItemClassHourCount,NowClassHourNO } = SubjectCourseGradeClassRoom;

        const WeekNO = SubjectTeacherSubjectSchedule.NowWeekNo;

        dispatch({type:SDActions.COMPONENT_SCHEDULE_DETAIL_MODAL_PARAMS_UPDATE,data:{ItemClassHour,ItemClassHourCount,NowClassHourNO,WeekNO,CanOperate:false}});

        dispatch(SDActions.ScheduleDetailShow(Params));

    }





    render() {

        const { PeriodWeekTerm,Teacher } = this.props;

        const { SubjectTeacherSubjectSchedule,SubjectCourseGradeClassRoom  } = Teacher;

        const {SubjectSelectd,SubjectDropList,SubjectDropShow,SubjectTitleName,ScheduleDetail,ChangeTime,AdjustClassRoom,ReplaceSchedule} = SubjectTeacherSubjectSchedule;


        let ItemWeek = [];
        //封装获取到的周次
        if (PeriodWeekTerm.ItemWeek) {

            ItemWeek = PeriodWeekTerm.ItemWeek.map((item) => {

                return {value:item.WeekNO,title:item.WeekNO};

            });

        }

        return (

            <div className="subject-teacher-subject-content">

                <Loading spinning={SubjectTeacherSubjectSchedule.loadingShow} tip="正在为您查找，请稍后...">

                    {

                        SubjectDropShow?

                            <DropDown

                                dropSelectd={SubjectSelectd}

                                dropList={SubjectDropList}

                                style={{zIndex:5}}

                                height={108}

                                onChange={this.subjectChange.bind(this)}>

                            </DropDown>

                            :

                            <div className="subject-title-name">{SubjectTitleName}学科</div>

                    }



                    <TermPick

                        ItemTermName={PeriodWeekTerm.ItemTerm?PeriodWeekTerm.ItemTerm.TermName:''}

                        NowWeekNo={SubjectTeacherSubjectSchedule.NowWeekNo}

                        ItemWeek ={ItemWeek}

                        weekPickEvent = {this.weekPickEvent.bind(this)}

                        weekNextEvent = {this.weekNextEvent.bind(this)}

                        weekPrevEvent = {this.weekPrevEvent.bind(this)}>

                    </TermPick>

                    <div className="double-single-table-wrapper">

                        <DoubleSingleTable
                                    ItemClassHourCount={SubjectCourseGradeClassRoom.ItemClassHourCount}
                                    ItemClassHour={SubjectCourseGradeClassRoom.ItemClassHour}
                                    ItemWeek = {PeriodWeekTerm.ItemWeek}
                                    NowWeekNo={PeriodWeekTerm.NowWeekNo}
                                    leftColWidth={136}
                                    commonColWidth={128}
                                    rowOneHeight={46}
                                    rowTowHeight={64}
                                    commonRowHeight={90}
                                    schedule={SubjectTeacherSubjectSchedule.schedule}
                                    onClickRow={(record) => this.clickRow.bind(this,record)}
                                    scrollToBottom={this.scrollToBottom.bind(this)}
                                    ScheduleDetailShow={this.ScheduleDetailShow.bind(this)}>

                                </DoubleSingleTable>

                    </div>

                </Loading>

            </div>

        );

    }

}

const mapStateToProps = (state) => {

  const { PeriodWeekTerm,Teacher } = state;

  return{

      PeriodWeekTerm,

      Teacher

  }

};

export default connect(mapStateToProps)(Subject);