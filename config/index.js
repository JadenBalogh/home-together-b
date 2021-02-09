/*
 * @Author: AA
 * @LastEditors: AA
 * @FilePath: /server/config/index.js
 */
var { resolve } = require("path");

module.exports = {
  host: "localhost",
  user: "root",
  password: "",
  database: "",
  tablePre: "pre_",
  charset: "utf8",
  charset_collate: "utf8_general_ci",
  pageSite: 15,
  basePath:
    process.env.NODE_ENV == "dev" || process.env.NODE_ENV == "development"
      ? resolve("../public/")
      : resolve("../"),
  runTIme:
    process.env.NODE_ENV == "dev" || process.env.NODE_ENV == "development"
      ? resolve("../public/runtime")
      : resolve("../runtime"),
};
