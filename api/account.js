/*
 * @Author: AA
 * @LastEditors: AA
 * @FilePath: /server/api/account.js
 */

var config = require("../config");
var utils = require("../lib/utils");
var DB = require("../lib/db");

async function saveAvatar(avatar, user_id) {
  return await DB.update(
    "user",
    {
      head_ico: avatar,
    },
    "id=?",
    [user_id]
  );
}

async function savePassword(password, user_id) {
  return await DB.update(
    "user",
    {
      password: password,
    },
    "id=?",
    [user_id]
  );
}

async function saveMobile(mobile, user_id) {
  return await DB.update(
    "user",
    {
      mobile: mobile,
    },
    "id=?",
    [user_id]
  );
}

async function saveEmail(mobile, user_id) {
  return await DB.update(
    "user",
    {
      email: email,
    },
    "id=?",
    [user_id]
  );
}

module.exports = {
  saveAvatar,
  savePassword,
  saveMobile,
  saveEmail,
};
