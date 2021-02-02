/*
 * @Author: AA
 * @Date: 2021-01-28 06:05:38
 * @LastEditors: AA
 * @LastEditTime: 2021-01-30 05:53:06
 * @FilePath: /src/views/Roommate/index.js
 */
import React from "react";
// Import plugin resources
import { Container } from "@material-ui/core";

// Components
import Filter from "./components/Filter";
import ListItem from "./components/ListItem";
import Paging from "./components/Paging";

function Roommate() {
  let listItems = [],
    avnum = 0;
  for (let index = 0; index < 15; index++) {
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
    <Container className="mt-90 pb-20">
      <Filter />

      {listItems}
      <Paging />
    </Container>
  );
}

export default Roommate;
