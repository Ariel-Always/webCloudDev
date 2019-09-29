import React from 'react'
import { connect } from 'react-redux';
import actions from '../actions';
import { postData, getData } from '../../../common/js/fetch'
import '../../scss/ShowCard.scss'
import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import CONFIG from '../../../common/js/config';

class ShowCardTeacher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    //编辑教学班
    onHandleClick = (classID) => {
        console.log(classID)
        const { dispatch, DataState, UIState } = this.props;
        dispatch(actions.UpUIState.ChangeCourseClassModalOpen())
        dispatch(actions.UpDataState.getCourseClassDetailsHandleClassMsg('/CoureClass_studentMsg?courseClassID=' + classID))
    }
    //删除教学班
    onDeleteClick = (classID) => {
        const { dispatch, DataState, UIState } = this.props;
       
        console.log(classID)
        
        dispatch(actions.UpUIState.showErrorAlert({
            type: 'btn-warn',
            title: "您确定删除？",
            ok: this.onAppAlertDeleteOK.bind(this, classID),
            cancel: this.onAppAlertCancel.bind(this),
            close: this.onAppAlertClose.bind(this)
        }));

    }
    //单个删除
    onAppAlertDeleteOK = (id) => {
        const { dispatch, DataState, UIState } = this.props;
        
        let url = '/DeleteSubject';
        dispatch(actions.UpUIState.hideErrorAlert());
        postData(CONFIG.proxy + url, {
            courseClassID: id
        }).then(res => {
            return res.json()
        }).then(json => {
            if (json.Status === 400) {
                console.log('错误码：' + json.Status)
            } else if (json.Status === 200) {
                dispatch(actions.UpUIState.showErrorAlert({
                    type: 'success',
                    title: "成功",
                    onHide: this.onAlertWarnHide.bind(this)
                }));
            dispatch(actions.UpDataState.getTeacherCourseClassMsg('/GetCourseClassByUserID?schoolID=S0003&teacherID=T0001'));
               
            }
        })
    }
    //通用提示弹窗
    onAppAlertOK() {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());

    }
    onAppAlertCancel() {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }
    onAppAlertClose() {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }
    //查看教学班
    onCheckClick = (classID) => {
        console.log(classID)
        const { dispatch, DataState, UIState } = this.props;
        dispatch(actions.UpUIState.CourseClassDetailsModalOpen())
        dispatch(actions.UpDataState.getCourseClassDetailsMsg('/CoureClass_studentMsg?schoolID=sss'))
    }
    render() {
        let To = '';
        To = '/Teacher/' + this.props.params.CourseClassID;
        return (
            <div className='ShowCard-box-Teacher '>

                <div className='box-3'></div>
                <div className='box-2'></div>

                <div className='box-main'>
                    <div className='main-content'>
                        <p className='content-tips'>{this.props.params.CourseClassName}</p>
                        <hr className='content-hr' />
                        <div className='content-details'>
                            <div className='details-row clearfix'>
                                <span className='left'>学科：</span>
                                <span className='right subjectName'>{this.props.params.SubjectName}</span>
                            </div>
                            <div className='details-row clearfix'>
                                <span className='left'>学生数量：</span>
                                <span className='right'>{this.props.params.StudentCount}人<span onClick={this.onCheckClick.bind(this, this.props.params.CourseClassID)} className='checkStudent' >查看学生名单</span></span>
                            </div>

                        </div>

                    </div>
                    <div className='handle-content'>
                        <span onClick={this.onHandleClick.bind(this, this.props.params.CourseClassID)} className='left'><i className='resetName'></i><span>编辑</span></span>
                        <span onClick={this.onDeleteClick.bind(this, this.props.params.CourseClassID)} className='right'><i className='Delete'></i><span>删除</span></span>
                        <span className='divide'></span>
                    </div>
                </div>
            </div>

        )
    }
}
const mapStateToProps = (state) => {
    let { UIState, DataState } = state;
    return {
        UIState,
        DataState
    }
};
export default connect(mapStateToProps)(ShowCardTeacher);