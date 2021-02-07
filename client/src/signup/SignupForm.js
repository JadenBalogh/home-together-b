import React from 'react';
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
import Select from '@material-ui/core/Select';
import { InputLabel, MenuItem } from '@material-ui/core';
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
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='fname'
                name='firstName'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
                onChange={(event) => {
                  const { value } = event.target;
                  props.formData.firstName = { value };
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='lname'
                onChange={(event) => {
                  const { value } = event.target;
                  props.formData.lastName = { value };
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InputLabel>Birth Year</InputLabel>
              <Select
                id='birthYear'
                required
                value=''
                onChange={(event) => {
                  const { value } = event.target;
                  props.formData.birthYear = { value };
                }}
              >
                <MenuItem value='2020'>2020</MenuItem>
                <MenuItem value='2019'>2019</MenuItem>
                <MenuItem value='2018'>2018</MenuItem>
                <MenuItem value='2017'>2017</MenuItem>
                <MenuItem value='2016'>2016</MenuItem>
                <MenuItem value='2015'>2015</MenuItem>
                <MenuItem value='2014'>2014</MenuItem>
                <MenuItem value='2013'>2013</MenuItem>
                <MenuItem value='2012'>2012</MenuItem>
                <MenuItem value='2011'>2011</MenuItem>
                <MenuItem value='2010'>2010</MenuItem>
                <MenuItem value='2009'>2009</MenuItem>
                <MenuItem value='2008'>2008</MenuItem>
                <MenuItem value='2007'>2007</MenuItem>
                <MenuItem value='2006'>2006</MenuItem>
                <MenuItem value='2005'>2005</MenuItem>
                <MenuItem value='2004'>2004</MenuItem>
                <MenuItem value='2003'>2003</MenuItem>
                <MenuItem value='2002'>2002</MenuItem>
                <MenuItem value='2001'>2001</MenuItem>
                <MenuItem value='2000'>2000</MenuItem>
                <MenuItem value='1999'>1999</MenuItem>
                <MenuItem value='1998'>1998</MenuItem>
                <MenuItem value='1997'>1997</MenuItem>
                <MenuItem value='1996'>1996</MenuItem>
                <MenuItem value='1995'>1995</MenuItem>
                <MenuItem value='1994'>1994</MenuItem>
                <MenuItem value='1993'>1993</MenuItem>
                <MenuItem value='1992'>1992</MenuItem>
                <MenuItem value='1991'>1991</MenuItem>
                <MenuItem value='1990'>1990</MenuItem>
                <MenuItem value='1989'>1989</MenuItem>
                <MenuItem value='1988'>1988</MenuItem>
                <MenuItem value='1987'>1987</MenuItem>
                <MenuItem value='1986'>1986</MenuItem>
                <MenuItem value='1985'>1985</MenuItem>
                <MenuItem value='1984'>1984</MenuItem>
                <MenuItem value='1983'>1983</MenuItem>
                <MenuItem value='1982'>1982</MenuItem>
                <MenuItem value='1981'>1981</MenuItem>
                <MenuItem value='1980'>1980</MenuItem>
                <MenuItem value='1979'>1979</MenuItem>
                <MenuItem value='1978'>1978</MenuItem>
                <MenuItem value='1977'>1977</MenuItem>
                <MenuItem value='1976'>1976</MenuItem>
                <MenuItem value='1975'>1975</MenuItem>
                <MenuItem value='1974'>1974</MenuItem>
                <MenuItem value='1973'>1973</MenuItem>
                <MenuItem value='1972'>1972</MenuItem>
                <MenuItem value='1971'>1971</MenuItem>
                <MenuItem value='1970'>1970</MenuItem>
                <MenuItem value='1969'>1969</MenuItem>
                <MenuItem value='1968'>1968</MenuItem>
                <MenuItem value='1967'>1967</MenuItem>
                <MenuItem value='1966'>1966</MenuItem>
                <MenuItem value='1965'>1965</MenuItem>
                <MenuItem value='1964'>1964</MenuItem>
                <MenuItem value='1963'>1963</MenuItem>
                <MenuItem value='1962'>1962</MenuItem>
                <MenuItem value='1961'>1961</MenuItem>
                <MenuItem value='1960'>1960</MenuItem>
                <MenuItem value='1959'>1959</MenuItem>
                <MenuItem value='1958'>1958</MenuItem>
                <MenuItem value='1957'>1957</MenuItem>
                <MenuItem value='1956'>1956</MenuItem>
                <MenuItem value='1955'>1955</MenuItem>
                <MenuItem value='1954'>1954</MenuItem>
                <MenuItem value='1953'>1953</MenuItem>
                <MenuItem value='1952'>1952</MenuItem>
                <MenuItem value='1951'>1951</MenuItem>
                <MenuItem value='1950'>1950</MenuItem>
                <MenuItem value='1949'>1949</MenuItem>
                <MenuItem value='1948'>1948</MenuItem>
                <MenuItem value='1947'>1947</MenuItem>
                <MenuItem value='1946'>1946</MenuItem>
                <MenuItem value='1945'>1945</MenuItem>
                <MenuItem value='1944'>1944</MenuItem>
                <MenuItem value='1943'>1943</MenuItem>
                <MenuItem value='1942'>1942</MenuItem>
                <MenuItem value='1941'>1941</MenuItem>
                <MenuItem value='1940'>1940</MenuItem>
                <MenuItem value='1939'>1939</MenuItem>
                <MenuItem value='1938'>1938</MenuItem>
                <MenuItem value='1937'>1937</MenuItem>
                <MenuItem value='1936'>1936</MenuItem>
                <MenuItem value='1935'>1935</MenuItem>
                <MenuItem value='1934'>1934</MenuItem>
                <MenuItem value='1933'>1933</MenuItem>
                <MenuItem value='1932'>1932</MenuItem>
                <MenuItem value='1931'>1931</MenuItem>
                <MenuItem value='1930'>1930</MenuItem>
                <MenuItem value='1929'>1929</MenuItem>
                <MenuItem value='1928'>1928</MenuItem>
                <MenuItem value='1927'>1927</MenuItem>
                <MenuItem value='1926'>1926</MenuItem>
                <MenuItem value='1925'>1925</MenuItem>
                <MenuItem value='1924'>1924</MenuItem>
                <MenuItem value='1923'>1923</MenuItem>
                <MenuItem value='1922'>1922</MenuItem>
                <MenuItem value='1921'>1921</MenuItem>
                <MenuItem value='1920'>1920</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputLabel>Month</InputLabel>
              <Select
                id='birthMonth'
                required
                value=''
                onChange={(event) => {
                  const { value } = event.target;
                  props.formData.birthMonth = { value };
                }}
              >
                <MenuItem value='1'>January</MenuItem>
                <MenuItem value='2'>February</MenuItem>
                <MenuItem value='3'>March</MenuItem>
                <MenuItem value='4'>April</MenuItem>
                <MenuItem value='5'>May</MenuItem>
                <MenuItem value='6'>June</MenuItem>
                <MenuItem value='7'>July</MenuItem>
                <MenuItem value='8'>August</MenuItem>
                <MenuItem value='9'>September</MenuItem>
                <MenuItem value='10'>October</MenuItem>
                <MenuItem value='11'>November</MenuItem>
                <MenuItem value='12'>December</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputLabel>Day</InputLabel>
              <Select
                id='birthDay'
                required
                value=''
                onChange={(event) => {
                  const { value } = event.target;
                  props.formData.birthDay = { value };
                }}
              >
                <MenuItem value='1'>1</MenuItem>
                <MenuItem value='2'>2</MenuItem>
                <MenuItem value='3'>3</MenuItem>
                <MenuItem value='4'>4</MenuItem>
                <MenuItem value='5'>5</MenuItem>
                <MenuItem value='6'>6</MenuItem>
                <MenuItem value='7'>7</MenuItem>
                <MenuItem value='8'>8</MenuItem>
                <MenuItem value='9'>9</MenuItem>
                <MenuItem value='10'>10</MenuItem>
                <MenuItem value='11'>11</MenuItem>
                <MenuItem value='12'>12</MenuItem>
                <MenuItem value='13'>13</MenuItem>
                <MenuItem value='14'>14</MenuItem>
                <MenuItem value='15'>15</MenuItem>
                <MenuItem value='16'>16</MenuItem>
                <MenuItem value='17'>17</MenuItem>
                <MenuItem value='18'>18</MenuItem>
                <MenuItem value='19'>19</MenuItem>
                <MenuItem value='20'>20</MenuItem>
                <MenuItem value='21'>21</MenuItem>
                <MenuItem value='22'>22</MenuItem>
                <MenuItem value='23'>23</MenuItem>
                <MenuItem value='24'>24</MenuItem>
                <MenuItem value='25'>25</MenuItem>
                <MenuItem value='26'>26</MenuItem>
                <MenuItem value='27'>27</MenuItem>
                <MenuItem value='28'>28</MenuItem>
                <MenuItem value='29'>29</MenuItem>
                <MenuItem value='30'>30</MenuItem>
                <MenuItem value='31'>31</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='homeAddress'
                label='Home Address'
                name='homeAddress'
                autoComplete='homeAddress'
                helperText='If you do not have one, use the address of a friend, relative, or verifiable organization.'
                onChange={(event) => {
                  const { value } = event.target;
                  props.formData.homeAddress = { value };
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='mailAddress'
                label='Mailing Address'
                name='mailAddress'
                autoComplete='mailAddress'
                helperText='If you do not have one, use the address of a friend, relative, or verifiable organization.'
                onChange={(event) => {
                  const { value } = event.target;
                  props.formData.mailAddress = { value };
                }}
              />
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
              onChange={(event) => {
                const { value } = event.target;
                props.formData.genderId = { value };
              }}
            >
              <FormControl component='fieldset'>
                <FormLabel component='legend'>Gender</FormLabel>
                <RadioGroup aria-label='gender' name='gender' id='gender'>
                  <FormControlLabel value='1' control={<Radio />} label='Female' />
                  <FormControlLabel value='0' control={<Radio />} label='Male' />
                  <FormControlLabel value='2' control={<Radio />} label='Other' />
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
              onChange={(event) => {
                const { value } = event.target;
                props.formData.familyStatusId = { value };
              }}
            >
              <FormControl component='fieldset'>
                <FormLabel component='legend'>Status</FormLabel>
                <RadioGroup aria-label='status' name='status' id='status'>
                  <FormControlLabel value='0' control={<Radio />} label='Single' />
                  <FormControlLabel value='1' control={<Radio />} label='Couple' />
                  <FormControlLabel value='2' control={<Radio />} label='Couple with children' />
                  <FormControlLabel value='3' control={<Radio />} label='Single parent' />
                  <FormControlLabel value='4' control={<Radio />} label='Existing Group' />
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
              onChange={(event) => {
                const { value } = event.target;
                props.formData.peopleCount = { value };
              }}
            >
              <FormControl component='fieldset'>
                <FormLabel component='legend'>Open to share with</FormLabel>
                <RadioGroup aria-label='people' name='people' id='people'>
                  <FormControlLabel value='1' control={<Radio />} label='1 person' />
                  <FormControlLabel value='2' control={<Radio />} label='2 people' />
                  <FormControlLabel value='3' control={<Radio />} label='3 people' />
                  <FormControlLabel value='4' control={<Radio />} label='4 people' />
                  <FormControlLabel value='0' control={<Radio />} label='Any amount' />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
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
              onChange={(event) => {
                const { value } = event.target;
                props.formData.disabilities = { value };
              }}
            >
              <FormControl component='fieldset'>
                <FormLabel component='legend'>Do you have health or mobility issues?</FormLabel>
                <RadioGroup aria-label='disabilities' name='disabilities' id='disabilities'>
                  <FormControlLabel value='true' control={<Radio />} label='Yes' />
                  <FormControlLabel value='false' control={<Radio />} label='No' />
                </RadioGroup>
              </FormControl>
            </Grid>
            <RadioText yesCheck={props.formData.disabilities} textBox={props.formData.disabilitiesText} />
            <Grid
              item
              xs={12}
              container
              direction='column'
              alignItems='flex-start'
              justify='flex-start'
              onChange={(event) => {
                const { value } = event.target;
                props.formData.religiousRestrictions = { value };
              }}
            >
              <FormControl component='fieldset'>
                <FormLabel component='legend'>Are you religious?</FormLabel>
                <RadioGroup aria-label='religious' name='religious' id='religious'>
                  <FormControlLabel value='true' control={<Radio />} label='Yes' />
                  <FormControlLabel value='false' control={<Radio />} label='No' />
                </RadioGroup>
              </FormControl>
            </Grid>
            <RadioText
              yesCheck={props.formData.religiousRestrictions}
              textBox={props.formData.religiousRestrictionsText}
            />
            <Grid
              item
              xs={12}
              container
              direction='column'
              alignItems='flex-start'
              justify='flex-start'
              onChange={(event) => {
                const { value } = event.target;
                props.formData.smokingRestrictions = { value };
              }}
            >
              <FormControl component='fieldset'>
                <FormLabel component='legend'>Are you a smoker or are smoking friendly?</FormLabel>
                <RadioGroup aria-label='smoke' name='smoke' id='smoke'>
                  <FormControlLabel value='true' control={<Radio />} label='Yes' />
                  <FormControlLabel value='false' control={<Radio />} label='No' />
                </RadioGroup>
              </FormControl>
            </Grid>
            <RadioText yesCheck={props.formData.smokingRestrictions} textBox={props.formData.smokingRestrictionsText} />
            <Grid
              item
              xs={12}
              container
              direction='column'
              alignItems='flex-start'
              justify='flex-start'
              onChange={(event) => {
                const { value } = event.target;
                props.formData.allergies = { value };
              }}
            >
              <FormControl component='fieldset'>
                <FormLabel component='legend'>Do you have allergies?</FormLabel>
                <RadioGroup aria-label='allergy' name='allergy' id='allergy'>
                  <FormControlLabel value='true' control={<Radio />} label='Yes' />
                  <FormControlLabel value='false' control={<Radio />} label='No' />
                </RadioGroup>
              </FormControl>
            </Grid>
            <RadioText yesCheck={props.formData.allergies} textBox={props.formData.allergiesText} />
            <Grid
              item
              xs={12}
              container
              direction='column'
              alignItems='flex-start'
              justify='flex-start'
              onChange={(event) => {
                const { value } = event.target;
                props.formData.hasHousing = { value };
              }}
            >
              <FormControl component='fieldset'>
                <FormLabel component='legend'>Do you have a home to share?</FormLabel>
                <RadioGroup aria-label='home' name='home' id='home'>
                  <FormControlLabel value='true' control={<Radio />} label='Yes' />
                  <FormControlLabel value='false' control={<Radio />} label='No' />
                </RadioGroup>
              </FormControl>
            </Grid>
            <RadioText yesCheck={props.formData.hasHousing} textBox={props.formData.housingDescription} />
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                multiline
                rows={3}
                rowsMax={3}
                fullWidth
                id='about'
                label='About You'
                name='about'
                onChange={(event) => {
                  const { value } = event.target;
                  props.formData.profileText = { value };
                }}
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
