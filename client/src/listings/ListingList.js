import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export default function ListingList({ listings, pageSize, page }) {
  const history = useHistory();
  const [pageListings, setPageListings] = useState([]);

  const handleListingClicked = (id) => {
    history.push('/listing/' + id);
  };

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
    <>
      {pageListings.map((listing) => (
        <Grid
          key={listing.id}
          className='member-row'
          container
          alignItems='center'
          justify='space-between'
          onClick={() => handleListingClicked(listing.id)}
        >
          <Grid item xs={12} container spacing={2} alignItems='center' justify='flex-start'>
            <img className='listing-accordion-image' alt='Sample' src={require('../images/placeholder.png').default} />
            <Grid item>
              <Typography variant='h6'>{listing.title}</Typography>
            </Grid>
            <Grid item>
              <Typography variant='subtitle1'>({listing.categoryName})</Typography>
            </Grid>
            <ChevronRightIcon />
          </Grid>
        </Grid>
      ))}
    </>
  );
}
