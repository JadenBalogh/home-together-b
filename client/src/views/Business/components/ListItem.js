/*
 * @Author: AA
 * @Date: 2021-01-28 17:06:00
 * @LastEditors: AA
 * @LastEditTime: 2021-01-31 03:53:38
 * @FilePath: /src/views/Business/components/ListItem.js
 */
import React from "react";
import { Link } from "react-router-dom";
// Import plugin resources
import { Avatar, Typography, Button } from "@material-ui/core";

// This plugin resources
import avatarImg1 from "../assets/images/business/1.png";
import avatarImg2 from "../assets/images/business/2.png";
import avatarImg3 from "../assets/images/business/3.png";
import avatarImg4 from "../assets/images/business/4.png";
const avatarImg = [avatarImg1, avatarImg2, avatarImg3, avatarImg4];

const companies = ["Google", "Twiter", "FaceBook", "Ebay"];
// Import  dependent resources of this component

export default function businessListItem(props) {
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
            {companies[props.avnum]}
          </Typography>
          <Link to={"/business/detail/" + props.id}>
            <Button variant="contained" color="primary" size="small">
              Read More
            </Button>
          </Link>
        </div>
        <div className="row text-gray-7">
          <div className="col-18">8000 University Dr, Burnaby, BC V5A 1S6</div>
          <div className="col-6 text-gray-7">
            {new Date().getDate() +
              "/" +
              (new Date().getMonth() + 1) +
              "/" +
              new Date().getFullYear()}
          </div>
          <div className="col-6">Email Address: manfen@gmail.com</div>
          <div className="col-6">Cellphone:12312313</div>
        </div>
      </div>
    </div>
  );
}
