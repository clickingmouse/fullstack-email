//Form for user input
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';
import { Link } from 'react-router-dom';
import _ from 'lodash';
//reduxForm communicate with reduxStore
// Field domponent to render most html input stuff
//  <Field type="text" name="surveyTitle" component="input" />

/*
const FIELDS = [
  { label: 'Survey Title', name: 'title' },
  { label: 'Subject Line', name: 'subject' },
  { label: 'Email Body', name: 'body' },
  { label: 'Recipient List', name: 'emails' }
];
*/
class SurveyForm extends Component {
  //helper function
  renderFields() {
    // or .map(FIELDS, ({label name}) =>...
    //return _.map(FIELDS, field => {
    return _.map(formFields, field => {
      return (
        <Field
          key={field.name}
          component={SurveyField}
          type="text"
          label={field.label}
          name={field.name}
        />
      );
    });
    /*  return (
      <div>
        <Field
          label="Survey Title"
          type="text"
          name="title"
          component={SurveyField}
        />

        <Field
          label="Subject Line"
          type="text"
          name="subject"
          component={SurveyField}
        />

        <Field
          label="Email Body"
          type="text"
          name="body"
          component={SurveyField}
        />

        <Field
          label="Recipient List"
          type="text"
          name="emails"
          component={SurveyField}
        />
      </div>
    );*/
  }
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
// values = value fields from form
function validate(values) {
  const errors = {};
  /*
  if (!values.title) {
    errors.title = 'You must provide a title';
  }
  if (!values.subject) {
    errors.title = 'You must provide a subject';
  }
  if (!values.body) {
    errors.title = 'You must provide a body';
  }
*/
  errors.recipients = validateEmails(values.recipients || '');

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'you must provide a value';
    }
  });

  return errors;
}

//only requires one option
export default reduxForm({
  validate: validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
