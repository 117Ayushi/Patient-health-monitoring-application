import axios from 'axios';
import config from '../config';

export function bpRecordRequest(userData) {
  return axios.post(`${config.url}/api/bp`, userData, {
      Accept: 'application/json',
      'content-type': 'multipart/form-data'
  }
);
}


export function getBpRecordRequest(id) {
  return axios.get(`${config.url}/api/bp/${id}`);
}


export function getCountRequest(id) {
  return axios.get(`${config.url}/api/bp/count/${id}`);
}
