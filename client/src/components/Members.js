import React, { Component } from 'react';
import '../index.css';
import MemberList from './MemberList'
import Select from 'react-select'

// Search page for members
class Members extends Component {
  constructor(props) {
    super(props);
    const genderOptions = [
      { value: 'Male', label: 'Male' },
      { value: 'Female', label: 'Female' },
      { value: 'Other', label: 'Other' }
    ]
    const statusOptions = [
      { value: 'Single', label: 'Single' },
      { value: 'Couple', label: 'Couple' },
      { value: 'ParentChild', label: 'Couple with Children' },
      { value: 'SingleParent', label: 'Single Parent' },
      { value: 'Group', label: 'Existing Group' }
    ]
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
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({
          members: json,
        });
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  //react-select documentation https://react-select.com/props
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Members Page</h1>
          <p>Gender ID: <Select
            isMulti
            name="genderID"
            options={[
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' },
              { value: 'Other', label: 'Other' }
            ]}
            value={this.state.genderID}
            onChange={this.handleChange}
            isClearable true
            className="basic-multi-select"
            classNamePrefix="select"
          /></p>
          <p>Min Age: <input type='text' name='minAge' value={this.state.minAge} onChange={this.handleChange} /></p>
          <p>Max Age: <input type='text' name='maxAge' value={this.state.maxAge} onChange={this.handleChange} /></p>
          <p>Family Status ID: <Select
            isMulti
            name="familyStatusID"
            options={[
              { value: 'Single', label: 'Single' },
              { value: 'Couple', label: 'Couple' },
              { value: 'ParentChild', label: 'Couple with Children' },
              { value: 'SingleParent', label: 'Single Parent' },
              { value: 'Group', label: 'Existing Group' }
            ]}
            value={this.state.familyStatusID}
            onChange={this.handleChange}
            isClearable true
            className="basic-multi-select"
            classNamePrefix="select"
          /></p>
          <p>Max Monthly Budget: <input type='text' name='maxMonthlyBudget' value={this.state.maxMonthlyBudget} onChange={this.handleChange} /></p>
          <input type='submit'></input>
        </form>

        <MemberList data={this.state.members} />
      </div>
    );
  }
}

export default Members;
