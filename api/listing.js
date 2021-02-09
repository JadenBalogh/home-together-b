/*
 * @Author: AA
 * @LastEditors: AA
 * @FilePath: /server/api/listing.js
 */

var DB = require("../lib/db");

async function getList(category_id, page) {
  return DB.table("listing")
    .alias("a")
    .field(["a.*", "c.name as category_name"])
    .join({
      categoryType: {
        as: "c",
        on: { category_id: "id" },
      },
    })
    .where(category_id ? { "a.category_id": ["=", category_id] } : "")
    .order(["a.create_time desc"])
    .pages(page, config.pageSite)
    .select();
}

async function getCategoryType(_id) {
  return DB.table("categorytype").find();
}

module.exports = {
  getList,
  getCategoryType,
};
