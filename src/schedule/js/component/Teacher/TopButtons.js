import React,{Component} from 'react';

import { Button } from "../../../../common";

class TopButtons extends Component{

    render() {

        const { AdjustScheduleShow,Import,AddTempScheduleShow } = this.props;

        return (

            <div className="teacher-top-btns clearfix">

                <Button color="blue" className="teacher-btn adjust-schedule" onClick={()=>AdjustScheduleShow()}>调整课表</Button>

                <Button color="blue" className="teacher-btn import-schedule" onClick={()=>Import()}>导入课程安排</Button>

                <Button color="blue" className="teacher-btn adjust-schedule" onClick={()=>AddTempScheduleShow()}>添加临时课程</Button>

            </div>

        );

    }

}

export default TopButtons;