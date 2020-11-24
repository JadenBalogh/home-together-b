import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import '../stylesheets/List.css';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

//Info stored: username, gender*, age*, status*, budget*
function ListingList(props) {
  const classes = useStyles();
  return (
    <div className='list-container'>
      <h3>Services Found:</h3>
      <TableContainer component={Paper}>
        <Table className={classes.table} size='small' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Title</b>
              </TableCell>
              <TableCell align='right'>
                <b>Website</b>
              </TableCell>
              <TableCell align='right'>
                <b>Phone</b>
              </TableCell>
              <TableCell align='right'>
                <b>Email</b>
              </TableCell>
              <TableCell align='right'>
                <b>Category</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.listings.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell component='th' scope='row'>
                  {listing.title}
                </TableCell>
                <TableCell align='right'>{listing.website}</TableCell>
                <TableCell align='right'>{listing.phone}</TableCell>
                <TableCell align='right'>{listing.email}</TableCell>
                <TableCell align='right'>{listing.categoryName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ListingList;
