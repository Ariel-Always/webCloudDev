import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "../../images/admAriHeadImg-1.png";
import { Frame, Menu, Loading, Alert } from "../../../common";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import history from "../containers/history";
import CONFIG from "../../../common/js/config";
import TimeBanner from "./TimeBanner";
import All from "./All";
import Student from "./Student";
import Teacher from "./Teacher";
import Leader from "./Leader";
import actions from "../actions";
import $ from "jquery";
import "../../scss/index.scss";
import "../../scss/RegisterExamine.scss";
import {
  DetailsModal,
  DropDown,
  PagiNation,
  Search,
  Table,
  Button,
  CheckBox,
  CheckBoxGroup,
  Modal
} from "../../../common/index";

import { getData, postData } from "../../../common/js/fetch";

class RegisterWillExamine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userMsg: props.DataState.LoginUser,
      secondDropList: [{ value: 0, title: "全部班级" }],
      DropMenuShow: false,
      columns: [
        {
          title: "",
          dataIndex: "OrderNo",
          key: "OrderNo",
          width: 70,
          align: "left",
          render: key => {
            return (
              <div className="registerTime-content">
                <CheckBox value={key} onChange={this.onCheckChange}></CheckBox>
                <span className="key-content">
                  {key >= 10 ? key : "0" + key}
                </span>
              </div>
            );
          }
        },
        {
          title: "注册时间",
          align: "center",
          width: 130,
          dataIndex: "SignUpTime",
          key: "SignUpTime",
          sorter: true,
          render: time => {
            return (
              <div className="registerTime-content">
                <span title={time} className="registerTime">
                  {time ? time : "--"}
                </span>
              </div>
            );
          }
        },
        {
          title: "",
          align: "right",
          dataIndex: "UserName",
          key: "UserImg",
          width: 60,
          render: arr => {
            return (
              <div className="name-content">
                <img
                  alt={arr.UserName}
                  onClick={this.onUserNameClick.bind(this, arr.key)}
                  className="name-img"
                  width="47"
                  height="47"
                  src={arr.PhotoPath}
                ></img>
              </div>
            );
          }
        },
        {
          title: "姓名",
          align: "left",
          dataIndex: "UserName",
          width: 70,
          key: "UserName",
          sorter: true,
          render: arr => {
            return (
              <div className="name-content">
                <span
                  title={arr.UserName}
                  className="name-UserName"
                  onClick={this.onUserNameClick.bind(this, arr.key)}
                >
                  {arr.UserName}
                </span>
              </div>
            );
          }
        },
        {
          title: "学号",
          align: "center",
          dataIndex: "UserID",
          key: "UserID",
          width: 120,
          sorter: true,
          render: UserID => {
            return (
              <span title={UserID} className="UserID">
                {UserID ? UserID : "--"}
              </span>
            );
          }
        },
        {
          title: "性别",
          align: "center",
          dataIndex: "Gender",
          width: 70,
          key: "Gender",
          render: Gender => {
            return (
              <span title={Gender} className="Gender">
                {Gender ? Gender : "--"}
              </span>
            );
          }
        },
        {
          title: "年级",
          align: "center",
          dataIndex: "Grade",
          width: 70,
          key: "Grade",
          render: Grade => {
            return (
              <span title={Grade.GradeName} className="GradeName">
                {Grade.GradeName ? Grade.GradeName : "--"}
              </span>
            );
          }
        },
        {
          title: "班级",
          align: "center",
          width: 70,
          dataIndex: "Class",
          key: "Class",
          render: Class => {
            return (
              <span title={Class.ClassName} className="ClassName">
                {Class.ClassName ? Class.ClassName : "--"}
              </span>
            );
          }
        },
        {
          title: "操作",
          align: "center",
          dataIndex: "key",
          width: 150,
          key: "Others",
          render: key => {
            return (
              <div className="handle-content">
                <Button
                  color="blue"
                  type="default"
                  disabled={false}
                  onClick={this.onExamineClick.bind(this, key)}
                  className={`handle-btn `}
                >
                  {"审核"}
                </Button>
              </div>
            );
          }
        }
      ],
      keyList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      loading: false,
      selectedAll: false,
      checkedList: [],
      checkAll: false,
      UserExamineModalVisible: false,
      alertShow: false,
      alertTitle: "提示信息",
      alertQueryShow: false,
      alertQueryTitle: "查询提示~",
      firstSelect: { value: 0, title: "全部年级" },
      secondSelect: { value: 0, title: "全部班级" },
      TeacherClassSelect:{},
      firstParam: "",
      secondParam: "",
      handleUserMsg: [],
      pageindex: 0,
      pagination: 1,
      StudentDetailsMsgModalVisible: false,
      sortType: "",
      sortFiled: "",
      keyword: "",
      CancelBtnShow: "n",
      searchValue: "",
      isWho: "1"
    };
  }

  componentWillMount() {
    const { dispatch, DataState } = this.props;
    let userMsg = DataState.LoginUser;
    let isWho = "1";
    if (userMsg.UserType === "0" && userMsg.UserType === "7") {
      isWho = "1";
    } else if (userMsg.UserType === "1" && userMsg.UserClass[2] === "1") {
      isWho = "2";
    }
    this.setState({
      isWho:isWho
    })
  }
  componentWillReceiveProps(nextProps){
    const {dispatch,DataState} = nextProps;
    let TeacherClass = DataState.GradeClassMsg.TeacherClass;
    if(Object.keys(this.state.TeacherClassSelect).length===0&&TeacherClass[0]){
      this.setState({
        TeacherClassSelect:TeacherClass[0],
        secondParam:"&classID=" +TeacherClass[0].value
      })
    }
  }

  StudentDropMenu = e => {
    const { dispatch } = this.props;
    //console.log(e);
    let Classes = [{ value: 0, title: "全部班级" }];
    this.setState({
      firstSelect: e,
      secondParam: ""
    });
    ////console.log(this.refs.dropMenuSecond)
    if (e.value !== 0) {
      let ClassArr = this.props.DataState.GradeClassMsg.returnData.AllClasses[
        e.value
      ];
      ClassArr.map(Class => {
        Classes.push(Class);
      });
      //Classes.push(this.props.DataState.GradeClassMsg.returnData.AllClasses[e.value]);
      //this.refs.dropMenuSecond.state.dropList = Classes;]
      this.setState({
        secondDropList: Classes,
        checkedList: [],
        firstParam: "&gradeID=" + e.value,
        checkAll: false,
        pagination: 1,
        keyword: "",
        CancelBtnShow: "n",
        searchValue: ""
      });
      dispatch(
        actions.UpDataState.getWillSignUpLog(
          "/GetSignUpLogToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&PageSize=10&status=0&gradeID=" +
            e.value +
            this.state.sortType +
            this.state.sortFiled
        )
      );

      this.setState({
        DropMenuShow: true
      });
    } else {
      dispatch(
        actions.UpDataState.getWillSignUpLog(
          "/GetSignUpLogToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&PageSize=10&status=0" +
            this.state.sortType +
            this.state.sortFiled
        )
      );
      this.setState({
        DropMenuShow: false,
        checkedList: [],
        checkAll: false,
        pagination: 1,
        secondParam: "",
        firstParam: "",
        keyword: "",
        CancelBtnShow: "n",
        searchValue: "",
        secondSelect: { value: 0, title: "全部班级" }
      });
    }
  };

  StudentDropMenuSecond = e => {
    const { dispatch } = this.props;

    this.setState({
      secondSelect: e,
      checkedList: [],
      checkAll: false,
      pagination: 1,
      keyword: "",
      CancelBtnShow: "n",
      searchValue: ""
    });
    if (e.value === 0) {
      this.setState({
        secondParam: ""
      });
      dispatch(
        actions.UpDataState.getWillSignUpLog(
          "/GetSignUpLogToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&PageSize=10&status=0" +
            this.state.firstParam +
            this.state.sortType +
            this.state.sortFiled
        )
      );
    } else {
      this.setState({
        secondParam: "&classID=" + e.value
      });
      dispatch(
        actions.UpDataState.getWillSignUpLog(
          "/GetSignUpLogToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&PageSize=10&status=0" +
            this.state.firstParam +
            "&classID=" +
            e.value +
            this.state.sortType +
            this.state.sortFiled
        )
      );
    }

    //dispatch(actions.UpDataState.getGradeStudentPreview('/ArchivesStudent?SchoolID=schoolID&GradeID=gradeID&ClassID=ClassID&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC'));
  };
  TeacherDropMenuSecond = e => {
    const { dispatch } = this.props;

    this.setState({
      TeacherClassSelect: e,
      checkedList: [],
      checkAll: false,
      pagination: 1,
      keyword: "",
      CancelBtnShow: "n",
      searchValue: ""
    });
    if (e.value === 0) {
      this.setState({
        secondParam: ""
      });
      dispatch(
        actions.UpDataState.getWillSignUpLog(
          "/GetSignUpLogToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&PageSize=10&status=0" +
            this.state.firstParam +
            this.state.sortType +
            this.state.sortFiled
        )
      );
    } else {
      this.setState({
        secondParam: "&classID=" + e.value
      });
      dispatch(
        actions.UpDataState.getWillSignUpLog(
          "/GetSignUpLogToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&PageSize=10&status=0" +
            this.state.firstParam +
            "&classID=" +
            e.value +
            this.state.sortType +
            this.state.sortFiled
        )
      );
    }

    //dispatch(actions.UpDataState.getGradeStudentPreview('/ArchivesStudent?SchoolID=schoolID&GradeID=gradeID&ClassID=ClassID&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC'));
  };
  OnCheckAllChange = e => {
    //console.log(e.target.checked, this.state.keyList)
    if (e.target.checked) {
      this.setState({
        checkedList: this.state.keyList,
        checkAll: e.target.checked
      });
    } else {
      this.setState({
        checkedList: [],
        checkAll: e.target.checked
      });
    }
  };
  onCheckBoxGroupChange = checkedList => {
    //console.log(checkedList)
    this.setState({
      checkedList,
      checkAll: checkedList.length === this.state.keyList.length ? true : false
    });
  };
  onExamineClick = key => {
    const { DataState } = this.props;
    let arr = this.state.data;
    //arr[Others.key-1].Others[isExamined] = !arr[Others.key-1].Others[isExamined];
    console.log(DataState.GetSignUpLog.WillData.returnData[key].UserMsg,key)
    this.setState({
      UserExamineModalVisible: true,
      handleUserMsg: DataState.GetSignUpLog.WillData.returnData[key].UserMsg
    });
  };
  onPagiNationChange = e => {
    const { dispatch } = this.props;
    this.setState({
      pagination: e,
      checkedList: [],
      checkAll: false
    });
    dispatch(
      actions.UpDataState.getWillSignUpLog(
        "/GetSignUpLogToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&PageIndex=" +
          (this.state.pagination - 1) +
          "&PageSize=10&status=0" +
          (this.state.keyword ? "&Keyword=" + this.state.keyword : "") +
          this.state.firstParam +
          this.state.secondParam +
          this.state.sortType +
          this.state.sortFiled
      )
    );
  };

  onUserNameClick = key => {
    const { DataState } = this.props;
    this.setState({
      StudentDetailsMsgModalVisible: true,
      handleUserMsg: DataState.GetSignUpLog.WillData.returnData[key].UserMsg
    });
  };
  onAgreeAll = e => {
    const { dispatch } = this.props;
    //console.log(this.state.checkedList)
    let checkedList = this.state.checkedList;
    if (checkedList.length) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-query",
          title: "你确定选的通过？",
          ok: this.onPassQueryOk.bind(this),
          cancel: this.onAlertQueryClose.bind(this),
          close: this.onAlertQueryClose.bind(this)
        })
      );
    } else {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-warn",
          title: "您还没有选择哦~",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this)
        })
      );
    }
  };
  RefuseAll = e => {
    const { dispatch } = this.props;
    //console.log(this.state.checkedList)
    let checkedList = this.state.checkedList;
    if (checkedList.length) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-query",
          title: "你确定选的不通过？",
          ok: this.onFailQueryOk.bind(this),
          cancel: this.onAlertQueryClose.bind(this),
          close: this.onAlertQueryClose.bind(this)
        })
      );
    } else {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-warn",
          title: "您还没有选择哦~",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this)
        })
      );
    }
  };

  onPassQueryOk = () => {
    const { dispatch, DataState } = this.props;
    let checkList = this.state.checkedList;
    let StatusCodeCount = DataState.GetSignUpLog.newStatus;
    let logID = checkList.map((child, index) => {
      return DataState.GetSignUpLog.WillData.returnData[child - 1].UserMsg
        .logID;
    });
    let url = "/SignUpLogAuditMulti";
    
    //console.log(StatusCodeCount)
    postData(
      CONFIG.UserInfoProxy + url,
      {
        LogID: logID.join(),
        Status: 1
      },
      2
    )
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 200) {
          dispatch(actions.UpUIState.hideErrorAlert());

          this.setState({
            checkAll: false,
            checkList: []
          });

          // dispatch(actions.UpDataState.setSignUpLogCountMsg(++StatusCodeCount))
          dispatch(
            actions.UpDataState.setSignUpLogCountMsg(StatusCodeCount + logID.length)
          );
          //   if (this.state.firstSelect.value === 0) {
          dispatch(
            actions.UpDataState.getWillSignUpLog(
              "/GetSignUpLogToPage?SchoolID=" +
                this.state.userMsg.SchoolID +
                "&PageIndex=" +
                (this.state.pagination - 1) +
                "&PageSize=10&status=0" +
                (this.state.keyword ? "&Keyword=" + this.state.keyword : "") +
                this.state.firstParam +
                this.state.secondParam +
                this.state.sortType +
                this.state.sortFiled
            )
          );
          //   } else if (this.state.secondSelect.value === 0)
          //     dispatch(
          //       actions.UpDataState.getWillSignUpLog(
          //         "/GetSignUpLogToPage?SchoolID=" +
          //           this.state.userMsg.SchoolID +
          //           "&PageIndex=0&PageSize=10&status=0&gradeID=" +
          //           this.state.firstSelect.value
          //       )
          //     );
          //   else {
          //     dispatch(
          //       actions.UpDataState.getWillSignUpLog(
          //         "/GetSignUpLogToPage?SchoolID=" +
          //           this.state.userMsg.SchoolID +
          //           "&PageIndex=0&PageSize=10&status=0&gradeID=" +
          //           this.state.firstSelect.value +
          //           "&classID=" +
          //           this.state.secondSelect.value
          //       )
          //     );
          //   }
        }
      });
  };
  //批量不通过
  onFailQueryOk = () => {
    const { dispatch, DataState } = this.props;
    let checkList = this.state.checkedList;
    let logID = checkList.map((child, index) => {
      return DataState.GetSignUpLog.WillData.returnData[child - 1].UserMsg
        .logID;
    });
    let StatusCodeCount = DataState.GetSignUpLog.newStatus;
    let url = "/SignUpLogAuditMulti";
    

    postData(
      CONFIG.UserInfoProxy + url,
      {
        LogID: logID.join(),
        Status: 2
      },
      2
    )
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 200) {
          dispatch(actions.UpUIState.hideErrorAlert());

          this.setState({
            checkAll: false,
            checkList: []
          });
          // dispatch(actions.UpDataState.setSignUpLogCountMsg(StatusCodeCount + logID.length));
          dispatch(
            actions.UpDataState.setSignUpLogCountMsg(StatusCodeCount + logID.length)
          );
          dispatch(
            actions.UpDataState.getWillSignUpLog(
              "/GetSignUpLogToPage?SchoolID=" +
                this.state.userMsg.SchoolID +
                "&PageIndex=" +
                (this.state.pagination - 1) +
                "&PageSize=10&status=0" +
                (this.state.keyword ? "&Keyword=" + this.state.keyword : "") +
                this.state.firstParam +
                this.state.secondParam +
                this.state.sortType +
                this.state.sortFiled
            )
          );
        }
      });
  };
  onAlertWarnClose = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  onAlertWarnOk = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  onAlertQueryClose = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  onAlertQueryOk = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  //审核窗口事件
  UserExamineMadalCancel = () => {
    this.setState({
      UserExamineModalVisible: false
    });
  };
  //不通过
  UserExamineMadalFail = userMsg => {
    const { dispatch, DataState } = this.props;
    let newStatus = DataState.GetSignUpLog.newStatus;
    let url = "/SignUpLogAudit";

    postData(
      CONFIG.UserInfoProxy + url,
      {
        LogID: userMsg.logID,
        Status: 2
      },
      2
    )
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 200) {
          this.setState({
            UserExamineModalVisible: false,
            checkList: [],
            checkAll: false
          });
          dispatch(actions.UpDataState.setSignUpLogCountMsg(++newStatus));

          dispatch(
            actions.UpDataState.getWillSignUpLog(
              "/GetSignUpLogToPage?SchoolID=" +
                this.state.userMsg.SchoolID +
                "&PageIndex=" +
                (this.state.pagination - 1) +
                "&PageSize=10&status=0" +
                (this.state.keyword ? "&Keyword=" + this.state.keyword : "") +
                this.state.firstParam +
                this.state.secondParam +
                this.state.sortType +
                this.state.sortFiled
            )
          );
        }
      });
  };
  //通过
  UserExamineMadalOk = userMsg => {
    const { dispatch, DataState } = this.props;
    let url = "/SignUpLogAudit";
    let newStatus = DataState.GetSignUpLog.newStatus;
    console.log(userMsg)
    postData(
      CONFIG.UserInfoProxy + url,
      {
        LogID: userMsg.logID,
        Status: 1
      },
      2
    )
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 200) {
          this.setState({
            UserExamineModalVisible: false,
            checkAll: false,
            checkedList: []
          });
          // dispatch(actions.UpDataState.setSignUpLogCountMsg(++StatusCodeCount));
          dispatch(actions.UpDataState.setSignUpLogCountMsg(++newStatus));

          dispatch(
            actions.UpDataState.getWillSignUpLog(
              "/GetSignUpLogToPage?SchoolID=" +
                this.state.userMsg.SchoolID +
                "&PageIndex=" +
                (this.state.pagination - 1) +
                "&PageSize=10&status=0" +
                (this.state.keyword ? "&Keyword=" + this.state.keyword : "")+
                this.state.firstParam +
                this.state.secondParam +
                this.state.sortType +
                this.state.sortFiled
            )
          );
        }
      });
  };
  //搜索
  LogSearch = e => {
    const { dispatch } = this.props;
    if (e.value === "") {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-warn",
          title: "你还没有输入关键字哦~",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this)
        })
      );
      return;
    } else {
      this.setState({
        keyword: e.value,
        CancelBtnShow: "y",
        pagination: 1
      });
      dispatch(
        actions.UpDataState.getWillSignUpLog(
          "/GetSignUpLogToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&PageSize=10&status=0&keyword=" +
            e.value +
            this.state.sortType +
            this.state.sortFiled +
            
            this.state.firstParam +
            this.state.secondParam 
        )
      );
    }
  };
  //监听table的change进行排序操作
  onTableChange = (page, filters, sorter) => {
    const { DataState, dispatch } = this.props;
    //console.log(sorter)

    if (
      sorter &&
      (sorter.columnKey === "SignUpTime" ||
        sorter.columnKey === "UserName" ||
        sorter.columnKey === "UserID")
    ) {
      let sortType =
        sorter.order === "descend"
          ? "SortType=DESC"
          : sorter.order === "ascend"
          ? "SortType=ASC"
          : "";
      this.setState({
        sortType: "&" + sortType,
        sortFiled: "&sortFiled=" + sorter.columnKey
      });
      dispatch(
        actions.UpDataState.getWillSignUpLog(
          "/GetSignUpLogToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=" +
            (this.state.pagination - 1) +
            "&PageSize=10&status=0&sortFiled=" +
            sorter.columnKey +
            
            sortType +
            (this.state.keyword ? "&Keyword=" + this.state.keyword : "") +
            this.state.firstParam +
            this.state.secondParam 
        )
      );
    } else if (sorter) {
      this.setState({
        sortType: "",
        sortFiled: ""
      });
      dispatch(
        actions.UpDataState.getWillSignUpLog(
          "/GetSignUpLogToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=" +
            (this.state.pagination - 1) +
            "&PageSize=10&status=0" +
            (this.state.keyword ? "&Keyword=" + this.state.keyword : "")+
            this.state.firstParam +
            this.state.secondParam 
        )
      );
    }
  };
  //学生详情信息
  StudentDetailsMsgModalOk = () => {
    this.setState({
      StudentDetailsMsgModalVisible: false
    });
  };
  StudentDetailsMsgModalCancel = () => {
    this.setState({
      StudentDetailsMsgModalVisible: false
    });
  };

  //搜索change
  onChangeSearch = e => {
    this.setState({
      searchValue: e.target.value
    });
  };
  // 取消搜索
  onCancelSearch = e => {
    const { dispatch } = this.props;

    this.setState({
      CancelBtnShow: "n",
      keyword: "",
      searchValue: "",
      pagination: 1,
      checkAll: false,
      checkList: []
    });
    dispatch(
      actions.UpDataState.getWillSignUpLog(
        "/GetSignUpLogToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&PageIndex=0&PageSize=10&status=0" +
          this.state.sortType +
          this.state.sortFiled +
          this.state.firstParam +
          this.state.secondParam 
      )
    );
  };
  render() {
    const { UIState, DataState } = this.props;
    let TeacherClass = DataState.GradeClassMsg.TeacherClass;
    const data = {
      userName: "康欣",
      userImg:
        "http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg",
      Gende: "男",
      userText: "学如逆水行舟，不进则退",
      userID: "20170025444",
      userGrade: "一年级",
      userClass: "1班",
      userIDCard: "",
      userPhone: "15626248624",
      userMail: "1519406168@qq.com",
      userAddress: "蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团",
      userRegisterTime: "2019-01-01 12:24",
      userRegisterIP: "190.163.252.198"
    };
    return (
      <React.Fragment>
        <div className="main-select">
          {this.state.isWho === "1" ? (
            <div>
              <DropDown
                onChange={this.StudentDropMenu}
                width={120}
                height={240}
                dropSelectd={this.state.firstSelect}
                dropList={
                  DataState.GradeClassMsg.returnData
                    ? DataState.GradeClassMsg.returnData.grades
                    : [{ value: 0, title: "全部年级" }]
                }
              ></DropDown>
              <DropDown
                width={120}
                height={240}
                style={{ display: this.state.DropMenuShow ? "block" : "none" }}
                dropSelectd={this.state.secondSelect}
                dropList={this.state.secondDropList}
                onChange={this.StudentDropMenuSecond}
              ></DropDown>
            </div>
          ) : TeacherClass.length>1? (
            <DropDown
              width={120}
              height={240}
              dropSelectd={this.state.TeacherClassSelect}
              dropList={TeacherClass}
              onChange={this.TeacherDropMenuSecond}
            ></DropDown>
          ):
          <span className='single'>{this.state.TeacherClassSelect.title}</span>}
          <Search
            placeHolder="请输入学号或姓名进行搜索"
            onClickSearch={this.LogSearch.bind(this)}
            height={30}
            width={250}
            onCancelSearch={this.onCancelSearch}
            Value={this.state.searchValue}
            onChange={this.onChangeSearch.bind(this)}
            CancelBtnShow={this.state.CancelBtnShow}
          ></Search>
        </div>
        <div className="content-render">
          <Loading tip="loading..." spinning={this.state.loading}>
            <CheckBoxGroup
              style={{ width: "100%" }}
              value={this.state.checkedList}
              onChange={this.onCheckBoxGroupChange.bind(this)}
            >
              <Table
                className="table"
                columns={this.state.columns}
                pagination={false}
                loading={UIState.AppLoading.TableLoading}
                dataSource={DataState.GetSignUpLog.WillData.returnData}
                onChange={this.onTableChange.bind(this)}
              ></Table>
            </CheckBoxGroup>
          </Loading>
          {DataState.GetSignUpLog.WillData.Total ? (
            <CheckBox
              className="checkAll-box"
              onChange={this.OnCheckAllChange}
              checked={this.state.checkAll}
            >
              全选
              <Button
                key="agree"
                className="agreeAll"
                color="blue"
                onClick={this.onAgreeAll.bind(this)}
              >
                通过
              </Button>
              <Button
                key="refuse"
                className="refuseAll"
                color="red"
                onClick={this.RefuseAll.bind(this)}
              >
                不通过
              </Button>
            </CheckBox>
          ) : (
            ""
          )}
          <div className="pagination-box">
            <PagiNation
              showQuickJumper
              current={this.state.pagination}
              hideOnSinglepage={true}
              total={DataState.GetSignUpLog.WillData.Total}
              onChange={this.onPagiNationChange}
            ></PagiNation>
          </div>
        </div>

        {this.state.UserExamineModalVisible?(<DetailsModal
          ref="StudentDetailsMsgModal"
          visible={this.state.UserExamineModalVisible}
          onOk={this.UserExamineMadalOk.bind(this, this.state.handleUserMsg)}
          onCancel={this.UserExamineMadalCancel}
          onFail={this.UserExamineMadalFail.bind(
            this,
            this.state.handleUserMsg
          )}
          data={this.state.handleUserMsg}
          type="examine"
        ></DetailsModal>):''}
        <DetailsModal
          ref="StudentDetailsMsgModals"
          visible={this.state.StudentDetailsMsgModalVisible}
          onOk={this.StudentDetailsMsgModalOk}
          onCancel={this.StudentDetailsMsgModalCancel}
          data={this.state.handleUserMsg}
          type="student"
        ></DetailsModal>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  let { UIState, DataState } = state;
  return {
    UIState,
    DataState
  };
};

export default connect(mapStateToProps)(RegisterWillExamine);
