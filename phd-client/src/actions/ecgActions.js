import axios from 'axios';
import config from '../config';

export function ecgRecordRequest(userData) {
  return axios.post(`${config.url}/api/ecg`, userData, {
    Accept: 'application/json',
    'content-type': 'multipart/form-data'
  });
}


export function getEcgRecordRequest(id) {
  return axios.get(`${config.url}/api/ecg/${id}`);
}


export function getCountRequest(id) {
  return axios.get(`${config.url}/api/ecg/count/${id}`);
}
