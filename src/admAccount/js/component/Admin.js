import React from "react";
import { connect } from "react-redux";
import {
  Alert,
  DetailsModal,
  DropDown,
  PagiNation,
  Search,
  Table,
  Button,
  Tips,
  CheckBox,
  CheckBoxGroup,
  Modal
} from "../../../common/index";
//import '../../../common/scss/_left_menu.scss'
import { Link } from "react-router-dom";
import "../../scss/Admin.scss";
import { postData, getData } from "../../../common/js/fetch";
import CONFIG from "../../../common/js/config";
import { Tooltip, Input, Modal as AntdModal } from "antd";
import TipsContact from "./TipsContact";
import TipsPower from "./TipsPower";
import md5 from "md5";
import history from "../containers/history";
import EditModal from "./EditModal";
//import IconLocation from '../../images/icon-location.png'
import actions from "../actions";
//import AdminChangeRecord from './AdminChangeRecord'
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //GradeArr:[{value:0,title:'全部年级'}]
      secondDropList: [{ value: 0, title: "全部班级" }],
      DropMenuShow: false,
      selectedRowKeys: [],
      columns: [
        {
          title: "",
          dataIndex: "handle",
          width: 68,
          key: "key",
          align: "left",
          render: handle => {
            return (
              <div className="registerTime-content">
                <label style={{ whiteSpace: "nowrap" }}>
                  <CheckBox
                    type="gray"
                    value={handle.key}
                    onChange={this.onCheckChange}
                  ></CheckBox>
                  <span className="key-content">
                    {handle.OrderNo + 1 >= 10
                      ? handle.OrderNo + 1
                      : "0" + (handle.OrderNo + 1)}
                  </span>
                </label>
              </div>
            );
          }
        },
        {
          title: "姓名",
          align: "center",
          width: 130,
          key: "UserName",
          dataIndex: "UserName",
          sorter: true,
          render: arr => {
            return (
              <div className="name-content">
                <span
                  className="name-UserName"
                  onClick={this.onUserNameClick.bind(this, arr.UserID)}
                  title={arr.Name}
                >
                  {arr.Name}
                </span>
                <br />
                <span className="name-UserID" title={arr.UserID}>
                  (<span className="UserID-content">{arr.UserID}</span>)
                </span>
              </div>
            );
          }
        },
        {
          title: "用户名",
          width: 160,
          align: "center",
          dataIndex: "ShortName",
          key: "ShortName",
          sorter: true,
          render: ShortName => {
            return (
              <span title={ShortName} className="UserName">
                {ShortName ? ShortName : "--"}
              </span>
            );
          }
        },
        {
          title: "访问权限",
          width: 120,
          align: "center",
          dataIndex: "Power",
          key: "Power",
          render: Power => {
            return (
              <Tooltip
                placement="topLeft"
                width={540}
                trigger="click"
                overlayClassName="PowerTip"
                arrowPointAtCenter={true}
                title={<TipsPower data={Power}></TipsPower>}
              >
                <span className="Power">查看</span>
              </Tooltip>
            );
          }
        },
        {
          title: "联系方式",
          width: 120,
          align: "center",
          key: "UserContact",
          dataIndex: "UserContact",
          render: UserContact => {
            return (
              <Tooltip
                placement="topLeft"
                trigger="click"
                arrowPointAtCenter={true}
                title={<TipsContact data={UserContact}></TipsContact>}
              >
                <span
                  className="UserContact"
                  onClick={this.onUserContactClick.bind(this, UserContact)}
                >
                  查看
                </span>
              </Tooltip>
            );
          }
        },
        {
          title: "操作",
          align: "center",
          width: 260,
          key: "handle",
          dataIndex: "key",
          render: key => {
            return (
              <div className="handle-content">
                <Button
                  color="blue"
                  type="default"
                  onClick={this.onChangePwdClick.bind(this, key)}
                  className="handle-btn"
                >
                  重置密码
                </Button>
                <Button
                  color="blue"
                  type="default"
                  onClick={this.onHandleClick.bind(this, key)}
                  className="handle-btn"
                >
                  编辑
                </Button>
              </div>
            );
          }
        }
      ],
      data: [
        {
          key: 1,
          UserName: { key: "01", PhotoPath: "", UserName: "祝泽森" },
          UserID: "S00001",
          Grader: "男",
          GradeName: "一年级",
          ClassName: "一年1班",
          Others: {}
        }
      ],
      PwdTipsTitle:
        "密码由6-20个字符，只能由字母、数字、下划线及部分特殊字符组成",
      pagination: 1,
      loading: false,
      selectedAll: false,
      checkedList: [],
      checkAll: false,
      AdminModalVisible: false,
      userKey: "change",
      AdminChangeKey: 0,
      ChangePwdMadalVisible: false,
      alertShow: false,
      alertTitle: "提示信息",
      alertQueryShow: false,
      alertQueryTitle: "查询提示~",
      AdminDetailsMsgModalVisible: false,
      addAdminModalVisible: false,
      defaultPwd: "888888",
      onClickKey: 0,
      userMsgKey: 0,
      keyList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      destroyOnCloce: true,
      changeAdminModalVisible: false,
      keyword: "",
      CancelBtnShow: "n",
      searchValue: "",
      userMsg: props.DataState.LoginUser,
      sortType: "",
      sortFiled: ""
    };
    window.AdminCancelSearch = this.AdminCancelSearch.bind(this);
  }
  AdminCancelSearch = () => {
    this.setState({
      CancelBtnShow: "n",
      keyword: "",
      searchValue: "",
      checkAll: false,
      // pagination: 1,
      checkedList: []
    });
  };
  componentWillMount() {
    const { dispatch } = this.props;
    let pwd = "0";

    dispatch(actions.UpDataState.getChangeInputValue(pwd));
  }
  componentWillReceiveProps(nextProps) {
    let Grades = this.props.DataState.GradeClassMsg.Grades
      ? this.props.DataState.GradeClassMsg.Grades
      : [];
    let len = Grades.lenght;
    //  console.log(Grades)
    let GradeArr = [{ value: 0, title: "全部年级" }];

    for (let i = 0; i < len; i++) {
      let Grade = { value: Grades[i].GradeID, title: Grades[i].GradeName };
      GradeArr.push(Grade);
    }
    if(nextProps.DataState.AdminPreview.PageIndex!==undefined&&nextProps.DataState.AdminPreview.PageIndex+1!==this.state.pagination){
      this.setState({
        pagination: nextProps.DataState.AdminPreview.PageIndex+1
      });
    }
    this.setState({
      GradeArr: GradeArr
    });
  }

  // 搜索
  AdminSearch = e => {
    const { dispatch } = this.props;

    if (e.value === "") {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-warn",
          title: "关键词不能为空",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this)
        })
      );
      return;
    }
    let Test = /^[A-Za-z0-9]{1,30}$|^[a-zA-Z0-9_.·\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_.·\u4e00-\u9fa5]$/.test(
      e.value
    );
    if (!Test) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-error",
          title: "您输入的工号或姓名格式不正确",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this)
        })
      );
      return;
    }
    this.setState({
      checkedList: [],
      checkAll: false,
      keyword: e.value,
      CancelBtnShow: "y",
      // pagination: 1
    });
    dispatch(
      actions.UpDataState.getAdminPreview(
        "/GetAdminToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&PageIndex=0&PageSize=10&keyword=" +
          e.value +
          this.state.sortFiled +
          this.state.sortType
      )
    );
  };
  onChangeSearch = e => {
    this.setState({
      searchValue: e.target.value
    });
  };

  onUserContactClick = UserContact => {
    //  console.log(UserContact)
    // this.setState({
    //     AdminChangeMadalVisible: true,
    //     AdminChangeKey: key
    // })
  };
  // onChangePwdClick = (e, key) => {
  //   //  console.log(e, key)
  //     this.setState({
  //         AdminChangeMadalVisible: true,
  //         AdminChangeKey: key
  //     })
  // }

  OnCheckAllChange = e => {
    const { dispatch, DataState } = this.props;
    //  console.log(e)
    if (e.target.checked) {
      this.setState({
        checkedList: DataState.AdminPreview.keyList,
        checkAll: e.target.checked
      });
    } else {
      this.setState({
        checkedList: [],
        checkAll: e.target.checked
      });
    }
  };
  // 全选
  onCheckBoxGroupChange = checkedList => {
    //  console.log(checkedList)
    this.setState({
      checkedList,
      checkAll: checkedList.length === this.state.keyList.length ? true : false
    });
  };
  handleAdminModalOk = e => {
    //  console.log(e)
    this.setState({
      AdminModalVisible: false
    });
  };
  handleAdminModalCancel = e => {
    //  console.log(e)
    this.setState({
      AdminModalVisible: false
    });
  };

  // ChangePwdMadalOk = (e) => {
  //   //  console.log(e)
  //     this.setState({
  //         ChangePwdMadalVisible: false
  //     })
  // }

  onDeleteAllClick = () => {
    const { dispatch } = this.props;
    //  console.log(this.state.checkedList)
    if (this.state.checkedList.length === 0) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-warn",
          title: "你还没有选择哦~",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this)
        })
      );
    } else {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-query",
          title: "确定删除？",
          ok: this.onAlertDeleteOk.bind(this),
          cancel: this.onAlertQueryClose.bind(this),
          close: this.onAlertQueryClose.bind(this)
        })
      );
    }
  };
  onChangePwdClick = key => {
    const { dispatch, DataState } = this.props;
    let data = this.state.AdminAccountData;
    let pwd = "888888";
    this.setState({
      ChangePwdMadalVisible: true,
      onClickKey: key
    });
  };
  //关闭
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    //console.log('ddd')
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  onHandleClick = key => {
    //console.log(this.state.AdminAccountData[key])
    this.setState({
      AdminChangeKey: key,
      changeAdminModalVisible: true,
      userKey: "change"
    });
  };
  onAddAdmin = e => {
    //  console.log(e)
    const { dispatch, UIState } = this.props;

    if (UIState.AppLoading.TableLoading) {
      return;
    }
    this.setState({
      addAdminModalVisible: true,
      userKey: "add"
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
  //
  onAlertQueryOk = pwd => {
    const { dispatch, DataState } = this.props;
    let url = "/DeleteAdmin";

    dispatch(actions.UpUIState.hideErrorAlert());
    //  console.log(pwd);
    this.setState({
      checkedList: [],
      checkAll: false
    });
  };
  // 删除
  onAlertDeleteOk = () => {
    const { dispatch, DataState } = this.props;
    let url = "/DeleteAdmin";
    console.log(this.state.checkedList)
    let Total = DataState.AdminPreview.Total;

    let UserIDs = this.state.checkedList.map(child => {
      return DataState.AdminPreview.newList[child].UserName.UserID;
    });
    let len = UserIDs.length;
    let pagination = this.state.pagination - 1
    postData(
      CONFIG.UserAccountProxy + url,
      {
        UserIDs: UserIDs.join()
      },
      2
    )
      .then(res => {
        if (res.StatusCode === "401") {
          //  console.log('错误码：' + res.StatusCode)
        }
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 400) {
          //  console.log(json.StatusCode)
        } else if (json.StatusCode === 200) {
          dispatch(actions.UpUIState.hideErrorAlert());
          dispatch(
            actions.UpUIState.showErrorAlert({
              type: "success",
              title: "操作成功",
              onHide: this.onAlertWarnHide.bind(this)
            })
          );
          // if((Total-len)%(this.state.pagination-1)===0){
          //   pagination = this.state.pagination - 2;
          //   this.setState({
          //     pagination:pagination+1
          //   })
          // }
          this.setState({
            checkedList: [],
            checkAll: false
          });
          if (this.state.keyword !== "")
            dispatch(
              actions.UpDataState.getAdminPreview(
                "/GetAdminToPage?SchoolID=" +
                  this.state.userMsg.SchoolID +
                  "&PageIndex=" +
                  pagination +
                  "&PageSize=10&Keyword=" +
                  this.state.keyword +
                  this.state.sortFiled +
                  this.state.sortType
              )
            );
          else
            dispatch(
              actions.UpDataState.getAdminPreview(
                "/GetAdminToPage?SchoolID=" +
                  this.state.userMsg.SchoolID +
                  "&PageIndex=" +
                  (this.state.pagination - 1) +
                  "&PageSize=10" +
                  this.state.sortFiled +
                  this.state.sortType
              )
            );
        }
      });
  };
  // 分页
  onPagiNationChange = value => {
    const { dispatch } = this.props;
    this.setState({
      // pagination: value,
      checkedList: [],
      checkAll: false
    });

    let keyword = "";

    if (this.state.keyword !== "") {
      keyword = "&keyword=" + this.state.keyword;
    }
    dispatch(
      actions.UpDataState.getAdminPreview(
        "/GetAdminToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&PageIndex=" +
          --value +
          "&PageSize=10" +
          this.state.sortFiled +
          this.state.sortType
      )
    );
  };

  onUserNameClick = UserID => {
    const { dispatch } = this.props;

    dispatch(actions.UpDataState.getUserMsg("/GetUserDetail?userid=" + UserID));

    this.setState({
      AdminDetailsMsgModalVisible: true
    });
  };
  AdminDetailsMsgModalOk = () => {
    this.setState({
      AdminDetailsMsgModalVisible: false
    });
  };
  AdminDetailsMsgModalCancel = () => {
    this.setState({
      AdminDetailsMsgModalVisible: false
    });
  };

  handleAddAdminModalOk = e => {
    const { dispatch, UIState, DataState } = this.props;

    let picObj = DataState.GetPicUrl.picObj;

    if (
      UIState.TipsVisible.UserIDTipsVisible ||
      !DataState.AdminPreview.TrasferData.UserID
    ) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-warn",
          title: "工号有错误",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this)
        })
      );
      return;
    }
    if (
      UIState.TipsVisible.UserNameTipsVisible ||
      !DataState.AdminPreview.TrasferData.UserName
    ) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-warn",
          title: "姓名有错误",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this)
        })
      );
      return;
    }
    if (
      !DataState.AdminPreview.TrasferData.isChange &&
      !picObj.picUploader.isChanged()
    ) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-warn",
          title: "你没有修改",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this)
        })
      );
      return;
    }
    let url = "/AddAdmin";
    // let ModulesID = []
    // DataState.AdminPreview.TrasferData.ModuleIDs.map((child) => {
    //   //  console.log(child.length)
    //     if (child.length !== 0)
    //         ModulesID.push(child.join())
    // })
    if (picObj.picUploader.uploadSubmit()) {
      postData(
        CONFIG.UserAccountProxy + url,
        {
          userID: DataState.AdminPreview.TrasferData.UserID,
          UserName: DataState.AdminPreview.TrasferData.UserName,
          ModuleIDs: DataState.AdminPreview.TrasferData.ModuleIDs,
          PhotoPath: picObj.picUploader.getCurImgPath(),
          Pwd: "0"
        },
        2
      )
        .then(res => {
          return res.json();
        })
        .then(json => {
          // if (json.StatusCode !== 200) {
          //     dispatch(actions.UpUIState.showErrorAlert({
          //         type: 'btn-error',
          //         title: json.Msg,
          //         ok: this.onAlertWarnOk.bind(this),
          //         cancel: this.onAlertWarnClose.bind(this),
          //         close: this.onAlertWarnClose.bind(this)
          //     }));
          // } else
          if (json.StatusCode === 200) {
            dispatch(
              actions.UpUIState.showErrorAlert({
                type: "success",
                title: "操作成功",
                onHide: this.onAlertWarnHide.bind(this)
              })
            );
            this.setState({
              addAdminModalVisible: false,
              checkedList: [],
              checkAll: false
            });
            dispatch(
              actions.UpDataState.setAdminPreview({
                isChange: false,
                UserID: "",
                UserName: "",
                ModuleIDs: "",
                PhotoPath: "",
                Pwd: "0"
              })
            );
            dispatch(
              actions.UpDataState.getAdminPreview(
                "/GetAdminToPage?SchoolID=" +
                  this.state.userMsg.SchoolID +
                  "&PageIndex=" +
                  (this.state.pagination - 1) +
                  "&PageSize=10" +
                  (this.state.keyword ? "&Keyword" + this.state.keyword : "") +
                  this.state.sortFiled +
                  this.state.sortType
              )
            );
            dispatch(actions.UpUIState.AllTipsVisibleClose());
          }
        });
    }
  };
  handleAddAdminModalCancel = e => {
    const { dispatch, DataState } = this.props;
    dispatch(
      actions.UpDataState.setAdminPreview({
        isChange: false,
        UserID: "",
        UserName: "",
        ModuleIDs: "",
        PhotoPath: "",
        Pwd: "0"
      })
    );
    this.setState({
      addAdminModalVisible: false
    });
    dispatch(actions.UpUIState.AllTipsVisibleClose());
  };
  handleChangeAdminModalOk = e => {
    const { dispatch, UIState, DataState } = this.props;

    let picObj = DataState.GetPicUrl.picObj;

    if (UIState.TipsVisible.UserIDTipsVisible) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-warn",
          title: "工号有错误",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this)
        })
      );
      return;
    }
    if (UIState.TipsVisible.UserNameTipsVisible) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-warn",
          title: "姓名有错误",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this)
        })
      );
      return;
    }
    if (
      !DataState.AdminPreview.TrasferData.isChange &&
      !picObj.picUploader.isChanged()
    ) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-warn",
          title: "你没有修改",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this)
        })
      );
      return;
    }
    let url = "/EditAdmin";
    // let ModulesID = []
    // DataState.AdminPreview.TrasferData.ModuleIDs.map((child) => {
    //   //  console.log(child.length)
    //     if (child.length !== 0)
    //         ModulesID.push(child.join())
    // })
    let PhotoEdit = 0;
    if (picObj.picUploader.isChanged()) {
      PhotoEdit = 1;
    }
    if (picObj.picUploader.uploadSubmit()) {
      postData(
        CONFIG.UserAccountProxy + url,
        {
          userID: DataState.AdminPreview.TrasferData.UserID,
          UserName: DataState.AdminPreview.TrasferData.UserName,
          ModuleIDs: DataState.AdminPreview.TrasferData.ModuleIDs,
          PhotoPath: picObj.picUploader.getCurImgPath(),
          Pwd: "0",
          PhotoEdit: PhotoEdit
        },
        2
      )
        .then(res => {
          return res.json();
        })
        .then(json => {
          if (json.StatusCode === 200) {
            dispatch(
              actions.UpUIState.showErrorAlert({
                type: "success",
                title: "操作成功",
                onHide: this.onAlertWarnHide.bind(this)
              })
            );
            this.setState({
              changeAdminModalVisible: false,
              checkedList: [],
              checkAll: false
            });
            dispatch(
              actions.UpDataState.setAdminPreview({
                isChange: false,
                UserID: "",
                UserName: "",
                ModuleIDs: "",
                PhotoPath: "",
                Pwd: "0"
              })
            );
            dispatch(
              actions.UpDataState.getAdminPreview(
                "/GetAdminToPage?SchoolID=" +
                  this.state.userMsg.SchoolID +
                  "&PageIndex=" +
                  (this.state.pagination - 1) +
                  "&PageSize=10" +
                  (this.state.keyword ? "&Keyword" + this.state.keyword : "") +
                  this.state.sortFiled +
                  this.state.sortType
              )
            );
            dispatch(actions.UpUIState.AllTipsVisibleClose());
          }
        });
    }
  };
  handleChangeAdminModalCancel = e => {
    const { dispatch, DataState } = this.props;
    dispatch(
      actions.UpDataState.setAdminPreview({
        isChange: false,
        UserID: "",
        UserName: "",
        ModuleIDs: "",
        PhotoPath: "",
        Pwd: "0"
      })
    );
    this.setState({
      changeAdminModalVisible: false
    });
    dispatch(actions.UpUIState.AllTipsVisibleClose());
  };
  //修改密码
  onPwdchangeOk = () => {
    const { dispatch, DataState, UIState } = this.props;
    let pwd = this.state.defaultPwd;
    if (this.state.defaultPwd === "") {
      dispatch({ type: actions.UpUIState.PWD_TIPS_OPEN });
      return;
    } else if (UIState.TipsVisible.PwdTipsShow) {
      // dispatch({type:actions.UpUIState.PWD_TIPS_OPEN})
      return;
    }
    //  console.log(this.state.onClickKey)
    let url = "/ResetPwd";
    postData(
      CONFIG.UserAccountProxy + url,
      {
        userID:
          DataState.AdminPreview.newList[this.state.onClickKey].UserName.UserID,
        userType: 0,
        newPwd: md5(pwd)
      },
      2
    )
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 200) {
          dispatch(
            actions.UpUIState.showErrorAlert({
              type: "success",
              title: "操作成功",
              onHide: this.onAlertWarnHide.bind(this)
            })
          );
          this.setState({
            ChangePwdMadalVisible: false,
            defaultPwd: "888888",
            checkAll: false,
            checkedList: []
          });
          if (this.state.keyword !== "")
            dispatch(
              actions.UpDataState.getAdminPreview(
                "/GetAdminToPage?SchoolID=" +
                  this.state.userMsg.SchoolID +
                  "&PageIndex=" +
                  (this.state.pagination - 1) +
                  "&PageSize=10&Keyword=" +
                  this.state.keyword +
                  this.state.sortFiled +
                  this.state.sortType
              )
            );
          else
            dispatch(
              actions.UpDataState.getAdminPreview(
                "/GetAdminToPage?SchoolID=" +
                  this.state.userMsg.SchoolID +
                  "&PageIndex=" +
                  (this.state.pagination - 1) +
                  "&PageSize=10" +
                  this.state.sortFiled +
                  this.state.sortType
              )
            );
        }
      });
  };
  onPwdchangeClose = () => {
    const { dispatch } = this.props;

    dispatch({ type: actions.UpUIState.PWD_TIPS_CLOSE });
    this.setState({
      ChangePwdMadalVisible: false,
      defaultPwd: "888888"
    });
  };
  onPwdchange = e => {
    const { dispatch } = this.props;
    //  console.log(e.target.value)
    this.setState({
      defaultPwd: e.target.value
    });
  };

  // onPowerClick = (Power) => {
  //   //  console.log(Power)
  // }

  //table改变，进行排序操作
  onTableChange = (a, b, sorter) => {
    const { DataState, dispatch } = this.props;
    let keyword = "";

    if (this.state.keyword !== "") {
      keyword = "&keyword=" + this.state.keyword;
    }
    // console.log(sorter)
    if (
      sorter &&
      (sorter.columnKey === "UserName" || sorter.columnKey === "ShortName")
    ) {
      let sortType =
        sorter.order === "descend"
          ? "&SortType=DESC"
          : sorter.order === "ascend"
          ? "&SortType=ASC"
          : "";
      this.setState({
        sortType: "&" + sortType,
        sortFiled: "&sortFiled=" + sorter.columnKey,
        checkAll: false,
        checkedList: []
      });
      dispatch(
        actions.UpDataState.getAdminPreview(
          "/GetAdminToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageSize=10&sortFiled=" +
            sorter.columnKey +
            sortType +
            "&PageIndex=" +
            (this.state.pagination - 1) +
            keyword
        )
      );
    } else if (sorter) {
      this.setState({
        sortType: "",
        sortFiled: "",
        checkAll: false,
        checkedList: []
      });
      dispatch(
        actions.UpDataState.getAdminPreview(
          "/GetAdminToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageSize=10" +
            "&PageIndex=" +
            (this.state.pagination - 1) +
            keyword
        )
      );
    }
  };
  // 取消搜索
  onCancelSearch = e => {
    const { dispatch } = this.props;

    this.setState({
      CancelBtnShow: "n",
      keyword: "",
      searchValue: "",
      checkAll: false,
      // pagination: 1,
      checkedList: []
    });
    dispatch(
      actions.UpDataState.getAdminPreview(
        "/GetAdminToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&PageIndex=" +
          0 +
          "&PageSize=10" +
          this.state.sortFiled +
          this.state.sortType
      )
    );
  };
  onPwdBlur = e => {
    const { dispatch } = this.props;
    console.log(e.target.value);
    let value = e.target.value;
    let Test = /^([0-9a-zA-Z`~\!@#$%\^&*\(\)_\+-={}|\[\]:\";\'<>\?,.\/\\]){6,20}$/.test(
      value
    );
    if (!Test || value === "") {
      dispatch({ type: actions.UpUIState.PWD_TIPS_OPEN });
      return;
    } else {
      dispatch({ type: actions.UpUIState.PWD_TIPS_CLOSE });
      return;
    }
  };
  render() {
    const { UIState, DataState } = this.props;
    const data = {
      userName: "康欣",
      userImg: "",
      Gende: "男",
      userText: "学如逆水行舟，不进则退",
      userID: "20170025444",
      userGrade: "一年级",
      userClass: "1班",
      userIDCard: "",
      userPhone: "15626248624",
      userMail: "1519406168@qq.com",
      userAddress: "蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团"
    };
    return (
      <div className="Admin">
        <div className="Admin-box">
          <div className="Admin-top">
            <span className="top-tips">
              <span className="tips menu34 ">管理员账号管理</span>
            </span>
            <div className="top-nav">
              {/* <span className='divide'>|</span> */}
              <span
                className="link"
                style={{ cursor: "pointer" }}
                onClick={this.onAddAdmin.bind(this)}
              >
                <span className="add">添加管理员</span>
              </span>
            </div>
          </div>
          <div className="Admin-hr" ></div>
          <div className="Admin-content">
            <div className="content-top">
              <Search
                placeHolder="请输入工号或姓名进行搜索..."
                onClickSearch={this.AdminSearch}
                height={30}
                width={250}
                onCancelSearch={this.onCancelSearch}
                Value={this.state.searchValue}
                onChange={this.onChangeSearch.bind(this)}
                CancelBtnShow={this.state.CancelBtnShow}
              ></Search>
            </div>
            <div className="content-render">
              <div>
                <CheckBoxGroup
                  style={{ width: "100%" }}
                  value={this.state.checkedList}
                  onChange={this.onCheckBoxGroupChange.bind(this)}
                >
                  <Table
                    className="table"
                    onChange={this.onTableChange.bind(this)}
                    columns={this.state.columns}
                    pagination={false}
                    loading={UIState.AppLoading.TableLoading}
                    dataSource={DataState.AdminPreview.newList}
                  ></Table>
                </CheckBoxGroup>
                {DataState.AdminPreview.Total ? (
                  <div style={{ display: "inline-block" }}>
                    <CheckBox
                      className="checkAll-box"
                      type="gray"
                      onChange={this.OnCheckAllChange}
                      checked={this.state.checkAll}
                    >
                      <span className="checkAll-title">全选</span>
                    </CheckBox>
                    <Button
                      onClick={this.onDeleteAllClick}
                      className="deleteAll"
                      color="red"
                    >
                      删除
                    </Button>
                  </div>
                ) : (
                  ""
                )}
                <div className="pagination-box">
                  <PagiNation
                    showQuickJumper
                    hideOnSinglepage={true}
                    current={this.state.pagination}
                    total={DataState.AdminPreview.Total}
                    onChange={this.onPagiNationChange}
                  ></PagiNation>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 模态框 */}
        {/* <Modal
                    ref='handleAdminMadal'
                    bodyStyle={{ padding: 0 }}
                    type='1'
                    title='编辑学生'
                    visible={this.state.AdminModalVisible}
                    onOk={this.handleAdminModalOk}
                    onCancel={this.handleAdminModalCancel}
                    
                >
                    <EditModal userKey={this.state.userKey}></EditModal>
                </Modal> */}
        {/* <Modal
                    ref='AdminChangeMadal'
                    bodyStyle={{ padding: 0 }}
                    type='2'
                    width={650}
                    visible={this.state.AdminChangeMadalVisible}
                    onOk={this.AdminChangeMadalOk}
                    onCancel={this.AdminChangeMadalCancel}
                >
                    <div className='modal-AdminChange'>
                        <div className='content-top'>
                            <img src={IconLocation} width='30' height='40' alt='icon-location' />
                            <span className='top-text'>毛峰的档案变更记录</span>
                        </div>
                        <div className='content'>
                            <AdminChangeRecord data={''}></AdminChangeRecord>
                        </div>
                    </div>
                </Modal> */}
        <Modal
          ref="handleAdminMadal"
          bodyStyle={{ padding: 0 }}
          type="1"
          title={"添加管理员"}
          visible={this.state.addAdminModalVisible}
          onOk={this.handleAddAdminModalOk}
          onCancel={this.handleAddAdminModalCancel}
        >
          {this.state.addAdminModalVisible ? (
            <EditModal
              type="Admin"
              userKey={this.state.userKey}
              data={DataState.AdminPreview.newList[this.state.AdminChangeKey]}
              PowerList={DataState.AdminPreview.PowerList}
            ></EditModal>
          ) : (
            ""
          )}
        </Modal>
        <Modal
          ref="handleAdminMadal"
          bodyStyle={{ padding: 0 }}
          type="1"
          title={"编辑管理员"}
          visible={this.state.changeAdminModalVisible}
          onOk={this.handleChangeAdminModalOk}
          onCancel={this.handleChangeAdminModalCancel}
        >
          {this.state.changeAdminModalVisible ? (
            <EditModal
              type="Admin"
              userKey={this.state.userKey}
              data={DataState.AdminPreview.newList[this.state.AdminChangeKey]}
              PowerList={DataState.AdminPreview.PowerList}
            ></EditModal>
          ) : (
            ""
          )}
        </Modal>
        <DetailsModal
          ref="AdminDetailsMsgModal"
          visible={this.state.AdminDetailsMsgModalVisible}
          onOk={this.AdminDetailsMsgModalOk}
          onCancel={this.AdminDetailsMsgModalCancel}
          data={DataState.GetUserMsg}
          type="admin"
        ></DetailsModal>
        {/* <AntdModal
                    ref='changePwdMadal'
                    
                    footer={null}
                    title='重置密码'
                    visible={this.state.ChangePwdMadalVisible}
                    onOk={this.ChangePwdMadalOk}
                    onCancel={this.ChangePwdMadalCancel}
                >
                    <div>

                    </div>
                </AntdModal> */}
        {/* 提示框 */}
        <Alert
          show={this.state.ChangePwdMadalVisible}
          type={"btn-query"}
          abstract={
            <div className="alert-pwd">
              <span className="alert-pwd-tips">新密码：</span>
              <Tips
                overlayClassName="tips"
                visible={UIState.TipsVisible.PwdTipsShow}
                title={this.state.PwdTipsTitle}
                getPopupContainer={e => e.parentNode}
              >
                <Input
                  size="small"
                  onChange={this.onPwdchange.bind(this)}
                  onBlur={this.onPwdBlur.bind(this)}
                  style={{ width: 120 + "px" }}
                  value={this.state.defaultPwd}
                ></Input>
              </Tips>
            </div>
          }
          title={
            this.state.ChangePwdMadalVisible ? (
              <p className="alert-Title">
                确定重置
                <span
                  title={
                    DataState.AdminPreview.newList[this.state.onClickKey]
                      .UserName.Name
                  }
                  className="alert-Title-name"
                >
                  {
                    DataState.AdminPreview.newList[this.state.onClickKey]
                      .UserName.Name
                  }
                </span>
                <span
                  title={
                    DataState.AdminPreview.newList[this.state.onClickKey]
                      .UserName.UserID
                  }
                  className="alert-Title-id"
                >
                  (
                  {
                    DataState.AdminPreview.newList[this.state.onClickKey]
                      .UserName.UserID
                  }
                  )
                </span>{" "}
                的密码？
              </p>
            ) : (
              ""
            )
          }
          onOk={this.onPwdchangeOk}
          onCancel={this.onPwdchangeClose}
          onClose={this.onPwdchangeClose}
        ></Alert>
      </div>
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
export default connect(mapStateToProps)(Admin);
