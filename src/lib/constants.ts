export const PAGES = {
    ROOT: '/',
    DASHBOARD: '/admin',
    SIGN_IN: '/auth/signin',
    SIGN_UP: '/auth/signup',
} as const

export const APIPATHS = {
    SIGNIN: '/user/login',
    PROFILE: '/user/profile',

    FETCHPOSTS: '/post/get-all',
    FINDPOST: '/post/get',
    STOREPOST: '/post/add',
    UPDATEPOST: '/post/update',
    DELETEPOST: '/post/delete',

    FETCHSTUDENTS: '/student/get-all',
    FINDSTUDENT: '/student/get',
    STORESTUDENT: '/student/add',
    UPDATESTUDENT: '/student/update',
    DELETESTUDENT: '/student/delete',

    FETCHBATCHES: '/batch/get-all',
    FINDBATCH: '/batch/get',
    STOREBATCH: '/batch/add',
    UPDATEBATCH: '/batch/update',
    DELETEBATCH: '/batch/delete',

    // public api routes
    STORESTUDENTPPDB: '/ppdb/add',
} as const
