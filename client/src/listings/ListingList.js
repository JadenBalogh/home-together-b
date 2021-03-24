import { useEffect, useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Card,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Rating from '@material-ui/lab/Rating';
import './Listings.css';

export default function ListingList({ listings, pageSize, page }) {
  const [pageListings, setPageListings] = useState([]);

  const updatePageListings = () => {
    let pages = listings.reduce((total, current, index) => {
      if (index % pageSize === 0) {
        return [...total, [current]];
      } else {
        return [...total.slice(0, total.length - 1), [...total.slice(total.length - 1)[0], current]];
      }
    }, []);

    setPageListings(pages[page - 1]);
  };

  useEffect(updatePageListings, [listings, pageSize, page]);

  return (
    <Card>
      {pageListings.map((listing) => (
        <Accordion key={listing.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
            <Grid container spacing={2} direction='row' alignItems='center' justify='space-between'>
              <Grid item container spacing={2} direction='row' alignItems='center' justify='flex-start' xs={10}>
                <img className='listing-accordion-image' alt='Sample' src={require('../shared/img.png').default} />
                <Grid item>
                  <Typography variant='h6'>{listing.title}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant='subtitle1'>({listing.categoryName})</Typography>
                </Grid>
              </Grid>
              <Grid item container spacing={2} direction='row' alignItems='center' justify='flex-end' xs={2}>
                <Grid item>
                  <Rating name='rating' value={Number(listing.ratingAverage)} precision={0.5} readOnly />
                </Grid>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item>
                <img className='listing-image' alt='Sample' src={require('../shared/img.png').default} />
              </Grid>
              <Grid item xs container>
                <Grid item xs container direction='column' spacing={1}>
                  <Grid item xs={12} sm container spacing={1} alignItems='baseline' justify='space-between'>
                    <Grid item xs>
                      <Paper className='listing-item'>
                        <Typography variant='body1'>{listing.description}</Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                  <Grid item xs sm container spacing={1}>
                    <Grid item xs>
                      <Paper className='listing-item'>
                        <Typography variant='body2'>{listing.website}</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs>
                      <Paper className='listing-item'>
                        <Typography variant='body2'>{listing.email}</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={3}>
                      <Paper className='listing-item'>
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
                  <Paper className='listing-item'>
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
    </Card>
  );
}
