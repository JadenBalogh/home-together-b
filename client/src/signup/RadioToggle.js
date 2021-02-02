import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
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

export default function RadioToggle(props) {
  const classes = useStyles();
  const [draw, setDraw] = useState("");

  if(props.yesCheck==="true") {
    return (
      <Grid>
        <Grid
          item xs={12} 
          container direction='column' 
          alignItems='flex-start' 
          justify='flex-start' 
          onChange={event => {
            const { value } = event.target;
            props.yesCheck = {value};
            setDraw({value});
          }}
          >
            <FormControl component="fieldset">
              <FormLabel component="legend">{props.question}</FormLabel>
              <RadioGroup aria-label="radio" name="radio" id="radio">
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
        </Grid>
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
      </Grid>
    );
  }
  else
  return (
    <Grid>
      <Grid
        item xs={12} 
        container direction='column' 
        alignItems='flex-start' 
        justify='flex-start' 
        onChange={event => {
          const { value } = event.target;
          props.yesCheck = {value};
          setDraw({value});
        }}
        >
          <FormControl component="fieldset">
            <FormLabel component="legend">{props.Question}</FormLabel>
            <RadioGroup aria-label="radio" name="radio" id="radio">
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
      </Grid>
    </Grid>
  );
}