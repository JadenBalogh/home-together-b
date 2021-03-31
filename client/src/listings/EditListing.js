import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Card, Button, Grid, Typography, TextField, Select, FormControl, FormControlLabel,
  FormLabel, Radio, RadioGroup, InputLabel, Divider } from '@material-ui/core';
import FormBox from '../shared/FormBox';
import LocationField from '../shared/LocationField';

export default function EditListing() {
  const { id } = useParams();
  let history = useHistory();
  let [listing, setListing] = useState({});
  let [categoryOptions, setCategoryOptions] = useState([]);
  let [subcategoryOptions, setSubcategoryOptions] = useState({});

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
        for (var o of options.filter((x) => x.parentId)) {
          let arr = subCats[o.parentId];
          subCats[o.parentId] = arr ? [...arr, o] : [o];
        }
        setSubcategoryOptions(subCats);
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
    <Card className='page'>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item align='center' xs={12}>
            <Typography component='h1' variant='h5'>
              {sessionStorage.getItem('accountType') === '1' ? 'Edit Listing' : 'Edit Home'}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container justify='space-between'>
          <Grid item xs={6}>
            <TextField
              name='title'
              required
              fullWidth
              label='Title'
              autoFocus
              value={`${listing.title}`}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={5}>
            <FormControl fullWidth required onChange={handleInputChange}>
              <InputLabel htmlFor='categoryId'>Category</InputLabel>
              <Select
                name='categoryId'
                native
                id='categoryId'
                value={`${listing.categoryId}`}
                inputProps={{
                  name: 'categoryId',
                  id: 'categoryId',
                }}
              >
                <option value='' />
                {categoryOptions.length > 0 && Object.keys(subcategoryOptions).length > 0 ? (
                  categoryOptions.map((cat) => (
                    <optgroup key={cat.id} label={`${cat.name}`}>
                      {subcategoryOptions[cat.id] ? (
                        subcategoryOptions[cat.id].map((subcat) => (
                          <option key={subcat.id} value={subcat.id}>{`${subcat.name}`}</option>
                        ))
                      ) : (
                        <></>
                      )}
                    </optgroup>
                  ))
                ) : (
                  <option value='' />
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField name='subDescription' required fullWidth label='Short Description' onChange={handleInputChange} value={`${listing.subDescription}`}/>
          </Grid>
        </Grid>
        <br />
        {sessionStorage.getItem('accountType') === '1' ? (
            <Grid container xs={12}>
              <br/>
              {['104', '114', '124', '134', '144', '154', '164', '174'].includes(listing.categoryId) ? (
                <Grid item xs={12}>
                  <TextField
                    name='groupName'
                    variant='outlined'
                    required
                    fullWidth
                    label='Contact Name'
                    value={`${listing.groupName}`}
                    onChange={handleInputChange}
                  />
                  <br/>
              </Grid>
              ) : (<></>)}
              {['184', '194', '204', '214', '214', '224', '234', '244', '254', '264', '274', '284', '294',
                '304', '314', '324', '334', '344', '354', '364', '374', '384', '394', '404', '524', '534',
                '544', '554', '564', '574', '584'].includes(listing.categoryId) ? (
                <Grid item xs={12}>
                  <TextField
                    name='groupName'
                    variant='outlined'
                    required
                    fullWidth
                    label='Company Name'
                    value={`${listing.groupName}`}
                    onChange={handleInputChange}
                  />
                  <br/>
              </Grid>
              ) : (<></>)}
              {['414', '424', '434', '444', '454'].includes(listing.categoryId) ? (
                <Grid item xs={12}>
                  <TextField
                    name='groupName'
                    variant='outlined'
                    required
                    fullWidth
                    label='Organization Name'
                    value={`${listing.groupName}`}
                    onChange={handleInputChange}
                  />
                  <br/>
              </Grid>
              ) : (<></>)}
              {['464', '474', '484', '494', '504', '514'].includes(listing.categoryId) ? (
                <Grid item xs={12}>
                  <TextField
                    name='groupName'
                    variant='outlined'
                    required
                    fullWidth
                    label='Housing Group Name'
                    value={`${listing.groupName}`}
                    onChange={handleInputChange}
                  />
                  <br/>
              </Grid>
              ) : (<></>)}
              {['594', '604', '614', '624', '634', '644', '654'].includes(listing.categoryId) ? (
                <Grid item xs={12}>
                  <TextField
                    name='groupName'
                    variant='outlined'
                    required
                    fullWidth
                    label='Agency Name'
                    value={`${listing.groupName}`}
                    onChange={handleInputChange}
                  />
                  <br/>
              </Grid>
              ) : (<></>)}
              {['104', '114', '124', '134', '144', '154', '164', '174', '414', '424', '434', '444', '454'].includes(listing.categoryId) ? (
                <Grid item xs={5}>
                  <TextField
                    name='price'
                    variant='outlined'
                    required
                    fullWidth
                    label='Pricing'
                    value={`${listing.price}`}
                    onChange={handleInputChange}
                  />
                  <br/>
              </Grid>
              ) : (<></>)}
              {['344', '354', '364', '374', '384', '394', '404', '524', '534', '544', '554', '564', '574', '584'].includes(listing.categoryId) ? (
                <Grid item xs={5}>
                  <TextField
                    name='price'
                    variant='outlined'
                    required
                    fullWidth
                    label='Rates and Fees'
                    value={`${listing.price}`}
                    onChange={handleInputChange}
                  />
                  <br/>
              </Grid>
              ) : (<></>)}
              {['664'].includes(listing.categoryId) ? (
                <Grid item xs={5}>
                  <TextField
                    name='price'
                    variant='outlined'
                    required
                    fullWidth
                    label='Monthly Cost'
                    value={`${listing.price}`}
                    onChange={handleInputChange}
                  />
                  <br/>
              </Grid>
              ) : (<></>)}
              {['414', '424', '434', '444', '454'].includes(listing.categoryId) ? (
                <Grid container xs={7} justify='space-between' spacing={2}>
                  <Grid item xs={5}>
                    <TextField
                      name='eventDate'
                      type='date'
                      required
                      fullWidth
                      label='Event Date'
                      value={listing.eventDate}
                      onChange={handleInputChange}
                    />
                    <br/>
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      name='eventTime'
                      type='time'
                      required
                      fullWidth
                      label='Event Time'
                      value={listing.eventTime}
                      onChange={handleInputChange}
                    />
                    <br/>
                  </Grid>
                </Grid>
              ) : (<></>)}
            </Grid>
          ) : (
            ''
          )}
        <Grid container direction='column'>
          <Grid item container xs={12}>
            <Grid item xs={12}>
              <TextField
                name='description'
                variant='outlined'
                multiline
                rows={5}
                required
                fullWidth
                label='Description'
                value={`${listing.description}`}
                onChange={handleInputChange}
              />
            </Grid>
            {['104', '114', '124', '134', '144', '154', '164', '174', '664'].includes(listing.categoryId) ? (
                <Grid container xs={12} justify='space-between' spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      name='bedroomCount'
                      type='number'
                      required
                      fullWidth
                      label='Number of Bedrooms'
                      value={listing.bedroomCount}
                      onChange={handleInputChange}
                    />
                    <br/>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name='bathroomCount'
                      type='number'
                      required
                      fullWidth
                      label='Number of Bathrooms'
                      value={listing.bathroomCount}
                      onChange={handleInputChange}
                    />
                    <br/>
                  </Grid>
                  <FormBox helperText='Are utilities included within the pricing?'>
                    <Grid item>
                      <FormLabel component='legend'>Utilities</FormLabel>
                    </Grid>
                    <Grid item onChange={handleInputChange}>
                      <RadioGroup name='utilities' id='utilities' row value={`${listing.utilities}`}>
                        <FormControlLabel value='1' control={<Radio />} label='Yes' />
                        <FormControlLabel value='0' control={<Radio />} label='No' />
                      </RadioGroup>
                    </Grid>
                  </FormBox>
                  <FormBox helperText='Is furniture included/prepared?'>
                    <Grid item>
                      <FormLabel component='legend'>Furnished</FormLabel>
                    </Grid>
                    <Grid item onChange={handleInputChange}>
                      <RadioGroup name='furnished' id='furnished' row value={`${listing.furnished}`}>
                        <FormControlLabel value='1' control={<Radio />} label='Yes' />
                        <FormControlLabel value='0' control={<Radio />} label='No' />
                      </RadioGroup>
                    </Grid>
                  </FormBox>
                  <FormBox helperText='Is smoking allowed inside?'>
                    <Grid item>
                      <FormLabel component='legend'>Smoking</FormLabel>
                    </Grid>
                    <Grid item onChange={handleInputChange}>
                      <RadioGroup name='smoking' id='smoking' row value={`${listing.smoking}`}>
                        <FormControlLabel value='1' control={<Radio />} label='Yes' />
                        <FormControlLabel value='0' control={<Radio />} label='No' />
                      </RadioGroup>
                    </Grid>
                  </FormBox>
                  <FormBox helperText='Are pets allowed?'>
                    <Grid item>
                      <FormLabel component='legend'>Pet Friendly</FormLabel>
                    </Grid>
                    <Grid item onChange={handleInputChange}>
                      <RadioGroup name='petRestrictions' id='petRestrictions' row value={`${listing.petRestrictions}`}>
                        <FormControlLabel value='1' control={<Radio />} label='Yes' />
                        <FormControlLabel value='0' control={<Radio />} label='No' />
                      </RadioGroup>
                    </Grid>
                  </FormBox>
                </Grid>
              ) : (<></>)}
              {['464', '474', '484', '494', '504', '514'].includes(listing.categoryId) ? (
                <Grid container xs={12} justify='space-between' spacing={2}>
                  <FormBox helperText='Are there units for sale?'>
                    <Grid item >
                      <FormLabel component='legend'>For Sale</FormLabel>
                    </Grid>
                    <Grid item onChange={handleInputChange}>
                      <RadioGroup name='forSale' id='forSale' row value={`${listing.forSale}`}>
                        <FormControlLabel value='1' control={<Radio />} label='Yes' />
                        <FormControlLabel value='0' control={<Radio />} label='No' />
                      </RadioGroup>
                    </Grid>
                  </FormBox>
                  <FormBox helperText='Are there units for rent?'>
                    <Grid item >
                      <FormLabel component='legend'>For Rent</FormLabel>
                    </Grid>
                    <Grid item onChange={handleInputChange}>
                      <RadioGroup name='forRent' id='forRent' row value={`${listing.forRent}`}>
                        <FormControlLabel value='1' control={<Radio />} label='Yes' />
                        <FormControlLabel value='0' control={<Radio />} label='No' />
                      </RadioGroup>
                    </Grid>
                  </FormBox>
                </Grid>
              ) : (<></>)}
          </Grid>
          <br />
          <Grid item container xs={12} spacing={4}>
            {/* TODO: Replace this with the updated Locations field */}
            <Grid item xs={4}>
              <LocationField label='Location' onChange={handleLocationsChange}/>
            </Grid>
            {['184', '194', '204', '214', '214', '224', '234', '244', '254', '264', '274', '284', '294', '304', '314', '324',
             '334', '344', '354', '364', '374', '384', '394', '404', '414', '424', '434', '444', '454', '464', '474', '484',
              '494', '504', '514', '524', '534', '544', '554', '564', '574', '584', '594', '604', '614', '624', '634', '644', '654'].includes(listing.categoryId) ? (
                <Grid container xs={7} justify='space-between' spacing={2}>
                  <Grid item xs={8}>
                    <TextField
                      name='streetAddress'
                      required
                      fullWidth
                      label='Street Address'
                      value={`${listing.streetAddress}`}
                      onChange={handleInputChange}
                    />
                    <br/>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      name='postalCode'
                      required
                      fullWidth
                      label='Postal Code'
                      value={`${listing.postalCode}`}
                      onChange={handleInputChange}
                    />
                    <br/>
                  </Grid>
                </Grid>
              ) : (<></>)}
          </Grid>
          <br />
          <Grid item container xs={12} justify='space-between'>
            <Grid item container xs={3} justify='flex-start'>
              <TextField
                name='website'
                required
                fullWidth
                label='Website'
                value={`${listing.website}`}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item container xs={3} justify='center'>
              <TextField
                name='email'
                required
                fullWidth
                label='Email'
                value={`${listing.email}`}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item container xs={3} justify='flex-end'>
              <TextField
                name='phone'
                required
                fullWidth
                label='Phone Number'
                value={`${listing.phone}`}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </Grid>
        <br />
        <Divider />
        <br />
        <Grid container>
          <Grid item container xs={12} justify='center' spacing={2}>
            <Grid item align='center' xs={2}>
              <Button variant='contained' onClick={history.goBack}>
                Back
              </Button>
            </Grid>
            <Grid item align='center' xs={2}>
              <Button type='submit' variant='contained' color='primary'>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
}
