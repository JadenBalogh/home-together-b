import { NavLink } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  navItem: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
  },
}));

export default function NavItem({ path, label }) {
  const classes = useStyles()
  return (
    <Grid item className={classes.navItem}>
      <NavLink to={path}>
        <Typography className='navbar-minis'>{label}</Typography>
      </NavLink>
    </Grid>
  );
}
