// Imports
import mysql from 'mysql2';
// This is required to read from the .env.local file
import localenv from 'localenv';

var con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

function printQuery(err, results) {
  if (err) {
    console.log(err);
  } else {
    console.log(results);
  }
}

function drop(table) {
  var sql = 'DROP TABLE IF EXISTS ' + table;
  con.query(sql, (err, results) => printQuery(err, results));
}

function create(table) {
  var sql = 'CREATE TABLE ' + table;
  con.query(sql, (err, results) => printQuery(err, results));
}

function insert(table, values) {
  var sql = 'INSERT INTO ' + table + ' VALUES ?';
  con.query(sql, [values], (err, results) => printQuery(err, results));
}

// Drop Tables
drop('Member');
drop('SearchableInfo');
drop('SearchPrefs');
drop('GenderType');
drop('FamilyStatusType');
drop('AgeGroupType');

// Create Tables
create(
  'GenderType (' +
    'id INT AUTO_INCREMENT PRIMARY KEY,' +
    'name VARCHAR(20)' +
  ')'
);
create(
  'FamilyStatusType (' +
    'id INT AUTO_INCREMENT PRIMARY KEY,' +
    'name VARCHAR(20)' +
  ')'
);
create(
  'AgeGroupType (' +
    'id INT AUTO_INCREMENT PRIMARY KEY, ' +
    'name VARCHAR(20), ' +
    'minAge INT, ' +
    'maxAge INT' +
  ')'
);
create(
  'Member (' +
    'id INT AUTO_INCREMENT PRIMARY KEY,' +
    'firstName VARCHAR(50),' +
    'lastName VARCHAR(50)' +
  ')'
);
create(
  'SearchableInfo (' +
    'memberID INT PRIMARY KEY,' +
    'genderID INT,' +
    'birthYear INT,' +
    'familyStatusID INT,' +
    'maxMonthlyBudget INT,' +
    'FOREIGN KEY (memberID) REFERENCES Member(id),' +
    'FOREIGN KEY (genderID) REFERENCES GenderType(id),' +
    'FOREIGN KEY (familyStatusID) REFERENCES FamilyStatusType(id)' +
  ')'
);
create(
  'SearchPrefs (' +
    'memberID INT PRIMARY KEY,' +
    'genderID INT,' +
    'ageGroupID INT,' +
    'familyStatusID INT,' +
    'maxMonthlyBudget INT,' +
    'FOREIGN KEY (memberID) REFERENCES Member(id),' +
    'FOREIGN KEY (genderID) REFERENCES GenderType(id),' +
    'FOREIGN KEY (ageGroupID) REFERENCES AgeGroupType(id),' +
    'FOREIGN KEY (familyStatusID) REFERENCES FamilyStatusType(id)' +
  ')'
);

// Insert into Tables
insert('Member(firstName, lastName)', [
  ['Jim', 'Bam'],
]);
insert('Member(firstName, lastName)', [
  ['John', 'Smith'],
  ['Peter', 'Daniels'],
  ['Amy', 'Shu'],
  ['Hannah', 'Montana'],
  ['Michael', 'Jackson'],
  ['Sandy', 'Blumann'],
  ['Betty', 'Greengrass'],
  ['Richard', 'Sky'],
  ['Susan', 'Oneway'],
  ['Vicky', 'Yellowgarden'],
  ['Ben', 'Parklane'],
  ['William', 'Central'],
  ['Chuck', 'Roads'],
  ['Viola', 'Sideway'],
]);

// Close the DB connection
con.end();
