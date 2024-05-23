import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3000'

export function getUserRouters(uid) {
    return axios.post('/user_router_auth', { uid }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => {
        return res.data;
    }).catch(err => {
        throw err;
    })
}