import axios from "axios";
axios.defaults.baseURL = 'http://localhost:8888'

export function httpGet(url) {
    return new Promise((resolve, reject) => {
        axios.get(url).then(res => {
            if (res.data.code == 0) {
                resolve(res.data.data)
            } else {
                reject(res.data.msg)
            }
        }).catch(err => {
            reject(err)
        })
    })
}

export function httpPost(url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(res => {
            if (res.data.code == 0) {
                resolve(res.data.data)
            } else {
                reject(res.data.msg)
            }
        }).catch(err => {
            reject(err)
        })
    })
}