import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardContent, Button, Grid, Typography, Divider, CardActions } from '@material-ui/core';
import ProfileField from '../shared/ProfileField';
import './BusinessProfile.css';

export default function BusinessProfile() {
  let history = useHistory();
  let [business, setBusiness] = useState({});

  let loadProfile = () => {
    let id = sessionStorage.getItem('id') || 1;

    const url = process.env.REACT_APP_LOCAL_URL || '';
    const route = '/api/get-business?';
    const params = new URLSearchParams('id=' + id).toString();
    fetch(url + route + params)
      .then((raw) => raw.json())
      .then((result) => {
        if (result.err) {
          window.alert(result.err);
          return;
        }
        setBusiness({ ...result });
      });
  };

  let handleEdit = (event) => {
    event.preventDefault();
    history.push('/edit-business-profile');
  };

  useEffect(loadProfile, []);

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h5'>Account Details</Typography>
            <Divider />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2}>
          <ProfileField label='Incorporated' value={business.incorporated ? 'Yes' : 'No'} />
          {/* <ProfileField label='Incorporated Name' value={business.incorporatedName} /> */}
          <ProfileField label='National Business' value={business.national ? 'Yes' : 'No'} />
          <ProfileField label='Business Logo URL' value={business.organizationLogoURL} />
          <ProfileField label='Contact Name' value={`${business.contactFirstName} ${business.contactLastName}`} />
          <ProfileField label='Contact Email Address' value={business.contactEmail} />
          <ProfileField label='Contact Phone Number' value={business.contactPhone} />
        </Grid>
        <br />
        <Typography variant='h6'>Public Information</Typography>
        <Divider />
        <br />
        <Grid container spacing={2}>
          <ProfileField label='Business Name' value={business.organizationName} />
          <ProfileField label='Business Email Address' value={business.organizationEmail} />
          <ProfileField label='Business Website URL' value={business.organizationWebsite} />
          <ProfileField label='Business Phone Number' value={business.organizationMainPhone} />
          {/* <ProfileField label='Business Cellphone Number' value={business.organizationAltPhone} /> */}
          <ProfileField label='Business Street Address' value={business.organizationStreetAddress} />
          <ProfileField label='Business Mailing Address' value={business.organizationMailingAddress} />
          <ProfileField label='Business Searchable Address' value={business.organizationPostalCode} />
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container spacing={2}>
          <Grid item align='center' xs={12}>
            <Button variant='contained' color='primary' onClick={handleEdit}>
              Edit Account Details
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}