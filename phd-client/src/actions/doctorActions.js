import axios from 'axios';
import config from '../config';


export function getPatientDetails(identifier) {
    return axios.get(`${config.url}/api/user/${identifier}`);
}
