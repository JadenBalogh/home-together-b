/*
 * @Author: AA
 * @Date: 2021-01-28 16:04:34
 * @LastEditors: AA
 * @LastEditTime: 2021-01-28 18:22:18
 * @FilePath: /src/views/Home/Sections/Contact.js
 */
import React from "react";
// Import plugin resources
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Paper,
  InputBase,
  Divider,
  Typography,
  IconButton,
} from "@material-ui/core";

import { Email as EmailIcon, Send as DirectionsIcon } from "@material-ui/icons";

// This plugin resources

// Import  dependent resources of this component
import "./assets/scss/Contact.scss";

// Custom Styles
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    margin: "0 auto",
    marginTop: "40px",
    borderRadius: "25px",
    boxShadow: "0 2px 12px 0 rgba(0,0,0, 0.1) !important",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function Contact() {
  const classes = useStyles();
  return (
    <section className="section">
      <Container className="home-service text-center">
        <div className="text-primary">Ask for help</div>
        <Typography className="mb-20" variant="h4" component="h2">
          Contact us
        </Typography>
        <Paper component="form" className={classes.root}>
          <IconButton className={classes.iconButton} aria-label="menu">
            <EmailIcon />
          </IconButton>
          <InputBase
            className={classes.input}
            placeholder="Enter you E-mail"
            inputProps={{ "aria-label": "Enter you E-mail" }}
          />

          <Divider className={classes.divider} orientation="vertical" />
          <IconButton
            type="submit"
            color="primary"
            className={classes.iconButton}
            aria-label="send"
          >
            <DirectionsIcon />
          </IconButton>
        </Paper>
      </Container>
    </section>
  );
}
