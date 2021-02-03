import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function RadioText(props) {
  const classes = useStyles();
  
  if(props.yesCheck==="true") {
    return (
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="text"
          label="Elaborate"
          name="text"
          onChange={event => {
            const { value } = event.target;
            props.textBox = {value};
          }}
        />
      </Grid>
    );
  }
  else return null;
}