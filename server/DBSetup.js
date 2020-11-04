// This is based on https://www.w3schools.com/nodejs/nodejs_mysql_create_table.asp

// Required because our package.json is defined as a module 
// see: https://nodejs.org/api/modules.html#modules_module_createrequire_filename
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Requirements
var mysql = require("mysql2");
const fs = require('fs');

// Variables
// Holds the current SQL Query
var sql; 
var DEBUG = false;

// Reads the localSetup.json file.
var rawData = fs.readFileSync("localSetup.json");
var config;
try {
    config = JSON.parse(rawData);
    console.log("Parsed localSetup.json, attempting to establish DB connection...");
}
catch (err) {
    console.log("Failed to parse localSetup.json, Error Expected, See:" + err);
}

// Creates the Connection based on the input parameters using the DB we created earlier
// This DB should be setup seperate from this code on the local hosting machine.
var con = mysql.createConnection({
    host: config.databaseParameters.host,
    database: config.databaseParameters.database,
    user: config.databaseParameters.user,
    password: config.databaseParameters.password
});

// Drops all the existing instances of the tables
// This requires the user to have DROP permissions on the database, so we are signing in with our DB Admin credentials we setup in the inital installation
// ----------- START TABLE DROPPING SECTION --------------

sql = "DROP TABLE IF EXISTS members";
con.query(sql, function(err, results) {
    if (err) {
        // Callsback an error if an error occured
        console.log(err);
    }else{
        console.log("Dropping members table...");
        console.log(results);
    }
});

sql = "DROP TABLE IF EXISTS email_log";
con.query(sql, function(err, results) {
    if (err) {
        // Callsback an error if an error occured
        console.log(err);
    }else{
        console.log("Dropping members table...");
        console.log(results);
    }
});


sql = "DROP TABLE IF EXISTS bookmarks";
con.query(sql, function(err, results) {
    if (err) {
        // Callsback an error if an error occured
        console.log(err);
    }else{
        console.log("Dropping members table...");
        console.log(results);
    }
});


sql = "DROP TABLE IF EXISTS blocked_users";
con.query(sql, function(err, results) {
    if (err) {
        // Callsback an error if an error occured
        console.log(err);
    }else{
        console.log("Dropping members table...");
        console.log(results);
    }
});

sql = "DROP TABLE IF EXISTS user_ratings";
con.query(sql, function(err, results) {
    if (err) {
        // Callsback an error if an error occured
        console.log(err);
    }else{
        console.log("Dropping table...");
        console.log(results);
    }
});

// ----------- END TABLE DROPPING SECTION --------------


// Creates the members table also intializes the first connections

// BOOLEAN is equivalent to TINYINT(1). TRUE = 1, FALSE = 0
sql = "CREATE TABLE members (user_ID INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(100), first_name VARCHAR(100), last_name VARCHAR(100), birth_year TINYINT, password VARCHAR(100), email VARCHAR(100), homeAddress VARCHAR(250), mailing_address VARCHAR(250), phone VARCHAR(20), age_group VARCHAR(50), family_size TINYINT, kids BOOLEAN, budget INT, purchase_home BOOLEAN, share_home BOOLEAN, pets BOOLEAN, pet_string VARCHAR(255), smoke BOOLEAN, smoke_string VARCHAR(255), mobility BOOLEAN, mobility_string VARCHAR(255), allergies BOOLEAN, allergies_string VARCHAR(255), employment_status VARCHAR(100), profile_picture_link VARCHAR(255), account_active BOOLEAN, account_average_rating FLOAT, account_verified BOOLEAN, admin_notes VARCHAR(2000), banned BOOLEAN, banned_reason VARCHAR(1000))";
con.query(sql, function (err, result) {
    // Throws error if there is a problem
    if (err) throw err;
    console.log("Attempting to create member table...");

});

// Creates the E-Mail Log table

sql = "CREATE TABLE email_log (email_ID INT AUTO_INCREMENT PRIMARY KEY, status TINYINT, email VARCHAR(100), recipient INT, content VARCHAR(500))";
con.query(sql, function (err, result) {
    // Throws error if there is a problem
    if (err) throw err;
    console.log("Attempting to create email log table...");

});

// Creates the Bookmarks Table
sql = "CREATE TABLE bookmarks (bookmark_ID INT AUTO_INCREMENT PRIMARY KEY, bookmarker_ID INT, bookmark VARCHAR(200))";
con.query(sql, function (err, result) {
    // Throws error if there is a problem
    if (err) throw err;
    console.log("Attempting to create bookmark table...");

});

// Creates the Blocked Users table
sql = "CREATE TABLE blocked_users (block_ID INT AUTO_INCREMENT PRIMARY KEY, blocking_user_ID INT, blocked_user_ID INT, block_reason VARCHAR(200))";
con.query(sql, function (err, result) {
    // Throws error if there is a problem
    if (err) throw err;
    console.log("Attempting to create blockedUsers table...");
});

// Creates the User Ratings Table
sql = "CREATE TABLE user_ratings (rating_ID INT AUTO_INCREMENT PRIMARY KEY, rating_user_ID INT, rated_user_ID INT, rating TINYINT)";
con.query(sql, function (err, result) {
    // Throws error if there is a problem
    if (err) throw err;
    console.log("Attempting to create userRatings table...");
    console.log(result);
});

var sql = "INSERT INTO members (username, homeAddress) VALUES ?";
var values = [
  ['John', 'Highway 71'],
  ['Peter', 'Lowstreet 4'],
  ['Amy', 'Apple st 652'],
  ['Hannah', 'Mountain 21'],
  ['Michael', 'Valley 345'],
  ['Sandy', 'Ocean blvd 2'],
  ['Betty', 'Green Grass 1'],
  ['Richard', 'Sky st 331'],
  ['Susan', 'One way 98'],
  ['Vicky', 'Yellow Garden 2'],
  ['Ben', 'Park Lane 38'],
  ['William', 'Central st 954'],
  ['Chuck', 'Main Road 989'],
  ['Viola', 'Sideway 1633']
];
con.query(sql, [values], function (err, result) {
    if (err) {
        // Callsback an error if an error occured
        console.log(err);
    }else{
        console.log("Number of records inserted: " + result.affectedRows);
        console.log("We Will now select these values from our table:");
    }
});


con.query("SELECT * FROM members", function (err, results, fields) {
    if (err) {
        // Callsback an error if an error occured
        console.log(err);
    }else{
        console.log("Selecting all member fields");
        if (DEBUG == true){
            console.log(fields);
        }
        console.log(results);
        console.log("Initialization script has reached the end. Database should be Initalized");
    }
});

// Closes the DB connection
con.end(function(err){
});

