import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

// Development only axios helpers!
 import axios from 'axios';
window.axios = axios; 

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  //<React.StrictMode>
     <Provider store={store}><App /></Provider>,
  //</React.StrictMode>
);

/* console.log('Stripe Key is:', process.env.REACT_APP_STRIPE_KEY);
console.log('Environment is:', process.env.NODE_ENV); */

// The first argument is our route components, and then the second is where we are attempting to render that component to inside of our Dom.