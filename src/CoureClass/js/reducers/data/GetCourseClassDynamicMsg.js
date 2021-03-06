import UpDataState from '../../actions/UpDataState';
import history from '../../containers/history'


const GetCourseClassDynamicMsg = (state = {}, actions) => {
    switch (actions.type) {
        case UpDataState.GET_COURSE_CLASS_DYNAMIC_MSG:
            
            let data = handleData(actions.data,actions.subject,actions.Class)
            return Object.assign({}, state, {tableSource:data} );
        default:
            return state;
    }
};

function handleData(data) {
    let newData = data instanceof Array &&data.map((child,index) => {
        let {Flag,OperateParams,CourseClassIDs,...Data} = child
        let params = OperateParams.split('-');
        let OperateContent = '';
        params instanceof Array && params.map((param,key) => {
            if(key%2){
                
                OperateContent += `<span className='key-params'>${param}</span>`
                
            }else{
                OperateContent += param
            }
        })
        return {...Data,OperateParams:{OperateParams:params,Flag:Flag,CourseClassIDs:CourseClassIDs},key:index}
    })
    return newData
}
export default GetCourseClassDynamicMsg;