import React from 'react';
import Select from 'react-select';
import { InputLabel, Grid, Tooltip } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';

// Select box for filter panel
function SignupSelect(props) {
  return (
    <Grid item xs={12} container alignItems='center'>
      <Grid item xs={4} container justify='flex-start'>
        <InputLabel>{props.label}</InputLabel>
      </Grid>
      <Grid item xs={2} container alignItems='center' justify='flex-start'>
        <Tooltip title={props.tooltip}>
          <HelpIcon />
        </Tooltip>
      </Grid>
      <Grid item xs={6}>
        <Select isMulti isClearable={false} name={props.name} options={props.options} onChange={props.onChange} />
      </Grid>
    </Grid>
  );
}

export default SignupSelect;
