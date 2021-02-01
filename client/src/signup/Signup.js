import React, { Component } from 'react';
import SignupForm from './SignupForm';
import './Signup.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      birthYear: '',
      birthMonth: '',
      birthDay: '',
      homeAddress: "",
      mailAddress: "",
      username: "", //check if already exists
      password: "",
      confPassword: "", //check if same as password
      email: "", //check if existing
      phone: "", //check if existing?
      gender: "",
      status: '',
      people: '',
      monthlyBudget: '',
      pet: '',
      disabilities: '',
      religious: '',
      smoke: '',
      allergy: '',
      home: '',
      about: "",
    //   //old stuff, since some of these are the same variable, consider switching to these to keep consistent throughout (eg. gender->genderId?)
    //   members: "",
    //   genderIds: "",
    //   ageGroupIds: "",
    //   familyStatusIds: "",
    //   maxMonthlyBudget: 0,
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

//   componentDidMount() {
//     this.updateMembers();
//   }

//   updateMembers() {
//     const route = '/api/get-members?';
//     const params = new URLSearchParams(
//       `${this.state.genderIds.map((x) => 'genderIds=' + x).join('&')}` +
//         `&${this.state.ageGroupIds.map((x) => 'ageGroupIds=' + x).join('&')}` +
//         `&${this.state.familyStatusIds.map((x) => 'familyStatusIds=' + x).join('&')}` +
//         `&maxMonthlyBudget=${this.state.maxMonthlyBudget}`
//     ).toString();
//     const url = process.env.REACT_APP_LOCAL_URL || '';
//     fetch(url + route + params)
//       .then((res) => res.json())
//       .then((json) => {
//         this.setState({
//           members: json,
//         });
//       });
//   }

  handleInputChange(event) {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
    );
  }

  handleDropdownChange(selection) {
    this.setState(
        {
          [selection.id]: selection.value,//Help, I have fallen and I can't get up
        },
      );
  }

  handleUsername(){
      //check DB for username
  }

  handleEmail(){
    //check DB for email
  }

  handlePhone(){
    //check DB for phone number
  }

  handleSubmit = () => {
      if(false){//check username, password, confpassword, email, and phone.
          //
      }
      else
      {
          alert("Please ensure that all fields are filled correctly.")
      }
  }

  render() {
    return (
      <div>
        <SignupForm //...maybe reconsider the form being separate at this point huh
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          birthYear={this.state.birthYear}
          birthMonth={this.state.birthMonth}
          birthDay={this.state.birthDay}
          homeAddress={this.state.homeAddress}
          mailAddress={this.state.mailAddress}
          username={this.state.username}
          password={this.state.password}
          confPassword={this.state.confPassword}
          email={this.state.email}
          phone={this.state.phone}
          gender={this.state.gender}
          status={this.state.status}
          people={this.state.people}
          monthlyBudget={this.state.monthlyBudget}
          pet={this.state.pet}
          disabilities={this.state.disabilities}
          religious={this.state.religious}
          smoke={this.state.smoke}
          allergy={this.state.allergy}
          home={this.state.home}
          changeInput={this.handleInputChange}
          handleDropdownChange={this.handleDropdownChange}
          />
      </div>
    );
  }
}

export default Signup;
