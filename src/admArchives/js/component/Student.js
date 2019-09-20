import React from 'react'
import { connect } from 'react-redux';
import { DetailsModal,DropDown, PagiNation, Search, Table, Button, CheckBox, CheckBoxGroup, Modal } from '../../../common/index'
//import '../../../common/scss/_left_menu.scss'
import {  Link, } from 'react-router-dom';
import '../../scss/Student.scss'

import history from '../containers/history'
import EditModal from './EditModal'
import IconLocation from '../../images/icon-location.png'
import actions from '../actions';
import StudentChangeRecord from './StudentChangeRecord'
class Student extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //GradeArr:[{value:0,title:'全部年级'}]
            secondDropList: [{ value: 0, title: '全部班级' }],
            DropMenuShow: false,
            selectedRowKeys: [],
            columns: [
                {
                    title: '',
                    dataIndex: 'key',
                    key: 'key',
                    width:68,
                    align:'center',
                    render: key => {
                        return (
                            <div className='registerTime-content'>
                                <CheckBox value={key} onChange={this.onCheckChange}></CheckBox>
                                <span className='key-content'>{key+1 >= 10 ? key+1 : '0' + (key+1)}</span>
                            </div>
                        )
                    }
                }, 
                {
                    title: '',
                    align:'right',
                    key: 'UserImg',
                    width: 50,
                    dataIndex: 'UserName',
                    render: arr => {
                        return (
                            <div className='name-content'>        
                                <img alt={arr.UserName} onClick={this.onUserNameClick} className='name-img' width='47' height='47' src={arr.PhotoPath}></img>
                            </div>
                        )
                    }

                },
                {
                    title: '姓名',
                    align:'left',
                    width:50,
                    key: 'UserName',
                    dataIndex: 'UserName',
                    sorter: (a, b) => a.name.length - b.name.length,
                    render: arr => {
                        return (
                            <div className='name-content'>
                                <span className='name-UserName' onClick={this.onUserNameClick}>{arr.UserName}</span>
                            </div>
                        )
                    }

                },
                {
                    title: '学号',
                    align:'center',
                    width:130,
                    dataIndex: 'UserID',
                    key: 'UserID',
                    sorter: (a, b) => a.age - b.age,
                    render: UserID => {
                        return (
                            <span className='UserID'>{UserID}</span>
                        )
                    }
                },
                {
                    title: '性别',
                    align:'center',
                    width:100,
                    dataIndex: 'Gender',
                    key: 'Gender',
                    render: Gender => {
                        return (
                            <span className='Gender'>{Gender}</span>
                        )
                    }
                },
                {
                    title: '年级',
                    align:'center',
                    key: 'GradeName',
                    width:100,
                    dataIndex: 'GradeName',
                    render: GradeName => {
                        return (
                            <span className='GradeName'>{GradeName}</span>
                        )
                    }
                },
                {
                    title: '班级',
                    align:'center',
                    width:100,
                    key: 'ClassName',
                    dataIndex: 'ClassName',
                    render: ClassName => {
                        return (
                            <span className='ClassName'>{ClassName}</span>
                        )
                    }
                },
                {
                    title: '操作',
                    align:'center',
                    key: 'handle',
                    width:200,
                    dataIndex: 'key',
                    render: (key) => {

                        return (
                            <div className='handle-content'>
                                <Button color='blue' type='default' onClick={this.StudentChange.bind(this, key)} className='handle-btn'>查看变记录</Button>
                                <Button color='blue' type='default' onClick={this.StudentEdit.bind(this, key)} className='handle-btn'>编辑</Button>
                            </div>
                        )
                    }
                }
            ],
            data: [{
                key: 1,
                UserName: { key: '01', PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg', UserName: '祝泽森' },
                UserID: 'S00001',
                Grader: '男',
                GradeName: '一年级',
                ClassName: '一年1班',
                Others: {}
            }],
            pagination: { total: 50 },
            loading: false,
            selectedAll: false,
            checkedList: [],
            checkAll: false,
            studentModalVisible: false,
            userKey: 0,
            StudentChangeKey: 0,
            StudentChangeMadalVisible: false,
            alertShow: false,
            alertTitle: '提示信息',
            alertQueryShow: false,
            alertQueryTitle: '查询提示~',
            StudentDetailsMsgModalVisible:false,
            addStudentModalVisible:false

        }
    }
    componentWillReceiveProps() {
        let Grades = this.props.DataState.GradeClassMsg.Grades ? this.props.DataState.GradeClassMsg.Grades : [];
        let len = Grades.lenght;
        console.log(Grades)
        let GradeArr = [{ value: 0, title: '全部年级' }];

        for (let i = 0; i < len; i++) {
            let Grade = { value: Grades[i].GradeID, title: Grades[i].GradeName }
            GradeArr.push(Grade)
        }

        this.setState({
            GradeArr: GradeArr
        })

    }
    componentWillMount(){
        
       
    }

    StudentDropMenu = (e) => {
        const { dispatch } = this.props;

        let Classes = [{ value: 0, title: '全部班级' }];

        //console.log(this.refs.dropMenuSecond)
        if (e.value !== 0) {
            let ClassArr = this.props.DataState.GradeClassMsg.returnData.AllClasses[e.value];
            ClassArr.map((Class) => {
                Classes.push(Class);
            })
            //Classes.push(this.props.DataState.GradeClassMsg.returnData.AllClasses[e.value]);
            //this.refs.dropMenuSecond.state.dropList = Classes;]
            this.setState({
                secondDropList: Classes,
            })
            dispatch(actions.UpDataState.getGradeStudentPreview('/ArchivesStudent?SchoolID=schoolID&GradeID=gradeID&ClassID=ClassID&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC'));
            this.setState({
                DropMenuShow: true
            })
        } else {
            dispatch(actions.UpDataState.getGradeStudentPreview('/ArchivesStudent?SchoolID=schoolID&GradeID=gradeID&ClassID=ClassID&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC'));
            this.setState({
                DropMenuShow: false
            })
        }

    }

    StudentDropMenuSecond = (e) => {
        console.log(e);
        dispatch(actions.UpDataState.getGradeStudentPreview('/ArchivesStudent?SchoolID=schoolID&GradeID=gradeID&ClassID=ClassID&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC'));
    }

    StudentSearch = (e) => {
        console.log(e)
    }

    onSelectChange = (e) => {
        console.log(e)
        //this.setState({ selectedRowKeys });
    }

    StudentEdit = (e, key) => {
        console.log(e, key)
        this.setState({
            studentModalVisible: true,
            userKey: e
        })
    }

    StudentChange = (e, key) => {
        console.log(e, key)
        this.setState({
            StudentChangeMadalVisible: true,
            StudentChangeKey: key
        })
    }

    onMouseEnterName = () => {

    }
    OnCheckAllChange = (e) => {
        console.log(e)
        if (e.target.checked) {
            this.setState({
                checkedList: this.props.DataState.GradeStudentPreview.keyList,
                checkAll: e.target.checked
            })
        } else {
            this.setState({
                checkedList: [],
                checkAll: e.target.checked
            })
        }
    }
    onCheckBoxGroupChange = (checkedList) => {
        console.log(checkedList)
        this.setState({
            checkedList,
            checkAll: checkedList === this.props.DataState.GradeStudentPreview.keyList ? true : false
        })
    }
    handleStudentModalOk = (e) => {
        console.log(e)
        this.setState({
            studentModalVisible: false
        })
    }
    handleStudentModalCancel = (e) => {
        console.log(e)
        this.setState({
            studentModalVisible: false
        })
    }
    StudentChangeMadalOk = (e) => {
        console.log(e)
        this.setState({
            StudentChangeMadalVisible: false
        })
    }
    StudentChangeMadalCancel = (e) => {
        console.log(e)
        this.setState({
            StudentChangeMadalVisible: false
        })
    }

    onDeleteAllClick = () => {
        const { dispatch } = this.props;
        console.log(this.state.checkedList)
        if (this.state.checkedList.length === 0) {

            dispatch(actions.UpUIState.showErrorAlert({
                type: 'btn-warn',
                title: "你还没有选择哦~",
                ok: this.onAlertWarnOk.bind(this),
                cancel: this.onAlertWarnClose.bind(this),
                close: this.onAlertWarnClose.bind(this)
            }));

        } else {

            dispatch(actions.UpUIState.showErrorAlert({
                type: 'btn-query',
                title: "确定删除？",
                ok: this.onAlertQueryOk.bind(this),
                cancel: this.onAlertQueryClose.bind(this),
                close: this.onAlertQueryClose.bind(this)
            }));
        }
    }
    onAlertWarnClose = () => {
        const {dispatch} = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }
    onAlertWarnOk = () => {
        const {dispatch} = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }
    onAlertQueryClose = () => {
        const {dispatch} = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }
    onAlertQueryOk = () => {
        const {dispatch} = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }
    onPagiNationChange = (e) => {
        console.log(e)
    }
    onUserNameClick = () => {
        this.setState({
            StudentDetailsMsgModalVisible: true,
            
        })
    }
    StudentDetailsMsgModalOk = () => {
        this.setState({
            StudentDetailsMsgModalVisible: false,
            
        })
    }
    StudentDetailsMsgModalCancel = () => {
        this.setState({
            StudentDetailsMsgModalVisible: false,
            
        })
    }
    onAddStudent = (e, ) => {
        console.log(e)
        this.setState({
            addStudentModalVisible: true,
            userKey: 'add'
        })
    }
    handleAddStudentModalOk = (e) => {
        console.log(e)
        this.setState({
            addStudentModalVisible: false
        })
    }
    handleAddStudentModalCancel = (e) => {
        console.log(e)
        this.setState({
            addStudentModalVisible: false
        })
    }
    render() {
        const { UIState, DataState } = this.props;
        const data = {
            userName:'康欣',
            userImg:'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg',
            Gende:'男',
            userText:'学如逆水行舟，不进则退',
            userID:'20170025444',
            userGrade:'一年级',
            userClass:'1班',
            userIDCard:'',
            userPhone:'15626248624',
            userMail:'1519406168@qq.com',
            userAddress:'蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团'
        };
        return (
            <div className='Student'>
                <div className='Student-box'>
                    <div className='Student-top'>
                        <span className='top-tips'>
                            <span className='tips menu39 '>学生档案管理</span>
                        </span>
                        <div className='top-nav'>
                            <Link className='link'  to='/GraduteArchives' replace>查看毕业生档案</Link>
                            <span className='divide'>|</span>
                            <Link className='link' target='_blank' to='/RegisterExamine' replace>学生注册审核</Link>
                            <span className='divide'>|</span>
                            <span className='link' style={{cursor:'pointer'}}  onClick={this.onAddStudent}>添加学生</span>
                            <span className='divide'>|</span>
                            <Link className='link' to='/ImportStudent' replace>导入学生</Link>
                        </div>
                    </div>
                    <hr className='Student-hr' />
                    <div className='Student-content'>
                        <div className='content-top'>
                            <DropDown
                                ref='dropMenuFirst'
                                onChange={this.StudentDropMenu}
                                width={120}
                                height={72}

                                dropSelectd={{ value: 0, title: '全部年级' }}
                                dropList={DataState.GradeClassMsg.returnData ? DataState.GradeClassMsg.returnData.grades : [{ value: 0, title: '全部年级' }]}
                            ></DropDown>
                            <DropDown
                                ref='dropMenuSecond'
                                width={120}
                                height={72}

                                style={{ display: this.state.DropMenuShow ? 'block' : 'none' }}
                                dropSelectd={{ value: 0, title: '全部班级' }}
                                dropList={this.state.secondDropList}
                                onChange={this.StudentDropMenuSecond}
                            ></DropDown>
                            <Search placeHolder='搜索'
                                onClickSearch={this.StudentSearch}
                                height={30}
                            ></Search>
                        </div>
                        <div className='content-render'>
                            <div>
                                <CheckBoxGroup style={{ width: '100%' }} value={this.state.checkedList} onChange={this.onCheckBoxGroupChange.bind(this)}>
                                    <Table
                                        className='table'
                                        columns={this.state.columns}
                                        pagination={false}
                                        loading={this.state.loading}
                                        dataSource={DataState.GradeStudentPreview.newList} >

                                    </Table>
                                </CheckBoxGroup>
                                <CheckBox className='checkAll-box' onChange={this.OnCheckAllChange} checked={this.state.checkAll}>
                                    全选
                                    <Button onClick={this.onDeleteAllClick} className='deleteAll' color='blue'>删除</Button>
                                </CheckBox>
                                <div className='pagination-box'>
                                    <PagiNation 
                                    showQuickJumper  
                                    total={DataState.GradeStudentPreview.Total} 
                                    onChange={this.onPagiNationChange}
                                    ></PagiNation>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 模态框 */}
                <Modal
                    ref='handleStudentMadal'
                    bodyStyle={{ padding: 0 }}
                    type='1'
                    title='编辑学生'
                    visible={this.state.studentModalVisible}
                    onOk={this.handleStudentModalOk}
                    onCancel={this.handleStudentModalCancel}
                    
                >
                    <EditModal userKey={this.state.userKey}></EditModal>
                </Modal>
                <Modal
                    ref='StudentChangeMadal'
                    bodyStyle={{ padding: 0 }}
                    type='2'
                    width={650}
                    visible={this.state.StudentChangeMadalVisible}
                    onOk={this.StudentChangeMadalOk}
                    onCancel={this.StudentChangeMadalCancel}
                >
                    <div className='modal-studentChange'>
                        <div className='content-top'>
                            <img src={IconLocation} width='30' height='40' alt='icon-location' />
                            <span className='top-text'>毛峰的档案变更记录</span>
                        </div>
                        <div className='content'>
                            <StudentChangeRecord data={''}></StudentChangeRecord>
                        </div>
                    </div>
                </Modal>
                <Modal
                    ref='handleTeacherMadal'
                    bodyStyle={{ padding: 0 }}
                    type='1'
                    title={'添加学生'}
                    visible={this.state.addStudentModalVisible}
                    onOk={this.handleAddStudentModalOk}
                    onCancel={this.handleAddStudentModalCancel}
                >
                    <EditModal type='student' userKey={this.state.userKey}></EditModal>
                </Modal>
                <DetailsModal
                    ref='StudentDetailsMsgModal'
                    visible={this.state.StudentDetailsMsgModalVisible}
                    onOk={this.StudentDetailsMsgModalOk}
                    onCancel={this.StudentDetailsMsgModalCancel}
                    data={data}
                    type='student'
                >
                    <div className='modal-top'>

                    </div>
                    <div className='modal-content'></div>
                </DetailsModal>
                {/* 提示框 */}

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
export default connect(mapStateToProps)(Student)