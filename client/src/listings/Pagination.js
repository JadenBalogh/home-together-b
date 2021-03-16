import React, { useCallback } from 'react';
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

export default function PaginationControlled(props) {
  const classes = useStyles();
  const { pageChange, pageNum, page } = props;
  const handleChange = useCallback((event, value) => {
    pageChange(value);
  }, []);

  return (
    <div className={classes.pagination}>
      <Pagination
        count={pageNum}
        color='primary'
        page={page}
        onChange={handleChange}
      />
    </div>
  );
}
