import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Button,
  TextField,
  Grid,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Card,
  Switch,
  Divider,
} from '@material-ui/core';
import LocationFilter from '../shared/LocationFilter';
import RadioText from '../shared/RadioText';
import FormBox from '../shared/FormBox';

export default function EditForm(props) {
  const [genderOptions, setGenderOptions] = useState([]);
  const [familyStatusOptions, setFamilyStatusOptions] = useState([]);
  const [isMailAddrSame, setIsMailAddrSame] = useState(false);

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
    <Card className='page'>
      <Grid container justify='space-between' alignItems='flex-end'>
        <Typography component='h1' variant='h5'>
          Edit Account
        </Typography>
      </Grid>
      <Divider />
      <br />
      <form onSubmit={props.handleSubmit} noValidate>
        <Grid item container direction='column' spacing={1}>
          <FormBox helperText='This information is for registration purposes and is not shared with others.' persist>
            <Grid item container direction='column'>
              <Grid item xs>
                <Typography variant='h6'>Registration and Contact Information</Typography>
              </Grid>
              <Grid item xs>
                <Divider />
              </Grid>
            </Grid>
          </FormBox>
          <br />
          <FormBox spacing={1} helperText='Your real name will not be visible to other members.'>
            <Grid item xs>
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
            <Grid item xs>
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
          </FormBox>
          <br />
          <FormBox helperText='This information is used to validate your account.'>
            <Grid item xs>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                type='email'
                name='email'
                value={props.formData.email}
                autoComplete='email'
                onChange={props.handleInputChange}
                onBlur={(event) => {
                  props.handleInputChange(event, props.checkEmailExists);
                }}
                error={props.emailExists} //checks if email was already used
                helperText={props.emailExists ? 'This email was already used to sign up.' : ''}
              />
            </Grid>
          </FormBox>
          <FormBox helperText='This information is used to validate your account.'>
            <Grid item xs>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='phoneNumber'
                label='Phone Number'
                name='phoneNumber'
                type='tel'
                value={props.formData.phoneNumber}
                autoComplete='phone'
                onChange={props.handleInputChange}
                onBlur={(event) => {
                  props.handleInputChange(event, props.checkPhoneExists);
                }}
                error={props.phoneExists} //checks if phone number was already used.
                helperText={props.phoneExists ? 'This phone number was already used to sign up.' : ''}
              />
            </Grid>
          </FormBox>
          <FormBox helperText='If you do not have one, use the address of a friend, relative, or verifiable organization.'>
            <Grid item xs>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='homeAddress'
                label='Home Address'
                name='homeAddress'
                value={props.formData.homeAddress}
                autoComplete='homeAddress'
                onChange={props.handleInputChange}
              />
            </Grid>
          </FormBox>
          <FormBox helperText='If you do not have one, use the address of a friend, relative, or verifiable organization.'>
            <Grid item xs>
              <TextField
                variant='outlined'
                disabled={isMailAddrSame}
                required
                fullWidth
                id='mailAddress'
                label={isMailAddrSame ? 'Same as Home Address' : 'Mailing Address'}
                name='mailAddress'
                value={isMailAddrSame ? props.formData.homeAddress : props.formData.mailAddress}
                autoComplete='mailAddress'
                onChange={props.handleInputChange}
              />
            </Grid>
            <Switch onChange={(event) => setIsMailAddrSame(event.target.checked)} color='primary' />
            <Typography>Same as Home</Typography>
          </FormBox>
          <br />
          <FormBox helperText='This information is used to search for other compatible members on the site.' persist>
            <Grid item container direction='column'>
              <Grid item xs>
                <Typography variant='h6'>Profile Information</Typography>
              </Grid>
              <Grid item xs>
                <Divider />
              </Grid>
            </Grid>
          </FormBox>
          <br />
          <FormBox>
            <Grid item>
              <InputLabel>Birth Year</InputLabel>
            </Grid>
            <Grid item xs>
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
          </FormBox>
          <FormBox>
            <Grid item xs={12}>
              <FormLabel component='legend'>Gender</FormLabel>
            </Grid>
            <Grid item xs={12} onChange={props.handleInputChange}>
              <FormControl component='fieldset'>
                <RadioGroup aria-label='gender' name='genderId' id='genderId' value={`${props.formData.genderId}`} row>
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
          </FormBox>
          <FormBox>
            <Grid item xs={12}>
              <FormLabel component='legend'>Family Status</FormLabel>
            </Grid>
            <Grid item xs={12} onChange={props.handleInputChange}>
              <FormControl component='fieldset'>
                <RadioGroup
                  aria-label='status'
                  name='familyStatusId'
                  id='familyStatusId'
                  value={`${props.formData.familyStatusId}`}
                  row
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
          </FormBox>
          <FormBox helperText="The number of people you're interested in living with.">
            <Grid item xs>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='minHomeCapacity'
                label='Min Living Capacity'
                name='minHomeCapacity'
                type='number'
                value={props.formData.minHomeCapacity}
                onChange={(event) => {
                  if (event.target.value >= 0) {
                    props.handleInputChange(event);
                  }
                }}
              />
            </Grid>
            <Grid item xs>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='maxHomeCapacity'
                label='Max Living Capacity'
                name='maxHomeCapacity'
                type='number'
                value={props.formData.maxHomeCapacity}
                onChange={(event) => {
                  if (event.target.value >= 0) {
                    props.handleInputChange(event);
                  }
                }}
              />
            </Grid>
          </FormBox>
          <FormBox>
            <Grid item xs>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='minMonthlyBudget'
                label='Min Monthly Budget'
                name='minMonthlyBudget'
                type='number'
                value={props.formData.minMonthlyBudget}
                onChange={(event) => {
                  if (event.target.value >= 0) {
                    props.handleInputChange(event);
                  }
                }}
              />
            </Grid>
            <Grid item xs>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='maxMonthlyBudget'
                label='Max Monthly Budget'
                name='maxMonthlyBudget'
                type='number'
                value={props.formData.maxMonthlyBudget}
                onChange={(event) => {
                  if (event.target.value >= 0) {
                    props.handleInputChange(event);
                  }
                }}
              />
            </Grid>
          </FormBox>
          <br />
          <FormBox helperText='Select the cities you would like to live in. You can also specify additional details about your area requirements.'>
            <Grid item xs={12}>
              <LocationFilter label='Desired cities' onChange={props.handleDropdownChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                fullWidth
                id='locationText'
                label='Additional details (rural, country, etc)'
                name='locationText'
                onChange={props.handleInputChange}
              />
            </Grid>
          </FormBox>
          <br />
          <FormBox helperText='Please add additional details if you are not pet friendly.'>
            <Grid item xs>
              <FormLabel component='legend'>Are you pet friendly?</FormLabel>
            </Grid>
            <Grid item xs onChange={props.handleInputChange}>
              <RadioGroup name='petRestrictions' id='petRestrictions' value={`${props.formData.petRestrictions}`} row>
                <FormControlLabel value='1' control={<Radio />} label='Yes' />
                <FormControlLabel value='0' control={<Radio />} label='No' />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} onChange={props.handleInputChange}>
              <RadioText
                invertCheck
                check={`${Boolean(Number(props.formData.petRestrictions))}`}
                name='petRestrictionsText'
                value={props.formData.petRestrictionsText}
              />
            </Grid>
          </FormBox>
          <FormBox helperText='Please add additional details if you do have health or mobility issues.'>
            <Grid item xs>
              <FormLabel component='legend'>Do you have health or mobility issues?</FormLabel>
            </Grid>
            <Grid item xs onChange={props.handleInputChange}>
              <RadioGroup
                name='healthRestrictions'
                id='healthRestrictions'
                value={`${props.formData.healthRestrictions}`}
                row
              >
                <FormControlLabel value='1' control={<Radio />} label='Yes' />
                <FormControlLabel value='0' control={<Radio />} label='No' />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} onChange={props.handleInputChange}>
              <RadioText
                check={`${Boolean(Number(props.formData.healthRestrictions))}`}
                name='healthRestrictionsText'
                value={props.formData.healthRestrictionsText}
              />
            </Grid>
          </FormBox>
          <FormBox helperText='Please list any religious preferences you have with regards to home sharing.'>
            <Grid item xs>
              <FormLabel component='legend'>Do you prefer others with the same religion?</FormLabel>
            </Grid>
            <Grid item xs onChange={props.handleInputChange}>
              <RadioGroup
                aria-label='religion'
                name='religionRestrictions'
                id='religionRestrictions'
                value={`${props.formData.religionRestrictions}`}
                row
              >
                <FormControlLabel value='1' control={<Radio />} label='Yes' />
                <FormControlLabel value='0' control={<Radio />} label='No' />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} onChange={props.handleInputChange}>
              <RadioText check='true' name='religionRestrictionsText' value={props.formData.religionRestrictionsText} />
            </Grid>
          </FormBox>
          <FormBox helperText='Please add additional details if you are not smoking friendly.'>
            <Grid item xs>
              <FormLabel component='legend'>Are you a smoker or are smoking friendly?</FormLabel>
            </Grid>
            <Grid item xs onChange={props.handleInputChange}>
              <RadioGroup
                aria-label='smoke'
                name='smokingRestrictions'
                id='smokingRestrictions'
                value={`${props.formData.smokingRestrictions}`}
                row
              >
                <FormControlLabel value='1' control={<Radio />} label='Yes' />
                <FormControlLabel value='0' control={<Radio />} label='No' />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} onChange={props.handleInputChange}>
              <RadioText
                invertCheck
                check={`${Boolean(Number(props.formData.smokingRestrictions))}`}
                name='smokingRestrictionsText'
                value={props.formData.smokingRestrictionsText}
              />
            </Grid>
          </FormBox>
          <FormBox helperText='Please add additional details if you do have allergies.'>
            <Grid item xs>
              <FormLabel component='legend'>Do you have allergies?</FormLabel>
            </Grid>
            <Grid item xs onChange={props.handleInputChange}>
              <RadioGroup
                aria-label='allergy'
                name='allergies'
                id='allergies'
                value={`${props.formData.allergies}`}
                row
              >
                <FormControlLabel value='1' control={<Radio />} label='Yes' />
                <FormControlLabel value='0' control={<Radio />} label='No' />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} onChange={props.handleInputChange}>
              <RadioText
                check={`${Boolean(Number(props.formData.allergies))}`}
                name='allergiesText'
                value={props.formData.allergiesText}
              />
            </Grid>
          </FormBox>
          <FormBox helperText='Please add additional details if you do have any dietary preferences or restrictions.'>
            <Grid item xs>
              <FormLabel component='legend'>Do you have any dietary preferences or restrictions?</FormLabel>
            </Grid>
            <Grid item xs onChange={props.handleInputChange}>
              <RadioGroup
                aria-label='dietRestrictions'
                name='dietRestrictions'
                id='dietRestrictions'
                value={`${props.formData.dietRestrictions}`}
                row
              >
                <FormControlLabel value='1' control={<Radio />} label='Yes' />
                <FormControlLabel value='0' control={<Radio />} label='No' />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} onChange={props.handleInputChange}>
              <RadioText
                check={`${Boolean(Number(props.formData.dietRestrictions))}`}
                name='dietRestrictionsText'
                value={props.formData.dietRestrictionsText}
              />
            </Grid>
          </FormBox>
          <FormBox
            helperText='If you have a home to share, you can provide a brief summary here to be displayed
              on your profile. In addition, you can add a full listing in the Members with Homes to
              Share section of the website once your account has been created.'
          >
            <Grid item xs>
              <FormLabel component='legend'>Do you have a home to share?</FormLabel>
            </Grid>
            <Grid item xs onChange={props.handleInputChange}>
              <RadioGroup
                aria-label='home'
                name='hasHousing'
                id='hasHousing'
                value={`${props.formData.hasHousing}`}
                row
              >
                <FormControlLabel value='1' control={<Radio />} label='Yes' />
                <FormControlLabel value='0' control={<Radio />} label='No' />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} onChange={props.handleInputChange}>
              <RadioText
                check={`${Boolean(Number(props.formData.hasHousing))}`}
                name='housingDescription'
                value={props.formData.housingDescription}
              />
            </Grid>
          </FormBox>
          <FormBox helperText='Enter any additional information about yourself.'>
            <Grid item xs>
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
          </FormBox>
        </Grid>
        <br />
        <Divider />
        <br />
        <Grid container direction='row'>
          <Grid item xs={2}>
            <Button type='submit' fullWidth variant='contained' color='primary'>
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
}
