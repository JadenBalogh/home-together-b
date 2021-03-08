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
  CardActions,
  Divider,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '15px',
  },
  card: {
    minWidth: 800,
  },
  img: {
    maxWidth: '250px',
    maxHeight: '250px',
    borderRadius: '5%',
  },
}));

export default function Listing() {
  const classes = useStyles();
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
        console.log(result);
        setListing({ ...result });
      });
  };

  useEffect(loadListing, [id]);

  return (
    <Container component='main' maxWidth='md'>
      <CssBaseline />
      <div className={classes.paper}>
        <Card className={classes.card}>
          <CardContent>
            <Grid container>
              <Grid item container xs={10}>
                <Grid item container spacing={2} alignItems='center' justify='flex-start'>
                  <Grid item>
                    <Typography variant='h5'>{listing.title}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='subtitle1'>({listing.categoryName})</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container alignItems='center' justify='flex-end' xs={2}>
                <Grid item>
                  <Rating
                    name='rating'
                    value={Number(listing.ratingAverage)}
                    defaultValue={5}
                    precision={0.5}
                    readOnly
                  />
                </Grid>
              </Grid>
            </Grid>
            <Divider />
            <br />
            <Grid container direction='column'>
              <Grid item container xs={12}>
                <Grid item xs={4}>
                  <img className={classes.img} alt='Sample' src={require('../shared/img.png').default} />
                </Grid>
                <Grid item xs={8}>
                  <Typography variant='body1'>
                    <b>About</b>
                  </Typography>
                  <Typography variant='body1'>{listing.description}</Typography>
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
          </CardContent>
          <CardActions>
            <Grid container>
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
