import logo from '../images/frame/logo.png';

let config = {};

if (process.env.NODE_ENV === 'development'){

    config = {
        name:"中小学一体化学科教育云",
        logo:logo,
        footer:"蓝鸽科技 版权所有",
        TokenProxy:'http://192.168.129.1:30103',
        // TokenProxy:'http://47.115.20.102:10102',
        SubjectProxy:'http://192.168.129.1:30103/Subject/api',
        CourseClassProxy:'http://192.168.129.1:30103/CourseClass/api',
        MyCourseClassProxy:'http://192.168.129.1:30103',
        UserAccountProxy:'http://192.168.129.1:30103/UserMgr/UserAccount',
        TeachingSolutionProxy:'http://192.168.129.1:30103/SubjectResMgr/TeachingSolutionMgr/Teacher',
        AdmClassProxy:"http://192.168.129.1:30103",
        DeskTopProxy:"http://192.168.129.1:30103",
        // CustomProxy:"http://192.168.2.114:8090",
        PicProxy:'http://192.168.129.1:30103',

        CustomProxy:"http://192.168.129.1:30103",
        // WebsiteProxy:"http://192.168.2.114:8090",
        WebsiteProxy:"http://192.168.129.1:30103",
        ScheduleProxy:"http://192.168.129.1:30103",
        // ScheduleProxy:"http://47.115.20.102:10102",
        Xproxy:'http://192.168.129.1:30103/UserMgr/UserInfoMgr',
        PowerProxy:'http://192.168.129.1:30103/UserMgr/PowerMgr',
        // PowerProxy:'http://47.115.20.102:10102/UserMgr/PowerMgr',
        UserInfoProxy:'http://192.168.129.1:30103/UserMgr/UserInfoMgr',
        proxy:"http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev",
        BasicProxy:'http://localhost:3000',
        LoginProxy:'http://192.168.129.2:10102',
        MockLoginProxy:'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev',
        PersonalProxy:"http://192.168.129.1:30103",
        ErrorProxy:"http://192.168.129.1:30103",
        XTestProxy:'http://192.168.129.1:30103/UserMgr/UserInfoMgr',
        Import:'http://192.168.129.1:30103',
        SysSettingProxy:'http://192.168.129.1:30103',
        ImgUrlProxy:'http://192.168.129.1:30103',
        // SysSettingProxy:'http://192.168.2.114:8090',
        tempSubsystemProxy:'http://192.168.2.202:7300/mock/5db974a3a1aded10689632eb/example',
        DataCollectorProxy:"http://192.168.129.1:30103",
        // DataCollectorProxy:"http://192.168.2.114:8090",

    }

}


if (process.env.NODE_ENV === 'production'){

    config = {
        name:"中小学一体化学科教育云",
        logo:logo,
        footer:"蓝鸽科技 版权所有",
        TokenProxy:'',
        SubjectProxy:'/Subject/api',
        CourseClassProxy:'/CourseClass/api',
        UserAccountProxy:'/UserMgr/UserAccount',
        TeachingSolutionProxy:'/SubjectResMgr/TeachingSolutionMgr/Teacher',
        AdmClassProxy:"",
        DeskTopProxy:"",
        ScheduleProxy:'',
        Xproxy:'/UserMgr/UserInfoMgr',
        PowerProxy:'/UserMgr/PowerMgr',
        UserInfoProxy:'/UserMgr/UserInfoMgr',
        BasicProxy:'http://localhost:3000',
        LoginProxy:'',
        MockLoginProxy:'',
        ImgUrlProxy:'',
        PersonalProxy:"",
        CustomProxy:'',
        PicProxy:'',
        WebsiteProxy:'',
        ErrorProxy:'',
        MyCourseClassProxy:'',
        XTestProxy:'/UserMgr/UserInfoMgr',
        Import:'',
        SysSettingProxy:"",
        tempSubsystemProxy:"",
        DataCollectorProxy:""

    }

}




export default config;
