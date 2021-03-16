import React, { Component } from 'react';
import MemberList from './MemberList';
import MembersFilter from './MembersFilter';
import Typography from '@material-ui/core/Typography';
import './Members.css';

// Search page for members
class Members extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      filters: {
        locationIds: [],
        genderIds: [],
        ageGroupIds: [],
        familyStatusIds: [],
        minHomeCapacity: 0,
        maxHomeCapacity: 0,
        minMonthlyBudget: 0,
        maxMonthlyBudget: 0,
        petRestrictions: false,
        religionRestrictions: false,
        smokingRestrictions: false,
        hasHousing: false,
      },
    };
    this.updateMembers = this.updateMembers.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleLocationsChange = this.handleLocationsChange.bind(this);
  }

  updateMembers() {
    let filters = this.state.filters;

    const url = process.env.REACT_APP_LOCAL_URL || '';
    const route = '/api/get-members?';
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
    console.log('Search for new members list attempted');
    if (Members.members === undefined) {
      console.log('No results were successfully returned');
    }
  }

  handleInputChange(event) {
    this.setState(
      (prevState) => ({
        filters: {
          ...prevState.filters,
          [event.target.name]: event.target.value,
        },
      }),
      this.updateMembers
    );
  }

  handleCheckboxChange(event) {
    this.setState(
      (prevState) => ({
        filters: {
          ...prevState.filters,
          [event.target.name]: event.target.checked,
        },
      }),
      this.updateMembers
    );
  }

  handleDropdownChange(selection, action) {
    let ids = selection ? selection.map((x) => x.value) : [];
    this.setState(
      (prevState) => ({
        filters: {
          ...prevState.filters,
          [action.name]: ids,
        },
      }),
      this.updateMembers
    );
  }

  handleLocationsChange(event, options) {
    this.setState(
      (prevState) => ({
        filters: {
          ...prevState.filters,
          locationIds: options.map((x) => x.value),
        },
      }),
      this.updateMembers
    );
  }

  render() {
    return (
      <div className='members-container'>
        <Typography component='h1' variant='h5'>
          Find other members looking to homeshare...
        </Typography>
        <MembersFilter
          dropdownHandler={this.handleDropdownChange}
          inputHandler={this.handleInputChange}
          checkboxHandler={this.handleCheckboxChange}
          locationsHandler={this.handleLocationsChange}
          filters={this.state.filters}
        />
        <MemberList members={this.state.members} />
      </div>
    );
  }
}

export default Members;
