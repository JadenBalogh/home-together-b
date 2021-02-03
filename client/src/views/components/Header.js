/*
 * @Author: AA
 * @Date: 2021-01-28 07:08:45
 * @LastEditors: AA
 * @LastEditTime: 2021-01-31 03:31:49
 * @FilePath: /src/views/components/Header.js
 */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    height: "40px",
  },
  white: {
    color: "#FFF !important",
  },
  primary: {
    color: React.$config.theme.palette.primary.light,
  },
  menu: {
    top: "50px !important",
  },
}));

export default function Header() {
  const classes = useStyles();

  // Login Menu Handle

  const [loginMenu, setLoginMenu] = React.useState(null);

  const loginMenuClick = (event) => {
    setLoginMenu(event.currentTarget);
  };

  const loginMenuClose = () => {
    setLoginMenu(null);
  };

  // Setting Menu Handle

  const [settingMenu, setSettingMenu] = React.useState(null);

  const settingMenuClick = (event) => {
    setSettingMenu(event.currentTarget);
  };

  const settingMenuClose = () => {
    setSettingMenu(null);
  };

  const [scrollPosition, setScrollPosition] = useState(0);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return function cleanup() {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleScroll = () => {
    let top =
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      window.pageYOffset;

    setScrollPosition(top);
    if (top > React.$config.topBarScollTop) {
      setShowBar(true);
    } else {
      setShowBar(false);
    }
  };
  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        color={showBar ? "default" : "primary"}
        className={showBar ? classes.primary : classes.white}
        id="navAppbar"
      >
        <Container>
          <Toolbar>
            <img
              src={showBar ? React.$config.logoReverse : React.$config.logo}
              id="headerLogo"
              className={classes.logo}
            />

            <Typography className="brand ml-10" variant="h5" component="h3">
              {React.$config.title}
            </Typography>

            <Typography
              variant="h6"
              className={`${classes.title} navTitle`}
              align="center"
            />

            <Typography
              variant="h6"
              className={`${classes.title} navTitle`}
              align="center"
            />
            <Link to="/">
              <Button className={showBar ? classes.primary : classes.white}>
                Home
              </Button>
            </Link>
            <Link to="/house">
              <Button className={showBar ? classes.primary : classes.white}>
                House
              </Button>
            </Link>
            <Link to="/business">
              <Button className={showBar ? classes.primary : classes.white}>
                Business
              </Button>
            </Link>
            <Link to="/roommate">
              <Button className={showBar ? classes.primary : classes.white}>
                Roommate
              </Button>
            </Link>
            <Link to="/about">
              <Button className={showBar ? classes.primary : classes.white}>
                About
              </Button>
            </Link>
            {/* Control by state of account login */}

            <Button
              aria-controls="login-menu"
              aria-haspopup="true"
              className={showBar ? classes.primary : classes.white}
              onClick={loginMenuClick}
            >
              <i className="fa fa-user" aria-hidden="true"></i>
            </Button>
            <Menu
              className={[classes.menu, "aa-fa"].join(" ")}
              id="login-menu"
              anchorEl={loginMenu}
              keepMounted
              open={Boolean(loginMenu)}
              onClose={loginMenuClose}
            >
              <MenuItem onClick={loginMenuClose}>
                <Link to="/login">
                  <i
                    className="text-primary fa fa-sign-in"
                    aria-hidden="true"
                  ></i>
                  Log In
                </Link>
              </MenuItem>
              <MenuItem onClick={loginMenuClose}>
                <Link to="/signup">
                  <i className="text-primary fa fa-user" aria-hidden="true"></i>
                  Sign Up
                </Link>
              </MenuItem>
            </Menu>

            <Button
              aria-controls="setting-menu"
              aria-haspopup="true"
              className={showBar ? classes.primary : classes.white}
              onClick={settingMenuClick}
            >
              <i className="fa fa-cog" aria-hidden="true"></i>
            </Button>
            <Menu
              className={[classes.menu, "aa-fa"].join(" ")}
              id="setting-menu"
              anchorEl={settingMenu}
              keepMounted
              open={Boolean(settingMenu)}
              onClose={settingMenuClose}
            >
              <MenuItem onClick={settingMenuClose}>
                <Link to="/settings/profile">
                  <i
                    className="text-primary fa fa-id-card-o"
                    aria-hidden="true"
                  ></i>
                  Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={settingMenuClose}>
                <Link to="/settings/business">
                  <i className="text-primary fa fa-bank" aria-hidden="true"></i>
                  Business
                </Link>
              </MenuItem>
              <MenuItem onClick={settingMenuClose}>
                <Link to="/settings/account">
                  <i className="text-primary fa fa-user" aria-hidden="true"></i>
                  Account
                </Link>
              </MenuItem>
              <MenuItem onClick={settingMenuClose}>
                <Link to="/settings/password">
                  <i
                    className="text-primary fa fa-shield"
                    aria-hidden="true"
                  ></i>
                  Password
                </Link>
              </MenuItem>
              <MenuItem onClick={settingMenuClose}>
                <Link to="/logout">
                  <i
                    className="text-primary fa fa-sign-out"
                    aria-hidden="true"
                  ></i>
                  Logout
                </Link>
              </MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
