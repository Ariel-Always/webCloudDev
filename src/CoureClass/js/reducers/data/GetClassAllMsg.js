import UpDataState from '../../actions/UpDataState';
import history from '../../containers/history'
import { utimes } from 'fs';

const GetClassAllMsg = (state = {allClass:{}}, actions) => {
    switch (actions.type) {
        case UpDataState.GET_CLASS_ALL_MSG:
            
            let data = handleData(actions.data,actions.subject,actions.Class)
            return Object.assign({}, state, {allClass:data} );
        default:
            return state;
    }
};

function handleData(data,subject,Class) {
    
    const {Item,...others} = data;
    let TableData = Item.map((item,index) => {
        return {
            OrderNO:{OrderNO:item.OrderNO,key:index},
            CourseClass:{
                ClassID:item.CourseClassID,
                ClassName:item.CourseClassName,
                GradeID:item.GradeID,
                GradeName:item.GradeName,
                SubjectID:item.SubjectID,
                SubjectName:item.SubjectName,
                CourseClassLogoURL:item.CourseClassLogoURL
            },
            ClassMsg:{
                TeacherName:item.TeacherName,
                TeacherID:item.TeacherID,
                TeacherImg:item.TeacherProfilePictureURL
            },
            StudentCount:item.StudentCount,
            key:index,
        }
    })
    return {...data,TableData:TableData,subject:subject,Class:Class};
}
export default GetClassAllMsg;