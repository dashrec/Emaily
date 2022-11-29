// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview onCancel={() => this.setState({ showFormReview: false })} /> //so wire up this callback function in SurveyFormReview component
      );
    }

    //Now inside of SurveyForm, whenever a user attempts to submit the form, we will run this callback, which will update our state inside of surveyNew and cause the SurveyFormReview to be shown instead.
    return (
      <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })} />  //so wire up this callback function in SurveyForm component
    );
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm({ 
  form: 'surveyForm'
})(SurveyNew);

//once a user navigates away from this surveyNew component, dump values inside of form. don't set destroyOnUnmount: false. 
//So true is a default behavior we do not need to specify