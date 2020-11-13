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
    this.handleChange = this.handleChange.bind(this);
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

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Members Page</h1>
        <p>Gender ID: <input type='text' name='genderID' value={this.state.genderID} onChange={this.handleChange} /></p>
        <p>Min Age: <input type='text' name='minAge' value={this.state.minAge} onChange={this.handleChange} /></p>
        <p>Max Age: <input type='text' name='maxAge' value={this.state.maxAge} onChange={this.handleChange} /></p>
        <p>Family Status ID: <input type='text' name='familyStatusID' value={this.state.familyStatusID} onChange={this.handleChange} /></p>
        <p>Max Monthly Budget: <input type='text' name='maxMonthlyBudget' value={this.state.maxMonthlyBudget} onChange={this.handleChange} /></p>
        <input type='submit'></input>
        <p>{this.state.genderID}</p>
      </form>
    );
  }
}

export default Members;
