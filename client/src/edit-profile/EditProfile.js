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
        minMonthlyBudget: 0,
        maxMonthlyBudget: 0,
        petRestrictions: false,
        petRestrictionsText: '',
        healthRestrictions: false,
        healthRestrictionsText: '',
        religionRestrictions: false,
        religionRestrictionsText: '',
        smokingRestrictions: false,
        smokingRestrictionsText: '',
        dietRestrictions: false,
        dietRestrictionsText: '',
        allergies: false,
        allergiesText: '',
        hasHousing: false,
        minHomeCapacity: 0,
        maxHomeCapacity: 0,
        housingDescription: '',
        profileText: '',
        locationIds: [],
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.checkPhoneExists = this.checkPhoneExists.bind(this);
    this.checkEmailExists = this.checkEmailExists.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadProfile = this.loadProfile.bind(this);
  }

  componentDidMount() {
    this.loadProfile();
  }

  loadProfile() {
    let id = sessionStorage.getItem('id') || 1;

    const url = process.env.REACT_APP_LOCAL_URL || '';
    const route = '/api/get-member?';
    const params = new URLSearchParams('id=' + id).toString();
    fetch(url + route + params)
      .then((raw) => raw.json())
      .then((result) => {
        if (result.err) {
          window.alert(result.err);
          return;
        }
        this.setState({ formData: { ...result } });
      });
  }

  handleSubmit(event) {
    event.preventDefault();

    let id = sessionStorage.getItem('id') || 1;
    let formData = this.state.formData;

    const url = process.env.REACT_APP_LOCAL_URL || '';
    const route = '/api/edit-profile?';
    fetch(url + route, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, formData }),
    }).then(() => {
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
