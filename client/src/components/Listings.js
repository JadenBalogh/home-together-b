import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import ListingList from './ListingList';
import '../stylesheets/Listings.css';

// Search page for members
function Listings(props) {
  const [listings, setListings] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [categoryId, setCategoryId] = useState(-1);

  useEffect(fetchCategoryOptions, []);
  useEffect(updateListings, [categoryId]);

  function updateListings() {
    const route = '/get-listings?';
    const params = new URLSearchParams(`categoryId=${categoryId}`).toString();
    const url = process.env.REACT_APP_SERVER_URL + route + params;
    console.log(params);

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setListings(json);
      });
  }

  function handleDropdownChange(selection) {
    let id = selection ? selection.value : -1;
    setCategoryId(id);
  }

  function fetchCategoryOptions() {
    fetch(process.env.REACT_APP_SERVER_URL + '/get-category-types')
      .then((res) => res.json())
      .then((json) => {
        let options = json.map((x) => {
          return { value: x.id, label: x.name };
        });
        setCategoryOptions(options);
      });
  }

  return (
    <div className='listings-container'>
      <h2>Find services that are relevant to you...</h2>
      <div className='listing-select-container'>
        <label>Select a Category:</label>
        <Select
          isClearable
          className='listing-select'
          name={'categoryId'}
          options={categoryOptions}
          onChange={handleDropdownChange}
        />
      </div>
      <ListingList listings={listings}></ListingList>
    </div>
  );
}

export default Listings;
