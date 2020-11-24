import React from 'react';
import Select from 'react-select'
import '../stylesheets/FilterSelect.css';

// Select box for filter panel
function FilterSelect(props) {
  return (
    <div className='filter-select-container'>
      <label>{props.label}</label>
      <Select
        isMulti
        isClearable={false}
        className='filter-select'
        name={props.name}
        options={props.options}
        onChange={props.onChange}
      />
    </div>
  );
}

export default FilterSelect;
