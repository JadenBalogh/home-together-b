/*
 * @Author: AA
 * @Date: 2021-01-28 16:04:34
 * @LastEditors: AA
 * @LastEditTime: 2021-01-30 14:55:24
 * @FilePath: /src/views/Settings/Profile.js
 */
import React from "react";

import { Link } from "react-router-dom";

// Import plugin resources
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Typography,
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
} from "@material-ui/core";

// This plugin resources
import { CloudUpload, Visibility } from "@material-ui/icons";
// Import Global Images
import AvatarImg from "assets/images/avatar.png";

// Import  dependent resources of this component

export default function Account() {
  return (
    <Card className="aa-card">
      <form autoComplete="off">
        <CardContent>
          <CardContent>
            <div className="row d-flex justify-content-between align-items-center">
              <Avatar
                alt="Remy Sharp"
                src={AvatarImg}
                style={{ width: "60px", height: "60px" }}
              />
              <div>
                <Button
                  className="bg-white"
                  variant="contained"
                  color="white"
                  size="small"
                  startIcon={<CloudUpload />}
                >
                  Upload Profile Photo
                </Button>

                <Link className="ml-10" to="/roommate/detail/1" target="roommate">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    startIcon={<Visibility />}
                  >
                    Preview
                  </Button>
                </Link>
              </div>
            </div>
            <div className="row">
              <div className="col-12 mb-20">
                <TextField
                  className="w-100"
                  required
                  id="fist-name"
                  label="First name..."
                  defaultValue=""
                />
              </div>
              <div className="col-12 mb-20">
                <TextField
                  className="w-100"
                  required
                  id="last-name"
                  label="Last name..."
                  defaultValue=""
                />
              </div>
              <div className="col-12 mb-20">
                <TextField
                  className="w-100"
                  id="address"
                  label="Home Address..."
                  defaultValue=""
                />
              </div>
              <div className="col-12 mb-20">
                <TextField
                  className="w-100"
                  id="mailaddress"
                  label="Mailing Address..."
                  defaultValue=""
                />
              </div>
              <div className="col-24 mb-20">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-label="gender"
                  name="gender"
                  defaultValue="0"
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio color="primary" />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio color="primary" />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="0"
                    control={<Radio color="primary" />}
                    label="Other"
                  />
                </RadioGroup>
              </div>
              <div className="col-12 mb-20">
                <FormControl className="w-100">
                  <InputLabel htmlFor="family-native-helper">
                    Family Status
                  </InputLabel>
                  <NativeSelect
                    className="w-100"
                    value="0"
                    inputProps={{
                      name: "family",
                      id: "family-native-helper",
                    }}
                  >
                    <option aria-label="" value="0" />
                    <option value="1">Single</option>
                    <option value="2">Couple</option>
                    <option value="3">Couple whith children</option>
                    <option value="4">Single parent</option>
                    <option value="5">Other Group</option>
                  </NativeSelect>
                  <FormHelperText>Some important helper text</FormHelperText>
                </FormControl>
              </div>
              <div className="col-12 mb-20">
                <TextField
                  className="w-100"
                  id="birthday"
                  label="Birthday"
                  type="date"
                  defaultValue="2017-05-24"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className="col-12 mb-20">
                <FormControl className="w-100">
                  <InputLabel htmlFor="agegroup-native-simple">
                    Age Group
                  </InputLabel>
                  <Select
                    className="w-100"
                    native
                    value="0"
                    inputProps={{
                      name: "agegroup",
                      id: "agegroup-native-simple",
                    }}
                  >
                    <option aria-label="" value="0" />
                    <option value="1">Children (00-14 years)</option>
                    <option value="2">Youth (15-24 years)</option>
                    <option value="3">Adults (25-64 years)</option>
                    <option value="4">Seniors (65 years and over)</option>
                  </Select>
                </FormControl>
              </div>
              <div className="col-12 mb-20">
                <TextField
                  className="w-100"
                  id="ifcouple"
                  label="If couple Second person’s username..."
                  defaultValue=""
                />
              </div>
              <div className="col-24 mb-20">
                <TextField
                  className="w-100"
                  id="phone"
                  label="Phone Number..."
                  defaultValue=""
                />
              </div>
              <div className="col-12 mb-20">
                <TextField
                  className="w-100"
                  id="budget"
                  label="Maximum monthly rental budget (to nearest hundred)..."
                  defaultValue=""
                />
              </div>
              <div className="col-12 mb-20">
                <TextField
                  className="w-100"
                  id="living"
                  label="Areas you are interested in living..."
                  defaultValue=""
                />
              </div>
              <div className="col-12 mb-20">
                <FormLabel component="legend">
                  Are you willing to purchase a home with others?
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="purchase"
                  name="purchase"
                  defaultValue="0"
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio color="primary" />}
                    label="YES"
                  />
                  <FormControlLabel
                    value="0"
                    control={<Radio color="primary" />}
                    label="NO"
                  />
                </RadioGroup>
              </div>
              <div className="col-12 mb-20">
                <FormLabel component="legend">
                  Do you have a home to share?
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="share"
                  name="share"
                  defaultValue="0"
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio color="primary" />}
                    label="YES"
                  />
                  <FormControlLabel
                    value="0"
                    control={<Radio color="primary" />}
                    label="NO"
                  />
                </RadioGroup>
              </div>
              <div className="col-12 mb-20">
                <FormLabel component="legend">
                  Do you have pets? if so, elaborate
                </FormLabel>
                <RadioGroup row aria-label="pets" name="pets" defaultValue="0">
                  <FormControlLabel
                    value="1"
                    control={<Radio color="primary" />}
                    label="YES"
                  />
                  <FormControlLabel
                    value="0"
                    control={<Radio color="primary" />}
                    label="NO"
                  />
                </RadioGroup>
              </div>
              <div className="col-12 mb-20">
                <FormLabel component="legend">
                  Do you smoke? if so, elaborate
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="smoke"
                  name="smoke"
                  defaultValue="0"
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio color="primary" />}
                    label="YES"
                  />
                  <FormControlLabel
                    value="0"
                    control={<Radio color="primary" />}
                    label="NO"
                  />
                </RadioGroup>
              </div>
              <div className="col-12 mb-20">
                <FormLabel component="legend">
                  Do you have health/mobility issues? if so, elaborate
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="health"
                  name="health"
                  defaultValue="0"
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio color="primary" />}
                    label="YES"
                  />
                  <FormControlLabel
                    value="0"
                    control={<Radio color="primary" />}
                    label="NO"
                  />
                </RadioGroup>
              </div>
              <div className="col-12 mb-20">
                <FormLabel component="legend">
                  Do you have allergies? if so, elaborate
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="health"
                  name="health"
                  defaultValue="0"
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio color="primary" />}
                    label="YES"
                  />
                  <FormControlLabel
                    value="0"
                    control={<Radio color="primary" />}
                    label="NO"
                  />
                </RadioGroup>
              </div>
              <div className="col-24">
                <FormControl className="w-100">
                  <InputLabel htmlFor="workstatus-native-simple">
                    Work Status
                  </InputLabel>
                  <Select
                    className="w-100"
                    native
                    value="0"
                    inputProps={{
                      name: "workstatus",
                      id: "workstatus-native-simple",
                    }}
                  >
                    <option aria-label="" value="0" />
                    <option value="1">full time</option>
                    <option value="2">part time</option>
                    <option value="3">retired</option>
                    <option value="4">semi-retired</option>
                    <option value="5">full time student</option>
                    <option value="6">part time student</option>
                    <option value="7">other - elaborate</option>
                  </Select>
                </FormControl>
              </div>
            </div>
          </CardContent>
          <CardActions className="text-center">
            <Button className="m-auto" variant="contained" color="primary">
              Save
            </Button>
          </CardActions>
        </CardContent>
      </form>
    </Card>
  );
}
