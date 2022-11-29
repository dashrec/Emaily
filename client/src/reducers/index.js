import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

export default combineReducers({
  auth: authReducer, // The keys are very important because those are the keys that this reducers output will be stored on in our state object maintained by redux.
  form: reduxForm,
  surveys: surveysReducer
});


// The purpose of calling these files index is to allow us to simply import the reducers directory, which
//by convention with import statements will automatically give us any file inside that directory that is called index.