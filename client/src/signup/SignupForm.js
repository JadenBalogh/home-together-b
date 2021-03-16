import React, { useState, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { InputLabel } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import RadioText from '../shared/RadioText';
import SignupSelect from './SignupSelect';
import Tooltip from '@material-ui/core/Tooltip';
import './Signup.css';

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

  useEffect(() => fetchGenderOptions(), []);
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
            <Grid item xs={12} sm={6} container>
              <TextField
                autoComplete='fname'
                name='firstName'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
                onChange={props.handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} container>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='lname'
                onChange={props.handleInputChange}
              />
            </Grid>
            <Grid item xs={12} container>
              <InputLabel>Birth Year</InputLabel>
              <Select
                autoWidth
                id='birthYear'
                name='birthYear'
                value={props.formData.birthYear}
                className='signup-select'
                onChange={(event) => {
                  props.handleInputChange(event, () => {});
                }}
              >
                {[...Array(120).keys()].map((i) => (
                  <MenuItem key={i + 1900} value={i + 1900}>
                    {i + 1900}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} container>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='homeAddress'
                label='Home Address'
                name='homeAddress'
                autoComplete='homeAddress'
                helperText='If you do not have one, use the address of a friend, relative, or verifiable organization.'
                onChange={props.handleInputChange}
              />
            </Grid>
            <Grid item xs={12} container>
              <FormControlLabel
                control={<Switch name='checkedA' color='primary' />}
                label='Mailing Address and Home Address are the same'
              ></FormControlLabel>
            </Grid>
            <Grid item xs={12} container>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='mailAddress'
                label='Mailing Address'
                name='mailAddress'
                autoComplete='mailAddress'
                helperText='If you do not have one, use the address of a friend, relative, or verifiable organization.'
                onChange={props.handleInputChange}
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
                  props.usernameExists
                    ? 'Username already exists.'
                    : 'IMPORTANT: Username cannot be changed after signup'
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
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                type='email'
                name='email'
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
                required
                fullWidth
                id='phoneNumber'
                label='Phone Number'
                name='phoneNumber'
                type='tel'
                autoComplete='phone'
                onBlur={(event) => {
                  props.handleInputChange(event, props.checkPhoneExists);
                }}
                error={props.phoneExists} //checks if phone number was already used.
                helperText={props.phoneExists ? 'This phone number was already used to sign up.' : ''}
              />
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
              <FormLabel component='legend'>Gender</FormLabel>
              <FormControl component='fieldset'>
                <RadioGroup aria-label='gender' name='genderId' id='genderId'>
                  {genderOptions.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={`${option.value}`}
                      control={<Radio />}
                      label={option.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
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
              <FormLabel component='legend'>Family Status</FormLabel>
              <FormControl component='fieldset'>
                <RadioGroup aria-label='status' name='familyStatusId' id='familyStatusId'>
                  {familyStatusOptions.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={`${option.value}`}
                      control={<Radio />}
                      label={option.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} container>
              <Tooltip disableFocusListener title="The minimum amount of people you're interested to live with">
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='minHomeCapacity'
                  label='Min Living Capacity'
                  name='minHomeCapacity'
                  type='number'
                  onChange={props.handleInputChange}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12} container>
              <Tooltip disableFocusListener title="The maximum amount of people you're interested to live with">
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='maxHomeCapacity'
                  label='Max Living Capacity'
                  name='maxHomeCapacity'
                  type='number'
                  onChange={props.handleInputChange}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12} container>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='minMonthlyBudget'
                label='Min Monthly Budget'
                name='minMonthlyBudget'
                type='number'
                onChange={props.handleInputChange}
              />
            </Grid>
            <Grid item xs={12} container>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='maxMonthlyBudget'
                label='Max Monthly Budget'
                name='maxMonthlyBudget'
                type='number'
                autoComplete='budget'
                onChange={props.handleInputChange}
              />
            </Grid>
            <SignupSelect
              label='Living Locations:'
              tooltip='These are the places you are interested in living in.'
              onChange={props.handleDropdownChange}
            />
            <Grid item xs={12} container>
              <TextField
                variant='outlined'
                fullWidth
                id='locationText'
                label='Additional location details (rural, country, etc)'
                name='locationText'
                onChange={props.handleInputChange}
              />
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
              <FormLabel component='legend'>Are you pet friendly?</FormLabel>
              <FormControl component='fieldset'>
                <RadioGroup aria-label='pet' name='petRestrictions' id='petRestrictions'>
                  <FormControlLabel value='true' control={<Radio />} label='Yes' />
                  <FormControlLabel value='false' control={<Radio />} label='No' />
                </RadioGroup>
              </FormControl>
              <RadioText
                check={props.formData.petRestrictions}
                name='petRestrictionsText'
                value={props.formData.petRestrictionsText}
              />
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
              <FormLabel component='legend'>Do you have health or mobility issues?</FormLabel>
              <FormControl component='fieldset'>
                <RadioGroup aria-label='healthRestrictions' name='healthRestrictions' id='healthRestrictions'>
                  <FormControlLabel value='true' control={<Radio />} label='Yes' />
                  <FormControlLabel value='false' control={<Radio />} label='No' />
                </RadioGroup>
                <RadioText
                  check={props.formData.healthRestrictions}
                  name='healthRestrictionsText'
                  value={props.formData.healthRestrictionsText}
                />
              </FormControl>
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
              <FormLabel component='legend'>Do you prefer others with the same religion?</FormLabel>
              <FormControl component='fieldset'>
                <RadioGroup aria-label='religion' name='religionRestrictions' id='religionRestrictions'>
                  <FormControlLabel value='true' control={<Radio />} label='Yes' />
                  <FormControlLabel value='false' control={<Radio />} label='No' />
                </RadioGroup>
                <RadioText
                  check='true'
                  name='religionRestrictionsText'
                  value={props.formData.religionRestrictionsText}
                />
              </FormControl>
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
              <FormLabel component='legend'>Are you a smoker or are smoking friendly?</FormLabel>
              <FormControl component='fieldset'>
                <RadioGroup aria-label='smoke' name='smokingRestrictions' id='smokingRestrictions'>
                  <FormControlLabel value='true' control={<Radio />} label='Yes' />
                  <FormControlLabel value='false' control={<Radio />} label='No' />
                </RadioGroup>
                <RadioText
                  check={props.formData.smokingRestrictions}
                  name='smokingRestrictionsText'
                  value={props.formData.smokingRestrictionsText}
                />
              </FormControl>
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
              <FormLabel component='legend'>Do you have allergies?</FormLabel>
              <FormControl component='fieldset'>
                <RadioGroup aria-label='allergy' name='allergies' id='allergies'>
                  <FormControlLabel value='true' control={<Radio />} label='Yes' />
                  <FormControlLabel value='false' control={<Radio />} label='No' />
                </RadioGroup>
                <RadioText check={props.formData.allergies} name='allergiesText' value={props.formData.allergiesText} />
              </FormControl>
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
              <FormLabel component='legend'>Do you have any dietary preferences or restrictions?</FormLabel>
              <FormControl component='fieldset'>
                <RadioGroup aria-label='dietRestrictions' name='dietRestrictions' id='dietRestrictions'>
                  <FormControlLabel value='true' control={<Radio />} label='Yes' />
                  <FormControlLabel value='false' control={<Radio />} label='No' />
                </RadioGroup>
              </FormControl>
              <RadioText
                check={props.formData.dietRestrictions}
                name='dietRestrictionsText'
                value={props.formData.dietRestrictionsText}
              />
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
              <FormLabel component='legend'>Do you have a home to share?</FormLabel>
              <FormControl component='fieldset'>
                <RadioGroup aria-label='home' name='hasHousing' id='hasHousing'>
                  <FormControlLabel value='true' control={<Radio />} label='Yes' />
                  <FormControlLabel value='false' control={<Radio />} label='No' />
                </RadioGroup>
                <RadioText
                  check={props.formData.hasHousing}
                  name='housingDescription'
                  value={props.formData.housingDescription}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} container>
              <TextField
                variant='outlined'
                multiline
                rows={3}
                rowsMax={3}
                fullWidth
                id='profileText'
                label='About You'
                name='profileText'
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
