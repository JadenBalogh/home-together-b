import React, { useState, useEffect } from 'react';
import FilterSelect from './FilterSelect';
import {
  Checkbox,
  TextField,
  InputLabel,
  Grid,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Card,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import LocationFilter from '../shared/LocationFilter';

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
    <Card>
      <Accordion>
        <AccordionSummary expandIcon={<SearchIcon />} aria-controls='panel1a-content' id='panel1a-header'>
          <Grid container spacing={2} direction='row' alignItems='center' justify='space-between'>
            <Grid item>
              <Typography>Advanced Member Filter</Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={6} container alignItems='center'>
              <Grid item xs={5} container justify='flex-start'>
                <InputLabel>Locations:</InputLabel>
              </Grid>
              <Grid item xs={7}>
                <LocationFilter label='Select a city' onChange={props.locationsHandler} />
              </Grid>
            </Grid>
            <FilterSelect label='Genders:' name='genderIds' options={genderOptions} onChange={props.dropdownHandler} />
            <FilterSelect
              label='Age Groups:'
              name='ageGroupIds'
              options={ageGroupOptions}
              onChange={props.dropdownHandler}
            />
            <FilterSelect
              label='Family Status:'
              name='familyStatusIds'
              options={familyStatusOptions}
              onChange={props.dropdownHandler}
            />
            <Grid item xs={6} container direction='rows' alignItems='center' justify='center'>
              <Grid item xs={5} container justify='flex-start'>
                <InputLabel>Home Capacity:</InputLabel>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type='number'
                  name='minHomeCapacity'
                  autoComplete='minHomeCapacity'
                  value={props.filters.minHomeCapacity}
                  onChange={props.inputHandler}
                />
              </Grid>
              <Grid item xs={1} container justify='center'>
                -
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type='number'
                  name='maxHomeCapacity'
                  autoComplete='maxHomeCapacity'
                  value={props.filters.maxHomeCapacity}
                  onChange={props.inputHandler}
                />
              </Grid>
            </Grid>
            <Grid item xs={6} container direction='rows' alignItems='center' justify='center'>
              <Grid item xs={5} container justify='flex-start'>
                <InputLabel>Monthly Budget:</InputLabel>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type='number'
                  name='minMonthlyBudget'
                  autoComplete='minMonthlyBudget'
                  value={props.filters.minMonthlyBudget}
                  onChange={props.inputHandler}
                />
              </Grid>
              <Grid item xs={1} container justify='center'>
                -
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type='number'
                  name='maxMonthlyBudget'
                  autoComplete='maxMonthlyBudget'
                  value={props.filters.maxMonthlyBudget}
                  onChange={props.inputHandler}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} container>
              <Grid item xs={3} container>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={props.filters.petRestrictions}
                      onChange={props.checkboxHandler}
                      name='petRestrictions'
                    />
                  }
                  label='Pet Friendly'
                />
              </Grid>
              <Grid item xs={3} container>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={props.filters.religionRestrictions}
                      onChange={props.checkboxHandler}
                      name='religionRestrictions'
                    />
                  }
                  label='Religious'
                />
              </Grid>
              <Grid item xs={3} container>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={props.filters.smokingRestrictions}
                      onChange={props.checkboxHandler}
                      name='smokingRestrictions'
                    />
                  }
                  label='Smoking Friendly'
                />
              </Grid>
              <Grid item xs={3} container>
                <FormControlLabel
                  control={
                    <Checkbox checked={props.filters.hasHousing} onChange={props.checkboxHandler} name='hasHousing' />
                  }
                  label='Has Housing'
                />
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
}

export default MembersFilter;
