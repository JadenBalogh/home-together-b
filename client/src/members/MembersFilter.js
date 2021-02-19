import React, { useState, useEffect } from 'react';
import FilterSelect from './FilterSelect';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Filter component for the members page
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: '1000px',
    paddingTop: '25px',
  },
  paper: {
    padding: theme.spacing(2),
    margin: 0,
  },
  img: {
    maxWidth: '250px',
    maxHeight: '250px',
    borderRadius: '5%',
  },
  accordionImg: {
    marginRight: '25px',
    maxWidth: '75px',
    maxHeight: '75px',
    borderRadius: '50%',
  },
}));

function MembersFilter(props) {
  const [locationOptions, setLocationOptions] = useState([]);
  const [homeCapacityOptions, setHomeCapacityOptions] = useState([]);
  const [genderOptions, setGenderOptions] = useState([]);
  const [ageGroupOptions, setAgeGroupOptions] = useState([]);
  const [familyStatusOptions, setFamilyStatusOptions] = useState([]);
  const classes = useStyles();

  useEffect(() => fetchGenderOptions(), []);
  useEffect(() => fetchAgeGroupOptions(), []);
  useEffect(() => fetchFamilyStatusOptions(), []);
  useEffect(() => fetchLocationOptions(), []);
  useEffect(() => fetchCapacityOptions(), []);

  function fetchLocationOptions() {
    const url = process.env.REACT_APP_LOCAL_URL || '';
    fetch(url + '/api/get-locations')
      .then((res) => res.json())
      .then((json) => {
        let options = json.map((x) => {
          return { value: x.id, label: x.city };
        });
        setLocationOptions(options);
      });
  }

  function fetchCapacityOptions() {
    const url = process.env.REACT_APP_LOCAL_URL || '';
    fetch(url + '/api/get-home-capacity')
      .then((res) => res.json())
      .then((json) => {
        let options = json.map((x) => {
          return { value: x.id, label: x.name };
        });
        setHomeCapacityOptions(options);
      });
  }

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
      <Accordion>
        <AccordionSummary expandIcon={<SearchIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Grid container spacing={2} direction="row" justify="flex-start" alignItems="center" justify="space-between">
            <Grid item>
              <Typography className={classes.heading}>Advanced Member Filter</Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid 
            item 
            xs={6}
            container 
            direction='row'
            alignItems='center'
            justify='center'
            >
              <FilterSelect
                label='Living Locations:'
                name='locations'
                options={locationOptions}
                onChange={props.dropdownHandler}
              />
            </Grid>
            <Grid 
            item 
            xs={6}
            container 
            direction='row'
            alignItems='center'
            justify='center'
            >
              <FilterSelect
                label='Home Capacity:'
                name='homeCapacity'
                options={homeCapacityOptions}
                onChange={props.dropdownHandler}
              />
            </Grid>
            <Grid 
            item 
            xs={6}
            container
            direction='row'
            alignItems='center'
            justify='center'
            >
              <FilterSelect
                label='Genders:'
                name='genderIds'
                options={genderOptions}
                onChange={props.dropdownHandler}
              />
            </Grid>
            <Grid 
            item 
            xs={6} 
            container
            direction='row'
            alignItems='center'
            justify='center'
            >
              <FilterSelect
                label='Age Groups:'
                name='ageGroupIds'
                options={ageGroupOptions}
                onChange={props.dropdownHandler}
              />
            </Grid>
            <Grid 
            item 
            xs={6} 
            container
            direction='rows'
            alignItems='center'
            justify='center'
            >
              <FilterSelect
                label='Family Status:'
                name='familyStatusIds'
                options={familyStatusOptions}
                onChange={props.dropdownHandler}
              />
            </Grid>
            <Grid 
            item 
            xs={6} 
            container
            direction='rows'
            alignItems='center'
            justify='center'
            >
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
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default MembersFilter;