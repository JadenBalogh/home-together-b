import { useState } from 'react';
import { Divider, Grid, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

export default function FormBox({ children, helperText, persist }) {
  const [focused, setFocused] = useState(false);

  return (
    <Grid item container direction='row' spacing={2}>
      <Grid
        item
        xs={5}
        container
        direction='row'
        alignItems='center'
        spacing={1}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {children}
      </Grid>
      {persist || (!persist && focused && helperText) ? (
        <>
          <Grid item>
            <Divider orientation='vertical' />
          </Grid>
          <Grid item xs container direction='row' alignItems='center'>
            <InfoIcon />
            &ensp;
            <Grid item xs>
              <Typography variant='subtitle2'>{helperText}</Typography>
            </Grid>
          </Grid>
        </>
      ) : (
        ''
      )}
    </Grid>
  );
}
