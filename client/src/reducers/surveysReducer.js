import { FETCH_SURVEYS } from '../actions/types';

const surveysReducer = function(state = [], action) { // So when the application first boots up our surveys, piece of state will be an empty array.
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
}
export default surveysReducer;