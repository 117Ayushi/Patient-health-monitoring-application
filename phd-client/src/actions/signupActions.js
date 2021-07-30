import axios from 'axios';
import config from '../config';

export function userSignupRequest(userData) {
    return axios.post(`${config.url}/api/user`, userData);
}

export function isUserExists(identifier) {
    return axios.get(`${config.url}/api/user/${identifier}`);
}
