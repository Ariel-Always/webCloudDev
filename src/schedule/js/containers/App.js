import React,{Component} from 'react';
import {Frame,Loading,Alert} from "../../../common";
import { connect } from 'react-redux';
import {HashRouter as Router,Route,Switch,withRouter,Redirect} from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import ManagerComponent from './Manager';
import TeacherComponent from './Teacher';
import StudentComponent from './Student';
import AdjustBtnsWrapper from '../component/Manager/AdjustBtnsWrapper';
import AddScheduleModal from './Manager/AddScheduleModal';
import AdjustByTimeModal from  './Manager/AdjustByTimeModal'
import ModuleCommonActions from '../actions/ModuleCommonActions';
import PeriodWeekTermActions from '../actions/PeriodWeekTermActions';
import AdjustBtnsActions from '../actions/Manager/AdjustBtnsActions';
import ASMAction from  '../actions/Manager/AddScheduleModalActions';
import ABTMActions from '../actions/Manager/AdjustByTimeModalActions';
import StopScheduleActions from '../actions/Manager/StopScheduleActions'
import DelScheduleActions from '../actions/Manager/DelScheduleActions';
import StopScheduleModal from './Manager/StopScheduleModal';
import DelScheduleModal from './Manager/DelScheduleModal';
import ABTActions from '../actions/Manager/AdjustByTeacherActions';
import AdjustByTeacherModal from './Manager/AdjustByTeacherModal';

import '../../scss/index.scss';





class App extends Component{

    constructor(props) {

        super(props);

        const {dispatch} = props;
        //获取公共的信息
        dispatch(ModuleCommonActions.getCommonInfo());

    }

    periodChange(key) {

        const {dispatch} = this.props;

        dispatch({type:PeriodWeekTermActions.PERIOD_VALUE_CHANGE,key:key});

    }
    //将隐藏的adjustWrapper弹出或隐藏
    adjustBtnsToggle(e){

        const { dispatch,state } = this.props;

        const { AdjustBtns } = state.Manager;

        dispatch({type:AdjustBtnsActions.ADJUST_BTNS_TOGGLE});

    }
    //点击其他地方的时候隐藏弹出的btns
    clickOthers(e){

        const {dispatch} = this.props;

        if ((!document.getElementById('adjust-schedule').contains(e.target))&&(!document.getElementById('adjust-list-wrapper').contains(e.target))){

            dispatch({type:AdjustBtnsActions.ADJUST_BTNS_HIDE});

        }

    }
    //弹出添加临时课程弹窗
    addScheduleModalShow(){

        const {dispatch} = this.props;

        dispatch({type:ASMAction.ADD_SCHEDULE_MODAL_SHOW});

        dispatch(ASMAction.InfoInit());

    }
    //按时间调整弹窗
    adjustByTimeModalShow(){

        const {dispatch} = this.props;

        dispatch({type:ABTMActions.ADJUST_BY_TIME_SHOW});

        dispatch(ABTMActions.InfoInit());

    }

    //停课弹窗
    stopScheduleShow(){

        const {dispatch} = this.props;

        dispatch({type:StopScheduleActions.STOP_SCHEDULE_SHOW});

        dispatch(StopScheduleActions.InfoInit());

    }

    //删除课程弹窗
    delScheduleShow(){

        const {dispatch} = this.props;

        dispatch({type:DelScheduleActions.DEL_SCHEDULE_SHOW});

        dispatch(DelScheduleActions.InfoInit());

    }

    //弹出调整教师弹窗

    adjustByTeacherShow(){

        const { dispatch } = this.props;

        dispatch({type:ABTActions.ADJUST_BY_TEACHER_SHOW});

    }


    componentDidMount(){

        addEventListener('click',this.clickOthers.bind(this));

    }


    render() {

        const {state} = this.props;

        const { LoginUser,AppLoading,ModuleSetting,Manager,PeriodWeekTerm,AppAlert } = state;

        const { AdjustBtns } = Manager;

        return (

           <React.Fragment>

               <DocumentTitle title={ModuleSetting.moduleCnName}>

                   <Loading opacity={false} spinning={AppLoading.show} size="large" tip="加载中...">

                        <Frame
                            module={{
                                cnname:ModuleSetting.moduleCnName,
                                enname:ModuleSetting.moduleEnName,
                                image:ModuleSetting.logo}}
                            userInfo={{
                                name:LoginUser.UserName,
                                image:LoginUser.PhotoPath
                            }}
                            showBarner={ModuleSetting.timeBar}
                        >

                            <div ref="frame-time-barner">

                                <div className="schedule-period-tab clearfix">

                                    {

                                        (PeriodWeekTerm.ItemPeriod&&PeriodWeekTerm.ItemPeriod.length>1)&&PeriodWeekTerm.ItemPeriod.map((item,key) => {

                                            return <div key={key} onClick={this.periodChange.bind(this,key)} className={`schedule-period-item ${PeriodWeekTerm.defaultPeriodIndex===key?'active':''}`}>

                                                        {item.PeriodName}

                                                    </div>

                                        })

                                    }

                                </div>

                                {

                                    LoginUser.UserType === 0?

                                        <AdjustBtnsWrapper

                                            adjustBtnsToggle={this.adjustBtnsToggle.bind(this)}

                                            adjustBtns={AdjustBtns}

                                            addScheduleModalShow={this.addScheduleModalShow.bind(this)}

                                            adjustByTimeModalShow = {this.adjustByTimeModalShow.bind(this)}

                                            stopScheduleShow={this.stopScheduleShow.bind(this)}

                                            delScheduleShow = {this.delScheduleShow.bind(this)}

                                            adjustByTeacherShow = {this.adjustByTeacherShow.bind(this)}>

                                        </AdjustBtnsWrapper>

                                        :''

                                }

                            </div>

                            <div ref="frame-right-content">

                                <Router>

                                    <Switch>

                                        <Route path="/manager/*"  component={ManagerComponent}></Route>

                                        <Route path="/teacher/*"  component={TeacherComponent}></Route>

                                        <Route path="/student/*"  component={StudentComponent}></Route>

                                        {

                                            LoginUser&&LoginUser.UserType===0?

                                            <Redirect path="/*"  to={{pathname:"/manager/subject-teacher/subject"}}></Redirect>

                                            :''

                                        }

                                        {

                                            LoginUser&&LoginUser.UserType===1?

                                                <Redirect path="/*" to={{pathname:"/teacher/subject-teacher/subject"}}></Redirect>

                                                :''

                                        }

                                        {

                                            LoginUser&&LoginUser.UserType===1?

                                                <Redirect path="/" to={{pathname:"/student/my"}}></Redirect>

                                                :''

                                        }
                                    </Switch>

                                </Router>

                            </div>

                        </Frame>

                   </Loading>

               </DocumentTitle>

               <AddScheduleModal></AddScheduleModal>

               <AdjustByTimeModal></AdjustByTimeModal>

               <StopScheduleModal></StopScheduleModal>

               <DelScheduleModal></DelScheduleModal>

               <AdjustByTeacherModal></AdjustByTeacherModal>

               <Alert type={AppAlert.type}
                      title={AppAlert.title}
                      abstract={AppAlert.abstract}
                      show={AppAlert.show}
                      onClose={AppAlert.close}
                      onCancel={AppAlert.cancel}
                      onOk={AppAlert.ok}
                      onHide={AppAlert.hide}
                      okTitle={AppAlert.okTitle}
                      cancelTitle={AppAlert.cancelTitle}>

               </Alert>

           </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {

  return{
      state
  }

};

export default connect(mapStateToProps)(App);