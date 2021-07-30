import axios from 'axios';

// const baseUrl = 'http://127.0.0.1:8080/api';
// const baseUrl = 'http://192.168.219.101:8080/api';
const authUrl = process.env.REACT_APP_AUTH_SERVER_URL;


export default function authApi() {
    return axios.create({
        'baseURL': authUrl,
        'headers': {
            'Content-Type' : 'application/json'
        }
    });
}

export function dataApi(accessToken: string | undefined) {
    return axios.create({
        'baseURL': authUrl,
        'headers':{
            'X-AUTH-TOKEN': accessToken
        }
    });
}




