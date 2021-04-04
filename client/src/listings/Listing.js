import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Card, Button, Grid, Typography, Divider } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import './Listings.css';

export default function Listing() {
  const { id } = useParams();
  let history = useHistory();
  let [listing, setListing] = useState({});

  let loadListing = () => {
    const url = process.env.REACT_APP_LOCAL_URL || '';
    const route = '/api/get-listing?';
    const params = new URLSearchParams('id=' + id).toString();
    fetch(url + route + params)
      .then((raw) => raw.json())
      .then((result) => {
        if (result.err) {
          window.alert(result.err);
          return;
        }
        setListing({ ...result });
      });
  };

  useEffect(loadListing, [id]);
  listing.categoryId = `${listing.categoryId}`;

  return (
    <Card className='page'>
      <Grid container>
        <Grid item container xs={10}>
          <Grid item container spacing={2} alignItems='center' justify='flex-start'>
            <Grid item>
              <Typography variant='h5'>{listing.title}</Typography>
              <Typography variant='body1'>{listing.subDescription}</Typography>
            </Grid>
            <Grid item>
              <Typography variant='subtitle1'>({listing.categoryName})</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container alignItems='center' justify='flex-end' xs={2}>
          <Grid item>
            <Rating name='rating' value={Number(listing.ratingAverage)} defaultValue={5} precision={0.5} readOnly />
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <br />
      <Grid container direction='column'>
        <Grid item container xs={12}>
          <Grid item xs={4}>
            <img className='listing-image' alt='Sample' src={require('../images/placeholder.png').default} />
          </Grid>
          <Grid item xs={8}>
            {['104', '114', '124', '134', '144', '154', '164', '174'].includes(listing.categoryId) ? (
              <Grid container columns xs={12}>
                <Grid xs={12}>
                  <Typography variant='body1'> <b>Contact Name</b> </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography variant='body1'>{listing.groupName}</Typography>
                </Grid>
              </Grid>
            ) : (<></>)}
            {['184', '194', '204', '214', '214', '224', '234', '244', '254', '264', '274', '284', '294',
              '304', '314', '324', '334', '344', '354', '364', '374', '384', '394', '404', '524', '534',
              '544', '554', '564', '574', '584'].includes(listing.categoryId) ? (
                <Grid container columns xs={12}>
                  <Grid xs={12}>
                    <Typography variant='body1'> <b>Company Name</b> </Typography>
                  </Grid>
                  <Grid xs={12}>
                    <Typography variant='body1'>{listing.groupName}</Typography>
                  </Grid>
                </Grid>
            ) : (<></>)}
            {['414', '424', '434', '444', '454'].includes(listing.categoryId) ? (
              <Grid container columns xs={12}>
                <Grid xs={12}>
                  <Typography variant='body1'> <b>Orghanization Name</b> </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography variant='body1'>{listing.groupName}</Typography>
                </Grid>
              </Grid>
            ) : (<></>)}
            {['464', '474', '484', '494', '504', '514'].includes(listing.categoryId) ? (
              <Grid container columns xs={12}>
                <Grid xs={12}>
                  <Typography variant='body1'> <b>Housing Group Name</b> </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography variant='body1'>{listing.groupName}</Typography>
                </Grid>
              </Grid>
            ) : (<></>)}
            {['594', '604', '614', '624', '634', '644', '654'].includes(listing.categoryId) ? (
              <Grid container columns xs={12}>
                <Grid xs={12}>
                  <Typography variant='body1'> <b>Agency Name</b> </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography variant='body1'>{listing.groupName}</Typography>
                </Grid>
              </Grid>
            ) : (<></>)}
            {['104', '114', '124', '134', '144', '154', '164', '174', '414', '424', '434', '444', '454'].includes(listing.categoryId) ? (
              <Grid container columns xs={12}>
                <Grid xs={8}>
                  <Typography variant='body1'> <b>Pricing</b> </Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography variant='body1'>{'$'+listing.price}</Typography>
                </Grid>
              </Grid>
            ) : (<></>)}
            {['344', '354', '364', '374', '384', '394', '404', '524', '534', '544', '554', '564', '574', '584'].includes(listing.categoryId) ? (
              <Grid container columns xs={12}>
                <Grid xs={8}>
                  <Typography variant='body1'> <b>Rates and Fees</b> </Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography variant='body1'>{'$'+listing.price}</Typography>
                </Grid>
              </Grid>
            ) : (<></>)}
            {['664'].includes(listing.categoryId) ? (
              <Grid container columns xs={12}>
                <Grid xs={8}>
                  <Typography variant='body1'> <b>Monthly Cost</b> </Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography variant='body1'>{'$'+listing.price}</Typography>
                </Grid>
              </Grid>
            ) : (<></>)}
            {['414', '424', '434', '444', '454'].includes(listing.categoryId) ? (
              <Grid container columns xs={12}>
                <Grid xs={8}>
                  <Typography variant='body1'> <b>Event Date</b> </Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography variant='body1'>{listing.eventDate}</Typography>
                </Grid>
                <Grid xs={8}>
                  <Typography variant='body1'> <b>Event Time</b> </Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography variant='body1'>{listing.eventTime}</Typography>
                </Grid>
              </Grid>
            ) : (<></>)}
            <Typography variant='body1'> <b>Additional Information</b> </Typography>
            <Typography variant='body1'>{listing.description}</Typography>
            {['104', '114', '124', '134', '144', '154', '164', '174', '664'].includes(listing.categoryId) ? (
              <Grid container columns xs={12}>
                <Grid xs={8}>
                  <Typography variant='body1'> <b>Utilities</b> </Typography>
                </Grid>
                <Grid xs={4}>
                  {listing.utilities === 1 ? (
                  <Typography variant='body1'>Yes</Typography>) : (
                  <Typography variant='body1'>No</Typography>
                  )}
                </Grid>
                <Grid xs={8}>
                  <Typography variant='body1'> <b>Furnished</b> </Typography>
                </Grid>
                <Grid xs={4}>
                  {listing.furnished === 1 ? (
                  <Typography variant='body1'>Yes</Typography>) : (
                  <Typography variant='body1'>No</Typography>
                  )}
                </Grid>
                <Grid xs={8}>
                  <Typography variant='body1'> <b>Pet Friendly</b> </Typography>
                </Grid>
                <Grid xs={4}>
                  {listing.petRestrictions === 1 ? (
                  <Typography variant='body1'>Yes</Typography>) : (
                  <Typography variant='body1'>No</Typography>
                  )}
                </Grid>
                <Grid xs={8}>
                  <Typography variant='body1'> <b>Smoking Friendly</b> </Typography>
                </Grid>
                <Grid xs={4}>
                  {listing.smoking === 1 ? (
                  <Typography variant='body1'>Yes</Typography>) : (
                  <Typography variant='body1'>No</Typography>
                  )}
                </Grid>
              </Grid>
              ) : (<></>)}
              {['464', '474', '484', '494', '504', '514'].includes(listing.categoryId) ? (
                <Grid container columns xs={12}>
                  <Grid xs={8}>
                    <Typography variant='body1'> <b>For Sale</b> </Typography>
                  </Grid>
                  <Grid xs={4}>
                    {listing.forSale === 1 ? (
                    <Typography variant='body1'>Yes</Typography>) : (
                    <Typography variant='body1'>No</Typography>
                    )}
                  </Grid>
                  <Grid xs={8}>
                    <Typography variant='body1'> <b>ForRent</b> </Typography>
                  </Grid>
                  <Grid xs={4}>
                    {listing.forRent === 1 ? (
                    <Typography variant='body1'>Yes</Typography>) : (
                    <Typography variant='body1'>No</Typography>
                    )}
                  </Grid>
                </Grid>
              ) : (<></>)}
              {['184', '194', '204', '214', '214', '224', '234', '244', '254', '264', '274', '284', '294', '304', '314', '324',
             '334', '344', '354', '364', '374', '384', '394', '404', '414', '424', '434', '444', '454', '464', '474', '484',
              '494', '504', '514', '524', '534', '544', '554', '564', '574', '584', '594', '604', '614', '624', '634', '644', '654'].includes(listing.categoryId) ? (
                <Grid container columns xs={12}>
                  <Grid xs={8}>
                    <Typography variant='body1'> <b>Street Address</b> </Typography>
                  </Grid>
                  <Grid xs={4}>
                    <Typography variant='body1'>{listing.streetAddress}</Typography>
                  </Grid>
                  <Grid xs={8}>
                    <Typography variant='body1'> <b>Postal Code</b> </Typography>
                  </Grid>
                  <Grid xs={4}>
                    <Typography variant='body1'>{listing.postalCode}</Typography>
                  </Grid>
                </Grid>
              ) : (<></>)}
          </Grid>
        </Grid>
        <br />
        <br />
        <Grid item container xs={12} justify='space-between'>
          <Grid item container xs={4} justify='flex-start'>
            <Typography variant='body2'>
              <b>Website</b>
            </Typography>
          </Grid>
          <Grid item container xs={4} justify='center'>
            <Typography variant='body2'>
              <b>Email</b>
            </Typography>
          </Grid>
          <Grid item container xs={4} justify='flex-end'>
            <Typography variant='body2'>
              <b>Phone Number</b>
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12} justify='space-between'>
          <Grid item container xs={4} justify='flex-start'>
            <Typography variant='body2'>{listing.website}</Typography>
          </Grid>
          <Grid item container xs={4} justify='center'>
            <Typography variant='body2'>{listing.email}</Typography>
          </Grid>
          <Grid item container xs={4} justify='flex-end'>
            <Typography variant='body2'>{listing.phone}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <br />
      <Divider />
      <br />
      <Grid container>
        <Grid item container xs={12} justify='center' spacing={2}>
          <Grid item align='center' xs={2}>
            <Button variant='contained' onClick={history.goBack}>
              Back
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
