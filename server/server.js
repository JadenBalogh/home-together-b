import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
<<<<<<< Updated upstream

import searchRoutes from './routes/search-routes.js';
import authRoutes from './routes/auth-routes.js';
=======
import mysql from 'mysql2';
// Required for bcrypt (Password Salting and Hashing)
const bcrypt = require ('bcrypt');

// This is required to read from the .env.local file
import localenv from 'localenv';

var con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});


// ---- Password Salting, Hashing and, Verification ----
// TODO: bcrypt has a 72-bytes UTF-8 encoded limit, if a password is longer it will have to be truancated or pre-hashed to work if longer.
// Using Pufferfish would be an option as well but it is still relatively new.
// TODO: Write a "GETPASSWORD" function which takes the password from the server signup / signin form.
// Sets the number of salt rounds to perform (bcrypt Default = 10)
const saltRounds = 10;

// Used for Sign-UP, takes Password from client, hashes and then stores in DB
bcrypt.genSalt(saltRounds, function(err, salt) {
// The salt is passed down to the hashing function.
  bcrypt.hash(GETPASSWORD, salt, function(err, hash) {
  // TODO: Insert the password into the DB.
  });
});

// Argument for SERVER-SIDE hashing: https://security.stackexchange.com/questions/8596/https-security-should-password-be-hashed-server-side-or-client-side
// Used for Sign-IN, takes the username password from the client (Should be methodized to be re-used from above) compares it with DB password and returns a match/no-match.
// NOTE: MESSAGE SHOULD NOT LET THE USER KNOW THE USERNAME IS CORRECT, if the username OR password doesn't match, kickback a generic "Information does not match our records".
// Step 1: Given the username, select the matching password from the DB, if there is none, return an error.
// Step 2: If the username exists compare the password submitted to the password on record. 
// Step 3: If it matches, return an authentication successful.

bcrypt.compare(GETPASSWORD, hash, function(err, result) {
  if (result) {
    // TODO: Return success, login user.
  }
  else {
    // TODO: Return an invalid password.
  }
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
>>>>>>> Stashed changes

const app = express();
app.use(cors());
app.use(bodyParser.json());

<<<<<<< Updated upstream
=======
// Expects: /get-members?genderId=2&minAge=21&maxAge=80&familyStatusId=1&maxMonthlyBudget=800
app.get('/get-members', (req, res) => {
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
app.get('/get-listings', (req, res) => {
  getListings(req.query.categoryId).then(listings => {
    res.send(listings);
  })
});

// Expects: /get-gender-types
app.get('/get-gender-types', (req, res) => {
  getGenderTypes().then(genders => {
    res.send(genders);
  })
});

// Expects: /get-family-status-types
app.get('/get-family-status-types', (req, res) => {
  getFamilyStatusTypes().then(familyStatuses => {
    res.send(familyStatuses);
  })
});

// Expects: /get-age-group-types
app.get('/get-age-group-types', (req, res) => {
  getAgeGroupTypes().then(ageGroups => {
    res.send(ageGroups);
  })
});

// Expects: /get-category-types
app.get('/get-category-types', (req, res) => {
  getCategoryTypes().then(categories => {
    res.send(categories);
  })
});

>>>>>>> Stashed changes
app.listen(3001, () => {
  console.log('Server started on port 3001');
});

<<<<<<< Updated upstream
searchRoutes(app);
authRoutes(app);
=======
function getAgeRanges(ageGroupIds) {
  var placeholders = ageGroupIds.length > 0 ? 
    ageGroupIds.map(() => '?').join(',') : '-1';
  var sql =
    `SELECT minAge, maxAge
    FROM AgeGroupType
    WHERE id IN (${placeholders})`;
  return query(sql, [...ageGroupIds]);
}

function getMembers(genderIds = [], ageGroupIds = [], familyStatusIds = [], maxMonthlyBudget = 0) {
  genderIds = Array.from(genderIds);
  ageGroupIds = Array.from(ageGroupIds);
  familyStatusIds = Array.from(familyStatusIds);
  
  var sql =
    'SELECT \
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
    WHERE s.maxMonthlyBudget >= ?';

  return new Promise((resolve) => {
    query(sql, [maxMonthlyBudget]).then(results => {

      // Manually do the filtering for the array-based parameters
      // cause prepared statements suck at dealing with this
      var year = new Date().getFullYear();
      getAgeRanges(ageGroupIds).then(ageRanges => {
        let filteredResults = results.filter(x => {
          let doesGenderMatch = genderIds.length > 0 ?
            genderIds.includes(x.genderId.toString()) : true;

          let doesFamilyMatch = familyStatusIds.length > 0 ?
            familyStatusIds.includes(x.familyStatusId.toString()) : true;

          let doesAgeMatch = ageRanges.length > 0 ?
            ageRanges.some(ageRange => {
              return year - Number(ageRange.minAge) >= x.birthYear
                  && year - Number(ageRange.maxAge) <= x.birthYear;
            }) : true;

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
      'SELECT \
        l.id, \
        title, \
        website, \
        phone, \
        email, \
        c.id AS categoryId, \
        c.name AS categoryName \
      FROM Listing l \
      JOIN CategoryType c ON l.categoryId = c.id';
    query(sql).then(results => {
      let filteredResults = results;
      if (categoryId > 0) {
        filteredResults = results.filter(x => x.categoryId == categoryId);
      }
      resolve(filteredResults);
    });
  });
}

function getGenderTypes() {
  var sql = 
    'SELECT id, name \
    FROM GenderType';
  return query(sql);
}

function getFamilyStatusTypes() {
  var sql = 
    'SELECT id, name \
    FROM FamilyStatusType';
  return query(sql);
}

function getAgeGroupTypes() {
  var sql = 
    'SELECT id, name, minAge, maxAge \
    FROM AgeGroupType';
  return query(sql);
}

function getCategoryTypes() {
  var sql = 
    'SELECT id, name \
    FROM CategoryType';
  return query(sql);
}

function getPassword() {
  var sql = 
    'SELECT id, username \
    FROM Member';
  return query(sql);
}
>>>>>>> Stashed changes
