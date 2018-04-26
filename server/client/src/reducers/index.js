import { combineReducers } from 'redux';
import authReducer from './authReducer';

export default combineReducers({
  //represent keys inside state object
  //(auth state manufactured by authReducer)
  auth: authReducer
});
