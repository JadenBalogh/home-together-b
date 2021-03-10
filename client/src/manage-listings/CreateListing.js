import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardContent,
  Button,
  CssBaseline,
  Grid,
  Typography,
  Container,
  CardActions,
  TextField,
  Select,
  FormControl,
  InputLabel,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '15px',
  },
  card: {
    minWidth: 800,
  },
}));

export default function CreateListing() {
  const classes = useStyles();
  let history = useHistory();
  let [listing, setListing] = useState({});
  let [categoryOptions, setCategoryOptions] = useState([]);
  let [subcategoryOptions, setSubcategoryOptions] = useState({});

  let handleSubmit = (event) => {
    event.preventDefault();
    console.log(listing);

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

  useEffect(fetchCategoryOptions, []);

  return (
    <Container component='main' maxWidth='md'>
      <CssBaseline />
      <form className={classes.paper} onSubmit={handleSubmit}>
        <Card className={classes.card}>
          <CardContent>
            <Grid container>
              <Grid item align='center' xs={12}>
                <Typography component='h1' variant='h5'>
                  New Listing
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid container justify='space-between'>
              <Grid item xs={5}>
                <TextField name='title' required fullWidth label='Title' autoFocus onChange={handleInputChange} />
              </Grid>
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
            </Grid>
            <br />
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
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <br />
              <Grid item container xs={12} spacing={4}>
                {/* TODO: Replace this with the updated Locations field */}
                <Grid item xs={4}>
                  <TextField
                    name='locationId'
                    variant='outlined'
                    required
                    fullWidth
                    label='Location'
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <br />
              <Grid item container xs={12} justify='space-between'>
                <Grid item container xs={3} justify='flex-start'>
                  <TextField name='website' required fullWidth label='Website' onChange={handleInputChange} />
                </Grid>
                <Grid item container xs={3} justify='center'>
                  <TextField name='email' required fullWidth label='Email' onChange={handleInputChange} />
                </Grid>
                <Grid item container xs={3} justify='flex-end'>
                  <TextField name='phone' required fullWidth label='Phone Number' onChange={handleInputChange} />
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
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
          </CardActions>
        </Card>
      </form>
    </Container>
  );
}
