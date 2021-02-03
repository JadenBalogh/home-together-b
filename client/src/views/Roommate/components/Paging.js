/*
 * @Author: AA
 * @Date: 2021-01-29 05:36:56
 * @LastEditors: AA
 * @LastEditTime: 2021-01-29 06:44:31
 * @FilePath: /src/views/Roommate/components/Paging.js
 */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function BasicPagination() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Pagination
        className="d-flex justify-content-center"
        count={10}
        color="primary"
      />
    </div>
  );
}
