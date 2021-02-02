/*
 * @Author: AA
 * @Date: 2021-01-28 17:06:00
 * @LastEditors: AA
 * @LastEditTime: 2021-01-31 03:39:04
 * @FilePath: /src/views/Roommate/components/FirstItem.js
 */
import React from "react";
import { Link } from "react-router-dom";
// Import plugin resources
import { Avatar, Typography, Button } from "@material-ui/core";

import ShareTo from "../../../plugins/ShareTo";

// Import Global Images
import avatarImg1 from "assets/images/team/1.jpg";
import avatarImg2 from "assets/images/team/2.jpg";
import avatarImg3 from "assets/images/team/3.jpg";
import avatarImg4 from "assets/images/team/4.jpg";
const avatarImg = [avatarImg1, avatarImg2, avatarImg3, avatarImg4];

// Import  dependent resources of this component

export default function roommateFirstItem(props) {
  const avNum = parseInt(4 * Math.random());

  return (
    <div className="card padding first-item text-center">
      <Avatar
        className="detail-avatar"
        src={avatarImg[avNum]}
        alt="Remy Sharp"
      />
      <Typography variant="h5" component="h5">
        Obama Trump
      </Typography>

      <Typography>8000 University Dr, Burnaby, BC V5A 1S6</Typography>

      <div className="row text-gray-7  text-left">
        <div className="col-6">Gender:Male</div>
        <div className="col-6">Family:Single</div>
        <div className="col-6">Age Group:Youth (15-24 years)</div>
        <div className="col-6">Pets:No</div>
        <div className="col-6">Smoke:No</div>
        <div className="col-6">Allergies:No</div>
        <div className="col-6">Work Status:full time</div>

        <div className="col-6">
          <i className="fa fa-clock-o" aria-hidden="true"></i>{" "}
          {new Date().getDate() +
            " / " +
            (new Date().getMonth() + 1) +
            " / " +
            new Date().getFullYear()}
        </div>
        <div className="col-6">
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
