import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import EditListingForm from './EditListingForm';

export default function EditListing() {
  const { id } = useParams();
  let history = useHistory();
  let [listing, setListing] = useState({});
  let [categoryOptions, setCategoryOptions] = useState([]);
  let [subcategoryOptions, setSubcategoryOptions] = useState({});
  let [categoryDirectory, setCategoryDirectory] = useState(null);

  let loadListing = () => {
    const url = process.env.REACT_APP_LOCAL_URL || '';
    const route = '/api/get-listing?';
    const params = new URLSearchParams('id=' + id).toString();
    fetch(url + route + params)
      .then((raw) => raw.json())
      .then((result) => {
        if (result.err) {
          window.alert(result.err);
          return;
        }
        setListing({ ...result });
      });
  };

  let handleSubmit = (event) => {
    event.preventDefault();

    const url = process.env.REACT_APP_LOCAL_URL || '';
    const route = '/api/edit-listing?';
    fetch(url + route, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, listing }),
    }).then(() => {
      history.push('/manage-listings');
    });
  };

  let fetchCategoryOptions = () => {
    const url = process.env.REACT_APP_LOCAL_URL || '';
    fetch(url + '/api/get-category-types')
      .then((res) => res.json())
      .then((options) => {
        setCategoryOptions(options.filter((x) => !x.parentId));
        let subCats = {};
        let catDir = {};
        for (var o of options.filter((x) => x.parentId)) {
          let arr = subCats[o.parentId];
          let cat = catDir[o.parentId];
          subCats[o.parentId] = arr ? [...arr, o] : [o];
          catDir[o.parentId] = cat ? [...cat, `${o.id}`] : [`${o.id}`];
        }
        setSubcategoryOptions(subCats);
        setCategoryDirectory(catDir);
      });
  };

  let handleInputChange = (event) => {
    setListing((prev) => {
      console.log(listing);
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  function handleLocationsChange(event, selected) {
    setListing({
      ...listing,
      locationId: selected.value,
    });
  }

  useEffect(loadListing, [id]);
  useEffect(fetchCategoryOptions, []);
  listing.categoryId = `${listing.categoryId}`;

  return (
    <div>
      {categoryDirectory && <EditListingForm
        history={history}
        listing={listing}
        categoryOptions={categoryOptions}
        subcategoryOptions={subcategoryOptions}
        categoryDirectory={categoryDirectory}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        fetchCategoryOptions={fetchCategoryOptions}
        handleLocationsChange={handleLocationsChange}
      />}
    </div>
  );
}
