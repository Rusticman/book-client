import React, {PropTypes, Component} from 'react';
import {reduxForm, Field, SubmissionError} from 'redux-form';

class DetailsForm extends Component{

  handleDetailsSubmit(value){
    if(value.location.length > 0 && value.email.length > 0){
      this.props.locationAndEmailDetails(value.location,value.email);
      this.props.detailsFormSlider(false);
      value.location = "";
      value.email = "";
      this.props.showFormMessage(false);
    }
  }

  areFormsFilled(){
  this.props.showFormMessage(true);
  }

  slideFormUp(e){
    e.preventDefault();
    this.props.detailsFormSlider(false);
  }

  render(){

      const {formMessage, error, pristine, reset, submitting, handleSubmit, detailsFormOpacity} = this.props;
console.log('formMessage', formMessage);

   const formPosition = {top:detailsFormOpacity};
   const formMessageOpacity = {opacity:formMessage};
    return(
      <div id="detailFormContainer" style={formPosition}>
      <div>Please fill in your details to enable book exchanges:</div>
        <form autoComplete="off" id="detailsForm" onSubmit={handleSubmit(this.handleDetailsSubmit.bind(this))}>
        <label>location: </label>  <Field name="location" id="locationInput" label="location" type="text" component="input" />
          <label>email: </label><Field name="email" id="emailInput" label="email" type="text" component="input" /><br/>
            <span style={formMessageOpacity}>Please fill out both fields.</span><button className="submitDetailsButtons" onClick={this.slideFormUp.bind(this)}>cancel</button><button action="submit" onClick={this.areFormsFilled.bind(this)} className="submitDetailsButtons">submit</button>
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
