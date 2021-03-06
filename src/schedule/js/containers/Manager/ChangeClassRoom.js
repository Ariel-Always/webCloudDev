import React,{Component} from 'react';

import { Loading,DropDown } from "../../../../common";

import { connect } from 'react-redux';

import ABTActions from "../../actions/Manager/AdjustByTeacherActions";

import { DatePicker,ConfigProvider,Tooltip } from 'antd';

import zhCN from 'antd/es/locale/zh_CN';

import moment from 'moment';

import 'moment/locale/zh-cn';

import utils from "../../actions/utils";

moment.locale('zh-cn');


class ChangeClassRoom extends Component{

    //教师选取
    teacherDropChange(info){

        const { dispatch } = this.props;

        dispatch(ABTActions.changeClassRoomTeacherPick(info));

    }

    teacherClickSearch(e){

        const { dispatch } = this.props;

        const key = e.value;

        dispatch(ABTActions.changeClassRoomTeacherSearch(key));

    }

    teacherSearchClose(){

        const { dispatch } = this.props;

        dispatch(ABTActions.changeClassRoomTeacherSearchClose());

    }

    dateDisabled(current){

        const { dispatch } = this.props;

        return dispatch(utils.DateDisabled(current));

    }


    //日期选择
    dateChange(date,dateString){

        const { dispatch } = this.props;

        dispatch(ABTActions.changeClassRoomDatePick(dateString));

    }


    //课时选取
    classHourPick(info){

        const { dispatch } = this.props;

        dispatch(ABTActions.changeClassRoomClassHourPick(info));

    }

    //点击教室

    classRoomPick(info){

        const { dispatch } = this.props;

        dispatch(ABTActions.changeClassRoomClassRoomPick(info));

    }





    render() {

        const { teacherList } = this.props;

        const {

            loadingShow,

            teacherDrop,

            teacherSearchList,

            teacherSearchOpen,

            teacherSearchLoadingShow,

            date,

            teacherClassRoom,

            classHourDrop,

            classHourList,

            classHourDisabled,

            WeekNO,

            WeekDay,

            ClassHour,

            classRoomList,

            classRoomDrop,

            classRoomDisabled,

            teacherTips,

            dateTips,

            scheduleTips,

            targetClassRoomTips

        } = this.props.ChangeClassRoom;

        return (

            <Loading type="loading" spinning={false}>

                <div className="change-class-room-wrapper">

                <div className="teacher-wrapper">

                    <span className="props">老师:</span>

                    <Tooltip title="请选择教师" visible={teacherTips} getPopupContainer={triggerNode =>triggerNode.parentNode} placement="right" autoAdjustOverflow={false}>

                        <DropDown  width={150}
                                   dropSelectd={teacherDrop}
                                   type="multiple"
                                   style={{zIndex:5}}
                                   mutipleOptions={{
                                       range:2,
                                       dropMultipleList:teacherList,
                                       dropMultipleChange:this.teacherDropChange.bind(this),
                                       dropClickSearch:this.teacherClickSearch.bind(this),
                                       dropCancelSearch:this.teacherSearchClose.bind(this),
                                       searchList:teacherSearchList,
                                       searchPlaceholder:"请输入姓名或工号进行搜索...",
                                       searchOpen:teacherSearchOpen,
                                       searchLoadingShow:teacherSearchLoadingShow
                                   }}>

                        </DropDown>

                    </Tooltip>

                    {/*<span className="error-tips" style={{display:`${teacherTips?'block':'none'}`}}>请选择教师</span>*/}

                </div>

                <div className="time-wrapper">

                    <span className="props">时间:</span>

                    <ConfigProvider locale={zhCN}>

                        <Tooltip title="请选择日期" visible={dateTips} getPopupContainer={triggerNode =>triggerNode.parentNode} placement="right" autoAdjustOverflow={false}>

                        <DatePicker disabledDate={this.dateDisabled.bind(this)} value={date?moment(date):null} onChange={this.dateChange.bind(this)}></DatePicker>

                        </Tooltip>

                    </ConfigProvider>

                    {/*<span className="error-tips" style={{display:`${dateTips?'block':'none'}`}}>请选择日期</span>*/}

                    <Tooltip title="请选择课时" visible={scheduleTips} getPopupContainer={triggerNode =>triggerNode.parentNode} placement="right" autoAdjustOverflow={false}>

                        <DropDown width={150}
                              height={200}
                              style={{zIndex:4}}
                              dropSelectd={classHourDrop}
                              dropList={classHourList}
                              disabled={classHourDisabled}
                              onChange={this.classHourPick.bind(this)}
                    >

                    </DropDown>

                    </Tooltip>

                    {/*<span className="error-tips" style={{display:`${scheduleTips?'block':'none'}`}}>请选择课时</span>*/}


                    <span className="week-wrapper">{WeekNO?`第${WeekNO}周`:''} {WeekDay} { ClassHour }</span>

                </div>

                <div className="class-room-wrapper">

                    <span className="props">教室:</span>

                    <span className={`classroom ${classHourDrop.value!=='none'?'pick':''}`}>{teacherClassRoom.name}</span>


                    <span className="props">新的教室:</span>

                    <Tooltip title="请选择教室" visible={targetClassRoomTips} getPopupContainer={triggerNode =>triggerNode.parentNode} placement="right" autoAdjustOverflow={false}>

                    <DropDown width={150}
                              height={200}
                              style={{zIndex:2}}
                              dropSelectd={classRoomDrop}
                              dropList={classRoomList}
                              disabled={classRoomDisabled}
                              onChange={this.classRoomPick.bind(this)}>

                    </DropDown>

                    </Tooltip>

                    {/*<span className="error-tips" style={{display:`${targetClassRoomTips?'block':'none'}`}}>请选择教室</span>*/}

                </div>

            </div>

            </Loading>

        );

    }

}

const mapStateToProps = (state) => {

    const { ChangeClassRoom,teacherList } = state.Manager.AdjustByTeacherModal;

    return {

        ChangeClassRoom,

        teacherList

    }

};

export default connect(mapStateToProps)(ChangeClassRoom);