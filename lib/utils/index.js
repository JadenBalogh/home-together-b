/*
 * @Author: AA
 * @LastEditors: AA
 * @FilePath: /server/lib/utils/index.js
 */
var Reg = require("./module/Reg");
var DateX = require("./module/Date");
var StringX = require("./module/String");
var ArrayX = require("./module/Array");
var NumberX = require("./module/Number");

module.exports = Object.assign(Browser, Reg, DateX, StringX, ArrayX, NumberX);
