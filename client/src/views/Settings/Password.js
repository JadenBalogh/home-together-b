/*
 * @Author: AA
 * @Date: 2021-01-28 16:04:34
 * @LastEditors: AA
 * @LastEditTime: 2021-01-30 14:54:49
 * @FilePath: /src/views/Settings/Company.js
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
import AvatarImg from "assets/images/company-logo.png";

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
                  Upload Company Logo
                </Button>

                <Link className="ml-10" to="/company/detail/1" target="company">
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
              <div className="col-19 mb-20">
                <TextField
                  className="w-100"
                  required
                  id="fist-name"
                  label="Full name of business/group/organization/person..."
                  defaultValue=""
                />
              </div>
              <div className="col-5 mb-20">
                <FormLabel component="legend">Incorporate Company</FormLabel>
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
                <TextField
                  className="w-100"
                  id="address"
                  label="Contact person phone number..."
                  defaultValue=""
                />
              </div>
              <div className="col-12 mb-20">
                <TextField
                  className="w-100"
                  id="mailaddress"
                  label="Business phone number..."
                  defaultValue=""
                />
              </div>
              <div className="col-12 mb-20">
                <TextField
                  className="w-100"
                  id="cellphone"
                  label="Business cell..."
                  defaultValue=""
                />
              </div>
              <div className="col-12 mb-20">
                <TextField
                  className="w-100"
                  id="email"
                  label="Business email address..."
                  defaultValue=""
                />
              </div>
              <div className="col-12 mb-20">
                <TextField
                  className="w-100"
                  id="address"
                  label="Business address..."
                  defaultValue=""
                />
              </div>
              <div className="col-12 mb-20">
                <TextField
                  className="w-100"
                  id="mailing"
                  label="Business mailing address (if different)..."
                  defaultValue=""
                />
              </div>
              <div className="col-24 mb-20">
                <TextField
                  className="w-100"
                  id="mailing"
                  label="Address shown in map search (use postal code for general 
                    area if customers do not come to your place of business) 
                    ..."
                  defaultValue=""
                />
              </div>
              <div className="col-24 mb-20">
                <TextField
                  className="w-100"
                  id="homepage"
                  label="Website link..."
                  defaultValue=""
                />
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
