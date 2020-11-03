// This is based on https://www.w3schools.com/nodejs/nodejs_mysql_create_table.asp

// Required because our package.json is defined as a module 
// see: https://nodejs.org/api/modules.html#modules_module_createrequire_filename
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

var mysql = require('mysql2');

// Creates the Connection based on the input parameters using the DB we created earlier
// This DB should be setup seperate from this code on the local hosting machine.
var con = mysql.createConnection({
    host: "localhost",
    user: "notAdmin",
    password: "notAdmin99!!",
    database: "HTDB"
});

// Drops all the existing instances of the tables
// This requires the user to have DROP permissions on the database, so we are signing in with our DB Admin credentials we setup in the inital installation
// ----------- START TABLE DROPPING SECTION --------------
con.connect(function (err) {
    if (err) throw err;
    var sql = "DROP TABLE IF EXISTS members";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
});
con.connect(function (err) {
    if (err) throw err;
    var sql = "DROP TABLE IF EXISTS email_log";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
});

con.connect(function (err) {
    if (err) throw err;
    var sql = "DROP TABLE IF EXISTS bookmarks";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
});

con.connect(function (err) {
    if (err) throw err;
    var sql = "DROP TABLE IF EXISTS blocked_users";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
});

con.connect(function (err) {
    if (err) throw err;
    var sql = "DROP TABLE IF EXISTS user_ratings";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
});
// ----------- END TABLE DROPPING SECTION --------------


// Creates the members table
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    // BOOLEAN is equivalent to TINYINT(1). TRUE = 1, FALSE = 0
    var sql = "CREATE TABLE members (user_ID INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(100), first_name VARCHAR(100), last_name VARCHAR(100), birth_year TINYINT, password VARCHAR(100), email VARCHAR(100), home_address VARCHAR(250), mailing_address VARCHAR(250), phone VARCHAR(20), age_group VARCHAR(50), family_size TINYINT, kids BOOLEAN, budget INT, purchase_home BOOLEAN, share_home BOOLEAN, pets BOOLEAN, pet_string VARCHAR(255), smoke BOOLEAN, smoke_string VARCHAR(255), mobility BOOLEAN, mobility_string VARCHAR(255), allergies BOOLEAN, allergies_string VARCHAR(255), employment_status VARCHAR(100), profile_picture_link VARCHAR(255), account_active BOOLEAN, account_average_rating FLOAT, account_verified BOOLEAN, admin_notes VARCHAR(2000), banned BOOLEAN, banned_reason VARCHAR(1000))";
    con.query(sql, function (err, result) {
        // Throws error if there is a problem
        if (err) throw err;
        console.log("Customer Table Created Successfully");
    });
});

// Creates the E-Mail Log table
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE email_log (email_ID INT AUTO_INCREMENT PRIMARY KEY, status TINYINT, email VARCHAR(100), recipient INT, content VARCHAR(500))";
    con.query(sql, function (err, result) {
        // Throws error if there is a problem
        if (err) throw err;
        console.log("E-Mail Log Table Created Successfully");
    });
});

// Creates the Bookmarks Table
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE bookmarks (bookmark_ID INT AUTO_INCREMENT PRIMARY KEY, bookmarker_ID INT, bookmark VARCHAR(200))";
    con.query(sql, function (err, result) {
        // Throws error if there is a problem
        if (err) throw err;
        console.log("Bookmarks Table Created Successfully");
    });
});

// Creates the Blocked Users table
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE blocked_users (block_ID INT AUTO_INCREMENT PRIMARY KEY, blocking_user_ID INT, blocked_user_ID INT, block_reason VARCHAR(200))";
    con.query(sql, function (err, result) {
        // Throws error if there is a problem
        if (err) throw err;
        console.log("Blocked User Table Created Successfully");
    });
});

// Creates the User Ratings Table
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE user_ratings (rating_ID INT AUTO_INCREMENT PRIMARY KEY, rating_user_ID INT, rated_user_ID INT, rating TINYINT)";
    con.query(sql, function (err, result) {
        // Throws error if there is a problem
        if (err) throw err;
        console.log("User Ratings Table Created Successfully");
    });
});