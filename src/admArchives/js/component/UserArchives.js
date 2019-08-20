import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Frame, Menu, Loading, Alert } from "../../../common";
import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import history from '../containers/history'
import TimeBanner from './TimeBanner'
import All from './All'
import Student from './Student'
import Teacher from './Teacher'
import Leader from './Leader'
import $ from 'jquery'





class UserArchives extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            MenuParams: {
                MenuBox: {
                    display: true,
                    width: 240,
                    MenuBoxTopPic: 'pic1'
                },
                children: [{
                    key: 'All',
                    title: '用户档案总览',
                    icon: 'menu10',
                    onTitleClick: this.handleClick,
                    // active: true,
                    // selected: true
                },
                {
                    key: 'Student',
                    title: '学生档案',
                    icon: 'menu39',
                    onTitleClick: this.handleClick,
                },
                {
                    key: 'Teacher',
                    title: '教师档案',
                    icon: 'menu33',
                    onTitleClick: this.handleClick,
                },
                {
                    key: 'Leader',
                    title: '领导档案',
                    icon: 'menu35',
                    onTitleClick: this.handleClick,
                }]
            }
        }
    }

    componentWillMount() {
        this.handleMenu()
        let route = history.location.pathname;
        // 获取接口数据
        //this.requestData(route)

        history.listen(() => {//路由监听
            let route = history.location.pathname;
            // 获取接口数据
            this.requestData(route)

            $('.frame_leftmenu_mainitem').removeClass('selected active');
            $('.frame_leftmenu_mainitem').children('*').removeClass('active');
            this.handleMenu()
        })
    }

    // 请求每个组件主要渲染的数据
    requestData = (route) => {
        const { dispatch } = this.props;
        let handleRoute = route.split('/')[1];
        if (route === '/')
            dispatch(actions.UpDataState.getAllUserPreview('/ArchivesAll'));
        else {
            dispatch(actions.UpDataState.getAllUserPreview('/Archives' + handleRoute));
        }
    }
    //操作左侧菜单，响应路由变化
    handleMenu = () => {
        if (history.location.pathname === '/') {
            history.push('/All')
        }
        let path = history.location.pathname.substr(1);

        let param = this.state.MenuParams;
        let len = param.children.length;

        for (let i = 0; i < len; i++) {
            param.children[i]['active'] = false;
            param.children[i]['selected'] = false;
            if (path === param.children[i].key) {
                param.children[i]['active'] = true;
                param.children[i]['selected'] = true;
                this.setState({
                    MenuParams: param
                })
            }
        }
    }
    //左侧菜单每项的点击事件
    handleClick = (key) => {
        console.log(key)
        history.push('/' + key);
    }
    //每个组件的下拉菜单的数据请求
    AllDropDownMenu = (route) => {

    }

    render() {
        return (
            <React.Fragment>
                <div ref="frame-time-barner"><TimeBanner /></div>
                <div ref="frame-left-menu">
                    <Menu params={this.state.MenuParams}></Menu>
                </div>
                <div ref="frame-right-content">
                    <Router >
                        <Route path='/All' history={history} component={All}></Route>
                        <Route path='/Student' history={history} component={Student}></Route>
                        <Route path='/Teacher' history={history} component={Teacher}></Route>
                        <Route path='/Leader' history={history} component={Leader}></Route>
                    </Router>
                </div>
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

export default connect(mapStateToProps)(UserArchives)