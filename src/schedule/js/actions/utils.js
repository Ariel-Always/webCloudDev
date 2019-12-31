import AppAlertActions from './AppAlertActions';

//移除重复的课表
const ScheduleRemoveRepeat = (Schedule) =>{

    let NewSchedule = [];

    let UniqueSchedule = Array.from(new Set(Schedule));

    UniqueSchedule.map(item=>{

        const FindIndex = NewSchedule.findIndex(i=>((i.WeekDay===item.WeekDay)&&(i.ClassHourNO===item.ClassHourNO)));

        if (FindIndex>=0){

            if (item.IsOver&&(parseInt(item.IsOver)===0)){

                NewSchedule.splice(FindIndex,1,item)

            }

        }else{

            NewSchedule.push(item);

        }

    });

    return NewSchedule;

};

//搜索正则
const SearchReg = ({key,type,dispatch,ErrorTips}) => {

    let pattern = '';

     if (type===1){

        pattern =  /^[A-Za-z0-9]{1,30}$|^[a-zA-Z0-9_.·\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_.·\u4e00-\u9fa5]$/

     }else{

         pattern =  /^[_\->/()（）A-Za-z0-9\u4e00-\u9fa5]{0,50}$/

     }

     if (pattern.test(key)){

         return true;

     }else{

        dispatch(AppAlertActions.alertWarn({title:ErrorTips}));

        return false;

     }


};

export default {

    ScheduleRemoveRepeat,

    SearchReg

}