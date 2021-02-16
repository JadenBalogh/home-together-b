import React, { Component } from 'react';
import EditForm from './EditForm';

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneExists: false,
      emailExists: false,
      formData: {
        firstName: '',
        lastName: '',
        homeAddress: '',
        mailAddress: '',
        email: '', //check if existing
        phoneNumber: '', //check if existing?
        genderId: 0,
        birthYear: 0,
        familyStatusId: 0,
        peopleCount: 0,
        maxMonthlyBudget: 0,
        petRestrictions: false,
        petRestrictionsText: '',
        healthRestrictions: false,
        healthRestrictionsText: '',
        religiousRestrictions: false,
        religiousRestrictionsText: '',
        smokingRestrictions: false,
        smokingRestrictionsText: '',
        allergies: false,
        allergiesText: '',
        dietRestrictions: false,
        dietRestrictionsText: '',
        hasHousing: false,
        housingDescription: '',
        profileText: '',
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.checkPhoneExists = this.checkPhoneExists.bind(this);
    this.checkEmailExists = this.checkEmailExists.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    let id = sessionStorage.getItem('id');
    let formData = this.state.formData;

    const url = process.env.REACT_APP_LOCAL_URL || '';
    const route = '/api/edit-profile?';
    fetch(url + route, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, formData }),
    })
      .then((raw) => raw.json())
      .then((result) => {
        if (result.err) {
          window.alert(result.err);
          return;
        }
        console.log('success!');
        this.props.history.push('/');
      });
  }

  handleInputChange(event, callback = () => {}) {
    this.setState(
      (prevState) => ({
        formData: {
          ...prevState.formData,
          [event.target.name]: event.target.value,
        },
      }),
      () => {
        console.log(`tried to change ${event.target.name} to ${event.target.value}`);
        console.log(this.state.formData);
        callback();
      }
    );
  }

  checkPhoneExists() {
    const url = process.env.REACT_APP_LOCAL_URL || '';
    const route = '/api/check-phone-exists?';
    const params = new URLSearchParams(`&phoneNumber=${this.state.formData.phoneNumber}`).toString();
    fetch(url + route + params)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          phoneExists: json.exists,
        });
      });
  }

  checkEmailExists() {
    const url = process.env.REACT_APP_LOCAL_URL || '';
    const route = '/api/check-email-exists?';
    const params = new URLSearchParams(`&email=${this.state.formData.email}`).toString();
    fetch(url + route + params)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          emailExists: json.exists,
        });
      });
  }

  render() {
    return (
      <div>
        <EditForm //...maybe reconsider the form being separate at this point huh
          formData={this.state.formData}
          phoneExists={this.state.phoneExists}
          emailExists={this.state.emailExists}
          handleConfirm={this.handleConfirm}
          handleInputChange={this.handleInputChange}
          checkPhoneExists={this.checkPhoneExists}
          checkEmailExists={this.checkEmailExists}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default EditProfile;
