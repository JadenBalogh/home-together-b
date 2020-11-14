import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

var rows = [];

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

//Info stored: username, gender*, age*, status*, budget*
function createMemberData(id, username, gender, age, status, budget) {
    return { id, username, gender, age, status, budget };
}

export default function MemberList(props) {
    const [state, setState] = useState(0);
    // if (state > 0) {
    //     isClicked();
    //     //rows = props.data;
    // }
    // if (state == 0) {
    //     isClicked2();
    //     //rows = props.data;
    // }
    if (props.data !== undefined) {
        if(rows !== props.data) {
            rows = props.data;
            setState(0);
        }
        
    }
    const classes = useStyles();
    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell align="right">Gender</TableCell>
                            <TableCell align="right">Age</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Budget</TableCell>
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
                                <TableCell align="right">{row.status}</TableCell>
                                <TableCell align="right">{row.budget}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}