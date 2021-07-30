import { combineReducers } from 'redux';

import auth from './auth';

// Combine all the reducers
const rootReducer = combineReducers({ auth });

export default rootReducer;
