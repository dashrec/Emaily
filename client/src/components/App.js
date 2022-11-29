import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions'; // import all of different action creators 
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

/*  const Dashboard = () => <h2>Dashboard</h2>;   
const SurveyNew = () => <h2>SurveyNew</h2>;*/

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(null, actions)(App); //we use the connect function to give certain components the ability to call action creators.
// once we pass in actions, they are assigned to the app component as props.


// If a given file is exporting a class or a react component of any type via a functional component or a class based component, we will label it with a capital letter.
// But if the file returns just a function or just a series of functions or something like that, we will label it with a lowercase leading character.
// JSX allows us to write HTML elements in JavaScript and place them in the DOM
// BrowserRouter tells react How to behave. It looks at the current URL and then changes the set of components that are visible on the screen at any given time.
// The route object is a react component that is used to set up a rule between a certain routes
// that the user might visit inside of an application and a set of components that will be actually visible on the screen.

