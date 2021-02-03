/*
 * @Author: AA
 * @Date: 2021-01-28 16:04:34
 * @LastEditors: AA
 * @LastEditTime: 2021-01-29 10:47:06
 * @FilePath: /src/views/Roommate/components/Filter.js
 */
import React from "react";
// Import plugin resources
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  InputBase,
  Divider,
  IconButton,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  FormControl,
  Button,
  TextField,
  RadioGroup,
  Radio,
  Select,
  NativeSelect,
  MenuItem,
} from "@material-ui/core";

import {
  Email as EmailIcon,
  Search as DirectionsIcon,
} from "@material-ui/icons";

// This plugin resources

// Import  dependent resources of this component

// Custom Styles
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
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
    <section className="d-flex justify-content-between align-items-center">
      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Keywords"
          inputProps={{ "aria-label": "Keywords" }}
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
      <div className="text-right">
        <FormControl style={{ width: "130px" }}>
          <InputLabel className="w-100 text-left" id="demo-simple-select-label">
            Family Status
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value=""
          >
            <MenuItem value="single">Single</MenuItem>
            <MenuItem value="couple">Couple</MenuItem>
            <MenuItem value="coupleWithChildren">Couple With Children</MenuItem>
            <MenuItem value="singleParent">Single Parent</MenuItem>
            <MenuItem value="existingGroup">Existing Group</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={{ width: "100px" }}>
          <InputLabel
            className="w-100  text-left"
            id="demo-simple-select-label"
          >
            Genders
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value=""
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
      </div>
    </section>
  );
}
