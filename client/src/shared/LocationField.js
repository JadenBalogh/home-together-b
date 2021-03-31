import { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

export default function LocationField({ value, label = '', placeholder = '', onChange }) {
  const [locationOptions, setLocationOptions] = useState([]);

  useEffect(() => fetchLocationOptions(), []);

  function fetchLocationOptions() {
    const url = process.env.REACT_APP_LOCAL_URL || '';
    fetch(url + '/api/get-locations')
      .then((res) => res.json())
      .then((json) => {
        let options = json.map((x) => {
          return { value: x.id, label: x.city, code: x.province_id, province: x.province_name };
        });
        options.sort((a, b) => {
          if (a.code > b.code) return 1;
          if (a.code < b.code) return -1;
          if (a.label > b.label) return 1;
          if (a.label < b.label) return -1;
          return 0;
        });
        setLocationOptions(options);
      });
  }

  return (
    <>
      {value === undefined ? (
        <Autocomplete
          disableCloseOnSelect
          onChange={onChange}
          options={locationOptions}
          groupBy={(option) => option.province}
          getOptionLabel={(option) => `${option.label}, ${option.code}`}
          renderInput={(params) => <TextField {...params} label={label} placeholder={placeholder} variant='outlined' />}
        />
      ) : (
        <Autocomplete
          disableCloseOnSelect
          onChange={onChange}
          options={locationOptions}
          groupBy={(option) => option.province}
          getOptionLabel={(option) => `${option.label}, ${option.code}`}
          value={locationOptions.filter((option) => value.some((x) => option.value === x))}
          renderInput={(params) => <TextField {...params} label={label} placeholder={placeholder} variant='outlined' />}
        />
      )}
    </>
  );
}
