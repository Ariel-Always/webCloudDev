import React from "react";
import "../../scss/Leader.scss";
import { connect } from "react-redux";
import {
  DetailsModal,
  DropDown,
  PagiNation,
  Search,
  Table,
  Button,
  CheckBox,
  CheckBoxGroup,
  Modal,
  Empty
} from "../../../common/index";
import { Link } from "react-router-dom";
import CONFIG from "../../../common/js/config";
import { postData, getData } from "../../../common/js/fetch";
import history from "../containers/history";
import EditModal from "./EditModal";
import { Scrollbars } from "react-custom-scrollbars";

import Public from "../../../common/js/public";
import IconLocation from "../../images/icon-location.png";
import StudentChangeRecord from "./StudentChangeRecord";
import actions from "../actions";
class Leader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "",
          dataIndex: "OrderNo",
          key: "OrderNo",
          width: 68,
          align: "left",
          render: key => {
            return (
              <div className="registerTime-content">
               <label style={{whiteSpace:'nowrap'}}> <CheckBox
                  value={key.key}
                  type='gray'
                  onChange={this.onCheckChange}
                ></CheckBox>
                <span className="key-content">
                  {key.OrderNo + 1 >= 10
                    ? key.OrderNo + 1
                    : "0" + (key.OrderNo + 1)}
                </span></label>
              </div>
            );
          }
        },
        {
          title: "",
          align: "right",
          key: "UserImg",
          colSpan:0,
          width: 50,
          dataIndex: "UserName",
          render: arr => {
            return (
              <div className="name-content">
                {/* <img
                  alt={arr.UserName}
                  onClick={this.onUserNameClick.bind(this, arr.key)}
                  className="name-img"
                  width="47"
                  height="47"
                  src={arr.PhotoPath}
                ></img> */}
                <i
                  alt={arr.UserName}
                  onClick={this.onUserNameClick.bind(this, arr.key)}
                  className="name-img"
                  style={{width:'47px',height:'47px',display:'inline-block',background:`url(${arr.PhotoPath}) no-repeat center center / 47px`}}
                ></i>
              </div>
            );
          }
        },
        {
          title: "姓名",
          align: "left",
          colSpan:2,
          width: 90,
          key: "UserName",
          dataIndex: "UserName",
          sorter: true,
          render: arr => {
            return (
              <div className="name-content">
                <span
                  title={arr.UserName}
                  className="name-UserName"
                  onClick={this.onUserNameClick.bind(this, arr.key)}
                >
                  {arr.UserName ? arr.UserName : "--"}
                </span>
              </div>
            );
          }
        },
        {
          title: "工号",
          align: "center",
          width: 140,
          dataIndex: "UserID",
          key: "UserID",
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
          width: 120,
          dataIndex: "Gender",
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
          title: "行政职务",
          align: "center",
          width: 120,
          key: "Position",
          dataIndex: "Position",
          render: Position => {
            return (
              <span title={Position} className="Position">
                {Position ? Position : "--"}
              </span>
            );
          }
        },
        {
          title: "操作",
          align: "center",
          key: "handle",
          width: 272,
          dataIndex: "key",
          render: key => {
            return (
              <div className="handle-content">
                <Button
                  color="blue"
                  type="default"
                  onClick={this.LeaderEdit.bind(this, key)}
                  className="handle-btn"
                >
                  编辑
                </Button>
                <Button
                  color="blue"
                  type="default"
                  onClick={this.LeaderChange.bind(this, key)}
                  className="check-btn"
                >
                  查看变更记录
                </Button>
              </div>
            );
          }
        }
      ],
      checkedList: [],
      checkAll: false,
      userMsg: props.DataState.LoginUser,
      LeaderDetailsMsgModalVisible: false,
      sortType: "",
      sortFiled: "",
      leaderChangeUserLog:{}
    };
    window.LeaderCancelSearch = this.LeaderCancelSearch.bind(this);

  }
  LeaderCancelSearch = () => {
    this.setState({
     
      checkAll: false,
      checkedList: [],
      // pagination: 1
    });
   
  };
  // 点击全选
  OnCheckAllChange = e => {
    // console.log(e)
    if (e.target.checked) {
      this.setState({
        checkedList: this.props.DataState.SchoolLeaderPreview.keyList,
        checkAll: e.target.checked
      });
    } else {
      this.setState({
        checkedList: [],
        checkAll: e.target.checked
      });
    }
  };
  // 点击多选组
  onCheckBoxGroupChange = checkedList => {
    const { DataState } = this.props;
    // console.log(checkedList)
    this.setState({
      checkedList,
      checkAll:
        checkedList.length === DataState.SchoolLeaderPreview.keyList.length
          ? true
          : false
    });
  };
  // 点击删除全部
  onDeleteAllClick = () => {
    const { dispatch } = this.props;
    // console.log(this.state.checkedList)
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
          ok: this.onAlertQueryOk.bind(this),
          cancel: this.onAlertQueryClose.bind(this),
          close: this.onAlertQueryClose.bind(this)
        })
      );
    }
  };
  // 提示弹窗事件
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
  //提示事件
  onAppAlertOK() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  onAppAlertCancel() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  onAppAlertClose() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  // 删除全部
  onAlertQueryOk = () => {
    const { dispatch, DataState } = this.props;
    let url = "/DeleteSchoolLeader";
    let checkList = this.state.checkedList;
    let dataList = DataState.SchoolLeaderPreview.newList;
    let UserIDList = checkList.map((child, index) => {
      return dataList[child].UserID;
    });
    let UserIDListString = UserIDList.join();

    postData(
      CONFIG.UserInfoProxy + url,
      {
        userIDs: UserIDListString,
        schoolID: this.state.userMsg.SchoolID
      },
      2
    )
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 200) {
          this.setState({
            checkedList: [],
            checkAll: false
          });
          dispatch(actions.UpUIState.hideErrorAlert());
          dispatch(
            actions.UpUIState.showErrorAlert({
              type: "success",
              title: "操作成功",
              onHide: this.onAlertWarnHide.bind(this)
            })
          );
          dispatch(
            actions.UpDataState.getSchoolLeaderPreview(
              "/GetSchoolLeader?SchoolID=" +
                this.state.userMsg.SchoolID +
                this.state.sortFiled +
                this.state.sortType
            )
          );
          this.setState({
            checkedList: [],
            checkAll: false
          });
        }
      });
  };

  // tableCulomn事件
  onUserNameClick = key => {
    const { DataState } = this.props;
    this.setState({
      LeaderDetailsMsgModalVisible: true,
      detailData: DataState.SchoolLeaderPreview.pensonalList[key]
    });
  };
  // 编辑记录
  LeaderChange = key => {
    // console.log(key)
    const { dispatch, DataState } = this.props;

    let innerID = DataState.SchoolLeaderPreview.newList[key].Others.InnerID;
    let url = "/GetUserLog?innerID=" + innerID;
    // console.log(innerID)
    dispatch(actions.UpDataState.getUserLog(url, "leader"));
    this.setState({
      leaderChangeUserLog:
        DataState.SchoolLeaderPreview.newList[key].Others
    });
  };
  // 编辑领导
  LeaderEdit = key => {
    // console.log(key)
    const { dispatch } = this.props;
    this.setState({
      userKey: key
    });
    dispatch(actions.UpUIState.HandleLeaderModalOpen());
  };
  //监听table的change进行排序操作
  onTableChange = (page, filters, sorter) => {
    const { DataState, dispatch } = this.props;
    // console.log(sorter)
    if (
      sorter &&
      (sorter.columnKey === "UserName" || sorter.columnKey === "UserID")
    ) {
      let sortType =
        sorter.order === "descend"
          ? "SortType=DESC"
          : sorter.order === "ascend"
          ? "SortType=ASC"
          : "";
      dispatch(
        actions.UpDataState.getSchoolLeaderPreview(
          "/GetSchoolLeader?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&sortFiled=" +
            sorter.columnKey +
            " &" +
            sortType
        )
      );
      this.setState({
        checkedList: [],
        checkAll: false,
        sortType: "&" + sortType,
        sortFiled: "&sortFiled=" + sorter.columnKey
      });
    } else if (sorter && !sorter.columnKey) {
      dispatch(
        actions.UpDataState.getSchoolLeaderPreview(
          "/GetSchoolLeader?SchoolID=" + this.state.userMsg.SchoolID
        )
      );
      this.setState({
        checkedList: [],
        checkAll: false,
        sortType: "",
        sortFiled: ""
      });
    }
  };
  // 用户详情弹窗事件
  LeaderDetailsMsgModalOk = () => {
    this.setState({
      LeaderDetailsMsgModalVisible: false
    });
  };
  LeaderDetailsMsgModalCancel = () => {
    this.setState({
      LeaderDetailsMsgModalVisible: false
    });
  };

  // 编辑事件
  handleLeaderModalOk = e => {
    let url = "/EditSchoolLeader";

    const { DataState, dispatch, UIState } = this.props;
    const { initLeaderMsg, changeLeaderMsg } = DataState.SetLeaderMsg;
    let EditModalTipsVisible = UIState.EditModalTipsVisible;
    let picObj = DataState.GetPicUrl.picObj;

    for (let key in EditModalTipsVisible) {
      if (EditModalTipsVisible[key]) {
        return;
      }
    }
    // console.log(initLeaderMsg,changeLeaderMsg,Public.comparisonObject(changeLeaderMsg, initLeaderMsg))
    if (
      Public.comparisonObject(changeLeaderMsg, initLeaderMsg) &&
      !picObj.picUploader.isChanged()
    ) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-error",
          title: "你没有修改数据哦",
          ok: this.onAppAlertOK.bind(this),
          cancel: this.onAppAlertCancel.bind(this),
          close: this.onAppAlertClose.bind(this)
        })
      );
      return;
    } else {
      if (picObj.picUploader.uploadSubmit()) {
        let { position, ...data } = changeLeaderMsg;
        let PhotoEdit = 0;
        if (picObj.picUploader.isChanged()) {
          PhotoEdit = 1;
        }
        postData(
          CONFIG.UserInfoProxy + url,
          {
            ...data,
            position: position.title,
            photoPath: picObj.picUploader.getCurImgPath(),
            PhotoEdit:PhotoEdit
          },
          2
        )
          .then(res => {
            return res.json();
          })
          .then(json => {
            // if (json.StatusCode !== 200) {
            //   dispatch(
            //     actions.UpUIState.showErrorAlert({
            //       type: "btn-error",
            //       title: json.Msg,
            //       ok: this.onAppAlertOK.bind(this),
            //       cancel: this.onAppAlertCancel.bind(this),
            //       close: this.onAppAlertClose.bind(this)
            //     })
            //   );
            // } else 
            if (json.StatusCode === 200) {
              // console.log(json.Data)
              dispatch(
                actions.UpUIState.showErrorAlert({
                  type: "success",
                  title: "操作成功",
                  onHide: this.onAlertWarnHide.bind(this)
                })
              );
              dispatch(actions.UpUIState.HandleLeaderModalClose());
              this.setState({
                checkedList: [],
                checkAll: false
              });
              dispatch(
                actions.UpDataState.getSchoolLeaderPreview(
                  "/GetSchoolLeader?SchoolID=" +
                    this.state.userMsg.SchoolID +
                    this.state.sortFiled +
                    this.state.sortType
                )
              );
              dispatch(actions.UpUIState.editAlltModalTipsVisible());
            }
          });
      }
    }
  };
  handleLeaderModalCancel = e => {
    const { dispatch, DataState, UIState } = this.props;
    // console.log(e)
    dispatch(actions.UpUIState.editAlltModalTipsVisible());
    dispatch(actions.UpUIState.HandleLeaderModalClose());
  };

  // 添加事件
  onAddLeader = e => {
    const { dispatch, DataState, UIState } = this.props;
    this.setState({
      userKey: "add"
    });
    dispatch(actions.UpUIState.AddLeaderModalOpen());
  };
  handleAddLeaderModalOk = e => {
    // console.log(e)
    let url = "/AddSchoolLeader";

    const { DataState, dispatch, UIState } = this.props;
    let picObj = DataState.GetPicUrl.picObj;
    const { initLeaderMsg, changeLeaderMsg } = DataState.SetLeaderMsg;
    let visible = UIState.EditModalTipsVisible;
    let haveMistake = false;
    for (let visi in visible) {
      if (visible[visi]) {
        return;
      }
    }
    //用户ID必填
    if (changeLeaderMsg.userID === "") {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          UserIDTipsVisible: true
        })
      );
      haveMistake = true;
    }
    //用户名必填
    if (changeLeaderMsg.userName === "") {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          UserNameTipsVisible: true
        })
      );
      haveMistake = true;
    }
    //性别必选
    if (!changeLeaderMsg.gender) {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          GenderTipsVisible: true
        })
      );
      haveMistake = true;
    }
    //职务必选
    if (!changeLeaderMsg.position) {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          PositionTipsVisible: true
        })
      );
      haveMistake = true;
    }
    // console.log(haveMistake)
    if (haveMistake) {
      return;
    }
    // console.log(visible,haveMistake)
    if (
      Public.comparisonObject(changeLeaderMsg, initLeaderMsg) &&
      !picObj.picUploader.isChanged()
    ) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-error",
          title: "你没有填写资料哦",
          ok: this.onAppAlertOK.bind(this),
          cancel: this.onAppAlertCancel.bind(this),
          close: this.onAppAlertClose.bind(this)
        })
      );
      return;
    } else {
      if (picObj.picUploader.uploadSubmit()) {
        let { position, ...data } = changeLeaderMsg;

        postData(
          CONFIG.UserInfoProxy + url,
          {
            ...changeLeaderMsg,
            photoPath: picObj.picUploader.getCurImgPath(),
            position: position.title
          },
          2
        )
          .then(res => {
            return res.json();
          })
          .then(json => {
            // if (json.StatusCode !== 200) {
            //   dispatch(
            //     actions.UpUIState.showErrorAlert({
            //       type: "btn-error",
            //       title: json.Msg,
            //       ok: this.onAppAlertOK.bind(this),
            //       cancel: this.onAppAlertCancel.bind(this),
            //       close: this.onAppAlertClose.bind(this)
            //     })
            //   );
            // } else 
            if (json.StatusCode === 200) {
              // console.log(json.Data)
              dispatch(
                actions.UpUIState.showErrorAlert({
                  type: "success",
                  title: "操作成功",
                  onHide: this.onAlertWarnHide.bind(this)
                })
              );
              this.setState({
                studentModalVisible: false
              });
              dispatch(actions.UpUIState.AddLeaderModalClose());
              this.setState({
                checkedList: [],
                checkAll: false
              });

              dispatch(
                actions.UpDataState.getSchoolLeaderPreview(
                  "/GetSchoolLeader?SchoolID=" +
                    this.state.userMsg.SchoolID +
                    this.state.sortFiled +
                    this.state.sortType
                )
              );
              dispatch(actions.UpUIState.editAlltModalTipsVisible());
            }
          });
      }
    }
  };
  //关闭
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    //console.log('ddd')
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  handleAddLeaderModalCancel = e => {
    const { dispatch } = this.props;
    // console.log(e)
    dispatch(actions.UpUIState.editAlltModalTipsVisible());

    dispatch(actions.UpUIState.AddLeaderModalClose());
  };

  LeaderChangeMadalOk = e => {
    const { dispatch } = this.props;

    dispatch({ type: actions.UpUIState.LEADER_CHANGE_MODAL_CLOSE });
  };
  LeaderChangeMadalCancel = e => {
    //  console.log(e)
    const { dispatch } = this.props;

    dispatch({ type: actions.UpUIState.LEADER_CHANGE_MODAL_CLOSE });

  };

  render() {
    const { UIState, DataState } = this.props;

    return (
      <div className="Leader">
        <div className="Leader-box">
          <div className="Leader-top">
            <span className="top-tips">
              <span className="tips menu35 ">领导档案</span>
            </span>
            <div className="top-nav">
              {/* <Link className='link' to='/GraduteArchives' replace>查看毕业生档案</Link>
                            <span className='divide'>|</span> */}
              <span
                className="link"
                style={{ cursor: "pointer" }}
                onClick={this.onAddLeader}
              >
                <span className="add">添加领导</span>
                
              </span>
              <span className="divide">|</span>
              <Link
                className="link"
                target="_blank"
                to="/ImportFile/Leader"
                replace
              >
                <span className="ImportFile">导入领导</span>
                
              </Link>
            </div>
          </div>
          <div className="Leader-hr" ></div>
          <div className="Leader-content">
            <div className="content-render">
              <CheckBoxGroup
                style={{ width: "100%" }}
                value={this.state.checkedList}
                onChange={this.onCheckBoxGroupChange.bind(this)}
              >
                <Table
                  className="table"
                  loading={UIState.AppLoading.TableLoading}
                  columns={this.state.columns}
                  pagination={false}
                  onChange={this.onTableChange.bind(this)}
                  dataSource={DataState.SchoolLeaderPreview.newList}
                ></Table>
              </CheckBoxGroup>
              {DataState.SchoolLeaderPreview.Total > 0 ? (
                <div style={{    display: 'inline-block'}}>
                <CheckBox
                  className="checkAll-box"
                  type='gray'
                  onChange={this.OnCheckAllChange}
                  checked={this.state.checkAll}
                >
                  <span className='checkAll-title'>全选</span>
                  
                </CheckBox>
                <Button
                onClick={this.onDeleteAllClick}
                className="deleteAll"
                color="blue"
              >
                删除
              </Button>
              </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        {/* 用户详情弹窗 */}
        <DetailsModal
          ref="LeaderDetailsMsgModal"
          visible={this.state.LeaderDetailsMsgModalVisible}
          onOk={this.LeaderDetailsMsgModalOk}
          onCancel={this.LeaderDetailsMsgModalCancel}
          data={this.state.detailData ? this.state.detailData : []}
          type="leader"
        ></DetailsModal>
        {/* 模态框 */}
        <Modal
          ref="handleLeaderMadal"
          bodyStyle={{ padding: 0 }}
          type="1"
          title="编辑领导"
          visible={UIState.AppModal.handleLeaderModalVisible}
          onOk={this.handleLeaderModalOk}
          onCancel={this.handleLeaderModalCancel}
        >
          {UIState.AppModal.handleLeaderModalVisible ? (
            <EditModal type="leader" userKey={this.state.userKey}></EditModal>
          ) : (
            ""
          )}
        </Modal>
        <Modal
          ref="handleLeaderMadal"
          bodyStyle={{ padding: 0 }}
          type="1"
          title={"添加领导"}
          visible={UIState.AppModal.addLeaderModalVisible}
          onOk={this.handleAddLeaderModalOk}
          onCancel={this.handleAddLeaderModalCancel}
        >
          {UIState.AppModal.addLeaderModalVisible ? (
            <EditModal type="leader" userKey={this.state.userKey}></EditModal>
          ) : (
            ""
          )}
        </Modal>
        <Modal
          ref="StudentChangeMadal"
          bodyStyle={{ padding: 0 }}
          type="2"
          width={650}
          visible={UIState.AppModal.LeaderChangeMadalVisible}
          onOk={this.LeaderChangeMadalOk}
          onCancel={this.LeaderChangeMadalCancel}
        >
          {DataState.GetUserLog.UserLog instanceof Array &&
          DataState.GetUserLog.UserLog.length > 0 ?(<div className="modal-studentChange">
            <div className="content-top">
              <img
                src={IconLocation}
                width="30"
                height="40"
                alt="icon-location"
              />
              <span className="top-text">
                {this.state.leaderChangeUserLog.UserName}的档案变更记录
              </span>
            </div>
            <div className="content">
            <Scrollbars style={{ width: 100 + "%", height: 280 + "px" }}>

              {UIState.AppModal.LeaderChangeMadalVisible ? (
                <StudentChangeRecord data={DataState.GetUserLog.UserLog}></StudentChangeRecord>
              ) : (
                ""
              )}
              </Scrollbars>
            </div>
          </div>): (
            <Empty
              type="4"
              title="该用户暂无档案变更记录"
              style={{ marginTop: "200px", transform: "translateY(-50%)" }}
            ></Empty>
          )}
        </Modal>
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
export default connect(mapStateToProps)(Leader);
