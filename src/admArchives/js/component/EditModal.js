import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import '../../scss/EditModal.scss'
import { Input } from 'antd'
import actions from '../actions';

import { Radio, RadioGroup, DropDown, CheckBox, CheckBoxGroup, Tips } from '../../../common/index'


class EditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Gende: '',
            UserName: '',
            UserKey: props.userKey,
            type: props.type,
            UserIDTipsVisible: false,
            UserIDTipsTitle: '由1-24位字母与数字组成',
            UserNameTipsVisible: false,
            UserNameTipsTitle: '姓名由1-20位的汉字、字母、数字、下划线、空格组成（首尾不允许空格）',
            GradeTipsVisible: false,
            GradeTipsTitle: '请选择年级',
            TitleTipsVisible: false,
            TitleTipsTitle: '请选择职称',
            ClassTipsVisible: false,
            ClassTipsTitle: '请选择班级',
            TelephoneTipsVisible: false,
            TelephoneTipsTitle: '电话由数字及-/组成',
            EmailTipsVisible: false,
            EmailTipsTitle: '邮箱格式错误',
            IDCardNoTipsVisible: false,
            IDCardNoTipsTitle: '身份证格式错误',
            HomeAdressTipsVisible: false,
            HomeAdressTipsTitle: '家庭住址格式错误',
            GenderTipsVisible: false,
            GenderTipsTitle: '请选择性别',
            Grades: [],
            Classes: [],
            TeacherTitle: [],
            changeSubjectTipsTitle: '请选择班级学科',
            changeSubjectVisible: false,
            TitleIDTipsTitle: '请选择职称',
            TitleIDVisible: false,
            PositionTipsTitle:'请选择行政职称'

        }
    }
    componentWillMount() {
        const { DataState, dispatch } = this.props;
        let UserKey = this.state.UserKey;
        console.log(this.state.UserKey)
        if (this.state.type === 'student') {
            let Grades = DataState.GradeClassMsg.returnData.NewGrade ? DataState.GradeClassMsg.returnData.NewGrade : [];
            let len = Grades.lenght;
            let Classes = [];
            let Select = DataState.GradeStudentPreview.newList[UserKey];
            let GradeArr = [];

            // for (let i = 0; i < len; i++) {
            //     let Grade = { value: Grades[i].GradeID, title: Grades[i].GradeName }
            //     GradeArr.push(Grade)
            // }

            let ClassArr = [];
            let StudentChangeMsg = {}
            if (UserKey !== 'add') {
                ClassArr = DataState.GradeClassMsg.returnData.AllClasses[Select.child.GradeID];

                // for (let child in ClassArr) {
                //     Classes.push(ClassArr[child]);
                // }
                StudentChangeMsg = {
                    userID: Select.child.UserID,
                    userName: Select.child.UserName,
                    gender: Select.child.Gender,
                    gradeID: Select.child.GradeID,
                    classID: Select.child.ClassID,
                    // photoPath: Select.child.PhotoPath,
                    photoPath: Select.child.PhotoPath || Select.child.PhotoPath_Nocache,
                    IDCardNo: Select.child.IDCardNo,
                    email: Select.child.Email,
                    telephone: Select.child.Telephone,
                    homeAddress: Select.child.HomeAddress
                }
            } else {

                StudentChangeMsg = {
                    userID: '',
                    userName: '',
                    gender: '',
                    classID: '',
                    gradeID: '',
                    photoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg',
                    // photoPath: '',
                    IDCardNo: '',
                    email: '',
                    telephone: '',
                    homeAddress: ''
                }
            }
            //改变reduce学生中转数据
            dispatch(actions.UpDataState.setInitStudentMsg(StudentChangeMsg))
            this.setState({
                Grades: Grades,
                Classes: ClassArr,
                defaultUserName: this.state.UserKey === 'add' ? '' : DataState.GradeStudentPreview.newList ? DataState.GradeStudentPreview.newList[this.state.UserKey].UserName.UserName : '',
                GendeChange: this.state.UserKey === 'add' ? {
                    value: 0,
                    title: '请选择性别'
                } : {
                        value: Select.child.Gender === '男' ? 1 : 0,
                        title: Select.child.Gender
                    },
                GradeChange: this.state.UserKey === 'add' ? {
                    value: 0,
                    title: '请选择年级'
                } : {
                        value: Select.child.GradeID,
                        title: Select.child.GradeName
                    },
                ClassChange: this.state.UserKey === 'add' ? {
                    value: 0,
                    title: '请选择班级'
                } : {
                        value: Select.child.ClassID,
                        title: Select.child.ClassName
                    },
                UserIDChange: this.state.UserKey === 'add' ? '' : Select.child.UserID,
                IDCardChange: this.state.UserKey === 'add' ? '' : Select.child.IDCardNo,
                PhoneChange: this.state.UserKey === 'add' ? '' : Select.child.Telephone,
                MailChange: this.state.UserKey === 'add' ? '' : Select.child.Email,
                AddressChange: this.state.UserKey === 'add' ? '' : Select.child.HomeAddress
            })
        } else if (this.state.type === 'teacher') {
            let Select = DataState.SubjectTeacherPreview.newList[UserKey];
            let SubjectListChange = DataState.SubjectTeacherMsg.returnData.SubjectListChange;
            let TeacherChangeMsg = {};
            let plainOptions = SubjectListChange.map((child, index) => {
                return child.SubjectID;
            })

            let TeacherTitle = DataState.TeacherTitleMsg.returnData;
            if (UserKey !== 'add') {
                //ClassArr = DataState.GradeClassMsg.returnData.AllClasses[Select.child.GradeID];

                // for (let child in ClassArr) {
                //     Classes.push(ClassArr[child]);
                // }
                TeacherChangeMsg = {
                    userID: Select.child.UserID,
                    userName: Select.child.UserName,
                    gender: Select.child.Gender,
                    titleID: Select.child.TitleID,
                    subjectIDs: Select.child.SubjectIDs,
                    // photoPath: Select.child.PhotoPath,
                    photoPath: Select.child.PhotoPath || Select.child.PhotoPath_Nocache,
                    IDCardNo: Select.child.IDCardNo,
                    email: Select.child.Email,
                    telephone: Select.child.Telephone,
                    homeAddress: Select.child.HomeAddress
                }
            } else {

                TeacherChangeMsg = {
                    userID: '',
                    userName: '',
                    gender: '',
                    titleID: '',
                    subjectIDs: '',
                    photoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg',
                    // photoPath: '',
                    IDCardNo: '',
                    email: '',
                    telephone: '',
                    homeAddress: ''
                }
            }
            //改变reduce教师中转数据
            dispatch(actions.UpDataState.setInitTeacherMsg(TeacherChangeMsg))
            this.setState({
                TeacherTitle: TeacherTitle,
                defaultUserName: this.state.UserKey === 'add' ? '' : DataState.SubjectTeacherPreview.newList ? DataState.SubjectTeacherPreview.newList[this.state.UserKey].UserName.UserName : '',
                GendeChange: this.state.UserKey === 'add' ? {
                    value: 0,
                    title: '请选择性别'
                } : {
                        value: Select.child.Gender === '男' ? 1 : 0,
                        title: Select.child.Gender
                    },
                TitleChange: this.state.UserKey === 'add' ? {
                    value: 0,
                    title: '请选择职称'
                } : {
                        value: Select.child.value,
                        title: Select.child.TitleName
                    },
                checkedList: this.state.UserKey === 'add' ? [] : Select.SubjectNames.SubjectArr,
                plainOptions: plainOptions,
                SubjectChange: this.state.UserKey === 'add' ? '' : Select.SubjectNames.SubjectArr,
                IDCardChange: this.state.UserKey === 'add' ? '' : Select.child.IDCardNo,
                PhoneChange: this.state.UserKey === 'add' ? '' : Select.child.Telephone,
                MailChange: this.state.UserKey === 'add' ? '' : Select.child.Email,
                AddressChange: this.state.UserKey === 'add' ? '' : Select.child.HomeAddress,
                UserIDChange: this.state.UserKey === 'add' ? '' : Select.child.UserID,

            })
        } else if (this.state.type === 'leader') {
            let Select = DataState.SchoolLeaderPreview.newList[UserKey];
            //let SubjectListChange = DataState.SubjectTeacherMsg.returnData.SubjectListChange;
            let LeaderChangeMsg = {};
            // let plainOptions = SubjectListChange.map((child, index) => {
            //     return child.SubjectID;
            // })

            let LeaderPosition = [
                { value: 1, title: '校长' },
                { value: 2, title: '副校长' },
                { value: 3, title: '教务主任' },
            ];
            let position = {value:0,title:'请选择行政职务'}
            Select&&LeaderPosition.map((child,index) => {
                if(child.title===Select.child.Position){
                    position = child;
                }
                console.log(child.title,position)

            })
            if (UserKey !== 'add') {
                //ClassArr = DataState.GradeClassMsg.returnData.AllClasses[Select.child.GradeID];

                // for (let child in ClassArr) {
                //     Classes.push(ClassArr[child]);
                // }
                LeaderChangeMsg = {
                    userID: Select.child.UserID,
                    userName: Select.child.UserName,
                    gender: Select.child.Gender,
                    position:position,
                    // photoPath: Select.child.PhotoPath,
                    photoPath: Select.child.PhotoPath || Select.child.PhotoPath_Nocache,
                    IDCardNo: Select.child.IDCardNo,
                    email: Select.child.Email,
                    telephone: Select.child.Telephone,
                    homeAddress: Select.child.HomeAddress
                }
            } else {

                LeaderChangeMsg = {
                    userID: '',
                    userName: '',
                    gender: '',
                    position:'',
                    photoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg',
                    // photoPath: '',
                    IDCardNo: '',
                    email: '',
                    telephone: '',
                    homeAddress: ''
                }
            }
            // console.log(position,Select.child.Position)
            //改变reduce教师中转数据
            dispatch(actions.UpDataState.setInitLeaderMsg(LeaderChangeMsg))
            this.setState({
                defaultUserName: this.state.UserKey === 'add' ? '' : DataState.SchoolLeaderPreview.newList ? DataState.SchoolLeaderPreview.newList[this.state.UserKey].UserName.UserName : '',
                GendeChange: this.state.UserKey === 'add' ? {
                    value: 0,
                    title: '请选择性别'
                } : {
                        value: Select.child.Gender === '男' ? 1 : 0,
                        title: Select.child.Gender
                    },
                LeaderPositionList: LeaderPosition,
                PositionChange: this.state.UserKey === 'add' ? {value:0,title:'请选择行政职务'}: LeaderChangeMsg.position,
                IDCardChange: this.state.UserKey === 'add' ? '' : Select.child.IDCardNo,
                PhoneChange: this.state.UserKey === 'add' ? '' : Select.child.Telephone,
                MailChange: this.state.UserKey === 'add' ? '' : Select.child.Email,
                AddressChange: this.state.UserKey === 'add' ? '' : Select.child.HomeAddress,
                UserIDChange: this.state.UserKey === 'add' ? '' : Select.child.UserID,

            })
        } else {
            this.setState({
                defaultUserName: DataState.GradeStudentPreview.newList ? DataState.GradeStudentPreview.newList[this.state.UserKey].UserName.UserName : '',
                GendeChange: {
                    value: 1,
                    title: '男'
                },
                GradeChange: {
                    value: 2,
                    title: '二年级'
                },
                ClassChange: {
                    value: 2,
                    title: '2班'
                },
                UserIDChange: '',
                IDCardChange: '',
                PhoneChange: '',
                MailChange: '',
                AddressChange: ''
            })
        }

    }

    //id修改
    onEditIDChange = (e) => {
        const { dispatch } = this.props
        this.setState({
            UserIDChange: e.target.value
        })
        //用户ID（工号/学号）检测  
        //长度是1~30位，只能由字母与数字组成。
        console.log(e.target.value)
        let Test = /^([a-zA-Z0-9]{1,24})$/.test(e.target.value)
        if (!Test) {
            dispatch(actions.UpUIState.editModalTipsVisible({
                UserIDTipsVisible: true
            }))
        } else {
            dispatch(actions.UpUIState.editModalTipsVisible({
                UserIDTipsVisible: false
            }))
            if (this.state.type === 'teacher') {
                //改变reduce教师中转数据
                dispatch(actions.UpDataState.setTeacherMsg({ userID: e.target.value }))
            } else if (this.state.type === 'student') {
                //改变reduce学生中转数据
                dispatch(actions.UpDataState.setStudentMsg({ userID: e.target.value }))
            }else if (this.state.type === 'leader') {
                //改变reduce领导中转数据
                dispatch(actions.UpDataState.setLeaderMsg({ userID: e.target.value }))
            }


        }


    }
    onEditNameChange = (e) => {
        const { dispatch } = this.props
        //用户姓名检测
        //用户姓名由1-20位的汉字、字母、数字、下划线组成。
        let value = e.target.value;
        let Test = /^[a-zA-Z0-9_\u4e00-\u9fa5][a-zA-Z0-9_\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_\u4e00-\u9fa5]$|^[a-zA-Z0-9_\u4e00-\u9fa5]{1,50}$/.test(value)

        this.setState({
            defaultUserName: e.target.value
        })

        if (!Test) {
            dispatch(actions.UpUIState.editModalTipsVisible({
                UserNameTipsVisible: true
            }))
        } else {
            dispatch(actions.UpUIState.editModalTipsVisible({
                UserNameTipsVisible: false
            }))
            if (this.state.type === 'teacher') {
                //改变reduce教师中转数据
                dispatch(actions.UpDataState.setTeacherMsg({ userName: value }))
            } else if (this.state.type === 'student') {
                //改变reduce学生中转数据
                dispatch(actions.UpDataState.setStudentMsg({ userName: value }))
            }else if (this.state.type === 'leader') {
                console.log('ddd')
                //改变reduce领导中转数据
                dispatch(actions.UpDataState.setLeaderMsg({ userName: value }))
            }

        }
    }
    //性别
    onEditGendeChange = (e) => {
        const { dispatch } = this.props
        this.setState({
            GendeChange: e
        })
        dispatch(actions.UpUIState.editModalTipsVisible({
            GenderTipsVisible: false
        }))
        if (this.state.type === 'teacher') {
            //改变reduce教师中转数据
            dispatch(actions.UpDataState.setTeacherMsg({ gender: e.title }))
        } else if (this.state.type === 'student') {
            //改变reduce学生中转数据
            dispatch(actions.UpDataState.setStudentMsg({ gender: e.title }))
        }else if (this.state.type === 'leader') {
            //改变reduce领导中转数据
            dispatch(actions.UpDataState.setLeaderMsg({ gender: e.title }))
        }

    }
    //年级
    onEditGradeChange = (e) => {
        const { dispatch, DataState } = this.props
        this.setState({
            GradeChange: e
        })
        //let Classes =[];
        let ClassArr = DataState.GradeClassMsg.returnData.AllClasses[e.value];

        // for (let child in ClassArr) {
        //     Classes.push(ClassArr[child]);
        // }
        console.log(ClassArr)
        this.setState({
            Classes: ClassArr
        })
        dispatch(actions.UpUIState.editModalTipsVisible({
            GradeTipsVisible: false
        }))
        //改变reduce学生中转数据
        dispatch(actions.UpDataState.setStudentMsg({ gradeID: e.value }))


    }
    //班级
    onEditClassChange = (e) => {
        const { dispatch } = this.props
        this.setState({
            ClassChange: e
        })
        dispatch(actions.UpUIState.editModalTipsVisible({
            ClassTipsVisible: false
        }))
        //改变reduce学生中转数据
        dispatch(actions.UpDataState.setStudentMsg({ classID: e.value }))
    }

    //职称
    onEditTitleChange = (e) => {
        const { dispatch } = this.props
        this.setState({
            TitleChange: e
        })
        dispatch(actions.UpUIState.editModalTipsVisible({
            TitleIDVisible: false
        }))
        //改变reduce学生中转数据
        dispatch(actions.UpDataState.setTeacherMsg({ titleID: e.value }))
    }
    //行政职务
    onEditPositionChange = (e) => {
        const { dispatch } = this.props
        this.setState({
            PositionChange: e
        })
        dispatch(actions.UpUIState.editModalTipsVisible({
            PositionTipsVisible: false
        }))
        //改变reduce领导中转数据
        dispatch(actions.UpDataState.setLeaderMsg({ position: e.title }))
    }
    //身份证
    onEditIDCardChange = (e) => {
        const { dispatch } = this.props

        let value = e.target.value;
        let Test = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)
        this.setState({
            IDCardChange: e.target.value
        })
        if (!Test) {
            dispatch(actions.UpUIState.editModalTipsVisible({
                IDCardNoTipsVisible: true
            }))
        } else {
            dispatch(actions.UpUIState.editModalTipsVisible({
                IDCardNoTipsVisible: false
            }))
            if (this.state.type === 'teacher') {
                //改变reduce教师中转数据
                dispatch(actions.UpDataState.setTeacherMsg({ IDCardNo: value }))
            } else if (this.state.type === 'student') {
                //改变reduce学生中转数据
                dispatch(actions.UpDataState.setStudentMsg({ IDCardNo: value }))
            }else if (this.state.type === 'leader') {
                //改变reduce领导中转数据
                dispatch(actions.UpDataState.setLeaderMsg({ IDCardNo: value }))
            }

        }
    }
    //电话号码
    onEditPhoneChange = (e) => {
        const { dispatch } = this.props
        let value = e.target.value;
        let Test = /^[0-9]{11}$/.test(value)
        this.setState({
            PhoneChange: e.target.value
        })
        if (!Test) {
            dispatch(actions.UpUIState.editModalTipsVisible({
                TelephoneTipsVisible: true
            }))
        } else {
            dispatch(actions.UpUIState.editModalTipsVisible({
                TelephoneTipsVisible: false
            }))
            if (this.state.type === 'teacher') {
                //改变reduce教师中转数据
                dispatch(actions.UpDataState.setTeacherMsg({ telephone: value }))
            } else if (this.state.type === 'student') {
                //改变reduce学生中转数据
                dispatch(actions.UpDataState.setStudentMsg({ telephone: value }))
            }else if (this.state.type === 'leader') {
                //改变reduce领导中转数据
                dispatch(actions.UpDataState.setLeaderMsg({ telephone: value }))
            }

        }
    }
    onEditMailChange = (e) => {
        const { dispatch } = this.props
        let value = e.target.value;
        let Test = false
        if (!/^(\S)+@(\S)+\.[a-zA-Z]{2,3}$/.test(value)) {
            Test = false;
        }
        else {
            Test = /^([a-zA-Z0-9]+[_|\-|\.]*)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]*)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/gi.test(value);
        }

        this.setState({
            MailChange: e.target.value
        })
        if (!Test) {
            dispatch(actions.UpUIState.editModalTipsVisible({
                EmailTipsVisible: true
            }))
        } else {
            dispatch(actions.UpUIState.editModalTipsVisible({
                EmailTipsVisible: false
            }))
            if (this.state.type === 'teacher') {
                //改变reduce教师中转数据
                dispatch(actions.UpDataState.setTeacherMsg({ email: value }))
            } else if (this.state.type === 'student') {
                //改变reduce学生中转数据
                dispatch(actions.UpDataState.setStudentMsg({ email: value }))
            }else if (this.state.type === 'leader') {
                //改变reduce领导中转数据
                dispatch(actions.UpDataState.setLeaderMsg({ email: value }))
            }

        }
    }
    onEditAddressChange = (e) => {
        const { dispatch } = this.props
        let value = e.target.value;
        let Test = /^[A-Za-z0-9_()\u4e00-\u9fa5]{0,100}$/.test(value);
        this.setState({
            AddressChange: e.target.value
        })
        if (!Test) {
            dispatch(actions.UpUIState.editModalTipsVisible({
                HomeAdressTipsVisible: true
            }))
        } else {
            dispatch(actions.UpUIState.editModalTipsVisible({
                HomeAdressTipsVisible: false
            }))
            if (this.state.type === 'teacher') {
                //改变reduce教师中转数据
                dispatch(actions.UpDataState.setTeacherMsg({ homeAddress: value }))
            } else if (this.state.type === 'student') {
                //改变reduce学生中转数据
                dispatch(actions.UpDataState.setStudentMsg({ homeAddress: value }))
            }else if (this.state.type === 'leader') {
                //改变reduce领导中转数据
                dispatch(actions.UpDataState.setLeaderMsg({ homeAddress: value }))
            }

        }
    }
    //选学科
    changeCheckBox = (checkedList) => {
        const { dispatch } = this.props

        if (checkedList.length === 0) {
            return;
        }
        this.setState({
            checkedList: checkedList
        })
        dispatch(actions.UpUIState.editModalTipsVisible({
            changeSubjectTipsVisible: false
        }))
        // if (checkedList.length === 0) {
        //     dispatch(actions.UpUIState.editModalTipsVisible({
        //         changeSubjectVisible: true
        //     }))
        // }
        // else {
        //     dispatch(actions.UpUIState.editModalTipsVisible({
        //         changeSubjectVisible:false
        //     }))
        // }
        //改变reduce教师中转数据
        dispatch(actions.UpDataState.setTeacherMsg({ subjectIDs: checkedList.join() }))
    }
    //遍历显示学科选择
    MapPlainOptions = (plainOptions) => {
        const { DataState } = this.props;
        let SubjectListChange = DataState.SubjectTeacherMsg.returnData.SubjectListChange;
        let TeacherChangeMsg = {};
        let Options = SubjectListChange.map((child, index) => {
            TeacherChangeMsg[child.value] = child.title;
            return child.value
        })

        let map = Options.map((opt, index) => {
            return (
                <CheckBox className={'checkedBoxMap'} key={index} value={opt}>{TeacherChangeMsg[opt]}</CheckBox>
            )
        })
        return map
    }
    render() {
        const { UIState, DataState } = this.props;
        let EditModalTipsVisible = UIState.EditModalTipsVisible;
        // console.log(EditModalTipsVisible)
        return (
            <div className='EditModal'>
                <div className='Left'></div>
                <div className='Right'>
                    <div className="row clearfix" style={{ marginTop: this.state.type === 'student' || !this.state.type ? 18 + 'px' : 5 + 'px' }}>
                        <span className='culonm-1'>
                            {this.state.type === 'student' ? '学号：' :  '工号：'}
                        </span>
                        <div className='culonm-2'>
                            <span style={{ display: this.state.UserKey !== 'add' ? 'block' : 'none' }} className='UserID-text'>{this.state.UserIDChange}</span>
                            <Tips overlayClassName='tips' visible={EditModalTipsVisible.UserIDTipsVisible} title={(this.state.type === 'student' ? '学号' : this.state.type === 'teacher' ? '工号' : '学号') + this.state.UserIDTipsTitle} >
                                <Input maxLength={24} id="123" style={{ display: this.state.UserKey === 'add' ? 'block' : 'none' }} className='UserName-input'
                                    type='text'
                                    name='EditID'
                                    value={this.state.UserIDChange}
                                    onChange={this.onEditIDChange} />
                            </Tips>
                        </div>
                    </div>
                    <div className="row clearfix">
                        <span className='culonm-1'>
                            <span className='must-icon'>*</span>姓名：
                        </span>
                        <div className='culonm-2'>
                            <Tips overlayClassName='tips' visible={EditModalTipsVisible.UserNameTipsVisible} title={this.state.UserNameTipsTitle} >
                                <Input className='UserName-input'
                                    maxLength={20}
                                    type='text'
                                    name='EditName'
                                    value={this.state.defaultUserName}
                                    onChange={this.onEditNameChange} />
                            </Tips>
                        </div>
                    </div>
                    <div className="row clearfix">
                        <span className='culonm-1'>
                            <span className='must-icon'>*</span>性别：
                        </span>
                        <div className='culonm-2'>
                            {/* <RadioGroup name='GendeSelect'
                            value = {DataState.GradePreview.newList?DataState.GradePreview.newList[this.state.UserKey].Gender:''}
                            onChange = {this.onGendeChange}
                            className='Gende-Radio'
                            >
                                <Radio value='男'>男</Radio>
                                <Radio value='女'>女</Radio>
                                <Radio value='保密'>保密</Radio>
                            </RadioGroup> */}
                            <Tips overlayClassName='tips' visible={EditModalTipsVisible.GenderTipsVisible} title={this.state.GenderTipsTitle} >
                                <DropDown
                                    style={{ zIndex: 3 }}
                                    dropSelectd={this.state.GendeChange}
                                    dropList={[
                                        {
                                            value: 1,
                                            title: '男'
                                        },
                                        {
                                            value: 2,
                                            title: '女'
                                        }, {
                                            value: 3,
                                            title: '保密'
                                        }
                                    ]}
                                    width={120}
                                    height={72}
                                    onChange={this.onEditGendeChange}
                                >

                                </DropDown>
                            </Tips>
                        </div>
                    </div>
                    <div className="row clearfix" style={{ display: this.state.type === 'student' || !this.state.type ? 'block' : 'none' }}>
                        <span className='culonm-1'>
                            <span className='must-icon'>*</span>年级：
                        </span>
                        <div className='culonm-2'>
                            <Tips overlayClassName='tips' visible={EditModalTipsVisible.GradeTipsVisible} title={this.state.GradeTipsTitle} >
                                <DropDown
                                    style={{ zIndex: 2 }}
                                    dropSelectd={this.state.GradeChange}
                                    dropList={this.state.Grades}
                                    width={200}
                                    height={72}
                                    onChange={this.onEditGradeChange}
                                >

                                </DropDown>
                            </Tips>
                        </div>
                    </div>
                    <div className="row clearfix" style={{ display: this.state.type === 'teacher' ? 'block' : 'none' }}>
                        <span className='culonm-1'>
                            <span className='must-icon'>*</span>职称：
                        </span>
                        <div className='culonm-2'>

                            <Tips overlayClassName='tips' visible={EditModalTipsVisible.TitleIDVisible} title={this.state.TitleIDTipsTitle} >

                                <DropDown
                                    style={{ zIndex: 2 }}
                                    dropSelectd={this.state.TitleChange}
                                    dropList={this.state.TeacherTitle}
                                    width={200}
                                    height={72}
                                    onChange={this.onEditTitleChange}
                                >

                                </DropDown>
                            </Tips>
                        </div>
                    </div>
                    <div className="row clearfix" style={{ display: this.state.type === 'student' ? 'block' : 'none' }}>
                        <span className='culonm-1'>
                            <span className='must-icon'>*</span>班级：
                        </span>
                        <div className='culonm-2'>
                            <Tips overlayClassName='tips' visible={EditModalTipsVisible.ClassTipsVisible} title={this.state.ClassTipsTitle} >
                                <DropDown
                                    style={{ zIndex: 1 }}
                                    disabled={this.state.type === 'student' ? this.state.GradeChange.value === 0 ? true : false : false}
                                    dropSelectd={this.state.ClassChange}
                                    dropList={this.state.Classes}
                                    width={200}
                                    height={72}
                                    onChange={this.onEditClassChange}
                                >
                                </DropDown>
                            </Tips>
                        </div>
                    </div>
                    <div className="row clearfix row-subject" style={{ display: this.state.type === 'teacher' ? 'block' : 'none' }}>
                        <span className='culonm-1'>
                            <span className='must-icon'>*</span>所教学科：
                        </span>
                        <div className='culonm-2'>
                            <Tips overlayClassName='tips' visible={EditModalTipsVisible.changeSubjectTipsVisible} title={this.state.changeSubjectTipsTitle} >
                                <CheckBoxGroup onChange={this.changeCheckBox} className={'checkedBoxGroupMap'} value={this.state.checkedList}>
                                    {this.state.type === 'teacher' ? this.MapPlainOptions(this.state.plainOptions) : ''}
                                </CheckBoxGroup>
                            </Tips>
                        </div>
                    </div>
                    <div className="row clearfix row-position" style={{ display: this.state.type === 'leader' ? 'block' : 'none' }}>
                        <span className='culonm-1'>
                            <span className='must-icon'>*</span>行政职务：
                        </span>
                        <div className='culonm-2'>
                            <Tips overlayClassName='tips' visible={EditModalTipsVisible.PositionTipsVisible} title={this.state.PositionTipsTitle} >
                                <DropDown
                                    style={{ zIndex: 1 }}
                                    dropSelectd={this.state.PositionChange}
                                    dropList={this.state.LeaderPositionList}
                                    width={200}
                                    height={72}
                                    onChange={this.onEditPositionChange}
                                >
                                </DropDown>
                            </Tips>
                        </div>
                    </div>
                    <div className="row clearfix">
                        <span className='culonm-1'>
                            身份证号码：
                        </span>
                        <div className='culonm-2'>
                            <Tips overlayClassName='tips' visible={EditModalTipsVisible.IDCardNoTipsVisible} title={this.state.IDCardNoTipsTitle} >
                                <Input
                                    className='input'
                                    value={this.state.IDCardChange}
                                    type='text'
                                    maxLength={18}
                                    name='EditIDCard'
                                    onChange={this.onEditIDCardChange}
                                ></Input>
                            </Tips>
                        </div>
                    </div>
                    <div className="row clearfix">
                        <span className='culonm-1'>
                            联系电话：
                        </span>
                        <div className='culonm-2'>
                            <Tips overlayClassName='tips' visible={EditModalTipsVisible.TelephoneTipsVisible} title={this.state.TelephoneTipsTitle} >
                                <Input
                                    className='input'
                                    maxLength={11}
                                    value={this.state.PhoneChange}
                                    type='text'
                                    name='EditPhone'
                                    onChange={this.onEditPhoneChange}
                                ></Input>
                            </Tips>
                        </div>
                    </div>
                    <div className="row clearfix">
                        <span className='culonm-1'>
                            电子邮箱：
                        </span>
                        <div className='culonm-2'>
                            <Tips overlayClassName='tips' visible={EditModalTipsVisible.EmailTipsVisible} title={this.state.EmailTipsTitle} >
                                <Input
                                    className='input'
                                    type='text'
                                    name='EditMail'
                                    value={this.state.MailChange}
                                    onChange={this.onEditMailChange}
                                ></Input>
                            </Tips>
                        </div>
                    </div>
                    <div className="row clearfix">
                        <span className='culonm-1'>
                            家庭住址：
                        </span>
                        <div className='culonm-2'>
                            <Tips overlayClassName='tips' visible={EditModalTipsVisible.HomeAdressTipsVisible} title={this.state.HomeAdressTipsTitle} >
                                <Input.TextArea
                                    className='inputarea'
                                    rows='2'
                                    cols='30'
                                    name='EditAddress'
                                    value={this.state.AddressChange}
                                    onChange={this.onEditAddressChange}
                                ></Input.TextArea>
                            </Tips>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class MapPlainOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentWillMount() {
        const { DataState } = this.props;
        let SubjectListChange = DataState.SubjectTeacherMsg.returnData.SubjectListChange;
        let TeacherChangeMsg = {};
        let plainOptions = SubjectListChange.map((child, index) => {
            TeacherChangeMsg[child.SubjectID] = child.SubjectName;
        })
        let map = this.props.plainOptions.map((opt, index) => {
            return (
                <CheckBox className={'checkedBoxMap'} key={index} value={opt}>{plainOptions[opt]}</CheckBox>
            )
        })
        console.log(map)
        this.setState({
            map: map
        })
    }
    render() {
        return (
            <div>{this.state.map}</div>
        );
    }

}
MapPlainOptions.defaultProps = {
    plainOptions: []
}
const mapStateToProps = (state) => {
    let { UIState, DataState } = state;
    return {
        UIState,
        DataState
    }
};
connect(mapStateToProps)(MapPlainOptions)
export default connect(mapStateToProps)(EditModal);