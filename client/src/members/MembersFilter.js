import React, { useState, useEffect } from 'react';
import FilterSelect from './FilterSelect';

// Filter component for the members page
function MembersFilter(props) {
  const [genderOptions, setGenderOptions] = useState([]);
  const [ageGroupOptions, setAgeGroupOptions] = useState([]);
  const [familyStatusOptions, setFamilyStatusOptions] = useState([]);

  useEffect(() => fetchGenderOptions(), []);
  useEffect(() => fetchAgeGroupOptions(), []);
  useEffect(() => fetchFamilyStatusOptions(), []);

  function fetchGenderOptions() {
    fetch(process.env.REACT_APP_SERVER_URL + '/get-gender-types')
      .then((res) => res.json())
      .then((json) => {
        let options = json.map((x) => {
          return { value: x.id, label: x.name };
        });
        setGenderOptions(options);
      });
  }

  function fetchAgeGroupOptions() {
    fetch(process.env.REACT_APP_SERVER_URL + '/get-age-group-types')
      .then((res) => res.json())
      .then((json) => {
        let options = json.map((x) => {
          let name = `${x.name} (${x.minAge}-${x.maxAge})`;
          return { value: x.id, label: name };
        });
        setAgeGroupOptions(options);
      });
  }

  function fetchFamilyStatusOptions() {
    fetch(process.env.REACT_APP_SERVER_URL + '/get-family-status-types')
      .then((res) => res.json())
      .then((json) => {
        let options = json.map((x) => {
          return { value: x.id, label: x.name };
        });
        setFamilyStatusOptions(options);
      });
  }

  return (
    <div className='filter-container'>
      <FilterSelect label='Genders:' name='genderIds' options={genderOptions} onChange={props.dropdownHandler} />
      <FilterSelect label='Age Groups:' name='ageGroupIds' options={ageGroupOptions} onChange={props.dropdownHandler} />
      <FilterSelect
        label='Family Status:'
        name='familyStatusIds'
        options={familyStatusOptions}
        onChange={props.dropdownHandler}
      />
      <div>
        <label>Monthly Budget: </label>
        <input type='number' name='maxMonthlyBudget' value={props.maxMonthlyBudget} onChange={props.inputHandler} />
      </div>
    </div>
  );
}

export default MembersFilter;
