import React from 'react';
import { Card, Button, Grid, Typography, TextField, Select, FormControl, FormControlLabel,
  FormLabel, Radio, RadioGroup, InputLabel, Divider } from '@material-ui/core';
import LocationField from '../shared/LocationField';
import FormBox from '../shared/FormBox';

export default function CreateListingForm(props) {
  return (
    <Card className='page'>
      <form onSubmit={props.handleSubmit}>
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
            <TextField name='title' required fullWidth label='Title' autoFocus onChange={props.handleInputChange} />
          </Grid>
          {sessionStorage.getItem('accountType') === '1' ? (
          <Grid item xs={5}>
            <FormControl fullWidth required onChange={props.handleInputChange}>
              <InputLabel htmlFor='categoryId'>Category</InputLabel>
              <Select name='categoryId' native defaultValue='' id='categoryId'>
                <option value='' />
                {props.categoryOptions.length > 0 && Object.keys(props.subcategoryOptions).length > 0 ? (
                  props.categoryOptions.map((cat) => (
                    <optgroup key={cat.id} label={`${cat.name}`}>
                      {props.subcategoryOptions[cat.id] ? (
                        props.subcategoryOptions[cat.id].map((subcat) => (
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
          ) : ( props.listing.categoryId='664' )}
          <Grid item xs={6}>
            <TextField name='subDescription' required fullWidth label='Short Description' onChange={props.handleInputChange} />
          </Grid>
        </Grid>
        <br />
        {sessionStorage.getItem('accountType') === '1' ? (
            <Grid container xs={12}>
              <br/>
              {props.categoryDirectory[4].includes(props.listing.categoryId) ? (
                <Grid item xs={12}>
                  <TextField
                    name='groupName'
                    variant='outlined'
                    required
                    fullWidth
                    label='Contact Name'
                    onChange={props.handleInputChange}
                  />
                  <br/>
              </Grid>
              ) : (<></>)}
              {props.categoryDirectory[14].concat(props.categoryDirectory[24],props.categoryDirectory[54],props.categoryDirectory[64]).includes(props.listing.categoryId) ? (
                <Grid item xs={12}>
                  <TextField
                    name='groupName'
                    variant='outlined'
                    required
                    fullWidth
                    label='Company Name'
                    onChange={props.handleInputChange}
                  />
                  <br/>
              </Grid>
              ) : (<></>)}
              {props.categoryDirectory[34].includes(props.listing.categoryId) ? (
                <Grid item xs={12}>
                  <TextField
                    name='groupName'
                    variant='outlined'
                    required
                    fullWidth
                    label='Organization Name'
                    onChange={props.handleInputChange}
                  />
                  <br/>
              </Grid>
              ) : (<></>)}
              {props.categoryDirectory[44].includes(props.listing.categoryId) ? (
                <Grid item xs={12}>
                  <TextField
                    name='groupName'
                    variant='outlined'
                    required
                    fullWidth
                    label='Housing Group Name'
                    onChange={props.handleInputChange}
                  />
                  <br/>
              </Grid>
              ) : (<></>)}
              {props.categoryDirectory[74].concat(props.categoryDirectory[84]).includes(props.listing.categoryId) ? (
                <Grid item xs={12}>
                  <TextField
                    name='groupName'
                    variant='outlined'
                    required
                    fullWidth
                    label='Agency Name'
                    onChange={props.handleInputChange}
                  />
                  <br/>
              </Grid>
              ) : (<></>)}
              {props.categoryDirectory[4].concat(props.categoryDirectory[34]).includes(props.listing.categoryId) ? (
                <Grid item xs={5}>
                  <TextField
                    name='price'
                    variant='outlined'
                    required
                    fullWidth
                    label='Pricing'
                    onChange={props.handleInputChange}
                  />
                  <br/>
              </Grid>
              ) : (<></>)}
              {props.categoryDirectory[24].concat(props.categoryDirectory[54],props.categoryDirectory[64]).includes(props.listing.categoryId) ? (
                <Grid item xs={5}>
                  <TextField
                    name='price'
                    variant='outlined'
                    required
                    fullWidth
                    label='Rates and Fees'
                    onChange={props.handleInputChange}
                  />
                  <br/>
              </Grid>
              ) : (<></>)}
              {props.categoryDirectory[94].includes(props.listing.categoryId) ? (
                <Grid item xs={5}>
                  <TextField
                    name='price'
                    variant='outlined'
                    required
                    fullWidth
                    label='Monthly Cost'
                    onChange={props.handleInputChange}
                  />
                  <br/>
              </Grid>
              ) : (<></>)}
              {props.categoryDirectory[34].includes(props.listing.categoryId) ? (
                <Grid container xs={7} justify='space-between' spacing={2}>
                  <Grid item xs={5}>
                    <TextField
                      name='eventDate'
                      type='date'
                      required
                      fullWidth
                      label='Event Date'
                      onChange={props.handleInputChange}
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
                      onChange={props.handleInputChange}
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
                label='Additional Information'
                onChange={props.handleInputChange}
              />
            </Grid>
            {props.categoryDirectory[4].concat(props.categoryDirectory[94]).includes(props.listing.categoryId) ? (
                <Grid container xs={12} justify='space-between' spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      name='bedroomCount'
                      type='number'
                      required
                      fullWidth
                      label='Number of Bedrooms'
                      onChange={props.handleInputChange}
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
                      onChange={props.handleInputChange}
                    />
                    <br/>
                  </Grid>
                  <FormBox helperText='Are utilities included within the pricing?'>
                    <Grid item>
                      <FormLabel component='legend'>Utilities</FormLabel>
                    </Grid>
                    <Grid item onChange={props.handleInputChange}>
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
                    <Grid item onChange={props.handleInputChange}>
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
                    <Grid item onChange={props.handleInputChange}>
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
                    <Grid item onChange={props.handleInputChange}>
                      <RadioGroup name='petRestrictions' id='petRestrictions' row>
                        <FormControlLabel value='true' control={<Radio />} label='Yes' />
                        <FormControlLabel value='false' control={<Radio />} label='No' />
                      </RadioGroup>
                    </Grid>
                  </FormBox>
                </Grid>
              ) : (<></>)}
              {props.categoryDirectory[44].includes(props.listing.categoryId) ? (
                <Grid container xs={12} justify='space-between' spacing={2}>
                  <FormBox helperText='Are there units for sale?'>
                    <Grid item >
                      <FormLabel component='legend'>For Sale</FormLabel>
                    </Grid>
                    <Grid item onChange={props.handleInputChange}>
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
                    <Grid item onChange={props.handleInputChange}>
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
              <LocationField label='Location' onChange={props.handleLocationsChange} />
            </Grid>
            {props.categoryDirectory[14].concat(props.categoryDirectory[24],props.categoryDirectory[34],props.categoryDirectory[44],props.categoryDirectory[54],props.categoryDirectory[64],props.categoryDirectory[74],props.categoryDirectory[84]).includes(props.listing.categoryId) ? (
                <Grid container xs={7} justify='space-between' spacing={2}>
                  <Grid item xs={8}>
                    <TextField
                      name='streetAddress'
                      required
                      fullWidth
                      label='Street Address'
                      onChange={props.handleInputChange}
                    />
                    <br/>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      name='postalCode'
                      required
                      fullWidth
                      label='Postal Code'
                      onChange={props.handleInputChange}
                    />
                    <br/>
                  </Grid>
                </Grid>
              ) : (<></>)}
              
          </Grid>
          <br />
          {sessionStorage.getItem('accountType') === '1' ? (<Grid item container xs={12} justify='space-between'>
            <Grid item container xs={3} justify='flex-start'>
              <TextField name='website' fullWidth label='Website' onChange={props.handleInputChange} />
            </Grid>
            <Grid item container xs={3} justify='center'>
              <TextField name='email' required fullWidth label='Email' onChange={props.handleInputChange} />
            </Grid>
            <Grid item container xs={3} justify='flex-end'>
              <TextField name='phone' required fullWidth label='Phone Number' onChange={props.handleInputChange} />
            </Grid>
          </Grid>) : (<></>)}
        </Grid>
        <br />
        <Divider />
        <br />
        <Grid container>
          <Grid item container xs={12} justify='center' spacing={2}>
            <Grid item align='center' xs={2}>
              <Button variant='contained' onClick={props.history.goBack}>
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
