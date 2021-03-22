import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Card,
} from '@material-ui/core';

const year = new Date().getFullYear();

function MemberList(props) {
  let history = useHistory();

  let handleMemberClicked = (id) => {
    history.push('/member/' + id);
  };

  return (
    <Card>
      <Typography component='h1' variant='h6'>
        Members Found:
      </Typography>
      <TableContainer component={Paper}>
        <Table size='small' aria-label='a dense table'>
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
              <TableRow className='member-row' key={member.id} onClick={() => handleMemberClicked(member.id)}>
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
    </Card>
  );
}

export default MemberList;
