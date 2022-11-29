// SurveyField contains logic to render a single
// label and text input
import React from 'react';

// destructing props, pull out input, label ..
const SurveyField = ({ input, label, meta: { error, touched } }) => { // receive label from surveyForm. touched property means like click-true, unClick-false
  //console.log(label);
  return (

    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '5px' }} /> 

      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error} 
      </div>

    </div>
  );
};
export default SurveyField;

// if touched is true and the error exists, then show the error.