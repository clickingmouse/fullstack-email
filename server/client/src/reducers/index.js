import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
  //represent keys inside state object
  //(auth state manufactured by authReducer)
  auth: authReducer,
  form: reduxForm
});
