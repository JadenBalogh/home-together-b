import React from 'react';
import Select from 'react-select'
import {InputLabel} from '@material-ui/core'
import Grid from '@material-ui/core/Grid';

// Select box for filter panel
function FilterSelect(props) {
  return (
    <div className='filter-select-container'>
      <Grid item xs={12} sm={6} container>
        <InputLabel>{props.label}</InputLabel>
      </Grid>
      <Grid item xs={12} sm={6} container>
        <Select
          isMulti
          isClearable={false}
          className='filter-select'
          name={props.name}
          options={props.options}
          onChange={props.onChange}
        />
      </Grid>
    </div>
  );
}

export default FilterSelect;
