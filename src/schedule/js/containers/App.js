import React,{Component} from 'react';
import {Frame,Loading,Alert} from "../../../common";
import { connect } from 'react-redux';
import {HashRouter as Router,Route,Switch,withRouter,Redirect} from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import ManagerComponent from './Manager';
import TeacherComponent from './Teacher';
import StudentComponent from './Student';
import AdjustBtnsWrapper from '../component/Manager/AdjustBtnsWrapper';
import AdjustScheduleModal from './Manager/AdjustScheduleModal';
import ModuleCommonActions from '../actions/ModuleCommonActions';
import PeriodWeekTermActions from '../actions/PeriodWeekTermActions';
import AdjustBtnsActions from '../actions/Manager/AdjustBtnsActions';
import ASMAction from  '../actions/Manager/AddScheduleModalActions';



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
    adjustScheduleModalShow(){

        const {dispatch} = this.props;

        dispatch({type:ASMAction.ADD_SCHEDULE_MODAL_SHOW});

    }


    componentDidMount(){

        addEventListener('click',this.clickOthers.bind(this));

    }


    render() {

        const {state} = this.props;

        const { LoginUser,AppLoading,ModuleSetting,Manager,PeriodWeekTerm  } = state;

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

                                            adjustScheduleModalShow={this.adjustScheduleModalShow.bind(this)}></AdjustBtnsWrapper>

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

               <AdjustScheduleModal></AdjustScheduleModal>

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