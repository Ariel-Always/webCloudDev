import React,{Component} from 'react';

import {connect} from 'react-redux';

import { Modal,Loading,Button } from "../../../../common";

import { DatePicker,ConfigProvider } from  'antd';

import ABTMActions from '../../actions/Manager/AdjustByTimeModalActions';

import zhCN from 'antd/es/locale/zh_CN';

import moment from 'moment';

import 'moment/locale/zh-cn';

import date from '../../../images/date.png'

import utils from '../../actions/utils';

moment.locale('zh-cn');



class AdjustByTimeModal extends Component{

    //当学段年级被选中的情况下
    periodChecked(opts) {

        const { dispatch } = this.props;

        dispatch(ABTMActions.periodChecked(opts));

    }

    //当旧的课时被选中的时候

    oldClassHourChecked(opts){

        const { dispatch } = this.props;

        dispatch(ABTMActions.oldClassHourChecked(opts));

    }

    dateDisabled(current){

        const { dispatch } = this.props;

        return dispatch(utils.DateDisabled(current));

    }

    //当新的课时被选中的时候

    newClassHourChecked(opts){

        const { dispatch } = this.props;

        dispatch(ABTMActions.newClassHourChecked(opts));

    }

    //旧的日期发生变化
    oldDateChange(date,dateString){

        const { dispatch } = this.props;

        dispatch(ABTMActions.oldDateUpdate(dateString));

    }

    //新的日期发生变化
    newDateChange(date,dateString){

        const { dispatch } = this.props;

        dispatch(ABTMActions.newDateUpdate(dateString));

    }

    //弹窗点击关闭
    AlertHide(){

        const {dispatch} = this.props;

        dispatch({type:ABTMActions.ADJUST_BY_TIME_HIDE});

    }
    //弹窗点击确定

    AlertOk(){

        const {dispatch} = this.props;

        dispatch(ABTMActions.commitInfo());

    }


