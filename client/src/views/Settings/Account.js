/*
 * @Author: AA
 * @Date: 2021-01-28 16:04:34
 * @LastEditors: AA
 * @LastEditTime: 2021-01-30 14:54:49
 * @FilePath: /src/views/Settings/Password.js
 */
import React from "react";



// Import plugin resources
import {
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
} from "@material-ui/core";

// This plugin resources

// Import Global Images


// Import  dependent resources of this component

export default function Account() {
  return (
    <Card className="aa-card">
      <form autoComplete="off">
        <CardContent>
          <CardContent>
           
            <div className="row">
              <div className="col-24 mb-20">
                <TextField
                  className="w-100"
                  required
                  id="oldpassword"
                  label="Enter current password..."
                  defaultValue=""
                />
              </div>
              <div className="col-24 mb-20">
                <TextField
                  className="w-100"
                  required
                  id="address"
                  label="Enter new email address..."
                  defaultValue=""
                />
              </div>
              <div className="col-24 mb-20">
                <TextField
                  className="w-100"
                  required
                  id="mailaddress"
                  label="Confirm new email address..."
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
