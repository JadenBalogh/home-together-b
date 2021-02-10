import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

import mysql from "mysql2";
// This is required to read from the .env.local file
import localenv from "localenv";

var con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// Asynchronous helper function for MySQL queries
function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    con.execute(sql, params, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method == "OPTIONS") {
    res.send(200);
  } else {
    next();
  }
});

/**
 * @description: account
 */
var account = require("./routes/account");
app.use("/account", function (req, res, next) {
  //Check if the user is logged in
  if (!utils.isEmpty(req.cookies.username)) {
    next();
  } else {
    res.status(401).json({
      value: "401",
    });
  }
});
app.use("/account", account);

/**
 * @description: listing
 */
var listing = require("./routes/listing");

app.use("/listing", listing);


// Expects: /get-members?genderId=2&minAge=21&maxAge=80&familyStatusId=1&maxMonthlyBudget=800
app.get("/get-members", (req, res) => {
  getMembers(
    req.query.genderIds,
    req.query.ageGroupIds,
    req.query.familyStatusIds,
    req.query.maxMonthlyBudget
  ).then((members) => {
    res.send(members);
  });
});

// Expects: /get-listings?category=Rentals
app.get("/get-listings", (req, res) => {
  getListings(req.query.categoryId).then((listings) => {
    res.send(listings);
  });
});

// Expects: /get-gender-types
app.get("/get-gender-types", (req, res) => {
  getGenderTypes().then((genders) => {
    res.send(genders);
  });
});

// Expects: /get-family-status-types
app.get("/get-family-status-types", (req, res) => {
  getFamilyStatusTypes().then((familyStatuses) => {
    res.send(familyStatuses);
  });
});

// Expects: /get-age-group-types
app.get("/get-age-group-types", (req, res) => {
  getAgeGroupTypes().then((ageGroups) => {
    res.send(ageGroups);
  });
});

// Expects: /get-category-types
app.get("/get-category-types", (req, res) => {
  getCategoryTypes().then((categories) => {
    res.send(categories);
  });
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});

function getAgeRanges(ageGroupIds) {
  var placeholders =
    ageGroupIds.length > 0 ? ageGroupIds.map(() => "?").join(",") : "-1";
  var sql = `SELECT minAge, maxAge
    FROM AgeGroupType
    WHERE id IN (${placeholders})`;
  return query(sql, [...ageGroupIds]);
}

function getMembers(
  genderIds = [],
  ageGroupIds = [],
  familyStatusIds = [],
  maxMonthlyBudget = 0
) {
  genderIds = Array.from(genderIds);
  ageGroupIds = Array.from(ageGroupIds);
  familyStatusIds = Array.from(familyStatusIds);

  var sql =
    "SELECT \
      m.id AS id, \
      m.firstName AS firstName, \
      m.lastName AS lastName, \
      g.id AS genderId, \
      g.name AS gender, \
      f.id AS familyStatusId, \
      f.name AS familyStatus, \
      s.maxMonthlyBudget AS maxMonthlyBudget, \
      s.birthYear as birthYear \
    FROM SearchableInfo s \
    JOIN Member m ON m.id = s.memberID \
    JOIN GenderType g ON g.id = s.genderId \
    JOIN FamilyStatusType f ON f.id = s.familyStatusId \
    WHERE s.maxMonthlyBudget >= ?";

  return new Promise((resolve) => {
    query(sql, [maxMonthlyBudget]).then((results) => {
      // Manually do the filtering for the array-based parameters
      // cause prepared statements suck at dealing with this
      var year = new Date().getFullYear();
      getAgeRanges(ageGroupIds).then((ageRanges) => {
        let filteredResults = results.filter((x) => {
          let doesGenderMatch =
            genderIds.length > 0
              ? genderIds.includes(x.genderId.toString())
              : true;

          let doesFamilyMatch =
            familyStatusIds.length > 0
              ? familyStatusIds.includes(x.familyStatusId.toString())
              : true;

          let doesAgeMatch =
            ageRanges.length > 0
              ? ageRanges.some((ageRange) => {
                  return (
                    year - Number(ageRange.minAge) >= x.birthYear &&
                    year - Number(ageRange.maxAge) <= x.birthYear
                  );
                })
              : true;

          return doesGenderMatch && doesFamilyMatch && doesAgeMatch;
        });

        resolve(filteredResults);
      });
    });
  });
}

function getListings(categoryId) {
  return new Promise((resolve) => {
    var sql =
      "SELECT \
        l.id, \
        title, \
        website, \
        phone, \
        email, \
        c.id AS categoryId, \
        c.name AS categoryName \
      FROM Listing l \
      JOIN CategoryType c ON l.categoryId = c.id";
    query(sql).then((results) => {
      let filteredResults = results;
      if (categoryId > 0) {
        filteredResults = results.filter((x) => x.categoryId == categoryId);
      }
      resolve(filteredResults);
    });
  });
}

function getGenderTypes() {
  var sql = "SELECT id, name \
    FROM GenderType";
  return query(sql);
}

function getFamilyStatusTypes() {
  var sql = "SELECT id, name \
    FROM FamilyStatusType";
  return query(sql);
}

function getAgeGroupTypes() {
  var sql = "SELECT id, name, minAge, maxAge \
    FROM AgeGroupType";
  return query(sql);
}

function getCategoryTypes() {
  var sql = "SELECT id, name \
    FROM CategoryType";
  return query(sql);
}
