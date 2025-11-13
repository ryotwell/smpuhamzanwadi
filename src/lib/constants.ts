export const PAGES = {
    ROOT: '/',
    DASHBOARD: '/admin',
    SIGN_IN: '/auth/signin',
    SIGN_UP: '/auth/signup',
} as const

export const APIPATHS = {
    // SIGNIN: '/user/login',
    // FETCHPOSTS: '/posts',
    // FINDPOST: '/posts',
    // STOREPOST: '/posts',
    // UPDATEPOST: '/posts',
    // DELETE: '/posts',
    // STORESTUDENTPPDB: '/ppdb/pendaftaran'

    // farid
    SIGNIN: '/user/login',
    FETCHPOSTS: '/post/get-all',
    FINDPOST: '/post/get',
    STOREPOST: '/post/add',
    UPDATEPOST: '/post/update',
    DELETE: '/post/delete',

    STORESTUDENTPPDB: '/ppdb/add'
} as const
