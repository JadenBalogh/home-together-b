import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  divider: {
    borderLeft: '0.1em solid lightgray',
    padding: '0.5em',
  },
}));

export default function ProfileField({ label, value, hasDetails = false, details = '' }) {
  const classes = useStyles();
  return (
    <Grid container item xs={12}>
      <Grid item xs={3} align='left'>
        <Typography variant='body2'>{label}</Typography>
      </Grid>
      <Grid item xs={9} align='left'>
        <Typography>{`${value}`}</Typography>
      </Grid>
      {hasDetails ? (
        <Grid container item xs={12}>
          <Grid item xs={3}></Grid>
          <Grid className={classes.divider} item xs={9} align='left'>
            <Typography variant='body2'>{`${details}`}</Typography>
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
    </Grid>
  );
}
