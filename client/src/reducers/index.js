import { combineReducers } from 'redux';
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer
});


// The purpose of calling these files index is to allow us to simply import the reducers directory, which
//by convention with import statements will automatically give us any file inside that directory that is called index.