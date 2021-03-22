import { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

// Select box for filter panel
function FilterSelect({
  fetchURL = '',
  optionMap = (x) => x,
  placeholder = '',
  label = '',
  name = '',
  onChange = () => {},
}) {
  const [options, setOptions] = useState([]);

  useEffect(fetchOptions, [fetchURL]);

  function fetchOptions() {
    const url = process.env.REACT_APP_LOCAL_URL || '';
    fetch(url + fetchURL)
      .then((res) => res.json())
      .then((json) => {
        let options = json.map(optionMap);
        setOptions(options);
      });
  }

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      onChange={(event, values) =>
        onChange(
          name,
          values.map((x) => x.value)
        )
      }
      name={name}
      options={options}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} variant='outlined' name='test' />
      )}
    />
  );
}

export default FilterSelect;
