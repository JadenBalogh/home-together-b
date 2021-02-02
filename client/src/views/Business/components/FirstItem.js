/*
 * @Author: AA
 * @Date: 2021-01-28 17:06:00
 * @LastEditors: AA
 * @LastEditTime: 2021-01-31 03:57:29
 * @FilePath: /src/views/Business/components/FirstItem.js
 */
import React from "react";
import { Link } from "react-router-dom";
// Import plugin resources
import { Avatar, Typography, Button } from "@material-ui/core";

import ShareTo from "../../../plugins/ShareTo";

// Import Global Images
import avatarImg1 from "../assets/images/business/1.png";
import avatarImg2 from "../assets/images/business/2.png";
import avatarImg3 from "../assets/images/business/3.png";
import avatarImg4 from "../assets/images/business/4.png";
const avatarImg = [avatarImg1, avatarImg2, avatarImg3, avatarImg4];
const companies = ["Google", "Twiter", "FaceBook", "Ebay"];
// Import  dependent resources of this component

export default function businessFirstItem(props) {
  const avNum = parseInt(4 * Math.random());

  return (
    <div className="card padding first-item text-center">
      <Avatar
        className="detail-avatar"
        src={avatarImg[avNum]}
        alt="Remy Sharp"
      />
      <Typography variant="h5" component="h5">
        {" "}
        {companies[props.avnum]}
      </Typography>

      <Typography>8000 University Dr, Burnaby, BC V5A 1S6</Typography>

      <div className="row text-gray-7  text-left">
        <div className="col-8">Email Address: wangmanfen@gmail.com</div>
        <div className="col-8">Cell phone:12312313</div>
        
        <div className="col-8">
          Home page:
          <i class="fa fa-link" aria-hidden="true"></i>
        </div>

        <div className="col-8">
          <i className="fa fa-clock-o" aria-hidden="true"></i>{" "}
          {new Date().getDate() +
            " / " +
            (new Date().getMonth() + 1) +
            " / " +
            new Date().getFullYear()}
        </div>
        <div className="col-8">
          <ShareTo
            url={document.location.href}
            title={document.title}
            target={["facebook", "twitter", "mail"]}
          ></ShareTo>
        </div>
      </div>
    </div>
  );
}
