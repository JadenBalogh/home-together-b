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

// Gets the members age by subtracting their birth year from the current year e.g: 2020 - 2000 = 20 (Member is 20 years old)
// function getAge(memberID) {
//   var age = new Date().getFullYear() - con.query("SELECT birthYear FROM SearchableInfo WHERE memberID=" + memberID);
//   console.log("Member's age is: " + age);
//   return age
//  }
 
//  function getMemberIds() {
//    var ids = new Date().getFullYear() - con.query("SELECT id FROM member");
//    console.log("Member IDs:" + ids);
//    return ids
//   }


 
// Drop Tables (MUST BE REVERSE ORDER OF Create STATEMENTS BELOW)
drop('SearchPrefs');
drop('SearchableInfo');
drop('Member');
drop('AgeGroupType');
drop('FamilyStatusType');
drop('GenderType');

// Create Tables (ORDER MATTERS FOR FK CONSTRAINTS)
create(
  'GenderType (' +
    'id INT AUTO_INCREMENT PRIMARY KEY,' +
    'name VARCHAR(20)' +
  ')'
);
// Inserts a set of default values into the gender table
insert('GenderType(name)', [
  ['Male'],
  ['Female'],
  ['Other'],
]);

create(
  'FamilyStatusType (' +
    'id INT AUTO_INCREMENT PRIMARY KEY,' +
    'name VARCHAR(20)' +
  ')'
);

insert('FamilyStatusType(name)', [
  ['Single'],
  ['Married'],
  ['Divorced'],
]);

create(
  'AgeGroupType (' +
    'id INT AUTO_INCREMENT PRIMARY KEY, ' +
    'name VARCHAR(20), ' +
    'minAge INT, ' +
    'maxAge INT' +
  ')'
);

insert('AgeGroupType(name, minAge, maxAge)', [
  ['Baby', 0, 3],
  ['Child', 4, 12],
  ['Teen', 13, 18],
  ['Young Adult', 19, 24],
  ['Adult', 25, 64],
  ['Senior', 65, 120],
]);

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

insert('Member(firstName, lastName)', [
  ['Jim', 'Bam'],
  ['John', 'Smith'],
  ['Peter', 'Daniels'],
  ['Amy', 'Shu'],
  ['Hannah', 'Montana'],
]);

// The way the DB is setup we currently can only have 1 age group/Family Status/Gender preference (e.g Only Male Roommates) 
// We may need to refactor to allow for more flexible searching
insert('SearchPrefs(memberID, genderID, ageGroupID, familyStatusID, maxMonthlyBudget)', [
  [1, 1, 5, 2, 1100],
  [2, 1, 6, 2, 1200],
  [3, 2, 3, 2, 1300],
  [4, 2, 4, 2, 1400],
  [5, 3, 4, 2, 1500],
]);

insert('SearchableInfo(memberID, genderID, birthYear, familyStatusID, maxMonthlyBudget)', [
  [1, 1, 1997, 2, 1100],
  [2, 1, 1954, 2, 1200],
  [3, 2, 1984, 2, 1300],
  [4, 2, 1988, 2, 1400],
  [5, 3, 2001, 2, 1500],
]);

// Close the DB connection
con.end();
