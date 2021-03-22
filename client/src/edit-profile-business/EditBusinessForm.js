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
  Card,
} from '@material-ui/core';
import IncText from './IncText';

export default function EditForm(props) {
  return (
    <Card className='page'>
      <Typography component='h1' variant='h5'>
        Edit Business Profile
      </Typography>
      <form onSubmit={props.handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} container>
            <TextField
              name='organizationName'
              variant='outlined'
              required
              fullWidth
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
              <IncText
                check={props.formData.incorporated}
                name='incorporatedName'
                value={props.formData.incorporatedName}
                text='Incorporated Name'
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} container>
            <TextField
              variant='outlined'
              required
              fullWidth
              id='organizationEmail'
              label='Business Email Address'
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
              label='Business Website URL'
              onChange={props.handleInputChange}
            />
          </Grid>
          <Grid item xs={12} container>
            <TextField
              variant='outlined'
              required
              fullWidth
              id='organizationMainPhone'
              label='Business Phone Number'
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
              id='organizationAltPhone'
              label='Business Cellphone Number'
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
              fullWidth
              id='organizationStreetAddress'
              label='Business Street Address'
              name='organizationStreetAddress'
              onChange={props.handleInputChange}
            />
          </Grid>
          <Grid item xs={12} container>
            <TextField
              variant='outlined'
              fullWidth
              id='organizationMailingAddress'
              label='Business Mailing Address'
              name='organizationMailingAddress'
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
            <FormLabel component='legend'>Is this business nation wide?</FormLabel>
            <FormControl component='fieldset'>
              <RadioGroup aria-label='national' name='national' id='national'>
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
              id='organizationPostalCode'
              label='Business Postal Code'
              name='organizationPostalCode'
              onChange={props.handleInputChange}
            />
          </Grid>
          <Grid item xs={12} container>
            <TextField
              name='organizationLogoURL'
              variant='outlined'
              fullWidth
              id='organizationLogoURL'
              label='Business Logo URL'
              onChange={props.handleInputChange}
            />
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
        </Grid>
        <Button type='submit' fullWidth variant='contained' color='primary'>
          Save Changes
        </Button>
      </form>
    </Card>
  );
}
