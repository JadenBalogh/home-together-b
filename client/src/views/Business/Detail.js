/*
 * @Author: AA
 * @Date: 2021-01-30 04:48:59
 * @LastEditors: AA
 * @LastEditTime: 2021-01-31 03:37:25
 * @FilePath: /src/views/Company/Detail.js
 */
import React from "react";
// Import plugin resources
import { Container } from "@material-ui/core";
// Import  dependent resources of this component
import "./assets/scss/Detail.scss";
// Components
import FirstItem from "./components/FirstItem";
import ListItem from "./components/ListItem";

function businessDetail(props) {
  let listItems = [],
    avnum = 0;
  for (let index = 0; index < 8; index++) {
    listItems.push(
      <ListItem
        className="mt-20"
        id={index}
        avnum={avnum}
        key={"ListItem" + index}
      />
    );
    avnum++;
    if (avnum >= 4) {
      avnum = 0;
    }
  }

  return (
    <div className="businessDetail">
      <div className="banner"></div>

      <Container className="business-container pb-20">
        <FirstItem {...props} />
        <h3 className="text-center mt-40">More Business</h3>
        {listItems}
      </Container>
    </div>
  );
}

export default businessDetail;
