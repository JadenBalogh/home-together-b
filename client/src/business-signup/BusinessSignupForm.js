import { useState } from 'react';
import {
  FormControl,
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
} from '@material-ui/core';

export default function SignupForm(props) {
  const [isMailAddrSame, setIsMailAddrSame] = useState(false);

  return (
    <Card className='page'>
      <Typography component='h1' variant='h5'>
        Sign up
      </Typography>
      <form onSubmit={props.handleSignup} noValidate>
        <Grid container spacing={2}>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link href='/signin' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          <Grid item xs={12} container>
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
            </FormControl>
          </Grid>
          <Grid item xs={12} container>
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
          <Grid item xs={12} container>
            <TextField
              name='organizationWebsite'
              variant='outlined'
              fullWidth
              id='organizationWebsite'
              label='Website URL'
              onChange={props.handleInputChange}
            />
          </Grid>
          <Grid item xs={12} container>
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
          <Grid item xs={12} container>
            <TextField
              variant='outlined'
              fullWidth
              id='organizationStreetAddress'
              label='Street Address'
              name='organizationStreetAddress'
              onChange={props.handleInputChange}
            />
          </Grid>
          <Grid item xs={12} container>
            <FormControlLabel
              onChange={(event) => setIsMailAddrSame(event.target.checked)}
              control={<Switch name='checkedA' color='primary' />}
              label='Mailing Address is the same as Street Address'
            ></FormControlLabel>
          </Grid>
          {isMailAddrSame ? (
            ''
          ) : (
            <Grid item xs={12} container>
              <TextField
                variant='outlined'
                fullWidth
                id='organizationMailingAddress'
                label='Mailing Address'
                name='organizationMailingAddress'
                onChange={props.handleInputChange}
              />
            </Grid>
          )}
          <Grid
            item
            xs={12}
            container
            direction='column'
            alignItems='flex-start'
            justify='flex-start'
            onChange={props.handleInputChange}
          >
            <FormLabel component='legend'>Is this business nation wide?</FormLabel>
            <FormControl component='fieldset'>
              <RadioGroup aria-label='national' name='national' id='national'>
                <FormControlLabel value='true' control={<Radio />} label='Yes' />
                <FormControlLabel value='false' control={<Radio />} label='No' />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} container alignItems='center'>
            <FormLabel component='legend'>Business logo:</FormLabel>
            &ensp;
            <input type='file' />
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
            <FormLabel component='legend'>
              <i>This is the username you will use to sign into the site.</i>
            </FormLabel>
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
        </Grid>
        <br />
        <Button type='submit' fullWidth variant='contained' color='primary'>
          Sign Up
        </Button>
      </form>
    </Card>
  );
}
