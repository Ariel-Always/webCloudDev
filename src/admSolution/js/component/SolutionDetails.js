import React from 'react'
import { connect } from 'react-redux';
import actions from '../actions';
import { postData, getData } from '../../../common/js/fetch'
import '../../scss/SolutionDetails.scss'
import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import CONFIG from '../../../common/js/config';
import { Table ,Button} from "../../../common";

class SolutionDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { 
                    title: '序号',
                    align: 'center',
                    key: 'OrderNO',
                    width:120,
                    dataIndex: 'OrderNO',
                    render: OrderNO => {
                        return (
                            <div className='OrderNO'>
                                <span className='OrderNO-content'>{OrderNO >= 10 ? OrderNO : '0' + OrderNO}</span>
                            </div>
                        )
                    }

                },
                {
                    title: '文件名',
                    align: 'center',
                    width:250,
                    dataIndex: 'FileName',
                    key: 'FileName',
                    render: FileName => {
                        return (
                            <React.Fragment>
                                <span  className='FileName'>{FileName}</span>
                            </React.Fragment>
                        )
                    }
                },
                {
                    title: '文件大小',
                    align: 'center',
                    width:250,
                    dataIndex: 'FileSize',
                    key: 'FileSize',
                    render: FileSize => {
                        return (
                            <React.Fragment>
                                <span className='FileSize'>{FileSize}</span>
                            </React.Fragment>
                        )
                    }
                },
                {
                    title: '操作',
                    align: 'center',
                    width:190,
                    key: 'handle',
                    dataIndex: 'FileAccessPath',
                    render: (FileAccessPath) => {

                        return (
                            <div className='handle-content'>
                                <Button color='blue' type='default' size='small' className='handle-btn'><a href={FileAccessPath} rel='files' target='_blank'>浏览</a></Button>
                            </div>
                        )
                    }
                }
            ],
        }
    }

    //浏览
    onCheckClassClick = (key) => {
        console.log(key)
    }
    
    render() {
        const {DataState} = this.props;
        let SolutionMsg = DataState.GetTeachingSolutionDetailsMsg;
        
        return (
            <div id='SolutionDetails' className='SolutionDetails '>
                <div className='top'>
                    <span className='top-content'>
                        <span className='left'>方案名称：</span>
                        <span className='right'>{SolutionMsg.SolutionName}</span>
                    </span>
                    <span className='top-content'>
                        <span className='left'>学科：</span>
                        <span className='right'>{SolutionMsg.SubjectName}</span>
                    </span>
                    <span className='top-content'>
                        <span className='left'>创建时间：</span>
                        <span className='right'>{SolutionMsg.CreateTime}</span>
                    </span>
                    <span className='top-content'>
                        <span className='left'>文件数量：</span>
                        <span className='right'>{SolutionMsg.FilesCount}</span>
                    </span>
                </div>
                <div className='main'>
                    <Table
                    className='table'
                    columns={this.state.columns}
                    pagination={false}
                    bordered
                    dataSource={DataState.GetTeachingSolutionDetailsMsg.solutionDetailsData}
                    >
                    </Table>
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
export default connect(mapStateToProps)(SolutionDetails);