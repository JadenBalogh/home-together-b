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
      filters: {
        genderIds: [],
        ageGroupIds: [],
        familyStatusIds: [],
        maxMonthlyBudget: 0,
        petRestrictions: false,
        religiousRestrictions: false,
        smokingRestrictions: false,
        hasHousing: false,
      },
      
    };
    this.updateMembers = this.updateMembers.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  componentDidMount() {
    this.updateMembers();
  }

  updateMembers() {
    let filters = this.state.filters;

    const url = process.env.REACT_APP_LOCAL_URL || '';
    const route = '/api/get-members?';
    // const params = new URLSearchParams( //Old implementation
    //   `${this.state.filters.genderIds.map((x) => 'genderIds=' + x).join('&')}` +
    //     `&${this.state.filters.ageGroupIds.map((x) => 'ageGroupIds=' + x).join('&')}` +
    //     `&${this.state.filters.familyStatusIds.map((x) => 'familyStatusIds=' + x).join('&')}` +
    //     `&maxMonthlyBudget=${this.state.filters.maxMonthlyBudget}` +
    //     `&petRestrictions=${this.state.filters.petRestrictions}` +
    //     `&religiousRestrictions=${this.state.filters.religiousRestrictions}` +
    //     `&smokingRestrictions=${this.state.filters.smokingRestrictions}` +
    //     `&hasHousing=${this.state.filters.hasHousing}`
    // ).toString();

    fetch(url + route, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filters }),
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          members: json,
        });
      });
  }

  handleInputChange(event) {
    this.setState(
      (prevState) => ({
        filters: {
          ...prevState.filters,
          [event.target.name]: event.target.value,
        },
      })
    );
  }

  handleCheckboxChange(event) {
    this.setState(
      (prevState) => ({
        filters: {
          ...prevState.filters,
          [event.target.name]: event.target.checked,
        },
      })
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
          checkboxHandler={this.handleCheckboxChange}
          filters={this.state.filters}
        />
        <MemberList members={this.state.members} />
      </div>
    );
  }
}

export default Members;
