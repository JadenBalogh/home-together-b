import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createMemberData(id, username, gender, age) {
    return { id, username, gender, age };
}

var rows = [];

export default function MemberList(props) {
    //window.alert(props.data);
    if(props.data !== undefined) {
        rows = props.data;
    }
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell align="right">Gender</TableCell>
                        <TableCell align="right">Age</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.username}
                            </TableCell>
                            <TableCell align="right">{row.gender}</TableCell>
                            <TableCell align="right">{row.age}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}