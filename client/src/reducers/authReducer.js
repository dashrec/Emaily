import { FETCH_USER } from '../actions/types';

const authReducer = (state = null, action) => {
 // console.log(action);
  switch (action.type) {
    case FETCH_USER: // any single time that an action comes across with a type of FETCH_USER, we return the actions payload.
      return action.payload || false; // the reducer updates, the value it pulls off the new user model


    default:
      return state;
  }
}
export default authReducer;

// And we have said that the authReducer, is really just responsible for deciding whether or not a user is currently logged in.