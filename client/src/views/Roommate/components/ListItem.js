/*
 * @Author: AA
 * @Date: 2021-01-28 17:06:00
 * @LastEditors: AA
 * @LastEditTime: 2021-01-31 03:38:52
 * @FilePath: /src/views/Roommate/components/ListItem.js
 */
import React from "react";
import { Link } from "react-router-dom";
// Import plugin resources
import { Avatar, Typography, Button } from "@material-ui/core";

// This plugin resources
import avatarImg1 from "assets/images/team/1.jpg";
import avatarImg2 from "assets/images/team/2.jpg";
import avatarImg3 from "assets/images/team/3.jpg";
import avatarImg4 from "assets/images/team/4.jpg";
const avatarImg = [avatarImg1, avatarImg2, avatarImg3, avatarImg4];

// Import  dependent resources of this component

export default function roommateListItem(props) {
  return (
    <div className="card padding mt-20 d-flex justify-content-start align-items-center">
      <div className="flex-grow-0">
        <Avatar
          alt="Remy Sharp"
          src={avatarImg[props.avnum]}
          style={{ width: "60px", height: "60px" }}
        />{" "}
      </div>
      <div className="flex-grow-1 pl-20">
        <div className="d-flex justify-content-between align-items-center">
          <Typography variant="h6" component="h6">
            8000 University Dr, Burnaby, BC V5A 1S6
          </Typography>
          <Link to={"/roommate/detail/" + props.id}>
            <Button variant="contained" color="primary" size="small">
              Read More
            </Button>
          </Link>
        </div>
        <div className="row text-gray-7">
          <div className="col-18">
            Obama Trump:Find the most suitable co-tenant.
          </div>
          <div className="col-6 text-gray-7">
            {new Date().getDate() +
              "/" +
              (new Date().getMonth() + 1) +
              "/" +
              new Date().getFullYear()}
          </div>
          <div className="col-6">Gender:Male</div>
          <div className="col-6">Family:Single</div>
          <div className="col-6"> Age Group:Youth (15-24 years)</div>
          <div className="col-6">Pets:No</div>
          <div className="col-6">Smoke:No</div>
        </div>
      </div>
    </div>
  );
}
