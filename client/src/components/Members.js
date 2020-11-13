import React, { Component } from 'react';
import '../index.css';

// Search page for members
class Members extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      genderID: '',
      minAge: '',
      maxAge: '',
      familyStatusID: '',
      maxMonthlyBudget: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeGenderID = this.handleChangeGenderID.bind(this);
    this.handleChangeMinAge = this.handleChangeMinAge.bind(this);
    this.handleChangeMaxAge = this.handleChangeMaxAge.bind(this);
    this.handleChangeFamilyStatusID = this.handleChangeFamilyStatusID.bind(this);
    this.handleChangeMaxMonthlyBudget = this.handleChangeMaxMonthlyBudget.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const options = {
      method: 'GET',
    };
    const route = '/get-members?';
    const params = new URLSearchParams(
      `genderID=${this.state.genderID}\
      &minAge=${this.state.minAge}\
      &maxAge=${this.state.maxAge}\
      &familyStatusID=${this.state.familyStatusID}\
      &maxMonthlyBudget=${this.state.maxMonthlyBudget}`
    ).toString();
    console.log(params);
    const url = process.env.REACT_APP_SERVER_URL + route + params;
    fetch(url, options)
      .then((res) => res.text())
      .then((txt) => {
        console.log(txt);
        this.setState({
          members: txt,
        });
      });
  }

  handleChangeGenderID(event) {
    this.setState({
      genderID: event.target.value,
    });
  }

  handleChangeMinAge(event) {
    this.setState({
      minAge: event.target.value,
    });
  }

  handleChangeMaxAge(event) {
    this.setState({
      maxAge: event.target.value,
    });
  }

  handleChangeFamilyStatusID(event) {
    this.setState({
      familyStatusID: event.target.value,
    });
  }

  handleChangeMaxMonthlyBudget(event) {
    this.setState({
      maxMonthlyBudget: event.target.value,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Members Page</h1>
        <p>Gender ID: <input type='text' value={this.state.genderID} onChange={this.handleChangeGenderID} /></p>
        <p>Min Age: <input type='text' value={this.state.minAge} onChange={this.handleChangeMinAge} /></p>
        <p>Max Age: <input type='text' value={this.state.maxAge} onChange={this.handleChangeMaxAge} /></p>
        <p>Family Status ID: <input type='text' value={this.state.familyStatusID} onChange={this.handleChangeFamilyStatusID} /></p>
        <p>Max Monthly Budget: <input type='text' value={this.state.maxMonthlyBudget} onChange={this.handleChangeMaxMonthlyBudget} /></p>
        <input type='submit'></input>
        <p>{this.state.members}</p>
      </form>
    );
  }
}

export default Members;
