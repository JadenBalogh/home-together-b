import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
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
import ProfileField from '../shared/ProfileField';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#CFE5F8',
    padding: '15px',
    borderRadius: '20px',
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function Member(props) {
  const classes = useStyles();
  const { id } = useParams();
  let history = useHistory();
  let [member, setMember] = useState({});

  let loadMember = () => {
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
        setMember({ ...result });
      });
  };

  useEffect(loadMember, [id]);

  return (
    <Container component='main' maxWidth='md'>
      <CssBaseline />
      <div className={classes.paper}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='h5'>{`${member.firstName} ${member.lastName}`}</Typography>
                <Divider />
              </Grid>
            </Grid>
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
                <Button variant='contained' color='primary' onClick={history.goBack}>
                  Back
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </div>
    </Container>
  );
}