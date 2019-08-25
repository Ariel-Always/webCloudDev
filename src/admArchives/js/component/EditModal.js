import React from 'react'
import { connect } from 'react-redux';
import '../../scss/EditModal.scss'
import { Input } from 'antd'
import { Radio, RadioGroup, DropDown } from '../../../common/index'

class EditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Gende: '',
            UserName: '',
            UserKey: props.userKey,
            

        }
    }
    componentWillMount(){
        const {  DataState } = this.props;
        console.log("dsd")
        this.setState({
            defaultUserName:DataState.GradeStudentPreview.newList ? DataState.GradeStudentPreview.newList[this.state.UserKey].UserName.UserName : '',
            GendeChange:{
                value: 0,
                title: '保密'
            },
            GradeChange:{
                value: 0,
                title: '一年级'
            },
            ClassChange:{
                value: 0,
                title: '1班'
            },
            IDCardChange:'',
            PhoneChange:'',
            MailChange:'',
            AddressChange:''
        })
    }
    
    onEditNameChange = (e) => {
        console.log(e.target.value)
        this.setState({
            defaultUserName:e.target.value
        })

    }
    onEditGendeChange = (e) => {
        console.log(e)
        this.setState({
            GendeChange:e
        })
    }
    onEditGradeChange = (e) => {
        console.log(e)
        this.setState({
           GradeChange:e
        })
    }
    onEditClassChange = (e) => {
        console.log(e)
        this.setState({
            ClassChange:e
        })
    }
    onEditIDCardChange = (e) => {
        console.log(e.target.value)
        this.setState({
            IDCardChange:e.target.value
        })
    }
    onEditPhoneChange = (e) => {
        console.log(e.target.value)
        this.setState({
            PhoneChange:e.target.value
        })
    }
    onEditMailChange = (e) => {
        console.log(e.target.value)
        this.setState({
            MailChange:e.target.value
        })
    }
    onEditAddressChange = (e) => {
        console.log(e.target.value)
        this.setState({
            AddressChange:e.target.value
        })
    }
    render() {
        const { UIState, DataState } = this.props;
        
        return (
            <div className='EditModal'>
                <div className='Left'></div>
                <div className='Right'>
                    <div className="row">
                        <span className='culonm-1'>
                            学号：
                        </span>
                        <div className='culonm-2'>
                            <span className='UserID-text'>{DataState.GradeStudentPreview.newList ? DataState.GradeStudentPreview.newList[this.state.UserKey].UserID : ''}</span>
                        </div>
                    </div>
                    <div className="row">
                        <span className='culonm-1'>
                            <span className='must-icon'>*</span>姓名：
                        </span>
                        <div className='culonm-2'>
                            <Input className='UserName-input'

                                type='text'
                                name='EditName'
                                value={this.state.defaultUserName}
                                onChange={this.onEditNameChange} />
                        </div>
                    </div>
                    <div className="row">
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
                            <DropDown
                                style={{ zIndex: 3 }}
                                dropSelectd={this.state.GendeChange}
                                dropList={[
                                    {
                                        value: 0,
                                        title: '保密'
                                    },
                                    {
                                        value: 1,
                                        title: '男'
                                    },
                                    {
                                        value: 2,
                                        title: '女'
                                    }
                                ]}
                                width={120}
                                height={72}
                                onChange = {this.onEditGendeChange}
                            >
                                
                            </DropDown>
                        </div>
                    </div>
                    <div className="row">
                        <span className='culonm-1'>
                            <span className='must-icon'>*</span>年级：
                        </span>
                        <div className='culonm-2'>

                            <DropDown
                                style={{ zIndex: 2 }}
                                dropSelectd={this.state.GradeChange}
                                dropList={[
                                    {
                                        value: 0,
                                        title: '一年级'
                                    },
                                    {
                                        value: 1,
                                        title: '二年级'
                                    },
                                    {
                                        value: 2,
                                        title: '三年级'
                                    }
                                ]}
                                width={200}
                                height={72}
                                onChange = {this.onEditGradeChange}
                            >

                            </DropDown>
                        </div>
                    </div>
                    <div className="row">
                        <span className='culonm-1'>
                            <span className='must-icon'>*</span>班级：
                        </span>
                        <div className='culonm-2'>

                            <DropDown
                                style={{ zIndex: 1 }}
                                dropSelectd={this.state.ClassChange}
                                dropList={[
                                    {
                                        value: 0,
                                        title: '1班'
                                    },
                                    {
                                        value: 1,
                                        title: '2班'
                                    },
                                    {
                                        value: 2,
                                        title: '3班'
                                    }
                                ]}
                                width={200}
                                height={72}
                                onChange = {this.onEditClassChange}
                            >

                            </DropDown>
                        </div>
                    </div>
                    <div className="row">
                        <span className='culonm-1'>
                            身份证号码：
                        </span>
                        <div className='culonm-2'>
                            <Input
                                className='input'
                                value={this.state.IDCardChange}
                                type='text'
                                name='EditIDCard'
                                onChange={this.onEditIDCardChange}
                            ></Input>
                        </div>
                    </div>
                    <div className="row">
                        <span className='culonm-1'>
                            联系电话：
                        </span>
                        <div className='culonm-2'>
                            <Input
                                className='input'
                                value={this.state.PhoneChange}
                                type='text'
                                name='EditPhone'
                                onChange={this.onEditPhoneChange}
                            ></Input>
                        </div>
                    </div>
                    <div className="row">
                        <span className='culonm-1'>
                            电子邮箱：
                        </span>
                        <div className='culonm-2'>
                            <Input
                                className='input'
                                type='text'
                                name='EditMail'
                                value = {this.state.MailChange}
                                onChange={this.onEditMailChange}
                            ></Input>
                        </div>
                    </div>
                    <div className="row">
                        <span className='culonm-1'>
                            家庭住址：
                        </span>
                        <div className='culonm-2'>
                            <Input.TextArea
                                className='inputarea'
                                rows='2'
                                cols='30'
                                name='EditAddress'
                                value={this.state.AddressChange}
                                onChange={this.onEditAddressChange}
                            ></Input.TextArea>
                        </div>
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
export default connect(mapStateToProps)(EditModal);