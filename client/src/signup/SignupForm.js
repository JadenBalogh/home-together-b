import React, { useState, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { InputLabel } from '@material-ui/core';
import RadioText from './RadioText';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

//things to check: username, password(against confPassword), email, phone no. (only if we plan on implementing cellphone authentication/confirmation)
export default function SignUp(props) {
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
      <CssBaseline />
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
            <Grid item xs={8} container>
              <InputLabel>Birthday</InputLabel>
              <TextField
                type='date'
                variant='outlined'
                required
                fullWidth
                id='birthDate'
                name='birthDate'
                onChange={props.handleInputChange}
              />
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
                helperText={props.usernameExists ? 'Username already exists.' : ''}
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
              <FormLabel component='legend'>Status</FormLabel>
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
            <Grid
              item
              xs={12}
              container
              direction='column'
              alignItems='flex-start'
              justify='flex-start'
              onChange={props.handleInputChange}
            >
              <FormLabel component='legend'>Open to share with</FormLabel>
              <FormControl component='fieldset'>
                <RadioGroup aria-label='people' name='peopleCount' id='peopleCount'>
                  <FormControlLabel value='1' control={<Radio />} label='1 person' />
                  <FormControlLabel value='2' control={<Radio />} label='2 people' />
                  <FormControlLabel value='3' control={<Radio />} label='3 people' />
                  <FormControlLabel value='4' control={<Radio />} label='4 people' />
                  <FormControlLabel value='0' control={<Radio />} label='Any amount' />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} container>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='maxMonthlyBudget'
                label='Monthly Budget'
                name='maxMonthlyBudget'
                autoComplete='budget'
                onChange={props.changeInput}
                value={props.monthlyBudget}
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
                <RadioGroup aria-label='disabilities' name='disabilities' id='disabilities'>
                  <FormControlLabel value='true' control={<Radio />} label='Yes' />
                  <FormControlLabel value='false' control={<Radio />} label='No' />
                </RadioGroup>
                <RadioText
                  check={props.formData.disabilities}
                  name='disabilitiesText'
                  value={props.formData.disabilitiesText}
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
                <RadioGroup aria-label='religious' name='religiousRestrictions' id='religiousRestrictions'>
                  <FormControlLabel value='true' control={<Radio />} label='Yes' />
                  <FormControlLabel value='false' control={<Radio />} label='No' />
                </RadioGroup>
                <RadioText
                  check='true'
                  name='religiousRestrictionsText'
                  value={props.formData.religiousRestrictionsText}
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
                id='about'
                label='About You'
                name='about'
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
