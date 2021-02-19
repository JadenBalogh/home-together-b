import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RadioText from '../shared/RadioText';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

//things to check: username, password(against confPassword), email, phone no. (only if we plan on implementing cellphone authentication/confirmation)
export default function EditForm(props) {
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
          Edit Profile
        </Typography>
        <form className={classes.form} onSubmit={props.handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} container>
              <TextField
                autoComplete='fname'
                name='firstName'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='First Name'
                value={props.formData.firstName}
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
                value={props.formData.lastName}
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
                value={props.formData.homeAddress}
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
                value={props.formData.mailAddress}
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
                id='email'
                label='Email Address'
                name='email'
                value={props.formData.email}
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
                value={props.formData.phoneNumber}
                autoComplete='phone'
                onBlur={(event) => {
                  props.handleInputChange(event, props.checkPhoneExists);
                }}
                error={props.phoneExists} //checks if phone number was already used.
                helperText={props.phoneExists ? 'This phone number was already used to sign up.' : ''}
              />
            </Grid>
            <Grid item xs={12} container direction='column' alignItems='flex-start' justify='flex-start'>
              <FormLabel component='legend'>Gender</FormLabel>
              <FormControl component='fieldset'>
                <RadioGroup
                  aria-label='gender'
                  name='genderId'
                  id='genderId'
                  value={`${props.formData.genderId}`}
                  onChange={(event) => props.handleInputChange(event, () => {})}
                >
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
                <RadioGroup
                  aria-label='status'
                  name='familyStatusId'
                  id='familyStatusId'
                  value={`${props.formData.familyStatusId}`}
                >
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
                <RadioGroup
                  aria-label='people'
                  name='peopleCount'
                  id='peopleCount'
                  value={`${props.formData.peopleCount}`}
                >
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
                <RadioGroup
                  aria-label='pet'
                  name='petRestrictions'
                  id='petRestrictions'
                  value={`${props.formData.petRestrictions}`}
                >
                  <FormControlLabel value='1' control={<Radio />} label='Yes' />
                  <FormControlLabel value='0' control={<Radio />} label='No' />
                </RadioGroup>
              </FormControl>
              <RadioText
                check={`${Boolean(Number(props.formData.petRestrictions))}`}
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
                <RadioGroup
                  aria-label='healthRestrictions'
                  name='healthRestrictions'
                  id='healthRestrictions'
                  value={`${props.formData.healthRestrictions}`}
                >
                  <FormControlLabel value='1' control={<Radio />} label='Yes' />
                  <FormControlLabel value='0' control={<Radio />} label='No' />
                </RadioGroup>
                <RadioText
                  check={`${Boolean(Number(props.formData.healthRestrictions))}`}
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
                <RadioGroup
                  aria-label='religious'
                  name='religionRestrictions'
                  id='religionRestrictions'
                  value={`${props.formData.religionRestrictions}`}
                >
                  <FormControlLabel value='1' control={<Radio />} label='Yes' />
                  <FormControlLabel value='0' control={<Radio />} label='No' />
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
                <RadioGroup
                  aria-label='smoke'
                  name='smokingRestrictions'
                  id='smokingRestrictions'
                  value={`${props.formData.smokingRestrictions}`}
                >
                  <FormControlLabel value='1' control={<Radio />} label='Yes' />
                  <FormControlLabel value='0' control={<Radio />} label='No' />
                </RadioGroup>
                <RadioText
                  check={`${Boolean(Number(props.formData.smokingRestrictions))}`}
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
                <RadioGroup aria-label='allergy' name='allergies' id='allergies' value={`${props.formData.allergies}`}>
                  <FormControlLabel value='1' control={<Radio />} label='Yes' />
                  <FormControlLabel value='0' control={<Radio />} label='No' />
                </RadioGroup>
                <RadioText
                  check={`${Boolean(Number(props.formData.allergies))}`}
                  name='allergiesText'
                  value={props.formData.allergiesText}
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
              <FormLabel component='legend'>Do you have any dietary preferences or restrictions?</FormLabel>
              <FormControl component='fieldset'>
                <RadioGroup
                  aria-label='dietRestrictions'
                  name='dietRestrictions'
                  id='dietRestrictions'
                  value={`${props.formData.dietRestrictions}`}
                >
                  <FormControlLabel value='1' control={<Radio />} label='Yes' />
                  <FormControlLabel value='0' control={<Radio />} label='No' />
                </RadioGroup>
              </FormControl>
              <RadioText
                check={`${Boolean(Number(props.formData.dietRestrictions))}`}
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
                <RadioGroup aria-label='home' name='hasHousing' id='hasHousing' value={`${props.formData.hasHousing}`}>
                  <FormControlLabel value='1' control={<Radio />} label='Yes' />
                  <FormControlLabel value='0' control={<Radio />} label='No' />
                </RadioGroup>
                <RadioText
                  check={`${Boolean(Number(props.formData.hasHousing))}`}
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
                value={props.formData.profileText}
                onChange={props.handleInputChange}
              />
            </Grid>
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary'>
            Save Changes
          </Button>
        </form>
      </div>
    </Container>
  );
}
