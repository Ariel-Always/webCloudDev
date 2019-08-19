import React,{Component} from 'react';
import TitleBar from '../component/TitleBar';
import {Search,Button} from "../../../common";
import connect from "react-redux/es/connect/connect";
import UpDataState from '../actions/UpDataState';
import {Loading} from "../../../common";
import ContentWrapper from '../component/ContentWrapper';
import TeacherTabWrapper from '../component/TeacherTabWrapper'

class StudentContent extends Component{
    constructor(props) {
        super(props);

        const {dispatch,DataState} = this.props;

        const {SchoolGradeClasses} = DataState;

        if (Object.keys(SchoolGradeClasses).length!==0){
            dispatch(UpDataState.getTheClassPreview());//获取数据
        }else{
            setTimeout(()=>{
                dispatch(UpDataState.getTheClassPreview());//获取数据
            },500)
        }

    }

    render() {
        const {UIState,DataState} = this.props;

        const {StudentLoading} = UIState;

        const {TheTeachersList} = DataState;

        return (
            <Loading tip="加载中..." spinning={StudentLoading.show}  size="large">

                <TitleBar type="icon2" title="一年级 > 1班教师名单" abstract={`(${TheTeachersList.Total}人)`}></TitleBar>

                <ContentWrapper>

                    <Button size="small" color="blue" className="addTeacher">添加任课教师</Button>

                    <TeacherTabWrapper Teachers={TheTeachersList}></TeacherTabWrapper>

                </ContentWrapper>

            </Loading>
        );
    }
}
const  mapStateToProps = (state) => {
    let {UIState,DataState} = state;
    return {
        UIState,
        DataState
    }
};
export default connect(mapStateToProps)(StudentContent);