import React, { Component } from 'react';
import MemberList from './MemberList';
import MembersFilter from './MembersFilter';
import './Members.css';

// Search page for members
class Members extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      genderIds: [],
      ageGroupIds: [],
      familyStatusIds: [],
      maxMonthlyBudget: 0,
    };
    this.updateMembers = this.updateMembers.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  componentDidMount() {
    this.updateMembers();
  }

  updateMembers() {
    const route = '/api/get-members?';
    const params = new URLSearchParams(
      `${this.state.genderIds.map((x) => 'genderIds=' + x).join('&')}` +
        `&${this.state.ageGroupIds.map((x) => 'ageGroupIds=' + x).join('&')}` +
        `&${this.state.familyStatusIds.map((x) => 'familyStatusIds=' + x).join('&')}` +
        `&maxMonthlyBudget=${this.state.maxMonthlyBudget}`
    ).toString();
    const url = process.env.REACT_APP_LOCAL_URL || '';
    fetch(url + route + params)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          members: json,
        });
      });
  }

  handleInputChange(event) {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => this.updateMembers()
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
      () => this.updateMembers()
    );
  }

  render() {
    return (
      <div className='members-container'>
        <h2>Find other members looking to homeshare...</h2>
        <MembersFilter
          dropdownHandler={this.handleDropdownChange}
          inputHandler={this.handleInputChange}
          maxMonthlyBudget={this.state.maxMonthlyBudget}
        />
        <MemberList members={this.state.members} />
      </div>
    );
  }
}

export default Members;
