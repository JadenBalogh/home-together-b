import React, { useEffect, useState } from 'react';
import { Card, Button, Grid, Typography, TextField, Select, FormControl, FormControlLabel,
  FormLabel, Radio, RadioGroup, InputLabel, Divider } from '@material-ui/core';
import LocationField from '../shared/LocationField';
import FormBox from '../shared/FormBox';

export default function EditListingForm(props) {
  return (
    <Card className='page'>
      <form onSubmit={props.handleSubmit}>
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
              value={`${props.listing.title}`}
              onChange={props.handleInputChange}
            />
          </Grid>
          <Grid item xs={5}>
            <FormControl fullWidth required onChange={props.handleInputChange}>
              <InputLabel htmlFor='categoryId'>Category</InputLabel>
              <Select
                name='categoryId'
                native
                id='categoryId'
                value={`${props.listing.categoryId}`}
                inputProps={{
                  name: 'categoryId',
                  id: 'categoryId',
                }}
              >
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
          <Grid item xs={6}>
            <TextField name='subDescription' required fullWidth label='Short Description' onChange={props.handleInputChange} value={`${props.listing.subDescription}`}/>
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
                    value={`${props.listing.groupName}`}
                    onChange={props.handleInputChange}
                  />
                  <br/>
              </Grid>
              ) : (<></>)}
              {props.categoryDirectory[14].includes(props.listing.categoryId) ? (
                <Grid item xs={12}>
                  <TextField
                    name='groupName'
                    variant='outlined'
                    required
                    fullWidth
                    label='Company Name'
                    value={`${props.listing.groupName}`}
                    onChange={props.handleInputChange}
                  />
                  <br/>
              </Grid>
              ) : (<></>)}
              {props.categoryDirectory[24].includes(props.listing.categoryId) ? (
                <Grid item xs={12}>
                  <TextField
                    name='groupName'
                    variant='outlined'
                    required
                    fullWidth
                    label='Company Name'
                    value={`${props.listing.groupName}`}
                    onChange={props.handleInputChange}
                  />
                  <br/>
              </Grid>
              ) : (<></>)}
              {props.categoryDirectory[54].includes(props.listing.categoryId) ? (
                <Grid item xs={12}>
                  <TextField
                    name='groupName'
                    variant='outlined'
                    required
                    fullWidth
                    label='Company Name'
                    value={`${props.listing.groupName}`}
                    onChange={props.handleInputChange}
                  />
                  <br/>
              </Grid>
              ) : (<></>)}
              {props.categoryDirectory[64].includes(props.listing.categoryId) ? (
                <Grid item xs={12}>
                  <TextField
                    name='groupName'
                    variant='outlined'
                    required
                    fullWidth
                    label='Company Name'
                    value={`${props.listing.groupName}`}
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
                    value={`${props.listing.groupName}`}
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
                    value={`${props.listing.groupName}`}
                    onChange={props.handleInputChange}
                  />
                  <br/>
              </Grid>
              ) : (<></>)}
              {props.categoryDirectory[74].includes(props.listing.categoryId) ? (
                <Grid item xs={12}>
                  <TextField
                    name='groupName'
                    variant='outlined'
                    required
                    fullWidth
                    label='Agency Name'
                    value={`${props.listing.groupName}`}
                    onChange={props.handleInputChange}
                  />
                  <br/>
              </Grid>
              ) : (<></>)}
              {props.categoryDirectory[84].includes(props.listing.categoryId) ? (
                <Grid item xs={12}>
                  <TextField
                    name='groupName'
                    variant='outlined'
                    required
                    fullWidth
                    label='Agency Name'
                    value={`${props.listing.groupName}`}
                    onChange={props.handleInputChange}
                  />
                  <br/>
              </Grid>
              ) : (<></>)}
              {props.categoryDirectory[4].includes(props.listing.categoryId) ? (
                <Grid item xs={5}>
                  <TextField
                    name='price'
                    variant='outlined'
                    required
                    fullWidth
                    label='Pricing'
                    value={`${props.listing.price}`}
                    onChange={props.handleInputChange}
                  />
                  <br/>
              </Grid>
              ) : (<></>)}
              {props.categoryDirectory[34].includes(props.listing.categoryId) ? (
                <Grid item xs={5}>
                  <TextField
                    name='price'
                    variant='outlined'
                    required
                    fullWidth
                    label='Pricing'
                    value={`${props.listing.price}`}
                    onChange={props.handleInputChange}
                  />
                  <br/>
              </Grid>
              ) : (<></>)}
              {props.categoryDirectory[24].includes(props.listing.categoryId) ? (
                <Grid item xs={5}>
                  <TextField
                    name='price'
                    variant='outlined'
                    required
                    fullWidth
                    label='Rates and Fees'
                    value={`${props.listing.price}`}
                    onChange={props.handleInputChange}
                  />
                  <br/>
              </Grid>
              ) : (<></>)}
              {props.categoryDirectory[54].includes(props.listing.categoryId) ? (
                <Grid item xs={5}>
                  <TextField
                    name='price'
                    variant='outlined'
                    required
                    fullWidth
                    label='Rates and Fees'
                    value={`${props.listing.price}`}
                    onChange={props.handleInputChange}
                  />
                  <br/>
              </Grid>
              ) : (<></>)}
              {props.categoryDirectory[64].includes(props.listing.categoryId) ? (
                <Grid item xs={5}>
                  <TextField
                    name='price'
                    variant='outlined'
                    required
                    fullWidth
                    label='Rates and Fees'
                    value={`${props.listing.price}`}
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
                    value={`${props.listing.price}`}
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
                      value={props.listing.eventDate}
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
                      value={props.listing.eventTime}
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
                value={`${props.listing.description}`}
                onChange={props.handleInputChange}
              />
            </Grid>
            {props.categoryDirectory[4].includes(props.listing.categoryId) ? (
                <Grid container xs={12} justify='space-between' spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      name='bedroomCount'
                      type='number'
                      required
                      fullWidth
                      label='Number of Bedrooms'
                      value={props.listing.bedroomCount}
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
                      value={props.listing.bathroomCount}
                      onChange={props.handleInputChange}
                    />
                    <br/>
                  </Grid>
                  <FormBox helperText='Are utilities included within the pricing?'>
                    <Grid item>
                      <FormLabel component='legend'>Utilities</FormLabel>
                    </Grid>
                    <Grid item onChange={props.handleInputChange}>
                      <RadioGroup name='utilities' id='utilities' row value={`${props.listing.utilities}`}>
                        <FormControlLabel value='1' control={<Radio />} label='Yes' />
                        <FormControlLabel value='0' control={<Radio />} label='No' />
                      </RadioGroup>
                    </Grid>
                  </FormBox>
                  <FormBox helperText='Is furniture included/prepared?'>
                    <Grid item>
                      <FormLabel component='legend'>Furnished</FormLabel>
                    </Grid>
                    <Grid item onChange={props.handleInputChange}>
                      <RadioGroup name='furnished' id='furnished' row value={`${props.listing.furnished}`}>
                        <FormControlLabel value='1' control={<Radio />} label='Yes' />
                        <FormControlLabel value='0' control={<Radio />} label='No' />
                      </RadioGroup>
                    </Grid>
                  </FormBox>
                  <FormBox helperText='Is smoking allowed inside?'>
                    <Grid item>
                      <FormLabel component='legend'>Smoking</FormLabel>
                    </Grid>
                    <Grid item onChange={props.handleInputChange}>
                      <RadioGroup name='smoking' id='smoking' row value={`${props.listing.smoking}`}>
                        <FormControlLabel value='1' control={<Radio />} label='Yes' />
                        <FormControlLabel value='0' control={<Radio />} label='No' />
                      </RadioGroup>
                    </Grid>
                  </FormBox>
                  <FormBox helperText='Are pets allowed?'>
                    <Grid item>
                      <FormLabel component='legend'>Pet Friendly</FormLabel>
                    </Grid>
                    <Grid item onChange={props.handleInputChange}>
                      <RadioGroup name='petRestrictions' id='petRestrictions' row value={`${props.listing.petRestrictions}`}>
                        <FormControlLabel value='1' control={<Radio />} label='Yes' />
                        <FormControlLabel value='0' control={<Radio />} label='No' />
                      </RadioGroup>
                    </Grid>
                  </FormBox>
                </Grid>
              ) : (<></>)}
              {props.categoryDirectory[94].includes(props.listing.categoryId) ? (
                <Grid container xs={12} justify='space-between' spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      name='bedroomCount'
                      type='number'
                      required
                      fullWidth
                      label='Number of Bedrooms'
                      value={props.listing.bedroomCount}
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
                      value={props.listing.bathroomCount}
                      onChange={props.handleInputChange}
                    />
                    <br/>
                  </Grid>
                  <FormBox helperText='Are utilities included within the pricing?'>
                    <Grid item>
                      <FormLabel component='legend'>Utilities</FormLabel>
                    </Grid>
                    <Grid item onChange={props.handleInputChange}>
                      <RadioGroup name='utilities' id='utilities' row value={`${props.listing.utilities}`}>
                        <FormControlLabel value='1' control={<Radio />} label='Yes' />
                        <FormControlLabel value='0' control={<Radio />} label='No' />
                      </RadioGroup>
                    </Grid>
                  </FormBox>
                  <FormBox helperText='Is furniture included/prepared?'>
                    <Grid item>
                      <FormLabel component='legend'>Furnished</FormLabel>
                    </Grid>
                    <Grid item onChange={props.handleInputChange}>
                      <RadioGroup name='furnished' id='furnished' row value={`${props.listing.furnished}`}>
                        <FormControlLabel value='1' control={<Radio />} label='Yes' />
                        <FormControlLabel value='0' control={<Radio />} label='No' />
                      </RadioGroup>
                    </Grid>
                  </FormBox>
                  <FormBox helperText='Is smoking allowed inside?'>
                    <Grid item>
                      <FormLabel component='legend'>Smoking</FormLabel>
                    </Grid>
                    <Grid item onChange={props.handleInputChange}>
                      <RadioGroup name='smoking' id='smoking' row value={`${props.listing.smoking}`}>
                        <FormControlLabel value='1' control={<Radio />} label='Yes' />
                        <FormControlLabel value='0' control={<Radio />} label='No' />
                      </RadioGroup>
                    </Grid>
                  </FormBox>
                  <FormBox helperText='Are pets allowed?'>
                    <Grid item>
                      <FormLabel component='legend'>Pet Friendly</FormLabel>
                    </Grid>
                    <Grid item onChange={props.handleInputChange}>
                      <RadioGroup name='petRestrictions' id='petRestrictions' row value={`${props.listing.petRestrictions}`}>
                        <FormControlLabel value='1' control={<Radio />} label='Yes' />
                        <FormControlLabel value='0' control={<Radio />} label='No' />
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
                      <RadioGroup name='forSale' id='forSale' row value={`${props.listing.forSale}`}>
                        <FormControlLabel value='1' control={<Radio />} label='Yes' />
                        <FormControlLabel value='0' control={<Radio />} label='No' />
                      </RadioGroup>
                    </Grid>
                  </FormBox>
                  <FormBox helperText='Are there units for rent?'>
                    <Grid item >
                      <FormLabel component='legend'>For Rent</FormLabel>
                    </Grid>
                    <Grid item onChange={props.handleInputChange}>
                      <RadioGroup name='forRent' id='forRent' row value={`${props.listing.forRent}`}>
                        <FormControlLabel value='1' control={<Radio />} label='Yes' />
                        <FormControlLabel value='0' control={<Radio />} label='No' />
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
            {props.categoryDirectory[14].includes(props.listing.categoryId) ? (
                <Grid container xs={7} justify='space-between' spacing={2}>
                  <Grid item xs={8}>
                    <TextField
                      name='streetAddress'
                      required
                      fullWidth
                      label='Street Address'
                      value={`${props.listing.streetAddress}`}
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
                      value={`${props.listing.postalCode}`}
                      onChange={props.handleInputChange}
                    />
                    <br/>
                  </Grid>
                </Grid>
              ) : (<></>)}
              {props.categoryDirectory[24].includes(props.listing.categoryId) ? (
                <Grid container xs={7} justify='space-between' spacing={2}>
                  <Grid item xs={8}>
                    <TextField
                      name='streetAddress'
                      required
                      fullWidth
                      label='Street Address'
                      value={`${props.listing.streetAddress}`}
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
                      value={`${props.listing.postalCode}`}
                      onChange={props.handleInputChange}
                    />
                    <br/>
                  </Grid>
                </Grid>
              ) : (<></>)}
              {props.categoryDirectory[34].includes(props.listing.categoryId) ? (
                <Grid container xs={7} justify='space-between' spacing={2}>
                  <Grid item xs={8}>
                    <TextField
                      name='streetAddress'
                      required
                      fullWidth
                      label='Street Address'
                      value={`${props.listing.streetAddress}`}
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
                      value={`${props.listing.postalCode}`}
                      onChange={props.handleInputChange}
                    />
                    <br/>
                  </Grid>
                </Grid>
              ) : (<></>)}
              {props.categoryDirectory[44].includes(props.listing.categoryId) ? (
                <Grid container xs={7} justify='space-between' spacing={2}>
                  <Grid item xs={8}>
                    <TextField
                      name='streetAddress'
                      required
                      fullWidth
                      label='Street Address'
                      value={`${props.listing.streetAddress}`}
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
                      value={`${props.listing.postalCode}`}
                      onChange={props.handleInputChange}
                    />
                    <br/>
                  </Grid>
                </Grid>
              ) : (<></>)}
              {props.categoryDirectory[54].includes(props.listing.categoryId) ? (
                <Grid container xs={7} justify='space-between' spacing={2}>
                  <Grid item xs={8}>
                    <TextField
                      name='streetAddress'
                      required
                      fullWidth
                      label='Street Address'
                      value={`${props.listing.streetAddress}`}
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
                      value={`${props.listing.postalCode}`}
                      onChange={props.handleInputChange}
                    />
                    <br/>
                  </Grid>
                </Grid>
              ) : (<></>)}
              {props.categoryDirectory[64].includes(props.listing.categoryId) ? (
                <Grid container xs={7} justify='space-between' spacing={2}>
                  <Grid item xs={8}>
                    <TextField
                      name='streetAddress'
                      required
                      fullWidth
                      label='Street Address'
                      value={`${props.listing.streetAddress}`}
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
                      value={`${props.listing.postalCode}`}
                      onChange={props.handleInputChange}
                    />
                    <br/>
                  </Grid>
                </Grid>
              ) : (<></>)}
              {props.categoryDirectory[74].includes(props.listing.categoryId) ? (
                <Grid container xs={7} justify='space-between' spacing={2}>
                  <Grid item xs={8}>
                    <TextField
                      name='streetAddress'
                      required
                      fullWidth
                      label='Street Address'
                      value={`${props.listing.streetAddress}`}
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
                      value={`${props.listing.postalCode}`}
                      onChange={props.handleInputChange}
                    />
                    <br/>
                  </Grid>
                </Grid>
              ) : (<></>)}
              {props.categoryDirectory[84].includes(props.listing.categoryId) ? (
                <Grid container xs={7} justify='space-between' spacing={2}>
                  <Grid item xs={8}>
                    <TextField
                      name='streetAddress'
                      required
                      fullWidth
                      label='Street Address'
                      value={`${props.listing.streetAddress}`}
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
                      value={`${props.listing.postalCode}`}
                      onChange={props.handleInputChange}
                    />
                    <br/>
                  </Grid>
                </Grid>
              ) : (<></>)}
          </Grid>
          <br />
          {sessionStorage.getItem('accountType') === '1' ? (
          <Grid item container xs={12} justify='space-between'>
            <Grid item container xs={3} justify='flex-start'>
              <TextField
                name='website'
                required
                fullWidth
                label='Website'
                value={`${props.listing.website}`}
                onChange={props.handleInputChange}
              />
            </Grid>
            <Grid item container xs={3} justify='center'>
              <TextField
                name='email'
                required
                fullWidth
                label='Email'
                value={`${props.listing.email}`}
                onChange={props.handleInputChange}
              />
            </Grid>
            <Grid item container xs={3} justify='flex-end'>
              <TextField
                name='phone'
                required
                fullWidth
                label='Phone Number'
                value={`${props.listing.phone}`}
                onChange={props.handleInputChange}
              />
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
