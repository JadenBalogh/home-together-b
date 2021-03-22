import { useState, useEffect } from 'react';
import { Typography, Card, Grid, Divider, Tooltip, InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InfoIcon from '@material-ui/icons/Info';
import ErrorIcon from '@material-ui/icons/Error';
import MemberList from './MemberList';
import MembersFilter from './MembersFilter';
import PaginationControlled from '../shared/Pagination';
import './Members.css';

export default function Members() {
  const [members, setMembers] = useState([]);
  const [filters, setFilters] = useState({
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
  });
  const [name, setName] = useState('');

  function updateMembers() {
    const body = {
      ...filters,
      firstName: name,
      lastName: name,
    };

    const url = process.env.REACT_APP_LOCAL_URL || '';
    const route = '/api/get-members?';
    fetch(url + route, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filters: body }),
    })
      .then((res) => res.json())
      .then((json) => {
        setMembers(json);
      });
  }

  function handleInputChange(event) {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  }

  function handleCheckboxChange(event) {
    setFilters({
      ...filters,
      [event.target.name]: event.target.checked,
    });
  }

  function handleSelectChange(name, values) {
    setFilters({
      ...filters,
      [name]: values,
    });
  }

  function handleLocationsChange(event, options) {
    setFilters({
      ...filters,
      locationIds: options.map((x) => x.value),
    });
  }

  useEffect(updateMembers, [filters, name]);

  return (
    <Card>
      <Grid container direction='row'>
        <Grid item xs={4} container direction='column' alignItems='center' className='page'>
          <Typography component='h1' variant='h5' align='center'>
            Find Members
          </Typography>
          <br />
          <Grid item container direction='row'>
            <Grid item xs={12}>
              <Divider light />
            </Grid>
          </Grid>
          <br />
          <Grid item container direction='row' alignItems='center'>
            <Tooltip title='Home Together requires all members to create an account before engaging with other members. This list is only visible to registered members.'>
              <InfoIcon />
            </Tooltip>
            &ensp;
            <Grid item xs>
              Find other registered members using the search options below.
            </Grid>
          </Grid>
          <br />
          <Grid item container direction='row'>
            <Grid item xs={12}>
              <Divider light />
            </Grid>
          </Grid>
          <br />
          <MembersFilter
            selectHandler={handleSelectChange}
            inputHandler={handleInputChange}
            checkboxHandler={handleCheckboxChange}
            locationsHandler={handleLocationsChange}
            filters={filters}
          />
        </Grid>
        <br />
        <Divider flexItem orientation='vertical' />
        <Grid item xs container direction='column' alignItems='center' className='page'>
          <Grid item container direction='row' justify='center'>
            <Grid item>
              <TextField
                variant='outlined'
                name='name'
                value={name}
                placeholder='Search...'
                onChange={(event) => setName(event.target.value)}
                autoFocus
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <br />
          {members && members.length > 0 ? (
            <>
              <MemberList members={members} />
              <br />
              <Grid container direction='column' justify='center' alignItems='center'>
                <PaginationControlled PaginationControlled={PaginationControlled}></PaginationControlled>
              </Grid>
            </>
          ) : (
            <Grid item container direction='row' alignItems='center' justify='center'>
              <ErrorIcon />
              &ensp;
              <Typography variant='overline'>No search results found.</Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Card>
  );
}
