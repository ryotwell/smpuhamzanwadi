export const PAGES = {
    ROOT: '/',
    DASHBOARD: '/admin',
    SIGN_IN: '/auth/signin',
    SIGN_UP: '/auth/signup',
} as const

export const APIPATHS = {
    SIGNIN: '/api/v1/user/login',
    PROFILE: '/api/v1/user/profile',
    DASHBOARD: '/api/v1/dashboard/',
    EXPORTSTUDENTS: '/api/v1/ppdb/data-siswa', // /api/v1/ppdb/data-siswa/:batch_id

    FETCHPOSTS: '/api/v1/post/get-all',
    FINDPOST: '/api/v1/post/get',
    STOREPOST: '/api/v1/post/add',
    UPDATEPOST: '/api/v1/post/update',
    DELETEPOST: '/api/v1/post/delete',

    FETCHSTUDENTS: '/api/v1/student/get-all',
    FINDSTUDENT: '/api/v1/student/get',
    STORESTUDENT: '/api/v1/student/add',
    UPDATESTUDENT: '/api/v1/student/update',
    DELETESTUDENT: '/api/v1/student/delete',

    FETCHBATCHES: '/api/v1/batch/get-all',
    FINDBATCH: '/api/v1/batch/get',
    STOREBATCH: '/api/v1/batch/add',
    UPDATEBATCH: '/api/v1/batch/update',
    DELETEBATCH: '/api/v1/batch/delete',

    FETCHCURRICULUMS: '/api/v1/curriculum/get-all',
    FINDCURRICULUM: '/api/v1/curriculum/get',
    STORECURRICULUM: '/api/v1/curriculum/add',
    UPDATECURRICULUM: '/api/v1/curriculum/update',
    DELETECURRICULUM: '/api/v1/curriculum/delete',

    FETCHFACILITIES: '/api/v1/facility/get-all',
    FINDFACILITY: '/api/v1/facility/get',
    STOREFACILITY: '/api/v1/facility/add',
    UPDATEFACILITY: '/api/v1/facility/update',
    DELETEFACILITY: '/api/v1/facility/delete',

    FETCHREQUIREMENTS: '/api/v1/requirement/get-all',
    FINDREQUIREMENT: '/api/v1/requirement/get',
    STOREREQUIREMENT: '/api/v1/requirement/add',
    UPDATEREQUIREMENT: '/api/v1/requirement/update',
    DELETEREQUIREMENT: '/api/v1/requirement/delete',

    FETCHFAQS: '/api/v1/faq/get-all',
    FINDFAQ: '/api/v1/faq/get',
    STOREFAQ: '/api/v1/faq/add',
    UPDATEFAQ: '/api/v1/faq/update',
    DELETEFAQ: '/api/v1/faq/delete',

    // public api routes
    STORESTUDENTPPDB: '/api/v1/ppdb/add',
    ACTIVEBATCH: '/api/v1/batch/get-active',
} as const
