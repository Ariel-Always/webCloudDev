import UpDataState from '../../actions/UpDataState';



const GradeStudentPreview = (state={keyList:[],newList:[],Total:0},actions)=>{
    switch (actions.type) {
        case UpDataState.GET_GRADE_STUDENT_PREVIEW:
            let {Total,...list} = actions.data;

            let {newList,keyList }= handleData(list);
            
            return Object.assign({},state,{Total,newList,keyList});
        default:
            return state;
    }
} ;

function handleData(data){
    let keyList = [];
    let newList = data.List.map((child,index) => {
        let list = {}
        list.key = index;
        list.UserName = {
            Name: child.UserName,
            UserID: child.UserID,
            key: index
        }
        list.ShortName = child.ShortName;
        list.Sign = child.Sign;
        list.Gender = child.Gender;
        list.UserImg = child.PhotoPath;
        list.UserContact = {
            QQ: child.QQ,
            WeiXin: child.Weixin,
            Telephone: child.Telephone,
            Weibo: child.Weibo
        }
        list.handle = {
            key:index
        }
        keyList.push(list.key);
        
        
        let {UserID,Grader,GradeName,ClassName,PhotoPath,UserName,...others} = child;
        list.Others = child;
        return list

    })
    return {newList,keyList};
}

export default  GradeStudentPreview;