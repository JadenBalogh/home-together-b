import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './Listings.css';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),


    },
  },
}));

export default function PaginationControlled({count,page,pageChange}) {
  const classes = useStyles();
   
  const handleChange = (event, value) => {
    pageChange(value);
  };

  return (
    <div className={classes.pagination}>
      <Pagination count={count} color="primary" page={page} onChange={handleChange} />
    </div>
  );
}