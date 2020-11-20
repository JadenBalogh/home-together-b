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

// Updated to match the requirements docs Nov 18th, 2020
insert('FamilyStatusType(name)', [
  ['Single'],
  ['Couple'],
  ['Couple with Children'],
  ['Single Parent'],
  ['Existing Group'],
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
    'memberId INT PRIMARY KEY,' +
    'genderId INT,' +
    'birthYear INT,' +
    'familyStatusId INT,' +
    'maxMonthlyBudget INT,' +
    'FOREIGN KEY (memberId) REFERENCES Member(id),' +
    'FOREIGN KEY (genderId) REFERENCES GenderType(id),' +
    'FOREIGN KEY (familyStatusId) REFERENCES FamilyStatusType(id)' +
  ')'
);

create(
  'miscSearchPrefs (' +
    'memberId INT PRIMARY KEY,' +
    'maxMonthlyBudget INT,' +
    'FOREIGN KEY (memberId) REFERENCES Member(id),' +
  ')'
);

create(
  'GenderSearchPrefs (' +
    'memberId INT PRIMARY KEY,' +
    'genderId BOOLEAN,' +
    'FOREIGN KEY (memberId) REFERENCES Member(id),' +
    'FOREIGN KEY (genderId) REFERENCES GenderType(id),' +
  ')'
);

create(
  'AgeSearchPrefs (' +
    'memberId INT PRIMARY KEY,' +
    'ageGroupId INT,' +
    'FOREIGN KEY (memberId) REFERENCES Member(id),' +
    'FOREIGN KEY (ageGroupId) REFERENCES AgeGroupType(id),' +
  ')'
);

create(
  'FamiltStatusSearchPrefs (' +
    'memberId INT PRIMARY KEY,' +
    'familyStatusId INT,' +
    'FOREIGN KEY (memberId) REFERENCES Member(id),' +
    'FOREIGN KEY (familyStatusId) REFERENCES FamilyStatusType(id),' +
  ')'
);

// Creates Organization related tables.
// Tables based on "registration questions oct 2020 UBCO"
create(
  'Organization (' +
    'id INT AUTO_INCREMENT PRIMARY KEY,' +
    //----- Information for Internal Verification Purposes -----
    // Only verified organizations can make listings
    'verified BOOLEAN,' +
    'registrationDate DATE,' +
    // If incorporated is true, include the other information, if not leave it null
    'incorporated BOOLEAN,' +
    'incorporatedName VARCHAR(300),' +
    'incorporatedOwners VARCHAR(300),' +
    'contactFirstName VARCHAR(300),' +
    'contactLastName VARCHAR(300),' +
    'contactPhone VARCHAR(300),' +
    // TODO: Setup login with salted and hashed information
    // 'loginName VARCHAR(200),' +
    // 'loginPassword VARCHAR(1000),' +
    
    //----- Publically Displayed Information (All have "organization" prefix) -----
    'organizationName VARCHAR(100),' +
    'organizationWebsite VARCHAR(100),' + // Website is not required
    'organizationLogoURL VARCHAR(100),' +
    'organizationMainPhone VARCHAR(20),' +
    'organizationAltPhone VARCHAR(20),' +
    'organizationEmail VARCHAR(100),' +
    // Address Information, Only postalCode is required
    'organizationStreetAddress VARCHAR (200),' +
    'organizationMailingAddress VARCHAR(200),' +
    'organizationPostalCode VARCHAR(10)' +
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

// Categories takes fron "Final Sub Category Ad Questions Oct 14"
insert('CategoryType(name, paymentRequired)', [
  // These listing categories require payment (paymentRequired == true)
  ['Rental', true],
  ['House & Yard Services', true],
  ['Legal & Sales', true],
  ['Classes, Clubs, and Events', true],
  // These listin' categories are free (paymentRequired == false)
  ['Cohousing, Co-ops, Intergenerational, and Planned Neighborhoods', false],
  ['Home Share Facilitation & Matching Services, and Planned Neighborhoods', false],
  ['Government & Non-Profit / Shared Living Supports and Services ', false],
  ['Members with Homes to Share', false],
]);

create(
  'Listing(' +
    'listingId INT AUTO_INCREMENT PRIMARY KEY,' +
    'approvalStatus BOOLEAN,' +
    // Public information
    'title VARCHAR(200),' +
    'website VARCHAR(100),' +
    'phone VARCHAR(20),' +
    'email VARCHAR(100),' +
    'description VARCHAR(10000),' +
    'imageURL VARCHAR(200),' +
    'categoryId INT,' +
    'organizationId INT,' +
    'FOREIGN KEY (categoryId) REFERENCES CategoryType(id),' +
    'FOREIGN KEY (organizationId) REFERENCES Organization(id)' +
  ')'
);


// Inserts example data for testing.
insert('Organization(verified, organizationName, registrationDate, organizationWebsite, organizationMainPhone, organizationEmail, organizationStreetAddress, organizationPostalCode, incorporated)', [
  [true,'Larry\'s Lizard Shack', '2010-10-1', 'larryzlizards.com', '250-555-1234', 'larry@larryzlizards.com', '1111 Alabama Way', 'V1X3P6', true],
  [true,'The Grass Assassins', '2014-7-29', 'grassassassins.com', '250-555-0987', 'contact@grassassassins.com', '1234 Montreal Road, Armstrong, BC', 'V1Z 9P6', true],
  [true,'Grass B Gone', '2018-3-6', 'grassbgone.ca', '413-555-1983', 'info@grassbgone.ca', 'Unit 400 1234 Apartment Street, Kelowna, BC, Canada', 'V1Z3PZ', false],
  [false,'Dog Walking CORP', '2020-7-20', 'legitdogwalkingcomapany.xyz', '250-555-1111', 'walking@dogCorp.xyz', 'PO BOX 11113, Montreal CANADA', 'T4Xu8x', true],
  [true,'BC Housing Assistance', '1957-01-15', 'housingassistance.gov.bc.ca', '250-555-1331', 'HousingAssistance@gov.bc.ca', '1234 Parliment Way, Ottowa, Canada, ', 'K1A 0A6', false],
]);

// Value Template
// [approvalStatus,'Title', 'Website', 'Phone', 'E-Mail', 'Description', 'imageURL', categoryId, organizationId],
insert('Listing(approvalStatus, title, website, phone, email, description, imageURL, categoryId, organizationId)', [
  [true,'Larry\'s Lizard Rental Service', 'larryzlizards.com', '250-555-1234', 'larry@larryzlizards.com', 'Description', 'imageURL', 2,1],
  [true,'Grass Assassins Grass Cutting Service', 'grassassassins.com', '250-555-0987', 'contact@grassassassins.com', 'We will cut your grass for a fair and reasonable price, our specialty is cutting grass so quiet you would never hear it', 'NO IMAGE', 2,2],
  [true,'Grass B Gone Landscaping Service', 'grassbgone.ca', '413-555-1983', 'info@grassbgone.ca', 'Tired of watering the lawn every week? Tired of paying to get your lawn mowed? Contact us about our xeroscaping services, never water again!', '/image/testimage/test.jpg', 2,3],
  [true,'BC Housing - Housing Placement Service', 'placement.housingassistance.gov.bc.ca', '1-250-555-8000', 'HousingAssistance@gov.bc.ca', 'We\'ll help you find an afforable place to live', '/image/testimage/BCGOVLOGO.png', 7,5],
  [true,'BC Housing - Lease Assistance Service', 'leasehelp.housingassistance.gov.bc.ca', '1-250-555-8001', 'HousingAssistance@gov.bc.ca', 'We\'ll help you create, mange disputes, and understand lease agreements in BC', '/image/testimage/BCGOVLOGO.png', 7,5],
  [false,'Dog Walking - CHEAP', 'legitdogwalkingcomapany.xyz', '250-555-1111', 'walking@dogCorp.xyz', 'Will walk your dog for cheap, please pay via Monero Money Transfer', 'No Image', 3,2],

]);

insert('Member(firstName, lastName)', [
  ['Jim', 'Bam'],
  ['John', 'Smith'],
  ['Peter', 'Daniels'],
  ['Amy', 'Shu'],
  ['Hannah', 'Montana'],
]);

//TODO: Insert new sample data based on the new search preferences table.

insert('SearchableInfo(memberId, genderId, birthYear, familyStatusId, maxMonthlyBudget)', [
  [1, 1, 1997, 2, 1100],
  [2, 1, 1954, 2, 1200],
  [3, 2, 1984, 2, 1300],
  [4, 2, 1988, 2, 1400],
  [5, 3, 2001, 2, 1500],
]);

// Close the DB connection
con.end();
