import HeaderActions from '../../actions/Teacher/HeaderActions';
import TeacherCustomActions from '../../actions/Teacher/TeacherCustomActions';

const TeacherCustomModalShow = (state = { Show: false, key: 'tool', AddWebsiteCustomModalShow: false }, actions) => {
    switch (actions.type) {
        case HeaderActions.TEACHER_CUSTOM_MODAL_OPEN:
            return Object.assign({}, state, { Show: true, key: actions.key });
        case HeaderActions.TEACHER_CUSTOM_MODAL_CLOSE:
            return Object.assign({}, state, { Show: false, key: actions.key });
        case TeacherCustomActions.TEACHER_ADD_WEBSITE_CUSTOM_MODAL_OPEN:
            return Object.assign({}, state, { AddWebsiteCustomModalShow: true });
        case TeacherCustomActions.TEACHER_ADD_WEBSITE_CUSTOM_MODAL_CLOSE:
            return Object.assign({}, state, { AddWebsiteCustomModalShow: false });
        default:
            return state;
    }
};
export default TeacherCustomModalShow;