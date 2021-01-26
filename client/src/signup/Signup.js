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
    this.handlePassword = this.handlePassword.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

//   componentDidMount() {
//     this.updateMembers();
//   }

//   updateMembers() {
//     const route = '/get-members?';
//     const params = new URLSearchParams(
//       `${this.state.genderIds.map((x) => 'genderIds=' + x).join('&')}` +
//         `&${this.state.ageGroupIds.map((x) => 'ageGroupIds=' + x).join('&')}` +
//         `&${this.state.familyStatusIds.map((x) => 'familyStatusIds=' + x).join('&')}` +
//         `&maxMonthlyBudget=${this.state.maxMonthlyBudget}`
//     ).toString();
//     const url = process.env.REACT_APP_SERVER_URL + route + params;

//     fetch(url)
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
      //() => this.updateMembers()
    );
  }

//   handleDropdownChange(selection, action) {
//     let ids = selection
//       ? selection.map((x) => {
//           return x.value;
//         })
//       : [];
//     this.setState(
//       {
//         [action.name]: ids,
//       },
//       () => this.updateMembers()
//     );
//   }

    handleSubmit = () => {
        const { password, confPassword } = this.state;
        if(password === confPassword){
            //
        }
        else
        {
            alert("Passwords don't match.")
        }
    }

    handlePassword(password, confPassword) {
        if(password === confPassword) {
            return false;
        }
        else
        {
            return true;
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
          handlePassword={this.handlePassword}
          changeInput={this.handleInputChange}
          />
      </div>
    );
  }
}

export default Signup;
