import React from 'react';
import Select from 'react-select';
import { InputLabel, Grid } from '@material-ui/core';

// Select box for filter panel
function FilterSelect(props) {
  return (
    <Grid item xs={6} container alignItems='center'>
      <Grid item xs={5} container justify='flex-start'>
        <InputLabel>{props.label}</InputLabel>
      </Grid>
      <Grid item xs={7}>
        <Select
          isMulti
          isClearable={false}
          className='filter-select'
          name={props.name}
          options={props.options}
          onChange={props.onChange}
        />
      </Grid>
    </Grid>
  );
}

export default FilterSelect;
