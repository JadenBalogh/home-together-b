import { useState } from 'react';
import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Button,
  TextField,
  Link,
  Grid,
  Card,
  Typography,
  Switch,
  Divider,
} from '@material-ui/core';
import FormBox from '../shared/FormBox';

export default function SignupForm(props) {
  const [isMailAddrSame, setIsMailAddrSame] = useState(false);

  return (
    <Card className='page'>
      <Grid container justify='space-between' alignItems='flex-end'>
        <Typography component='h1' variant='h5'>
          Create your Business Account
        </Typography>
        <Link href='/signin' variant='body2'>
          Already have an account? Sign in
        </Link>
      </Grid>
      <Divider />
      <br />
      <form onSubmit={props.handleSignup} noValidate>
        <Grid container direction='column' spacing={1}>
          <FormBox
            helperText='This information will be associated with all listings created using this account.'
            persist
          >
            <Grid item container direction='column'>
              <Grid item xs>
                <Typography variant='h6'>Business Information</Typography>
              </Grid>
              <Grid item xs>
                <Divider />
              </Grid>
            </Grid>
          </FormBox>
          <br />
          <FormBox
            spacing={1}
            helperText='This is the name that will be displayed for your business throughout the site.'
          >
            <Grid item xs>
              <TextField
                name='organizationName'
                variant='outlined'
                required
                fullWidth
                autoFocus
                id='organizationName'
                label='Business Name'
                onChange={props.handleInputChange}
              />
            </Grid>
          </FormBox>
          <FormBox>
            <Grid item xs>
              <FormLabel component='legend'>Is this an incorporated account?</FormLabel>
            </Grid>
            <Grid item xs onChange={props.handleInputChange}>
              <RadioGroup name='incorporated' id='incorporated' row>
                <FormControlLabel value='true' control={<Radio />} label='Yes' />
                <FormControlLabel value='false' control={<Radio />} label='No' />
              </RadioGroup>
            </Grid>
          </FormBox>
          <FormBox>
            <Grid item xs>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='organizationEmail'
                label='Email Address'
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
          </FormBox>
          <FormBox>
            <Grid item xs>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='organizationMainPhone'
                label='Phone Number'
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
          </FormBox>
          <FormBox>
            <Grid item xs>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='organizationStreetAddress'
                label='Street Address'
                name='organizationStreetAddress'
                onChange={props.handleInputChange}
              />
            </Grid>
          </FormBox>
          <FormBox>
            <Grid item xs>
              <TextField
                variant='outlined'
                disabled={isMailAddrSame}
                fullWidth
                id='mailAddress'
                label={isMailAddrSame ? 'Same as Street Address' : 'Mailing Address'}
                name='mailAddress'
                autoComplete='mailAddress'
                onChange={props.handleInputChange}
              />
            </Grid>
            <Switch onChange={(event) => setIsMailAddrSame(event.target.checked)} color='primary' />
            <Typography>Same as Street</Typography>
          </FormBox>
          <FormBox>
            <Grid item xs>
              <TextField
                name='organizationWebsite'
                variant='outlined'
                fullWidth
                id='organizationWebsite'
                label='Website URL'
                onChange={props.handleInputChange}
              />
            </Grid>
          </FormBox>
          <FormBox>
            <Grid item xs>
              <FormLabel component='legend'>Is this business nation wide?</FormLabel>
            </Grid>
            <Grid item xs onChange={props.handleInputChange}>
              <RadioGroup name='national' id='national' row>
                <FormControlLabel value='true' control={<Radio />} label='Yes' />
                <FormControlLabel value='false' control={<Radio />} label='No' />
              </RadioGroup>
            </Grid>
          </FormBox>
          <Grid item container alignItems='center'>
            <FormLabel component='legend'>Business logo:</FormLabel>
            &ensp;
            <input type='file' />
          </Grid>
          <br />
          <FormBox
            helperText='This information is used as individual contact information and for account verification purposess.'
            persist
          >
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
          <FormBox spacing={1} helperText='The name of the individual who should be the contact for this business.'>
            <Grid item xs>
              <TextField
                autoComplete='fname'
                name='contactFirstName'
                variant='outlined'
                required
                fullWidth
                id='contactFirstName'
                label='Contact First Name'
                onChange={props.handleInputChange}
              />
            </Grid>
            <Grid item xs>
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
          </FormBox>
          <FormBox>
            <Grid item xs>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='contactEmail'
                label='Contact Email Address'
                type='email'
                name='contactEmail'
                autoComplete='email'
                onBlur={(event) => {
                  props.handleInputChange(event, props.checkEmailExists);
                }}
                error={props.emailExists} //checks if email was already used
                helperText={props.emailExists ? 'This email was already used to sign up.' : ''}
              />
            </Grid>
          </FormBox>
          <FormBox>
            <Grid item xs>
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
          </FormBox>
          <br />
          <FormBox helperText='Your username is used to sign-in to Home Together, and is not shown to other users.'>
            <Grid item xs>
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
          </FormBox>
          <FormBox>
            <Grid item xs>
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
          </FormBox>
          <FormBox>
            <Grid item xs>
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
          </FormBox>
        </Grid>
        <br />
        <Divider />
        <br />
        <Grid container direction='row'>
          <Grid item xs={2}>
            <Button type='submit' fullWidth variant='contained' color='primary'>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
}
