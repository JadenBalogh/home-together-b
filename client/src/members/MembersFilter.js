import React, { useState, useEffect } from 'react';
import FilterSelect from './FilterSelect';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

// Filter component for the members page
function MembersFilter(props) {
  const [genderOptions, setGenderOptions] = useState([]);
  const [ageGroupOptions, setAgeGroupOptions] = useState([]);
  const [familyStatusOptions, setFamilyStatusOptions] = useState([]);

  useEffect(() => fetchGenderOptions(), []);
  useEffect(() => fetchAgeGroupOptions(), []);
  useEffect(() => fetchFamilyStatusOptions(), []);

  function fetchGenderOptions() {
    const url = process.env.REACT_APP_LOCAL_URL || '';
    fetch(url + '/api/get-gender-types')
      .then((res) => res.json())
      .then((json) => {
        let options = json.map((x) => {
          return { value: x.id, label: x.name };
        });
        setGenderOptions(options);
      });
  }

  function fetchAgeGroupOptions() {
    const url = process.env.REACT_APP_LOCAL_URL || '';
    fetch(url + '/api/get-age-group-types')
      .then((res) => res.json())
      .then((json) => {
        let options = json.map((x) => {
          let name = `${x.name} (${x.minAge}-${x.maxAge})`;
          return { value: x.id, label: name };
        });
        setAgeGroupOptions(options);
      });
  }

  function fetchFamilyStatusOptions() {
    const url = process.env.REACT_APP_LOCAL_URL || '';
    fetch(url + '/api/get-family-status-types')
      .then((res) => res.json())
      .then((json) => {
        let options = json.map((x) => {
          return { value: x.id, label: x.name };
        });
        setFamilyStatusOptions(options);
      });
  }

  return (
    <div className='filter-container'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} container>
          <FilterSelect 
            label='Genders:' 
            name='genderIds' 
            options={genderOptions} 
            onChange={props.dropdownHandler} 
          />
        </Grid>
        <Grid item xs={12} sm={6} container>
          <FilterSelect 
            label='Age Groups:' 
            name='ageGroupIds' 
            options={ageGroupOptions} 
            onChange={props.dropdownHandler} 
          />
        </Grid>
        <Grid item xs={12} sm={6} container>
          <FilterSelect
            label='Family Status:'
            name='familyStatusIds'
            options={familyStatusOptions}
            onChange={props.dropdownHandler}
          />
        </Grid>
        <Grid item xs={6} container>
          <TextField
            variant='outlined'
            fullWidth
            name='maxMonthlyBudget'
            label='Max Monthly Budget'
            id='maxMonthlyBudget'
            autoComplete='maxMonthlyBudget'
            value={props.filters.maxMonthlyBudget}
            onChange={props.inputHandler}
          />
        </Grid>
        <Grid item xs={12} sm={3} container>
          <FormControlLabel
            control={
              <Checkbox 
                checked={props.filters.petRestrictions} 
                onChange={props.checkboxHandler} 
                name="petRestrictions" 
              />}
            label="Pet Friendly"
          />
        </Grid>
        <Grid item xs={12} sm={3} container>
          <FormControlLabel
            control={
              <Checkbox 
                checked={props.filters.religiousRestrictions} 
                onChange={props.checkboxHandler} 
                name="religiousRestrictions" 
              />}
            label="Religious"
          />
        </Grid>
        <Grid item xs={12} sm={3} container>
          <FormControlLabel
            control={
              <Checkbox 
                checked={props.filters.smokingRestrictions}
                onChange={props.checkboxHandler} 
                name="smokingRestrictions" 
              />}
            label="Smoking Friendly"
          />
        </Grid>
        <Grid item xs={12} sm={3} container>
          <FormControlLabel
            control={
              <Checkbox 
                checked={props.filters.hasHousing} 
                onChange={props.checkboxHandler} 
                name="hasHousing" 
              />}
            label="Has Housing"
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default MembersFilter;