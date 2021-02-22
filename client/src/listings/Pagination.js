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

export default function PaginationControlled() {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className={classes.pagination}>
      <Pagination count={10} color="primary" page={page} onChange={handleChange} />
    </div>
  );
}