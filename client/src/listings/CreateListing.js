import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Button, Grid, Typography, TextField, Select, FormControl, FormControlLabel,
  FormLabel, Radio, RadioGroup, InputLabel, Divider } from '@material-ui/core';
import LocationField from '../shared/LocationField';
import FormBox from '../shared/FormBox';

export default function CreateListing() {
  let history = useHistory();
  let [listing, setListing] = useState({});
  let [categoryOptions, setCategoryOptions] = useState([]);
  let [subcategoryOptions, setSubcategoryOptions] = useState({});

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
        for (var o of options.filter((x) => x.parentId)) {
          let arr = subCats[o.parentId];
          subCats[o.parentId] = arr ? [...arr, o] : [o];
        }
        setSubcategoryOptions(subCats);
      });
  };

  let handleInputChange = (event) => {
    console.log(event.target);
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
    <Card className='page'>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item align='center' xs={12}>
            <Typography component='h1' variant='h5'>
              {sessionStorage.getItem('accountType') === '1' ? 'New Listing' : 'Member Home to Share'}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container justify='space-between' spacing={2}>
          <Grid item xs={6}>
            <TextField name='title' required fullWidth label='Title' autoFocus onChange={handleInputChange} />
          </Grid>
          {sessionStorage.getItem('accountType') === '1' ? (
          <Grid item xs={5}>
            <FormControl fullWidth required onChange={handleInputChange}>
              <InputLabel htmlFor='categoryId'>Category</InputLabel>
              <Select name='categoryId' native defaultValue='' id='categoryId'>
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
          ) : ( listing.categoryId='664' )}
          <Grid item xs={6}>
            <TextField name='subDescription' required fullWidth label='Short Description' onChange={handleInputChange} />
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
                label='Extra Information'
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
                      onChange={handleInputChange}
                    />
                    <br/>
                  </Grid>
                  <FormBox helperText='Are utilities included within the pricing?'>
                    <Grid item>
                      <FormLabel component='legend'>Utilities</FormLabel>
                    </Grid>
                    <Grid item onChange={handleInputChange}>
                      <RadioGroup name='utilities' id='utilities' row>
                        <FormControlLabel value='true' control={<Radio />} label='Yes' />
                        <FormControlLabel value='false' control={<Radio />} label='No' />
                      </RadioGroup>
                    </Grid>
                  </FormBox>
                  <FormBox helperText='Is furniture included/prepared?'>
                    <Grid item>
                      <FormLabel component='legend'>Furnished</FormLabel>
                    </Grid>
                    <Grid item onChange={handleInputChange}>
                      <RadioGroup name='furnished' id='furnished' row>
                        <FormControlLabel value='true' control={<Radio />} label='Yes' />
                        <FormControlLabel value='false' control={<Radio />} label='No' />
                      </RadioGroup>
                    </Grid>
                  </FormBox>
                  <FormBox helperText='Is smoking allowed inside?'>
                    <Grid item>
                      <FormLabel component='legend'>Smoking</FormLabel>
                    </Grid>
                    <Grid item onChange={handleInputChange}>
                      <RadioGroup name='smoking' id='smoking' row>
                        <FormControlLabel value='true' control={<Radio />} label='Yes' />
                        <FormControlLabel value='false' control={<Radio />} label='No' />
                      </RadioGroup>
                    </Grid>
                  </FormBox>
                  <FormBox helperText='Are pets allowed?'>
                    <Grid item>
                      <FormLabel component='legend'>Pet Friendly</FormLabel>
                    </Grid>
                    <Grid item onChange={handleInputChange}>
                      <RadioGroup name='petRestrictions' id='petRestrictions' row>
                        <FormControlLabel value='true' control={<Radio />} label='Yes' />
                        <FormControlLabel value='false' control={<Radio />} label='No' />
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
                      <RadioGroup name='forSale' id='forSale' row>
                        <FormControlLabel value='true' control={<Radio />} label='Yes' />
                        <FormControlLabel value='false' control={<Radio />} label='No' />
                      </RadioGroup>
                    </Grid>
                  </FormBox>
                  <FormBox helperText='Are there units for rent?'>
                    <Grid item >
                      <FormLabel component='legend'>For Rent</FormLabel>
                    </Grid>
                    <Grid item onChange={handleInputChange}>
                      <RadioGroup name='forRent' id='forRent' row>
                        <FormControlLabel value='true' control={<Radio />} label='Yes' />
                        <FormControlLabel value='false' control={<Radio />} label='No' />
                      </RadioGroup>
                    </Grid>
                  </FormBox>
                </Grid>
              ) : (<></>)}
          </Grid>
          <br />
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={4}>
              <LocationField label='Location' onChange={handleLocationsChange} />
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
                      onChange={handleInputChange}
                    />
                    <br/>
                  </Grid>
                </Grid>
              ) : (<></>)}
          </Grid>
          <br />
          {sessionStorage.getItem('accountType') === '1' ? (<Grid item container xs={12} justify='space-between'>
            <Grid item container xs={3} justify='flex-start'>
              <TextField name='website' fullWidth label='Website' onChange={handleInputChange} />
            </Grid>
            <Grid item container xs={3} justify='center'>
              <TextField name='email' required fullWidth label='Email' onChange={handleInputChange} />
            </Grid>
            <Grid item container xs={3} justify='flex-end'>
              <TextField name='phone' required fullWidth label='Phone Number' onChange={handleInputChange} />
            </Grid>
          </Grid>) : (<></>)}
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
