/*
 * @Author: AA
 * @LastEditors: AA
 * @FilePath: /server/routes/listing.js
 */

var express = require("express");
var router = express.Router();

var { getList, getCategoryTypes } = require("../api/listing");

/**
 * @description: Get List
 * @param {Number} category_id category type id
 * @return {Number} Pagination page number
 */

router.get("/getList", async function (req, res) {
  var result = await getList(req.query.category_id, req.query.page);
  return res.json({
    status: 200,
    msg: "success",
    data: result,
  });
});

/**
 * @description:Get List Category Type
 */

router.get("/getCategoryType", async function (req, res) {
  var result = await getCategoryTypes();
  return res.json({
    status: 200,
    msg: "success",
    data: result,
  });
});

module.exports = router;
