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

 
// Drop Tables (MUST BE REVERSE ORDER OF Create STATEMENTS BELOW)
drop('Listing');
drop('CategoryType');
drop('Organization');
drop('SearchPrefs');
drop('SearchableInfo');
drop('Member');
drop('AgeGroupType');
drop('FamilyStatusType');
drop('GenderType');


// Create Tables (ORDER MATTERS FOR FK CONSTRAINTS)
// Creates Member related tables
create(
  'GenderType (' +
    'id INT AUTO_INCREMENT PRIMARY KEY,' +
    'name VARCHAR(20)' +
  ')'
);

// TODO: Update this table based on the docs
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

// TODO: Update this table based on the docs
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

// TODO: Update this table based on the docs
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

// Creates Organization related tables.
create(
  'Organization (' +
    'id INT AUTO_INCREMENT PRIMARY KEY,' +
    // Only verified organizations can make listings
    'verified BOOLEAN,' +
    // This is the public information made available for this organization.
    'name VARCHAR(100),' +
    'website VARCHAR(100),' +
    'phone VARCHAR(20),' +
    'email VARCHAR(100),' +
    'streetAddress VARCHAR (200),' +
    'postalCode VARCHAR(10),' +
    'incorporated BOOLEAN' +
    // TODO: Setup login with salted and hashed information
    // 'loginName VARCHAR(200),' +
    // 'loginPassword VARCHAR(1000),' +
  ')'
);

// Creates Listing related tables.
create(
  'CategoryType (' +
    'id INT AUTO_INCREMENT PRIMARY KEY, ' +
    'name VARCHAR(100), ' +
    'paymentRequired BOOLEAN ' +
  ')'
);

// TODO: Update this table based on the docs
insert('CategoryType(name, paymentRequired)', [
  ['Non-Profit', false],
  ['For-profit', true],
  ['Other', false],
]);

create(
  'Listing(' +
    'listingID INT AUTO_INCREMENT PRIMARY KEY,' +
    'approvalStatus BOOLEAN,' +
    // Public information
    'title VARCHAR(200),' +
    'website VARCHAR(100),' +
    'phone VARCHAR(20),' +
    'email VARCHAR(100),' +
    'description VARCHAR(10000),' +
    'imageURL VARCHAR(200),' +
    'categoryID INT,' +
    'organizationID INT,' +
    'FOREIGN KEY (categoryID) REFERENCES CategoryType(id),' +
    'FOREIGN KEY (organizationID) REFERENCES Organization(id)' +
  ')'
);


// Inserts example data for testing.
insert('Organization(verified, name, website, phone, email, streetAddress, postalCode, incorporated)', [
  [true,'Larry\'s Lizard Shack', 'larryzlizards.com', '250-555-1234', 'larry@larryzlizards.com', '1111 Alabama Way', 'V1X3P6', true],
  [true,'The Grass Assassins', 'grassassassins.com', '250-555-0987', 'contact@grassassassins.com', '1234 Montreal Road, Armstrong, BC', 'V1Z 9P6', true],
  [true,'Grass B Gone', 'grassbgone.ca', '413-555-1983', 'info@grassbgone.ca', 'Unit 400 1234 Apartment Street, Kelowna, BC, Canada', 'V1Z3PZ', false],
  [false,'Dog Walking CORP', 'legitdogwalkingcomapany.xyz', '250-555-1111', 'walking@dogCorp.xyz', 'PO BOX 11113, Montreal CANADA', 'T4Xu8x', true],
  [true,'BC Housing Assistance', 'housingassistance.gov.bc.ca', '250-555-1331', 'HousingAssistance@gov.bc.ca', '1234 Parliment Way, Ottowa, Canada, ', 'K1A 0A6', false],
]);

// Value Template
// [approvalStatus,'Title', 'Website', 'Phone', 'E-Mail', 'Description', 'imageURL', 'categoryID','organizationID'],
insert('Listing(approvalStatus, title, website, phone, email, description, imageURL, categoryID, organizationID)', [
  [true,'Larry\'s Lizard Rental Service', 'larryzlizards.com', '250-555-1234', 'larry@larryzlizards.com', 'Description', 'imageURL', 2,1],
  [true,'Grass Assassins Grass Cutting Service', 'grassassassins.com', '250-555-0987', 'contact@grassassassins.com', 'We will cut your grass for a fair and reasonable price, our specialty is cutting grass so quiet you would never hear it', 'NO IMAGE', 2,2],
  [true,'Grass B Gone Landscaping Service', 'grassbgone.ca', '413-555-1983', 'info@grassbgone.ca', 'Tired of watering the lawn every week? Tired of paying to get your lawn mowed? Contact us about our xeroscaping services, never water again!', '/image/testimage/test.jpg', 2,3],
  [true,'BC Housing - Housing Placement Service', 'placement.housingassistance.gov.bc.ca', '1-250-555-8000', 'HousingAssistance@gov.bc.ca', 'We\'ll help you find an afforable place to live', '/image/testimage/BCGOVLOGO.png', 1,5],
  [true,'BC Housing - Lease Assistance Service', 'leasehelp.housingassistance.gov.bc.ca', '1-250-555-8001', 'HousingAssistance@gov.bc.ca', 'We\'ll help you create, mange disputes, and understand lease agreements in BC', '/image/testimage/BCGOVLOGO.png', 1,5],
  [false,'Dog Walking - CHEAP', 'legitdogwalkingcomapany.xyz', '250-555-1111', 'walking@dogCorp.xyz', 'Will walk your dog for cheap, please pay via Monero Money Transfer', 'No Image', 3,2],

]);

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
