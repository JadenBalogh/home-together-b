import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { FormControlLabel, Button, TextField, Link, Grid, Typography, Checkbox, Card } from '@material-ui/core';

export default function SignIn() {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const history = useHistory();

  function handleLogin(event) {
    event.preventDefault();

    const route = '/api/login?';
    const url = process.env.REACT_APP_LOCAL_URL || '';
    fetch(url + route, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.err) {
          window.alert(json.err);
          return;
        }
        sessionStorage.setItem('id', json.id);
        sessionStorage.setItem('accountType', json.accountType);
        sessionStorage.setItem('token', json.accessToken);
        history.push('/');
        window.location.reload();
      });
  }

  return (
    <Card className='page'>
      <Typography component='h1' variant='h5'>
        Sign in
      </Typography>
      <form onSubmit={handleLogin} noValidate>
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='username'
          label='Username'
          name='username'
          autoComplete='username'
          autoFocus
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          name='password'
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
        <Button type='submit' fullWidth variant='contained' color='primary'>
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href='#' variant='body2'>
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href='/signup' variant='body2'>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
}
