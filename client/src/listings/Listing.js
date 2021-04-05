import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ListingForm from './ListingForm';
import './Listings.css';

export default function Listing() {
  const { id } = useParams();
  let history = useHistory();
  let [listing, setListing] = useState({});
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

  let fetchCategoryOptions = () => {
    const url = process.env.REACT_APP_LOCAL_URL || '';
    fetch(url + '/api/get-category-types')
      .then((res) => res.json())
      .then((options) => {
        let catDir = {};
        for (var o of options.filter((x) => x.parentId)) {
          let cat = catDir[o.parentId];
          catDir[o.parentId] = cat ? [...cat, `${o.id}`] : [`${o.id}`];
        }
        setCategoryDirectory(catDir);
      });
  };

  useEffect(loadListing, [id]);
  useEffect(fetchCategoryOptions, []);
  listing.categoryId = `${listing.categoryId}`;

  return (
    <div>
      {categoryDirectory && <ListingForm
        history={history}
        listing={listing}
        categoryDirectory={categoryDirectory}
      />}
    </div>
  );
}
