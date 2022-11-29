import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/currentuser'); 
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  // We know without a doubt that the response to this post request right here is the updated user model or the user model with the new number of credits.
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data }); //  update the value in the reducer
};


export const submitSurvey = (values, history) => async dispatch => { // get history from inside review submitSurvey function with formValues
  const res = await axios.post('/api/surveys', values);

  history.push('/surveys'); // redirect back  to / route
  dispatch({ type: FETCH_USER, payload: res.data });
};


export const fetchSurveys = () => async dispatch => { 
  const res = await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data }); // So the payload will be in array that contains all the different surveys that our current user has made.
};


//action creator

