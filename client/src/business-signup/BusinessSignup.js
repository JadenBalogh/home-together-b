import React, { Component } from 'react';
import BusinessSignupForm from './BusinessSignupForm';

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
        verified: true,
        incorporated: false,
        contactFirstName: '',
        contactLastName: '',
        contactEmail: '',
        contactPhone: '',
        username: '',
        password: '',
        organizationName: '',
        organizationWebsite: '',
        organizationLogoURL: '',
        organizationMainPhone: '',
        organizationEmail: '',
        national: false,
        organizationStreetAddress: '',
        organizationMailingAddress: '',
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.checkPhoneExists = this.checkPhoneExists.bind(this);
    this.checkEmailExists = this.checkEmailExists.bind(this);
    this.checkUsernameExists = this.checkUsernameExists.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.checkPasswordsMatch = this.checkPasswordsMatch.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  handleSignup(event) {
    event.preventDefault();

    let formData = this.state.formData;
    console.log(formData);

    const url = process.env.REACT_APP_LOCAL_URL || '';
    const route = '/api/business-signup?';
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
    let ids = selection ? selection.map((x) => x.value) : [];
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [action.name]: ids,
      },
    }));
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
    const route = '/api/check-business-phone-exists?';
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
    const route = '/api/check-business-email-exists?';
    const params = new URLSearchParams(`&email=${this.state.formData.organizationEmail}`).toString();
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
        <BusinessSignupForm
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
