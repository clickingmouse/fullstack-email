import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
  //babel
  state = { showFormReview: false };
  /*  constructor(props){
super(props);
    this.state = {new:true};
  }
*/

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  /*  renderContent() {
    if (this.state.showFormReview) {
      return <SurveyFormReview />;
    }
    return (
      <SurveyForm onSurveySubmit={this.setState({ showFormReview: true })} />
    );
  }
*/
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

//export default SurveyNew;
export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
