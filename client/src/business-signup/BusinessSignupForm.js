import React, { useState, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { InputLabel } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IncText from './IncText';
import Tooltip from '@material-ui/core/Tooltip';
import './BusinessSignup.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#CFE5F8',
    padding: '15px',
    borderRadius: '20px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

//things to check: username, password(against confPassword), email, phone no. (only if we plan on implementing cellphone authentication/confirmation)
export default function SignupForm(props) {
  const classes = useStyles();
  const [genderOptions, setGenderOptions] = useState([]);
  const [familyStatusOptions, setFamilyStatusOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  // const testCities = [
  //   { value: 'Kelowna', label: 'Kelowna' },
  //   { value: 'Vernon', label: 'Vernon' },
  //   { value: 'Kamloops', label: 'Kamloops' },
  //   { value: 'Test1', label: 'Test1' },
  // ];

  useEffect(() => fetchGenderOptions(), []);
  useEffect(() => fetchFamilyStatusOptions(), []);
  useEffect(() => fetchCityOptions(), []);

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

  function fetchCityOptions() {
    const url = process.env.REACT_APP_LOCAL_URL || '';
    fetch(url + '/api/get-locations')
      .then((res) => res.json())
      .then((json) => {
        let options = json.map((x) => {
          return { value: x.id, label: x.city };
        });
        setCityOptions(options);
      });
  }

  return (
    <Container component='main' maxWidth='xs'>
      {/* <CssBaseline /> */}
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={props.handleSignup} noValidate>
          <Grid container spacing={2}>
            <Grid container justify='flex-end'>
              <Grid item>
                <Link href='/signin' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction='column'
              alignItems='flex-start'
              justify='flex-start'
              onChange={props.handleInputChange}
            >
              <FormLabel component='legend'>Is this an incorporated account?</FormLabel>
              <FormControl component='fieldset'>
                <RadioGroup aria-label='incorporated' name='incorporated' id='incorporated'>
                  <FormControlLabel value='true' control={<Radio />} label='Yes' />
                  <FormControlLabel value='false' control={<Radio />} label='No' />
                </RadioGroup>
                <IncText
                  check={props.formData.incorporated}
                  name='incorporatedName'
                  value={props.formData.incorporatedName}
                  text='Incorporated Name'
                />
                <IncText
                  check={props.formData.incorporated}
                  name='incorporatedOwners'
                  value={props.formData.incorporatedOwners}
                  text='Incorporated Owners'
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} container>
              <TextField
                autoComplete='fname'
                name='contactFirstName'
                variant='outlined'
                required
                fullWidth
                id='contactFirstName'
                label='Contact First Name'
                autoFocus
                onChange={props.handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} container>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='contactLastName'
                label='Contact Last Name'
                name='contactLastName'
                autoComplete='lname'
                onChange={props.handleInputChange}
              />
            </Grid>
            <Grid item xs={12} container>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='contactPhone'
                label='Contact Phone Number'
                name='contactPhone'
                type='tel'
                autoComplete='phone'
                onBlur={(event) => {
                  props.handleInputChange(event, props.checkPhoneExists);
                }}
                error={props.phoneExists} //checks if phone number was already used.
                helperText={props.phoneExists ? 'This phone number was already used to sign up.' : ''}
              />
            </Grid>
            <Grid item xs={12} container>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='username'
                label='Username'
                id='username'
                autoComplete='username'
                onBlur={(event) => {
                  props.handleInputChange(event, props.checkUsernameExists);
                }}
                error={props.usernameExists} //checks if already exists
                helperText={
                  props.usernameExists ? 'Username already exists.' : 'IMPORTANT: Username cannot be changed after signup'
                }
              />
            </Grid>
            <Grid item xs={12} container>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='password'
                onChange={props.handleInputChange}
                onBlur={props.checkPasswordsMatch}
              />
            </Grid>
            <Grid item xs={12} container>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='confPassword'
                label='Confirm Password'
                type='password'
                id='confPassword'
                autoComplete='confPassword'
                onChange={props.handleConfirm}
                onBlur={props.checkPasswordsMatch}
                error={!props.passwordsMatch} //check if password and confPassword matches
                helperText={!props.passwordsMatch ? 'Passwords do not match.' : ''}
              />
            </Grid>
            <Grid item xs={12} container>
              <TextField
                name='organizationName'
                variant='outlined'
                required
                fullWidth
                id='organizationName'
                label='Organization Name'
                onChange={props.handleInputChange}
              />
            </Grid>
            <Grid item xs={12} container>
              <TextField
                name='organizationWebsite'
                variant='outlined'
                fullWidth
                id='organizationWebsite'
                label='Organization Website URL'
                onChange={props.handleInputChange}
              />
            </Grid>
            <Grid item xs={12} container>
              <TextField
                name='organizationLogoURL'
                variant='outlined'
                fullWidth
                id='organizationLogoURL'
                label='Organization Logo URL'
                onChange={props.handleInputChange}
              />
            </Grid>
            <Grid item xs={12} container>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='organizationMainPhone'
                label='Organization Main Phone Number'
                name='organizationMainPhone'
                type='tel'
                autoComplete='phone'
                onBlur={(event) => {
                  props.handleInputChange(event, props.checkPhoneExists);
                }}
                error={props.phoneExists} //checks if phone number was already used.
                helperText={props.phoneExists ? 'This phone number was already used to sign up.' : ''}
              />
            </Grid>
            <Grid item xs={12} container>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='organizationAltPhone'
                label='Organization Alternate Phone Number'
                name='organizationAltPhone'
                type='tel'
                autoComplete='phone'
                onBlur={(event) => {
                  props.handleInputChange(event, props.checkPhoneExists);
                }}
                error={props.phoneExists} //checks if phone number was already used.
                helperText={props.phoneExists ? 'This phone number was already used to sign up.' : ''}
              />
            </Grid>
            <Grid item xs={12} container>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='organizationEmail'
                label='Organization Email Address'
                type='email'
                name='organizationEmail'
                autoComplete='email'
                onBlur={(event) => {
                  props.handleInputChange(event, props.checkEmailExists);
                }}
                error={props.emailExists} //checks if email was already used
                helperText={props.emailExists ? 'This email was already used to sign up.' : ''}
              />
            </Grid>
            <Grid item xs={12} container>
              <TextField
                variant='outlined'
                fullWidth
                id='organizationStreetAddress'
                label='Organization Street Address'
                name='organizationStreetAddress'
                onChange={props.handleInputChange}
              />
            </Grid>
            <Grid item xs={12} container>
              <TextField
                variant='outlined'
                fullWidth
                id='organizationMailingAddress'
                label='Organization Mailing Address'
                name='organizationMailingAddress'
                onChange={props.handleInputChange}
              />
            </Grid>
            <Grid item xs={12} container>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='organizationPostalCode'
                label='Organization Postal Code'
                name='organizationPostalCode'
                onChange={props.handleInputChange}
              />
            </Grid>
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary'>
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
}
