import { config } from '@/config'
import Axios from 'axios'

const axios = Axios.create({
    baseURL: config.apiUrl,
    // headers: {
    //     'X-Requested-With': 'XMLHttpRequest',
    // },
    withCredentials: true,
    // withXSRFToken: true
});

export default axios