/*
在ActionCreator里面完成数据的获取与处理的工作。并且通过向store发送各个组合的action，从而达到控制界面展示的内容实现交互。
 */

/*
在ActionCreator里面完成数据的获取与处理的工作。并且通过向store发送各个组合的action，从而达到控制界面展示的内容实现交互。
 */
import UpDataState from './UpDataState';
import UpUIState from './UpUIState';
// const FetchFail = (Status) => {
//     switch (Status) {
//         case 400:
//             break;
//         case 401:
//            window.location.href="http://localhost:3000/html/login";
//            break;
//         case 403:
//             window.location.href="http://localhost:3000/html/login";
//             break;
//         case 500:
//             break;
//         default:
//             return;
//     }
// }


const actions = {
    UpDataState,
    UpUIState,
};
export default actions;

