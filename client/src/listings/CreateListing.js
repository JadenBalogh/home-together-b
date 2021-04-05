import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CreateListingForm from './CreateListingForm';

export default function CreateListing() {
  let history = useHistory();
  let [listing, setListing] = useState({});
  let [categoryOptions, setCategoryOptions] = useState([]);
  let [subcategoryOptions, setSubcategoryOptions] = useState({});
  let [categoryDirectory, setCategoryDirectory] = useState(null);

  let handleSubmit = (event) => {
    event.preventDefault();
    listing.organizationId = sessionStorage.getItem('id') || 1;

    const url = process.env.REACT_APP_LOCAL_URL || '';
    const route = '/api/create-listing?';
    fetch(url + route, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listing }),
    })
      .then((raw) => raw.json())
      .then((result) => {
        if (result.err) {
          window.alert(result.err);
          return;
        }
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
    console.log(event.target);
    console.log(categoryDirectory);
    setListing((prev) => {
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

  useEffect(fetchCategoryOptions, []);

  return (
    <div>
      {categoryDirectory && <CreateListingForm
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
