import React, { Component } from 'react';
import SignupForm from './SignupForm';

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
        homeAddress: '',
        mailAddress: '',
        username: '', //check if already exists
        password: '',
        email: '', //check if existing
        phoneNumber: '', //check if existing?
        genderId: 0,
        familyStatusId: 0,
        minHomeCapacity: 0,
        maxHomeCapacity: 0,
        minMonthlyBudget: 0,
        maxMonthlyBudget: 0,
        locationIds: [],
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
    this.checkUsernameExists = this.checkUsernameExists.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.checkPasswordsMatch = this.checkPasswordsMatch.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  handleSignup(event) {
    event.preventDefault();

    let formData = this.state.formData;

    const url = process.env.REACT_APP_LOCAL_URL || '';
    const route = '/api/signup?';
    fetch(url + route, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formData }),
    })
      .then((raw) => raw.json())
      .then((result) => {
        if (result.err) {
          window.alert(result.err);
          return;
        }
        this.props.history.push('/signin');
      });
  }

  handleInputChange(event, callback = () => {}) {
    console.log(event);
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

  handleDropdownChange(selection, action) {
    let ids = selection
      ? selection.map((x) => {
          return x.value;
        })
      : [];
    this.setState(
      {
        [action.name]: ids,
      },
    );
  }

  handleLocationChange(array) {
    console.log(array);
    const sorted = array.map(i => {
      return{ value: i, name: i};
    });

    this.setState(
      (prevState) => ({
        formData: {
          ...prevState.formData,
          locationIds: sorted,
        },
      }),
      () => {
        console.log(this.state.formData);
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
        <SignupForm 
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
          handleLocationChange={this.handleLocationChange}
        />
      </div>
    );
  }
}

export default Signup;
