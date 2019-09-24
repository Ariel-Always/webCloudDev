import UpUIState from '../../actions/UpUIState';
const EditModalTipsVisible = (state = { 
    UserNameTipsVisible: false,
    GradeTipsVisible: false,
    TitleTipsVisible: false,
    ClassTipsVisible: false,
    TelephoneTipsVisible: false,
    EmailTipsVisible: false,
    IDCardNoTipsVisible: false,
    HomeAdressTipsVisible: false,
    GenderTipsVisible: false,
    changeSubjectTipsVisible: false,
    TitleIDVisible: false,
}, actions) => {
    switch (actions.type) {
        case UpUIState.EDIT_MODAL_TIPS_VISIBLE:
            return Object.assign({}, state, { ...actions.data });
        
        default:
            return state;
    }
};
export default EditModalTipsVisible;