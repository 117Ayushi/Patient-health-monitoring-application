import axios from 'axios';
import config from '../config';

export function temperatureRecordRequest(userData) {
    return axios.post(`${config.url}/api/temperature`, userData);
}


export function getTemperatureRecordRequest(id) {
    return axios.get(`${config.url}/api/temperature/${id}`);
}


export function getCountRequest(id) {
  return axios.get(`${config.url}/api/temperature/count/${id}`);
}
