import React from 'react'
import { connect } from 'react-redux';
import actions from '../actions';
import '../../scss/HandleCourseClass.scss'
import { postData, getData } from '../../../common/js/fetch'
import { Scrollbars } from 'react-custom-scrollbars'

import history from '../containers/history'
import { Input, } from 'antd'
import CONFIG from '../../../common/js/config';
import { Modal, Loading, DropDown, Table, Button, PagiNation, CheckBox, CheckBoxGroup } from "../../../common";
import SelectTeacher from './SelectTeacher';
import SelectStudent from './SelectStudent';


class AddCourseClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableSource: [],
            courseClassName: '',
            TeacherName: '',
            Subject: { value: 0, title: '请选择学科' },
            Grade: { value: 0, title: '请选择年级' },
            SubjectSelect:{ value: 0, title: '请选择学科' },
            GradeSelect:{ value: 0, title: '请选择年级' }
        }
    }

    componentWillReceiveProps(nextProps) {
        const { DataState, UIState } = nextProps;
        let data = nextProps.DataState.GetCourseClassDetailsHandleClassMsg
        this.setState({
            courseClassName: data.selectData ? data.selectData.CourseClass.CourseClassName : '',
            TeacherName: data.selectData ? data.selectData.Teacher.TeacherName : '',
            tableSource: data.selectData ? data.selectData.Student : []
        })
    }
    //数据绑定
    onCourseClassNameChange = (e) => {
        const { DataState, UIState, dispatch } = this.props;
        let { CourseClassName, ...data } = DataState.GetCourseClassDetailsHandleClassMsg.selectData.CourseClass
        console.log(this.state.courseClassName, e.target.value)
        dispatch(actions.UpDataState.setCourseClassName({ CourseClassName: e.target.value, ...data }))
        // this.setState({
        //     courseClassName: e.target.value,
        // })
    }

    //学科选择
    onSelectSubjectChange = (value) => {
        console.log(value)
    }
    //年级选择
    onSelectGradeChange = (value) => {
        console.log(value)
    }
    //选择教师
    onTeacherSelectClick = () => {
        const { DataState, UIState, dispatch } = this.props;
        dispatch(actions.UpUIState.AddTeacherModalOpen())
        dispatch(actions.UpDataState.getSubjectTeacherMsg('/AdmSubjectTeacher'))
    }
    //选择教师模态框
    AddTeacherModalOk = () => {
        const { DataState, UIState, dispatch } = this.props;
        let teacher = DataState.GetCourseClassDetailsHandleClassMsg.transfer.Teacher;
        dispatch(actions.UpDataState.setSubjectTeacherMsg(teacher))
        dispatch(actions.UpUIState.AddTeacherModalClose())
    }
    AddTeacherModalCancel = () => {
        const { DataState, UIState, dispatch } = this.props;
        let teacher = DataState.GetCourseClassDetailsHandleClassMsg.selectData.Teacher;

        //dispatch(actions.UpDataState.setSubjectTeacherMsg({}))

        dispatch(actions.UpUIState.AddTeacherModalClose())
    }
    //选择学生
    //选择教师模态框
    AddStudentModalOk = () => {
        const { DataState, UIState, dispatch } = this.props;
        let Student = DataState.GetCourseClassDetailsHandleClassMsg.transfer.Student;
        dispatch(actions.UpDataState.setCourseClassStudentMsg(Student))

        dispatch(actions.UpUIState.AddStudentModalClose())
    }
    AddStudentModalCancel = () => {
        const { DataState, UIState, dispatch } = this.props;

        let oldStudent = DataState.GetCourseClassDetailsHandleClassMsg.selectData.Student;
        dispatch(actions.UpDataState.setClassStudentTransferMsg(oldStudent))
        //dispatch(actions.UpDataState.setSubjectTeacherMsg({}))

        dispatch(actions.UpUIState.AddStudentModalClose())
    }
    //删除学生
    onDeleteStudentClick = (id) => {
        const { DataState, UIState, dispatch } = this.props;

        let data = DataState.GetCourseClassDetailsHandleClassMsg.selectData.Student;
        let newData = data.splice(id, 1);
        this.setState({
            tableSource: data
        })
        console.log(id, newData);
        dispatch(actions.UpDataState.setCourseClassStudentMsg(data))

    }
    //清空
    onDeleteAllClick = () => {
        const { DataState, UIState, dispatch } = this.props;
        this.setState({
            tableSource: []
        })
        dispatch(actions.UpDataState.setCourseClassStudentMsg([]))
    }
    //选择弹窗
    onSelectStudentAllClick = () => {
        const { DataState, UIState, dispatch } = this.props;
        if(this.state.SubjectSelect.value===0)
        return
        if(this.state.GradeSelect.value===0)
        return
        dispatch(actions.UpDataState.getGradeClassMsg('/CourseClass_GradeID'))
        dispatch(actions.UpUIState.AddStudentModalOpen())
    }
    //选择学科
    onSelectSubjectChange = (value) => {
        console.log(value)
        this.setState({
            Subject: value,
            SubjectSelect:value
        })
    }
    //选择年级
    onSelectGradeChange = (value) => {
        const { DataState, UIState, dispatch } = this.props;
        console.log(value)
        this.setState({
            GradeSelect: value,
            SubjectSelect:value
        })
        // if(this.state.Subject.value===0){
        //     dispatch(actions.UpUIState.showErrorAlert({
        //         type: 'btn-error',
        //         title: "您还没有选择学科哦~",
        //         ok: this.onAppAlertOK.bind(this),
        //         cancel: this.onAppAlertCancel.bind(this),
        //         close: this.onAppAlertClose.bind(this)
        //     }));
        // }

    }


    //提示
    onAppAlertOK() {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());

    }
    onAppAlertCancel() {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }
    render() {
        const { DataState, UIState } = this.props;
        let data = DataState.GetCourseClassDetailsHandleClassMsg;
        let Subjects = DataState.GetCoureClassAllMsg.Subjects;
        let SubjectDropList = [{ value: 0, title: '请选择学科' }];
        let GradeDropList = [{ value: 0, title: '请选择年级' }];
        let tableSource = data.TableSource ? data.TableSource : [];
        let teacher = data.selectData ? data.selectData.Teacher.length !== 0 ? data.selectData.Teacher : {} : {};
        for (let index in Subjects) {
            SubjectDropList.push({
                value: index,
                title: Subjects[index].subjectName
            })
            let Grade = [];
            for (let child in Subjects[index]) {
                if (child !== 'subjectName') {
                    
                    Grade.push({
                        value: child,
                        title: Subjects[index][child]
                    })
                    
                }
            }
            GradeDropList[index] = Grade;
           
        }
        console.log(SubjectDropList)
        return (
            <React.Fragment>
                <div id='HandleCourseClass' className='HandleCourseClass'>
                    <div className='row clearfix'>
                        <div className='row-column'>
                            <span className='left'>教学班名称：</span>
                            <span className='right '>
                                <Input placeholder='请输入教学班名称...' style={{ width: 180 + 'px' }} type='text' onChange={this.onCourseClassNameChange.bind(this)} value={this.state.courseClassName} />

                            </span>
                            {/* <span className='right text-style'>{data.CourseClassName}</span> */}
                        </div>
                        <div className='row-column'>
                            <span className='left'>学科：</span>
                            <span className='right '>
                                <DropDown
                                    width={150}
                                    type='simple'
                                    dropList={SubjectDropList}
                                    dropSelectd={this.state.SubjectSelect}
                                    onChange={this.onSelectSubjectChange.bind(this)}
                                ></DropDown>

                            </span>

                        </div>
                    </div>
                    <div className='row clearfix'>
                        <div className='row-column'>
                            <span className='left'>所属年级：</span>
                            <span className='right '>
                                <DropDown
                                    disabled={this.state.Subject.value === 0 ? true : false}
                                    width={180}
                                    type='simple'
                                    dropSelectd={{ value: 0, title: '请选择年级' }}
                                    dropList={this.state.Subject.value === 0?[]:GradeDropList[this.state.Subject.value]}
                                    onChange={this.onSelectGradeChange.bind(this)}
                                ></DropDown>
                            </span>
                        </div>
                        <div className='row-column'>
                            <span className='left'>任课老师：</span>
                            <span className='right'>
                                <Input readOnly unselectable="on" onClick={this.onTeacherSelectClick.bind(this)} className='teacherName selectTeacher' type='text' value={data.selectData ? data.selectData.Teacher.title : ''} style={{ width: 150 + 'px' }} onChange={this.onCourseClassNameChange.bind(this)} />
                                <span onClick={this.onTeacherSelectClick.bind(this)} className='teacher-select'>选择</span>

                            </span>
                        </div>
                    </div>
                    <div className='row clearfix'>
                        <div className=' row-column row-column-2'>
                            <span className='left'>学生名单：</span>
                            <span className='right right-2'>
                                <div className='Student-box'>
                                    <div className='box-top'>
                                        <span className='top-left'>
                                            已选
                                        <span className='count'>{this.state.tableSource.length}</span>
                                            名学生
                                    </span>
                                        <span className='top-right'>
                                            <span onClick={this.onSelectStudentAllClick.bind(this)} className='handle select'>选择</span>
                                            <span onClick={this.onDeleteAllClick.bind(this)} className='handle deleteAll'>清空</span>
                                        </span>
                                    </div>

                                    <Scrollbars
                                        style={{ width: 100 + '%', height: 118 + 'px' }}
                                    >
                                        <div className='box-content'>
                                            {
                                                this.state.tableSource.map((child, index) => {
                                                    return (
                                                        <span className='content-card' key={child.StudentID}>
                                                            {child.StudentName}
                                                            <span className='card-id'>{child.StudentID}</span>
                                                            <span onClick={this.onDeleteStudentClick.bind(this, index)} className='icon-x'>x</span>
                                                        </span>
                                                    )
                                                })
                                            }
                                        </div></Scrollbars>
                                </div>


                            </span>
                        </div>
                    </div>
                </div >
                <Modal
                    ref='SelectTeacherMadal'
                    type='1'
                    width={680}
                    title={'选择教师'}
                    bodyStyle={{ height: 525 + 'px', padding: 0 }}
                    visible={UIState.AddTeacherModalShow.Show}
                    onOk={this.AddTeacherModalOk}
                    onCancel={this.AddTeacherModalCancel}
                >
                    {UIState.AddTeacherModalShow.Show ? (<SelectTeacher></SelectTeacher>) : ''}
                </Modal>
                <Modal
                    ref='SelectStudentMadal'
                    type='1'
                    width={680}
                    title={'选择学生'}
                    bodyStyle={{ height: 477 + 'px', padding: 0 }}
                    visible={UIState.AddStudentModalShow.Show}
                    onOk={this.AddStudentModalOk}
                    onCancel={this.AddStudentModalCancel}
                >
                    {UIState.AddStudentModalShow.Show ? (<SelectStudent></SelectStudent>) : ''}
                </Modal>
            </React.Fragment>
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
export default connect(mapStateToProps)(AddCourseClass);