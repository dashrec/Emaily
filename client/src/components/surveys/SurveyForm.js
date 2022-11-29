//SurveyForm shows a form for a user to add input
//The Field component is a helper provided by redux-form for rendering absolutely any type of traditional HTML form element. like text areas, text inputs, file inputs, checkboxes radio buttons.
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'; // The reduxForm helper right here is what allows redux form to communicate with our Redux store at the top of app.
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component { // child component of SurveyNew component

  renderFields() {
    return _.map(formFields, ({ label, name }) => {  // So if we add any type of custom prop to the Field down, they will be automatically forwarded to SurveyField
      return (
        <Field key={name} component={SurveyField} type="text" label={label} name={name} /> //prop of component tells to appear as an HTML input tag
      );
    });

  }


// handleSubmit function is provided to us automatically by the reduxForm form helper
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>  
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }

}

function validate(values) { // values have all key-values from field in it  
  const errors = {}; // Now, if Redux Form gets that errors object is empty, redox form assumes that the entire form is valid and everything is ready in.
  errors.recipients = validateEmails(values.recipients || '');
  _.each(formFields, ({ name }) => {
    if (!values[name]) { // reference a property on an object  to figure out the property name at runtime. So if we just said values.name, that would be looking up specifically just the name property,
      errors[name] = 'You must provide a value';   
    }
 
  });
  return errors; 
}
// The reduxForm function right here is so similar to the connect function, in fact, that it is wired up to our component with the exact same method signature.
export default reduxForm({ //wire up reduxForm to our component
  validate,
  form: 'surveyForm', // surveyForm will be the key inside of state, state.form.surveyForm.values  gives values of inputs inside SurveyFormReview
  destroyOnUnmount: false
})(SurveyForm);

//we might have different forms inside of our app. And We don't want all their values to kind of conflict or hit each other.
//validate:validate can be condensed down to validate
