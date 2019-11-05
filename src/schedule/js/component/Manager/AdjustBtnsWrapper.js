import React,{Component} from 'react';
import ScheduleSetting from "../../containers/Manager/ScheduleSetting";

class AdjustBtnsWrapper extends Component{

    render() {

        const {

            adjustBtnsToggle,adjustBtns,addScheduleModalShow,

            adjustByTimeModalShow,stopScheduleShow,delScheduleShow,

            adjustByTeacherShow,Import,ScheduleSettingShow

        } = this.props;

        return (

            <div className="adjust-schedule-wrapper">

                <span className="schedule-setting" onClick={()=>ScheduleSettingShow()}>课程表设置</span>

                <span className="import-schedule" onClick={()=>Import()}>导入课程安排</span>

                <span className="adjust-schedule" id="adjust-schedule" onClick={() => adjustBtnsToggle()}>调整课程安排</span>

                <span className="see-adjust-log" onClick={()=>{ window.open('/html/schedule#/manager/adjustlog'); }}>查看调课日志</span>

                <div className="adjust-list-wrapper" id="adjust-list-wrapper" style={{display:`${adjustBtns.adjustBtnsShow?'block':'none'}`}}>

                            <div className="add-schedule" onClick={()=>{addScheduleModalShow();}}><span>添加临时课程</span></div>

                            <div className="adjust-by-teacher" onClick={()=>adjustByTeacherShow()}><span>按老师调整</span></div>

                            <div className="adjust-by-time" onClick={()=>{adjustByTimeModalShow();}}><span>按时间调整</span></div>

                            <div className="adjust-by-classroom"><span>按教室调整</span></div>

                            <div className="stop-schedule" onClick={()=>{stopScheduleShow();}}><span>停课</span></div>

                            <div className="delete-schedule" onClick={()=>{delScheduleShow();}}><span>删除课程</span></div>

                        </div>

            </div>

        );

    }

}

export default AdjustBtnsWrapper;