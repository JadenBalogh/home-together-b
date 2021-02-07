import React, { Component } from 'react';
import SignupForm from './SignupForm';
import './Signup.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confPassword: '', //check if same as password
      phoneExists: false,
      emailExists: false,
      usernameExists: false,
      passwordsMatch: true,
      formData: {
        firstName: '',
        lastName: '',
        birthYear: '',
        birthMonth: '',
        birthDay: '',
        homeAddress: '',
        mailAddress: '',
        username: '', //check if already exists
        password: '',
        email: '', //check if existing
        phoneNumber: '', //check if existing?
        genderId: 0,
        familyStatusId: 0,
        peopleCount: 0,
        maxMonthlyBudget: 0,
        petRestrictions: false,
        petRestrictionsText: '',
        disabilities: false,
        disabilitiesText: '',
        religiousRestrictions: false,
        religiousRestrictionsText: '',
        smokingRestrictions: false,
        smokingRestrictionsText: '',
        allergies: false,
        allergiesText: '',
        hasHousing: false,
        housingDescription: '',
        profileText: '',
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.checkPhoneExists = this.checkPhoneExists.bind(this);
    this.checkEmailExists = this.checkEmailExists.bind(this);
    this.checkUsernameExists = this.checkUsernameExists.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.checkPasswordsMatch = this.checkPasswordsMatch.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleSignup() {
    console.log('Signed up');
    if (!this.checkPasswordsMatch && !this.checkEmailExists && !this.checkPhoneExists && !this.checkUsernameExists) {
      const route = '/api/signup?';
      const url = process.env.REACT_APP_LOCAL_URL || '';
      fetch(url + route, {
        method: 'POST',
        body: JSON.stringify(this.state.formData),
      });
    } else alert('Please ensure that all fields are filled correctly.');
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

  checkPasswordsMatch() {
    let match = this.state.formData.password === this.state.confPassword;
    this.setState({ passwordsMatch: match });
  }

  handleConfirm(event) {
    this.setState({ confPassword: event.target.value });
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

  checkUsernameExists() {
    const url = process.env.REACT_APP_LOCAL_URL || '';
    const route = '/api/check-username-exists?';
    const params = new URLSearchParams(`&username=${this.state.formData.username}`).toString();
    fetch(url + route + params)
      .then((res) => res.json())
      .then((json) => {
        console.log('went through');
        this.setState({
          usernameExists: json.exists,
        });
      });
  }

  render() {
    return (
      <div>
        <SignupForm //...maybe reconsider the form being separate at this point huh
          formData={this.state.formData}
          confPassword={this.state.confPassword}
          phoneExists={this.state.phoneExists}
          emailExists={this.state.emailExists}
          usernameExists={this.state.usernameExists}
          passwordsMatch={this.state.passwordsMatch}
          handleConfirm={this.handleConfirm}
          handleInputChange={this.handleInputChange}
          handleDropdownChange={this.handleDropdownChange}
          checkPasswordsMatch={this.checkPasswordsMatch}
          checkPhoneExists={this.checkPhoneExists}
          checkEmailExists={this.checkEmailExists}
          checkUsernameExists={this.checkUsernameExists}
          handleSignup={this.handleSignup}
        />
      </div>
    );
  }
}

export default Signup;