    render() {

        const { AdjustByTimeModal } = this.props;

        const {

            periodGrades,

            periodGradesCheckedList,

            oldClassHours,

            newClassHours,

            oldClassHourCheckedList,

            newClassHourCheckedList,

            oldWeekNo,

            oldWeekDay,

            newWeekNo,

            newWeekDay,

            oldDate,

            newDate,

            oldDateLoadingShow,

            newDateLoadingShow

        } = AdjustByTimeModal;



        return (

            <Modal className="adjust-by-time-modal"
                   title="按时间调整课程"
                   type={1}
                   visible={AdjustByTimeModal.show}
                   width={1042}
                   mask={true}
                   cancelText="取消"
                   onCancel={this.AlertHide.bind(this)}
                   footer={[

                            <span key="footer-tips" className="footer-tips">注:调整上课时间后，上课节次的数量与顺序须与调整前一致。</span>,

                            <Button key='agree' color='green' onClick={this.AlertOk.bind(this)}>确定</Button>,

                            <Button key='refuse' color='blue' onClick={this.AlertHide.bind(this)}>取消</Button>

                   ]}>

                <div className="ModalContent">

                    <Loading opacity={false} spinning={AdjustByTimeModal.loadingShow} tip="加载中...">

                        <div className="grade-selected-wrapper clearfix">

                            <div className="grade-selected-title">年级:</div>

                            <div className="grade-selected-container">

                                {

                                    periodGrades.map((item,key) => {

                                        let periodChecked = false;
                                        //变量看看是否全选
                                        periodGradesCheckedList.map((itm) => {

                                           if (itm.id === item.id){

                                            if (itm.checked){

                                                periodChecked = true;

                                            }

                                           }

                                        });

                                        return <div key={key} className="period-item-wrapper clearfix">

                                                    <div className="period">

                                                        <div className={`check-item ${periodChecked?'active':''}`} onClick={this.periodChecked.bind(this,{type:"period",id:item.id})}>

                                                            {item.name}

                                                        </div>

                                                    </div>

                                                {

                                                    item.list.map((i,k) => {

                                                     //判断该选项是否是选中

                                                      let itemChecked = false;

                                                      periodGradesCheckedList.map((itm) => {

                                                          if (itm.id === item.id){

                                                              itm.list.map((it) => {

                                                                  if (it === i.id){

                                                                      itemChecked = true;

                                                                  }

                                                              });

                                                          }

                                                      });

                                                      return <div key={k} className={`check-item ${itemChecked?'active':''}`} onClick={this.periodChecked.bind(this,{type:"item",pid:item.id,id:i.id})}>{i.name}</div>

                                                    })

                                                }

                                                </div>

                                    })

                                }

                            </div>

                        </div>

                        <div className="class-hour-pick-wrapper clearfix">

                            <div className="adjust-old-wrapper">

                                <div className="adjust-old-title">时间:</div>

                                <ConfigProvider locale={zhCN}>


                                    <DatePicker disabledDate={this.dateDisabled.bind(this)} className="date-pick" value={oldDate?moment((oldDate),'YYYY-MM-DD'):null} onChange={this.oldDateChange.bind(this)}></DatePicker>

                                    <Loading spinning={oldDateLoadingShow} type="loading">

                                        {

                                            oldWeekNo?

                                                    <span className="date-picked-time">(第{oldWeekNo}周 {oldWeekDay})</span>

                                                :''

                                        }

                                    </Loading>

                                    <div className="class-hour-wrapper">

                                        {

                                            oldClassHours.map((item,key) => {


                                                let noonChecked = false;


                                                oldClassHourCheckedList.map(itm => {

                                                   if (itm.type === item.type){

                                                       if (itm.checked){

                                                           noonChecked = true;

                                                       }

                                                   }

                                                });


                                                return  <div key={key} className="class-hour-item clearfix">

                                                    <div className="noon">

                                                        <div className={`check-item ${noonChecked?'active':''}`} onClick={this.oldClassHourChecked.bind(this,{type:'noon',id:item.type})}>

                                                            {item.name}

                                                        </div>

                                                    </div>

                                                    {

                                                        item.list.map((i,k) => {

                                                            let itemChecked = false;

                                                            oldClassHourCheckedList.map(it => {

                                                               if (it.type === item.type){

                                                                   if (it.list.includes(i.no)){

                                                                       itemChecked = true;

                                                                   }

                                                               }

                                                            });

                                                            return <div key={k} className={`check-item ${itemChecked?'active':''}`} onClick={this.oldClassHourChecked.bind(this,{type:'item',pid:item.type,id:i.no})}>

                                                                        {i.name}

                                                                    </div>

                                                        })

                                                    }

                                                </div>

                                            })

                                        }

                                    </div>

                                </ConfigProvider>

                            </div>

                            <div className="adjust-new-wrapper">

                                <div className="adjust-new-title">新的时间:</div>

                                <ConfigProvider locale={zhCN}>

                                    <DatePicker disabledDate={this.dateDisabled.bind(this)} className="date-pick" value={newDate?moment((newDate),'YYYY-MM-DD'):null} onChange={this.newDateChange.bind(this)}></DatePicker>

                                    <Loading spinning={newDateLoadingShow} type="loading">

                                        {

                                            newWeekNo?

                                                    <span className="date-picked-time">(第{newWeekNo}周 {newWeekDay})</span>

                                                :''

                                        }

                                    </Loading>

                                    <div className="class-hour-wrapper">

                                        {

                                            newClassHours.map((item,key) => {


                                                let noonChecked = false;


                                                newClassHourCheckedList.map(itm => {

                                                    if (itm.type === item.type){

                                                        if (itm.checked){

                                                            noonChecked = true;

                                                        }

                                                    }

                                                });


                                                return  <div key={key} className="class-hour-item clearfix">

                                                    <div className="noon">

                                                        <div className={`check-item ${noonChecked?'active':''}`} onClick={this.newClassHourChecked.bind(this,{type:'noon',id:item.type})}>

                                                            {item.name}

                                                        </div>

                                                    </div>

                                                    {

                                                        item.list.map((i,k) => {

                                                            let itemChecked = false;

                                                            newClassHourCheckedList.map(it => {

                                                                if (it.type === item.type){

                                                                    if (it.list.includes(i.no)){

                                                                        itemChecked = true;

                                                                    }

                                                                }

                                                            });

                                                            return <div key={k} className={`check-item ${itemChecked?'active':''}`} onClick={this.newClassHourChecked.bind(this,{type:'item',pid:item.type,id:i.no})}>

                                                                        {i.name}

                                                                    </div>

                                                        })

                                                    }

                                                </div>

                                            })

                                        }


                                    </div>

                                </ConfigProvider>

                            </div>

                            <div className="arr-wrapper"></div>

                        </div>

                    </Loading>

                </div>

            </Modal>

        );

    }

}

const mapStateToProps = (state) => {

    const { AdjustByTimeModal } = state.Manager;

    return{

        AdjustByTimeModal

    }

};

export default connect(mapStateToProps)(AdjustByTimeModal);