import React,{Component} from 'react';

import SSActions from '../../actions/Manager/ScheduleSettingActions';

import AppAlertActions from '../../actions/AppAlertActions';

import PeriodClassHourSetting from '../../component/Manager/PeriodClassHourSetting';

import $ from 'jquery';

import { connect } from 'react-redux';


class ScheduleSetting extends Component{

    constructor(props){

        super(props);

        const { dispatch } = props;

         if (sessionStorage.getItem('UserInfo')){

             let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));

             const { SchoolID } = UserInfo;

             dispatch(SSActions.PageInit({SchoolID}));

         }else{

             const WaiteUserInfo = setInterval(()=>{

                 let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));

                 const { SchoolID } = UserInfo;

                 dispatch(SSActions.PageInit({SchoolID}));

                 clearInterval(WaiteUserInfo);

             },20)

         }

    }

    componentDidMount(){

        //改变样式
        $('.frame-content-rightside').css({

            'border-radius':'12px',

            'margin-top':"0",

            "border-top":"0"

        });

    }


    //切换课表设置的方式
    SettingTypeChange(opts){

        const { dispatch } = this.props;

        dispatch(AppAlertActions.alertQuery({title:"您确定要切换设置方式吗？",abstract:<div className="schedule-setting-type-tips">切换设置方式将会把您之前所设置的课时所删除！</div>,ok:()=>this.SettingTypeSitch.bind(this,opts)}));

    }


    SettingTypeSitch(opts){

        const { dispatch } = this.props;

        dispatch(SSActions.SettingTypeSitch(opts));

    }


    render(){

        const { ScheduleSetting } = this.props;

        const {

            SettingType,

            MultiplePeriod,

            SettingByPeriod,

            SettingByUnify

        } = ScheduleSetting;

        return <div className="schedule-setting-wrapper">

            <div className="title-bar">

                <div className="title-bar-name">节次及上课时间设置</div>

            </div>

            <div className="setting-content-wrapper">

                <div className="setting-type-wrapper">

                    <span className="setting-type-title">选择设置方式:</span>

                    <div className="setting-type-switch clearfix">

                        <div className={`setting-type-tab left ${SettingType===1?'active':''}`} onClick={this.SettingTypeChange.bind(this,{type:1})}>分学段设置</div>

                        <div className={`setting-type-tab right ${SettingType===0?'active':''}`} onClick={this.SettingTypeChange.bind(this,{type:0})}>统一设置</div>

                    </div>

                </div>

                {

                    SettingType===0?

                        <PeriodClassHourSetting

                            HasPeriod={false}

                            ClassHourList={SettingByUnify.ClassHourList}

                        >

                    </PeriodClassHourSetting>

                        :''

                }

                {

                    SettingType===1?

                        SettingByPeriod.map((item,key)=>{

                            return <PeriodClassHourSetting key={key}

                                                           HasPeriod={true}

                                                           PeriodID={item.PeriodID}

                                                           PeriodName={item.PeriodName}
                            >



                            </PeriodClassHourSetting>

                        })

                        :''

                }


            </div>



        </div>

    }

}

const  mapStateToProps = (state) => {

    let { Manager } = state;

    let { ScheduleSetting } = Manager;

    return {

        ScheduleSetting

    }

};

export default connect(mapStateToProps)(ScheduleSetting);