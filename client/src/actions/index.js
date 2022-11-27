import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/currentuser'); 
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  // We know without a doubt that the response to this post request right here is the updated user model or the user model with the new number of credits.
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data }); //  update the value in the reducer
};


//action creator

