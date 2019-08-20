import React,{Component} from 'react';
import {CheckBox} from "../../../common";


class StudentTabWrapper extends Component{

    render() {

        const {StudentList} = this.props;

        return (

            <div className="person-tab-wrapper clearfix">

                {
                    StudentList.List&&StudentList.List.map((item,key) => {
                        //是否是班长
                        let isMonitor = item.UserClass===1?true:false;
                        //性别男女或者保密
                        let sex= 'none';

                        switch (item.Gender) {
                            case '男':
                                sex = 'men';
                                break;
                            case '女':
                                sex = 'women';
                                break;
                            default:
                                sex = 'none'
                        }

                       return <div key={key} className={`person-item-wrapper ${isMonitor?'monitor':''}`}>

                                    <div className="person-item-content clearfix">

                                        <div className="person-item-photo" style={{backgroundImage:`url(${item.PhotoPath})`}}></div>

                                        <div className="person-item-info-wrapper">

                                            <div className="person-item-info">

                                                <div className="person-item-name" title={item.UserName}>{item.UserName}</div>

                                                <div className={`person-sex-icon ${sex}`}></div>

                                            </div>

                                            <div className="person-item-id" title={item.UserID}>{item.UserID}</div>

                                        </div>

                                        <CheckBox  value={item.UserID}></CheckBox>

                                    </div>

                                    <div className="person-item-border"></div>

                              </div>

                    })
                }

            </div>
        );
    }
}
export default StudentTabWrapper;