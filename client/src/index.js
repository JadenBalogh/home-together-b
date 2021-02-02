/*
 * @Author: AA
 * @Date: 2021-01-28 06:05:38
 * @LastEditors: AA
 * @LastEditTime: 2021-01-30 06:57:18
 * @FilePath: /src/index.js
 */
import React from "react";
import ReactDOM from "react-dom";
import Config from "./config";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// CSS
import "font-awesome/css/font-awesome.min.css";
import "./assets/scss/aa-ui.scss";

// Plugins
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import axios from "./plugins/Axios";

// Register global functions
React.$config = Config;
React.$axios = axios;

const theme = createMuiTheme(Config.theme);
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
