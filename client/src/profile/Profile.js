import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardContent,
  Button,
  CssBaseline,
  Grid,
  Typography,
  Container,
  Divider,
  CardActions,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProfileField from './ProfileField';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function Profile() {
  const classes = useStyles();
  let history = useHistory();
  let [member, setMember] = useState({});

  let loadProfile = () => {
    let id = sessionStorage.getItem('id') || 1;

    const url = process.env.REACT_APP_LOCAL_URL || '';
    const route = '/api/get-member?';
    const params = new URLSearchParams('id=' + id).toString();
    fetch(url + route + params)
      .then((raw) => raw.json())
      .then((result) => {
        if (result.err) {
          window.alert(result.err);
          return;
        }
        console.log({ ...result });
        setMember({ ...result });
      });
  };

  let handleEdit = (event) => {
    event.preventDefault();
    history.push('/edit-profile');
  };

  useEffect(loadProfile, []);

  return (
    <Container component='main' maxWidth='md'>
      <CssBaseline />
      <div className={classes.paper}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <Typography variant='h5'>My Profile</Typography>
                <Divider />
              </Grid>
              <Grid item xs={2}>
                <Button variant='contained' color='primary' onClick={handleEdit}>
                  Edit Profile
                </Button>
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={2}>
              <ProfileField label='Name' value={`${member.firstName} ${member.lastName}`} />
              <ProfileField label='Home Address' value={member.homeAddress} />
              <ProfileField label='Mail Address' value={member.mailAddress} />
              <ProfileField label='Phone Number' value={member.phoneNumber} />
              <ProfileField label='Email' value={member.email} />
            </Grid>
            <br />
            <Typography variant='h6'>Public Information</Typography>
            <Divider />
            <br />
            <Grid container spacing={2}>
              <ProfileField label='Gender' value={member.gender} />
              <ProfileField label='Birth Year' value={member.birthYear} />
              <ProfileField label='Family Status' value={member.familyStatus} />
              <ProfileField
                label='Monthly Budget'
                value={`$${member.minMonthlyBudget} - $${member.maxMonthlyBudget}`}
              />
              <ProfileField
                label='Pet restrictions?'
                value={member.petRestrictions ? 'Yes' : 'No'}
                hasDetails={member.petRestrictions}
                details={member.petRestrictionsText}
              />
              <ProfileField
                label='Health restrictions?'
                value={member.healthRestrictions ? 'Yes' : 'No'}
                hasDetails={member.healthRestrictions}
                details={member.healthRestrictionsText}
              />
              <ProfileField
                label='Religion restrictions?'
                value={member.religionRestrictions ? 'Yes' : 'No'}
                hasDetails={member.religionRestrictions}
                details={member.religionRestrictionsText}
              />
              <ProfileField
                label='Smoking restrictions?'
                value={member.smokingRestrictions ? 'Yes' : 'No'}
                hasDetails={member.smokingRestrictions}
                details={member.smokingRestrictionsText}
              />
              <ProfileField
                label='Diet restrictions?'
                value={member.dietRestrictions ? 'Yes' : 'No'}
                hasDetails={member.dietRestrictions}
                details={member.dietRestrictionsText}
              />
              <ProfileField
                label='Allergies?'
                value={member.allergies ? 'Yes' : 'No'}
                hasDetails={member.allergies}
                details={member.allergiesText}
              />
              <ProfileField
                label='Already has housing?'
                value={member.hasHousing ? 'Yes' : 'No'}
                hasDetails={member.hasHousing}
                details={member.housingDescription}
              />
              <ProfileField
                label='Desired number of people:'
                value={`${member.minHomeCapacity} - ${member.maxHomeCapacity}`}
              />
              <ProfileField label='About Me' value={member.profileText} />
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container spacing={2}>
              <Grid item align='center' xs={12}>
                <Button variant='contained' color='primary' onClick={handleEdit}>
                  Edit Profile
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </div>
    </Container>
  );
}
