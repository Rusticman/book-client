import React, {PropTypes, Component} from 'react';
import {reduxForm, Field, SubmissionError} from 'redux-form';

class DetailsForm extends Component{

  handleDetailsSubmit(value){
 this.props.locationAndEmailDetails(value.location,value.email);

  }

  render(){

      const { error, pristine, reset, submitting, handleSubmit, detailsFormOpacity} = this.props;

    const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div className="fieldWrapper">
        <label>{label}:</label>
          <input className="detailsInput" {...input} placeholder={label} type={type}/><br/>
          <div className="detailsErrorMessage">
        {touched && ((error && <span className="errorFormMessage" >{error}</span>) )}
        </div>
    </div>
)

    return(
      <div id="detailFormContainer" className={detailsFormOpacity}>
      <div>Please fill in your details to enable book exchanges:</div>
        <form autoComplete="off" id="detailsForm" onSubmit={handleSubmit(this.handleDetailsSubmit.bind(this))}>
          <Field name="location" id="locationInput" label="location" type="text" component={renderField} />
          <Field name="email" id="emailInput" label="email" type="text" component={renderField} />
            <button action="submit" id="submitDetailsButton">submit</button>
        </form>
      </div>
    )
  }
}

function validate(values){
  const errors = {};

  if (!values.email){
    errors.email = 'Enter an email address';
  }

  if (!values.location){
    errors.location = 'Enter a location';
  }

  return errors;
}

export default reduxForm({
  form:'detailsform',
  validate
})(DetailsForm)
