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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
export default function EditBusinessForm(props) {
  const classes = useStyles();

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Edit Business Details
        </Typography>
        <form className={classes.form} onSubmit={props.handleSubmit} noValidate>
          <Grid container spacing={2}>
          <Grid item xs={12} container>
              <TextField
                name='organizationName'
                variant='outlined'
                required
                fullWidth
                id='organizationName'
                label='Business Name'
                value={props.formData.organizationName}
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
                <RadioGroup aria-label='incorporated' name='incorporated' id='incorporated' value={props.formData.incorporated}>
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
                label='Business Email Address'
                type='email'
                name='organizationEmail'
                autoComplete='email'
                value={props.formData.organizationEmail}
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
                value={props.formData.organizationWebsite}
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
                value={props.formData.organizationMainPhone}
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
                value={props.formData.organizationStreetAddress}
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
                value={props.formData.organizationMailingAddress}
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
                <RadioGroup aria-label='national' name='national' id='national' value={props.formData.national}>
                  <FormControlLabel value='true' control={<Radio />} label='Yes' />
                  <FormControlLabel value='false' control={<Radio />} label='No' />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} container>
              <TextField
                name='organizationLogoURL'
                variant='outlined'
                fullWidth
                id='organizationLogoURL'
                label='Business Logo URL'
                value={props.formData.organizationLogoURL}
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
                value={props.formData.contactFirstName}
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
                value={props.formData.contactLastName}
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
                value={props.formData.contactEmail}
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
                value={props.formData.contactPhone}
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
      </div>
    </Container>
  );
}
