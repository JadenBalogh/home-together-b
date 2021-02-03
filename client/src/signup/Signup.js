import React, { Component } from 'react';
import SignupForm from './SignupForm';
import './Signup.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confPassword: '', //check if same as password
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
        genderId: '',
        familyStatusId: '',
        peopleCount: '',
        maxMonthlyBudget: '',
        petRestrictions: '',
        petRestrictionsText: '',
        disabilities: '',
        disabilitiesText: '',
        religiousRestrictions: '',
        religiousRestrictionsText: '',
        smokingRestrictions: '',
        smokingRestrictionsText: '',
        allergies: '',
        allergiesText: '',
        hasHousing: '',
        housingDescription: '',
        profileText: '',
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  //   componentDidMount() {
  //     this.updateMembers();
  //   }

  handleSignup() {
    if (!this.handlePassword && !this.handleEmail && !this.handlePhone && !this.handleUsername) {
      const route = '/api/signup?';
      const url = process.env.REACT_APP_LOCAL_URL || '';
      fetch(url + route, {
        method: 'POST',
        body: JSON.stringify(this.state.formData),
      });
      // .then((res) => res.json())
      // .then((json) => {
      //   this.setToken({
      //     token: json,
      //    });
      //  });
    } else alert('Please ensure that all fields are filled correctly.');
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handlePassword() {
    if (this.state.formData.password !== this.state.confPassword) {
      console.log(this.state.formData.password);
      console.log(this.state.confPassword);
      console.log("passwords don't match.");
      return true;
    } else console.log('passwords match.');
    return false;
  }

  handleConfirm(pass) {
    //confPassword is read only apparently?
    this.setState({ confPassword: pass });
  }

  handlePhone() {
    const route = '/api/phonecheck?';
    const bool = 'false';
    const url = process.env.REACT_APP_LOCAL_URL || '';
    fetch(url + route, {
      method: 'POST',
      body: JSON.stringify(this.state.phoneNumber),
    })
      .then((res) => res.json())
      .then((json) => {
        {
          bool = json.exist;
        }
      });
    return bool;
  }

  handleEmail() {
    const route = '/api/emailcheck?';
    const bool = 'false';
    const url = process.env.REACT_APP_LOCAL_URL || '';
    fetch(url + route, {
      method: 'POST',
      body: JSON.stringify(this.state.email),
    })
      .then((res) => res.json())
      .then((json) => {
        {
          bool = json.exist;
        }
      });
    return bool;
  }

  handleUsername() {
    const route = '/api/usernamecheck?';
    const bool = 'false';
    const url = process.env.REACT_APP_LOCAL_URL || '';
    fetch(url + route, {
      method: 'POST',
      body: JSON.stringify(this.state.username),
    })
      .then((res) => res.json())
      .then((json) => {
        {
          bool = json.exist;
        }
      });
    return bool;
  }

  handleSubmit = () => {
    if (false) {
      //check username, password, confpassword, email, and phone.
      //
    } else {
      alert('Please ensure that all fields are filled correctly.');
    }
  };

  render() {
    return (
      <div>
        <SignupForm //...maybe reconsider the form being separate at this point huh
          formData={this.state.formData}
          confPassword={this.state.confPassword}
          handleConfirm={this.handleConfirm}
          changeInput={this.handleInputChange}
          handleDropdownChange={this.handleDropdownChange}
          handlePassword={this.handlePassword}
          handleEmail={this.handleEmail}
          handlePhone={this.handlePhone}
          handleUsername={this.handleUsername}
          handleSignup={this.handleSignup}
        />
      </div>
    );
  }
}

export default Signup;
