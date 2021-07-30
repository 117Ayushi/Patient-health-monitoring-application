import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { AsyncStorage } from  'react-native';

import setAuthorizationToken from '../utils/setAuthorizationToken';
import config from '../config';


export function logout() {
    AsyncStorage.removeItem('jwtToken');
    setAuthorizationToken(false);

}

export function  login(data) {
    return axios.post(`${config.url}/api/auth`, data).then(res => {
      const username = res.data.user.name;
      const role = res.data.user.role;
      const id = res.data.user.id.toString();
      const mobile = res.data.user.mobile.toString();
      const age = res.data.user.age.toString();
      const address = res.data.user.address;
      const token = res.data.token;

      AsyncStorage.multiSet([['jwtToken', token], ['username', username], ['role', role], ['user_id', id], ['age', age], ['address', address], ['mobile', mobile]]);
      setAuthorizationToken(token);
    });
}
