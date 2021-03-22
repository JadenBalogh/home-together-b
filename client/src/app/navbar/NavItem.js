import { NavLink } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import './NavBar.css';

export default function NavItem({ path, label }) {
  return (
    <NavLink className='nav-item' to={path}>
      <Typography className='navbar-minis'>{label}</Typography>
    </NavLink>
  );
}
