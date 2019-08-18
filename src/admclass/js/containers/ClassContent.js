import React,{Component} from 'react';
import TitleBar from '../component/TitleBar';
import {Search} from "../../../common";
import ContentWrapper from '../component/ContentWrapper';
import Statistics from '../component/Statistics'
import PartData from '../component/PartData';
import connect from "react-redux/es/connect/connect";
import UpDataState from '../actions/UpDataState';
import {Loading} from "../../../common";



class ClassContent extends Component{
    constructor(props) {
        super(props);

        const {dispatch} = this.props;

        dispatch(UpDataState.getTheGradePreview());//获取数据

    }


    render() {
        const {UIState,DataState,match} = this.props;
        const {ClassLoading} = UIState;
        const {TheGradePreview} = DataState;


        return (
            <Loading tip="加载中..." spinning={ClassLoading.show}  size="large">
                <TitleBar title={match.params.GradeName}></TitleBar>
                <ContentWrapper>
                    <Search className="admclass-search"></Search>
                    <Statistics classNum={DataState.TheGradePreview.Class} teacherNum={DataState.TheGradePreview.CourseTecher} studentNum={DataState.TheGradePreview.Student}></Statistics>
                    <PartData type="class" Grade={match.params.GradeName} PartDataList={DataState.TheGradePreview.List}></PartData>
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
export default connect(mapStateToProps)(ClassContent);