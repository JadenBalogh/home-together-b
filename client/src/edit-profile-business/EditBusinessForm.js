import { useState } from 'react';
import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Button,
  TextField,
  Grid,
  Typography,
  Card,
  Divider,
  Switch,
} from '@material-ui/core';
import FormBox from '../shared/FormBox';

export default function EditBusinessForm(props) {
  const [isMailAddrSame, setIsMailAddrSame] = useState(false);

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
                value={props.formData.organizationName}
                onChange={props.handleInputChange}
              />
            </Grid>
          </FormBox>
          <FormBox>
            <Grid item xs>
              <FormLabel component='legend'>Is this an incorporated account?</FormLabel>
            </Grid>
            <Grid item xs onChange={props.handleInputChange}>
              <RadioGroup name='incorporated' id='incorporated' value={`${props.formData.incorporated}`} row>
                <FormControlLabel value='1' control={<Radio />} label='Yes' />
                <FormControlLabel value='0' control={<Radio />} label='No' />
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
                value={props.formData.organizationEmail}
                onChange={props.handleInputChange}
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
                value={props.formData.organizationMainPhone}
                onChange={props.handleInputChange}
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
                value={props.formData.organizationStreetAddress}
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
                id='organizationMailingAddress'
                label={isMailAddrSame ? 'Same as Street Address' : 'Mailing Address'}
                name='organizationMailingAddress'
                value={
                  isMailAddrSame ? props.formData.organizationStreetAddress : props.formData.organizationMailingAddress
                }
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
                value={props.formData.organizationWebsite}
                onChange={props.handleInputChange}
              />
            </Grid>
          </FormBox>
          <FormBox>
            <Grid item xs>
              <FormLabel component='legend'>Is this business nation wide?</FormLabel>
            </Grid>
            <Grid item xs onChange={props.handleInputChange}>
              <RadioGroup name='national' id='national' value={`${props.formData.national}`} row>
                <FormControlLabel value='1' control={<Radio />} label='Yes' />
                <FormControlLabel value='0' control={<Radio />} label='No' />
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
            helperText='This information is used as individual contact information and for account verification purposes.'
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
                value={props.formData.contactFirstName}
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
                value={props.formData.contactLastName}
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
                value={props.formData.contactEmail}
                onChange={props.handleInputChange}
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
                value={props.formData.contactPhone}
                onChange={props.handleInputChange}
                onBlur={(event) => {
                  props.handleInputChange(event, props.checkPhoneExists);
                }}
                error={props.phoneExists} //checks if phone number was already used.
                helperText={props.phoneExists ? 'This phone number was already used to sign up.' : ''}
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
