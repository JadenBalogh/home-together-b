import React from 'react';
import { Card, Button, Grid, Typography, Divider } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import './Listings.css';

export default function ListingForm(props) {
  return (
    <Card className='page'>
      <Grid container>
        <Grid item container xs={10}>
          <Grid item container spacing={2} alignItems='center' justify='flex-start'>
            <Grid item>
              <Typography variant='h5'>{props.listing.title}</Typography>
              <Typography variant='body1'>{props.listing.subDescription}</Typography>
            </Grid>
            <Grid item>
              <Typography variant='subtitle1'>({props.listing.categoryName})</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container alignItems='center' justify='flex-end' xs={2}>
          <Grid item>
            <Rating name='rating' value={Number(props.listing.ratingAverage)} defaultValue={5} precision={0.5} readOnly />
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
            {props.categoryDirectory[4].includes(props.listing.categoryId) ? (
              <Grid container columns xs={12}>
                <Grid xs={12}>
                  <Typography variant='body1'> <b>Contact Name</b> </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography variant='body1'>{props.listing.groupName}</Typography>
                </Grid>
              </Grid>
            ) : (<></>)}
            {props.categoryDirectory[14].concat(props.categoryDirectory[24],props.categoryDirectory[54],props.categoryDirectory[64]).includes(props.listing.categoryId) ? (
                <Grid container columns xs={12}>
                  <Grid xs={12}>
                    <Typography variant='body1'> <b>Company Name</b> </Typography>
                  </Grid>
                  <Grid xs={12}>
                    <Typography variant='body1'>{props.listing.groupName}</Typography>
                  </Grid>
                </Grid>
            ) : (<></>)}
            {props.categoryDirectory[34].includes(props.listing.categoryId) ? (
                <Grid container columns xs={12}>
                  <Grid xs={12}>
                    <Typography variant='body1'> <b>Organization Name</b> </Typography>
                  </Grid>
                  <Grid xs={12}>
                    <Typography variant='body1'>{props.listing.groupName}</Typography>
                  </Grid>
                </Grid>
            ) : (<></>)}
            {props.categoryDirectory[44].includes(props.listing.categoryId) ? (
                <Grid container columns xs={12}>
                  <Grid xs={12}>
                    <Typography variant='body1'> <b>Housing Group Name</b> </Typography>
                  </Grid>
                  <Grid xs={12}>
                    <Typography variant='body1'>{props.listing.groupName}</Typography>
                  </Grid>
                </Grid>
            ) : (<></>)}
            {props.categoryDirectory[74].concat(props.categoryDirectory[84]).includes(props.listing.categoryId) ? (
                <Grid container columns xs={12}>
                  <Grid xs={12}>
                    <Typography variant='body1'> <b>Agency Name</b> </Typography>
                  </Grid>
                  <Grid xs={12}>
                    <Typography variant='body1'>{props.listing.groupName}</Typography>
                  </Grid>
                </Grid>
            ) : (<></>)}
            {props.categoryDirectory[4].concat(props.categoryDirectory[34]).includes(props.listing.categoryId) ? (
              <Grid container columns xs={12}>
                <Grid xs={8}>
                  <Typography variant='body1'> <b>Pricing</b> </Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography variant='body1'>{'$'+props.listing.price}</Typography>
                </Grid>
              </Grid>
            ) : (<></>)}
            {props.categoryDirectory[24].concat(props.categoryDirectory[54],props.categoryDirectory[64]).includes(props.listing.categoryId) ? (
              <Grid container columns xs={12}>
                <Grid xs={8}>
                  <Typography variant='body1'> <b>Rates and Fees</b> </Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography variant='body1'>{'$'+props.listing.price}</Typography>
                </Grid>
              </Grid>
            ) : (<></>)}
            {props.categoryDirectory[94].includes(props.listing.categoryId) ? (
              <Grid container columns xs={12}>
                <Grid xs={8}>
                  <Typography variant='body1'> <b>Monthly Cost</b> </Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography variant='body1'>{'$'+props.listing.price}</Typography>
                </Grid>
              </Grid>
            ) : (<></>)}
            {props.categoryDirectory[34].includes(props.listing.categoryId) ? (
              <Grid container columns xs={12}>
                <Grid xs={8}>
                  <Typography variant='body1'> <b>Event Date</b> </Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography variant='body1'>{props.listing.eventDate}</Typography>
                </Grid>
                <Grid xs={8}>
                  <Typography variant='body1'> <b>Event Time</b> </Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography variant='body1'>{props.listing.eventTime}</Typography>
                </Grid>
              </Grid>
            ) : (<></>)}
            <Typography variant='body1'> <b>Additional Information</b> </Typography>
            <Typography variant='body1'>{props.listing.description}</Typography>
            {props.categoryDirectory[4].concat(props.categoryDirectory[94]).includes(props.listing.categoryId) ? (
              <Grid container columns xs={12}>
                <Grid xs={8}>
                  <Typography variant='body1'> <b>Utilities</b> </Typography>
                </Grid>
                <Grid xs={4}>
                  {props.listing.utilities === 1 ? (
                  <Typography variant='body1'>Yes</Typography>) : (
                  <Typography variant='body1'>No</Typography>
                  )}
                </Grid>
                <Grid xs={8}>
                  <Typography variant='body1'> <b>Furnished</b> </Typography>
                </Grid>
                <Grid xs={4}>
                  {props.listing.furnished === 1 ? (
                  <Typography variant='body1'>Yes</Typography>) : (
                  <Typography variant='body1'>No</Typography>
                  )}
                </Grid>
                <Grid xs={8}>
                  <Typography variant='body1'> <b>Pet Friendly</b> </Typography>
                </Grid>
                <Grid xs={4}>
                  {props.listing.petRestrictions === 1 ? (
                  <Typography variant='body1'>Yes</Typography>) : (
                  <Typography variant='body1'>No</Typography>
                  )}
                </Grid>
                <Grid xs={8}>
                  <Typography variant='body1'> <b>Smoking Friendly</b> </Typography>
                </Grid>
                <Grid xs={4}>
                  {props.listing.smoking === 1 ? (
                  <Typography variant='body1'>Yes</Typography>) : (
                  <Typography variant='body1'>No</Typography>
                  )}
                </Grid>
              </Grid>
              ) : (<></>)}
              {props.categoryDirectory[44].includes(props.listing.categoryId) ? (
                <Grid container columns xs={12}>
                  <Grid xs={8}>
                    <Typography variant='body1'> <b>For Sale</b> </Typography>
                  </Grid>
                  <Grid xs={4}>
                    {props.listing.forSale === 1 ? (
                    <Typography variant='body1'>Yes</Typography>) : (
                    <Typography variant='body1'>No</Typography>
                    )}
                  </Grid>
                  <Grid xs={8}>
                    <Typography variant='body1'> <b>ForRent</b> </Typography>
                  </Grid>
                  <Grid xs={4}>
                    {props.listing.forRent === 1 ? (
                    <Typography variant='body1'>Yes</Typography>) : (
                    <Typography variant='body1'>No</Typography>
                    )}
                  </Grid>
                </Grid>
              ) : (<></>)}
              {props.categoryDirectory[14].concat(props.categoryDirectory[24],props.categoryDirectory[34],props.categoryDirectory[44],props.categoryDirectory[54],props.categoryDirectory[64],props.categoryDirectory[74],props.categoryDirectory[84]).includes(props.listing.categoryId) ? (
                <Grid container columns xs={12}>
                  <Grid xs={8}>
                    <Typography variant='body1'> <b>Street Address</b> </Typography>
                  </Grid>
                  <Grid xs={4}>
                    <Typography variant='body1'>{props.listing.streetAddress}</Typography>
                  </Grid>
                  <Grid xs={8}>
                    <Typography variant='body1'> <b>Postal Code</b> </Typography>
                  </Grid>
                  <Grid xs={4}>
                    <Typography variant='body1'>{props.listing.postalCode}</Typography>
                  </Grid>
                </Grid>
              ) : (<></>)}
          </Grid>
        </Grid>
        <br />
        <br />
        {!props.categoryDirectory[94].includes(props.listing.categoryId) ? (<Grid>
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
              <Typography variant='body2'>{props.listing.website}</Typography>
            </Grid>
            <Grid item container xs={4} justify='center'>
              <Typography variant='body2'>{props.listing.email}</Typography>
            </Grid>
            <Grid item container xs={4} justify='flex-end'>
              <Typography variant='body2'>{props.listing.phone}</Typography>
            </Grid>
          </Grid>
        </Grid>) : (<></>)}
      </Grid>
      <br />
      <Divider />
      <br />
      <Grid container>
        <Grid item container xs={12} justify='center' spacing={2}>
          <Grid item align='center' xs={2}>
            <Button variant='contained' onClick={props.history.goBack}>
              Back
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
