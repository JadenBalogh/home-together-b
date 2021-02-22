import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import '../shared/List.css';
import './Listings.css';
// import Ratings from '../shared/ratings';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: '1000px',
    paddingTop: '25px',
  },
  paper: {
    padding: theme.spacing(2),
    margin: 0,
  },
  img: {
    maxWidth: '250px',
    maxHeight: '250px',
    borderRadius: '5%',
  },
  accordionImg: {
    marginRight: '25px',
    maxWidth: '75px',
    maxHeight: '75px',
    borderRadius: '50%',
  },
}));

export default function ListingList({ listings }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {listings.map((listing) => (
        <Accordion key={listing.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
            <Grid container spacing={2} direction='row' alignItems='center' justify='space-between'>
              <Grid item container spacing={2} direction='row' alignItems='center' justify='flex-start' xs={10}>
                <img className={classes.accordionImg} alt='Sample' src={require('../shared/img.png').default} />
                <Grid item>
                  <Typography variant='h5'>{listing.title}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant='subtitle1'>({listing.categoryName})</Typography>
                </Grid>
              </Grid>
              <Grid item container spacing={2} direction='row' alignItems='center' justify='flex-end' xs={2}>
                <Grid item>
                  {/* <Ratings Ratings={Ratings}></Ratings> */}
                  <Rating
                    name='rating'
                    value={listing.ratingAverage}
                    defaultValue={5}
                    precision={0.5}
                    readOnly
                  />
                </Grid>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item>
                <img className={classes.img} alt='Sample' src={require('../shared/img.png').default} />
              </Grid>
              <Grid item xs container>
                <Grid item xs container direction='column' spacing={1}>
                  <Grid item xs={12} sm container spacing={1} alignItems='baseline' justify='space-between'>
                    <Grid item xs>
                      <Paper className={classes.paper}>
                        <Typography variant='body1'>{listing.description}</Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                  <Grid item xs sm container spacing={1}>
                    <Grid item xs>
                      <Paper className={classes.paper}>
                        <Typography variant='body2'>{listing.website}</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs>
                      <Paper className={classes.paper}>
                        <Typography variant='body2'>{listing.email}</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={3}>
                      <Paper className={classes.paper}>
                        <Typography variant='body2'>{listing.phone}</Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                  <Grid item container xs spacing={1} alignItems='flex-end'>
                    <Grid item container xs={9} spacing={1} justify='flex-start'>
                      <Grid item>
                        <Button size='medium' variant='outlined' color='primary'>
                          Contact
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button size='medium' variant='outlined' color='primary'>
                          Reviews
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid item container xs={3} justify='flex-end'>
                      <Grid item>
                        <Button size='medium' variant='outlined' color='secondary'>
                          Report
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Typography variant='body2'>
                      Published: {listing.creationDate.slice(0, 10)} by {listing.organizationName}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
