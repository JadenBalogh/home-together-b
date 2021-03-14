import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import '../shared/List.css';

const year = new Date().getFullYear();
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  row: {
    cursor: 'pointer',
    '&:hover': {
      background: '#CFE5F8',
    }
  },
});

//Info stored: username, gender*, age*, status*, budget*
function MemberList(props) {
  let history = useHistory();

  let handleMemberClicked = (id) => {
    history.push('/member/' + id);
  };

  const classes = useStyles();
  return (
    <div className='list-container'>
      <Typography component='h1' variant='h6'>
        Members Found:
      </Typography>
      {/* <h3>Members Found:</h3> */}
      <TableContainer component={Paper}>
        <Table className={classes.table} size='small' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>User</b>
              </TableCell>
              <TableCell align='right'>
                <b>Gender</b>
              </TableCell>
              <TableCell align='right'>
                <b>Age</b>
              </TableCell>
              <TableCell align='right'>
                <b>Status</b>
              </TableCell>
              <TableCell align='right'>
                <b>Budget</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.members.map((member) => (
              <TableRow className={classes.row} key={member.id} onClick={() => handleMemberClicked(member.id)}>
                <TableCell component='th' scope='row'>
                  {`${member.firstName} ${member.lastName}`}
                </TableCell>
                <TableCell align='right'>{member.gender}</TableCell>
                <TableCell align='right'>{year - member.birthYear}</TableCell>
                <TableCell align='right'>{member.familyStatus}</TableCell>
                <TableCell align='right'>{member.maxMonthlyBudget}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MemberList;
