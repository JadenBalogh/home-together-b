/*
 * @Author: AA
 * @LastEditors: AA
 * @FilePath: /server/routes/account.js
 */
var express = require("express");
var router = express.Router();
var md5 = require("md5");
var config = require("../config");
var crypt = require("../lib/utils/crypt");
var utils = require("../lib/utils");

var { savePassword, saveProfile } = require("../api/account"); 

router.post("/saveProfile", async function (req, res) {
  var mobile = req.body.mobile;
  if (utils.isEmpty(mobile)) {
    return res.json({
      status: 0,
      msg: "Please enter Phone",
      data: "",
    });
  }

  saveProfile(mobile, req.data);
  return res.json({
    status: 200,
    msg: "success",
    data: "",
  });
});

router.post("/savePassword", async function (req, res) {
  var old_password = req.body.old_password;

  if (
    utils.isEmpty(old_password) ||
    md5(old_password) != req.cookies.userData.password
  ) {
    return res.json({
      status: 0,
      msg: "Please enter current password.",
      data: "",
    });
  }

  var password = req.body.password;
  if (
    utils.isEmpty(password) ||
    (!utils.isEmpty(password) &&
      (password.length < 6 ||
        password.length > 16 ||
        utils.checkPasswordStrong(password) < 2))
  ) {
    return res.json({
      status: 0,
      msg:
        "The new password must be more than 6 characters and contain more than two different characters.",
      data: "",
    });
  }

  var confirm_password = req.body.confirm_password;
  if (utils.isEmpty(confirm_password) || confirm_password != password) {
    return res.json({
      status: 0,
      msg: "The two passwords must be the same.",
      data: "",
    });
  }

  password = md5(password);

  savePassword(password, req.cookies.userData.id);

  return res.json({
    status: 200,
    msg: "success",
    data: "",
  });
});

module.exports = router;
