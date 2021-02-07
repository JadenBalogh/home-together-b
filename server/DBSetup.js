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

function simpleSelect(entry, table) {
  var sql = 'SELECT ' + entry + ' FROM ' + table;
  con.query(sql, (err, results) => printQuery(err, results));
}

// ══════ Current DATABASE TODOs ══════
// Determine if the mailing address should be NULL if none is provided or "same as home address".

// If the member says yes to "hasHousing, should there be an optional reference to a listing?
// If a user picks yes should they be required to make a listing?

// Should there be any restriction on the text box on their account? Will it be moderated (potential source of SPAM/unwanted advertisement).

// Define a score range for the Review ratings range for this, 1-10? 1-5? 1-100?. (Will also need to update Insert command)

// Categories need to be updated with subcategories as per Jan 13th update, will be brought up at Feb 2nd meeting. How do we want to handle these? Changing it will
// break the current search functionality.

// Out of scope for this project but filtering the URLs server side will be required for security, may want to storing images on the server and only storing a reference.
// Do we also want to use this method? We could create a DB that stores just images that's tied to a listing ID.

// Drop Tables (MUST BE REVERSE ORDER OF Create STATEMENTS BELOW)
drop('Listing');
drop('CategoryType');
drop('OrganizationReview');
drop('Organization');
drop('Admin');
drop('MiscSearchPrefs');
drop('GenderSearchPrefs');
drop('AgeSearchPrefs');
drop('FamilyStatusSearchPrefs');
drop('MemberReview');
drop('SearchableInfo');
drop('Member');
drop('AgeGroupType');
drop('FamilyStatusType');
drop('GenderType');

// ╔═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
// ║ Tables always start with a capital letter and any additional words are also capitalized.                                            ║ 
// ║ There are no spaces or special characters in table names. (upper camel case aka Pascal case) E.G: TableName                         ║ 
// ║ Columns always start with a lower case letter and any additional words are capitalized. (lower camel case) E.G: columnNameGoesHere  ║ 
// ╚═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝

// Create Tables (ORDER MATTERS FOR FK CONSTRAINTS)
// ----- Member Related Tables -----
create(
  'GenderType (' +
    'id INT AUTO_INCREMENT PRIMARY KEY,' +
    'name VARCHAR(20)' +
  ')'
);

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

// Holds the key information of a member, None of this information should be shared with other Members.
create(
  'Member (' +
    'id INT AUTO_INCREMENT PRIMARY KEY,' +
    'firstName VARCHAR(50),' +
    'lastName VARCHAR(50),' +
    'homeAddress VARCHAR(255),' +
    'mailAddress VARCHAR(255),' + 
    // Used for account management of the Member.
    'phoneNumber VARCHAR(20),' +
    'email VARCHAR(255),' +
    'username VARCHAR(50),' +
    'password VARCHAR(255)' +
  ')'
);

// Searchable infomation is the information other members can use to filter members.
create(
  'SearchableInfo (' +
    'memberId INT PRIMARY KEY,' +
    'genderId INT,' + // References the genderType table.
    'birthYear INT,' + // Used to calculate age.
    'familyStatusId INT,' +
    'maxMonthlyBudget INT,' +
    // Does the member allow/want pets?
    'petRestrictions BOOLEAN,' +
    'petRestrictionsText VARCHAR(255),' +
    // Does the Member have any health or mobility issues (E.G: Required wheelchair access, has a CPAP Machine)
    'healthRestrictions BOOLEAN,' +
    'healthRestrictionsText VARCHAR(255),' +
    // Is Religion important to the Member?
    'religionRestrictions BOOLEAN,' +
    'religionRestrictionsText VARCHAR(255),' +
    // Is the Member ok with smoking (Tobacco, Marijuana, Other?)
    'smokingRestrictions BOOLEAN,' +
    'smokingRestrictionsText VARCHAR(255),' +
    // Are dietary restrictions important to the member (Vegan/Halal/Fasting Restrictions)?
    'dietRestrictions BOOLEAN,' +
    'dietRestrictionsText VARCHAR(255),' +
    // Does the member have any allergies?
    'allergies BOOLEAN,' +
    'allergiesText VARCHAR(255),' +
    // Does the member have a place to live or are they looking for a place.
    'hasHousing BOOLEAN,' +
    'housingDescription VARCHAR(255),' +
    'profileText VARCHAR(1024),' +
    'FOREIGN KEY (memberId) REFERENCES Member(id),' +
    'FOREIGN KEY (genderId) REFERENCES GenderType(id),' +
    'FOREIGN KEY (familyStatusId) REFERENCES FamilyStatusType(id)' +
  ')'
);

// Holds each customer review, uses Foreign key to tie to member.
create(
  'MemberReview (' +
    'id INT AUTO_INCREMENT PRIMARY KEY,' +
    'memberId INT,' +
    'reviewScore INT,' +
    'reviewText VARCHAR (2000),' +
    // Only display if this is set to true, if this is set to false when a review moderator pulls up the moderation queue grab this.
    'moderationApproved BOOLEAN,' +
    'FOREIGN KEY (memberId) REFERENCES Member(id)' +
  ')'
);

create(
  'MiscSearchPrefs (' +
    'id INT AUTO_INCREMENT PRIMARY KEY, ' +
    'memberId INT,' +
    'maxMonthlyBudget INT,' +
    'FOREIGN KEY (memberId) REFERENCES Member(id)' +
  ')'
);

// Gender, Age, Family Status tables all use composite primary keys as they are non-entity tables representing many to many relationships
// The table works under the assumption that an entry means that the user wants to see that group, we could add a seprate "preference BOOLEAN" if we want to store true AND false
create(
  'GenderSearchPrefs (' +
    'memberId INT,' +
    'genderId INT,' +
    'PRIMARY KEY (memberId, genderId),' +
    'FOREIGN KEY (memberId) REFERENCES Member(id),' +
    'FOREIGN KEY (genderId) REFERENCES GenderType(id)' +
  ')'
);

create(
  'AgeSearchPrefs (' +
    'memberId INT,' +
    'ageGroupId INT,' +
    'PRIMARY KEY (memberId, ageGroupId),' +
    'FOREIGN KEY (memberId) REFERENCES Member(id),' +
    'FOREIGN KEY (ageGroupId) REFERENCES AgeGroupType(id)' +
  ')'
);

create(
  'FamilyStatusSearchPrefs (' +
    'memberId INT,' +
    'familyStatusId INT,' +
    'PRIMARY KEY (memberId, familyStatusId),' +
    'FOREIGN KEY (memberId) REFERENCES Member(id),' +
    'FOREIGN KEY (familyStatusId) REFERENCES FamilyStatusType(id)' +
  ')'
);

// ----- Tables related to the Administration of the site -----
create(
  'Admin (' +
    'id INT AUTO_INCREMENT PRIMARY KEY,' +
    'username VARCHAR(50),' +
    'password VARCHAR(255),' +
    // Has access to edit, remove, or delete reviews.
    'reviewModerator BOOLEAN,' + 
    // Has access to verify member information, 
    'memberModerator BOOLEAN,' +
    // Has access to verify organzation information.
    'organizationModerator BOOLEAN,' +
    // Has access to view messages between members, can block & Ban members.
    'messageModerator BOOLEAN,' + 
    // Has access to all the above (Just set to TRUE for all of them) and can also view other moderator actions / review them.
    'seniorModerator BOOLEAN,' + 
    // Head site administrator (Sys-OP) has full access to the system and can also export data. 
    'sysop BOOLEAN' + 
  ')'
);


// ----- Tables related to Organizations / Business Accounts -----
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
    'username VARCHAR(200),' +
    'password VARCHAR(1000),' +
    
    //----- Publically Displayed Information (All have "organization" prefix) -----
    'organizationName VARCHAR(100),' +
    'organizationWebsite VARCHAR(100),' + // Website is not required
    'organizationLogoURL VARCHAR(100),' + // May be internally hosted
    'organizationMainPhone VARCHAR(20),' +
    'organizationAltPhone VARCHAR(20),' +
    'organizationEmail VARCHAR(100),' +
    // The "national" flag is only to be used with Home Sharing organizations and will cause them to show up in all reasons, it has no other purpose.
    'national BOOLEAN,' +
    // Address Information, Only postal-code is required
    'organizationStreetAddress VARCHAR (200),' +
    'organizationMailingAddress VARCHAR(200),' +
    'organizationPostalCode VARCHAR(30)' +
  ')'
);

create(
  'OrganizationReview (' +
    'id INT AUTO_INCREMENT PRIMARY KEY, ' +
    'name VARCHAR(100), ' +
    'paymentRequired BOOLEAN ' +
  ')'
);

// ----- Creates Listing related tables. -----
create(
  'CategoryType (' +
    'id INT AUTO_INCREMENT PRIMARY KEY, ' +
    'name VARCHAR(100), ' +
    'paymentRequired BOOLEAN ' +
  ')'
);


insert('CategoryType(name, paymentRequired)', [
  // These listing categories require payment (paymentRequired == true)
  ['Rental', true],
  ['House & Yard Services', true],
  ['Individual & Group Services', true],
  ['Legal, Sales & Insurance Agencies', true],
  ['Classes, Clubs & Events', true],

  // These listin' categories are free (paymentRequired == false)
  ['Shared & Community Living Initiatives', false],
  ['Sharing Facilitation, Matching & Educational Services', false],
  ['Governmental Supports & Services', false],
  ['Member Shared Homes', false],
  ['Member Holiday Home Swap', false],
]);


create(
  'Listing(' +
    'id INT AUTO_INCREMENT PRIMARY KEY,' +
    'approvalStatus BOOLEAN,' +
    // Public information
    'creationDate DATE,' +
    'title VARCHAR(200),' +
    'website VARCHAR(100),' +
    'phone VARCHAR(20),' +
    'email VARCHAR(100),' +
    // Start and end date, Important for Classes / Vacation Listings
    'startDate DATE,' +
    'endDate DATE,' +
    'description VARCHAR(10000),' +
    // Plural, expects comma delimited lists of images eg: "https://imgbox.com/asd123a.png, https://dogdoggroomingcompany.org/imgbest.jpg"
    // As the client expents most listings to have at least 6 photos minimum this allows an n number of images to be stored without having 
    // to create an additional table and row for each image reference. 
    
    'imageURLs VARCHAR(200),' +
    'categoryId INT,' +
    'subCategoryId INT,' +
    'organizationId INT,' +
    'FOREIGN KEY (categoryId) REFERENCES CategoryType(id),' +
    'FOREIGN KEY (organizationId) REFERENCES Organization(id)' +
  ')'
);


// ╔═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
// ║ This is the example data that is insert into the DB for testing reasons, none of it is legitimate.                                   ║ 
// ╚═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝

insert('Organization(verified, organizationName, registrationDate, organizationWebsite, organizationMainPhone, organizationEmail, organizationStreetAddress, organizationPostalCode, incorporated)', [
  [true,'Larry\'s Lizard Shack', '2010-10-1', 'larryzlizards.com', '250-555-1234', 'larry@larryzlizards.com', '1111 Alabama Way', 'V1X3P6', true],
  [true,'The Grass Assassins', '2014-7-29', 'grassassassins.com', '250-555-0987', 'contact@grassassassins.com', '1234 Montreal Road, Armstrong, BC', 'V1Z 9P6', true],
  [true,'Grass B Gone', '2018-3-6', 'grassbgone.ca', '413-555-1983', 'info@grassbgone.ca', 'Unit 400 1234 Apartment Street, Kelowna, BC, Canada', 'V1Z3PZ', false],
  [false,'Dog Walking CORP', '2020-7-20', 'legitdogwalkingcomapany.xyz', '250-555-1111', 'walking@dogCorp.xyz', 'PO BOX 11113, Montreal CANADA', 'T4Xu8x', true],
  [true,'BC Housing Assistance', '1957-1-15', 'housingassistance.gov.bc.ca', '250-555-1331', 'HousingAssistance@gov.bc.ca', '1234 Parliment Way, Ottowa, Canada, ', 'K1A 0A6', false],
  [true,'SUPER_MEGA_ORGINIZATION', '1900-1-1', 'E-MAIL', 'PHONE', 'E-MAIL', 'ADDRESS', 'POSTAL_CODE', true],
]);

// Value Template
// [approvalStatus,'Title', 'Website', 'Phone', 'E-Mail', 'Description', 'imageURL', categoryId, organizationId],
// insert('Listing(approvalStatus, title, website, phone, email, description, imageURL, categoryId, organizationId)', [
//   [true,'Suzanne\'s Rentals', 'No Website', '250-555-8001', 'Suzzanne@Gmail.test', 'I\'m looking to rent out rooms in my apartment. Cost is $600 a month for a 1 bedroom or $900.00 a month for a 2 Bedroom.', 'NO IMAGE', 1,6],
//   [true,'Larry\'s Lizard Rental Service', 'larryzlizards.com', '250-555-1234', 'larry@larryzlizards.com', 'Description', 'imageURL', 2,1],
//   [true,'Grass Assassins Grass Cutting Service', 'grassassassins.com', '250-555-0987', 'contact@grassassassins.com', 'We will cut your grass for a fair and reasonable price, our specialty is cutting grass so quiet you would never hear it', 'NO IMAGE', 2,2],
//   [true,'Grass B Gone Landscaping Service', 'grassbgone.ca', '413-555-1983', 'info@grassbgone.ca', 'Tired of watering the lawn every week? Tired of paying to get your lawn mowed? Contact us about our xeroscaping services, never water again!', '/image/testimage/test.jpg', 2,3],
//   [false,'Dog Walking - CHEAP', 'legitdogwalkingcomapany.xyz', '250-555-1111', 'walking@dogCorp.xyz', 'Will walk your dog for cheap, please pay via Monero Money Transfer', 'No Image', 3,4],
//   [true,'Bob\s Insurance', 'BobInsuranceco.co', '250-555-3021', 'RequestAQuote@Bobinsuranceco.co', 'Worried about your dog burning down the kitchen while you\re away? Have a look at our new fire insurance polices today. We\'re number one in the region for a reason!', '/image/testimage/BCGOVLOGO.png', 4,6],
//   [true,'YogiBear Yoga', 'Yogibear.com', '250-555-1101', 'Contact@YogiBear.com', 'Come on down to our Yoga studio, your first class is free with 0 obligation to join!', 'NO IMAGE', 5,6],
//   [true,'Dagwood Senior\'s Community', 'No Website', '250-555-2301', 'DagwoodCommunity@gmail.test', 'Come join us for a free seminar about our community living initative, tea and snacks will be provided! Dagwood Senior Center is home to the Dagwood ride-sharing and community assistance club, contact us for details!', '/image/testimage/BCGOVLOGO.png', 6,6],
//   [true,'YMCA Healthy Living Initiative', 'ymca.ca', '250-555-3001', 'HealthyLiving@ymca.ca', 'Come join us for our new living alone seminar, where we\'ll cover budgeting, cooking at home, common household maintenance and repairs, and much more!', 'NO IMAGE', 7,6],
//   [true,'BC Housing - Housing Placement Service', 'placement.housingassistance.gov.bc.ca', '250-555-8000', 'HousingAssistance@gov.bc.ca', 'We\'ll help you find an afforable place to live', '/image/testimage/BCGOVLOGO.png', 8,5],
//   [true,'BC Housing - Lease Assistance Service', 'leasehelp.housingassistance.gov.bc.ca', '250-555-8001', 'HousingAssistance@gov.bc.ca', 'We\'ll help you create, mange disputes, and understand lease agreements in BC', '/image/testimage/BCGOVLOGO.png', 8,5],
//   [true,'Jeff', 'No Website', '250-555-8001', 'No E-Mail', '70+ Year old Male, looking for assistance around the house in exchange for a free room. Utilities extra.', 'NO IMAGE', 9,6],

// ]);

// insert('MemberReview(memberId, reviewScore, reviewText, moderationApproved)', [
//   [1, 0, "Good", true],
//   [2, 1, "I didn't like the person", true],
//   [1, 2, "They smelled funny", false],
//   [4, 1, "Why can we review people?", false],
//   [3, 0, "Not bad", true],
//   [5, 5, "We ended up getting married, I guess I have to give them 5/5", true],
// ]);

// // Will be inserting 50 users
// insert('Member(firstName, lastName)', [
//   ['Jim', 'Bam'],
//   ['John', 'Smith'],
//   ['Peter', 'Daniels'],
//   ['Amy', 'Shu'],
//   ['Hannah', 'Montana'],
//   ['Trom', 'Tromson'],
//   ['John', 'Exlom'],
//   ['Peter', 'Dinklage'],
//   ['Tom', 'Shu'],
//   ['Rachel', 'Mosley'],
//   ['Finley', 'Bam'],
//   ['Gunnar', 'Smith'],
//   ['Courtney', 'Daniels'],
//   ['Allan', 'Shu'],
//   ['Henry', 'Perez'],
//   ['Kenneth', 'Heb'],
//   ['Ken', 'Smith'],
//   ['Ryan', 'Daniels'],
//   ['Trinity', 'Shu'],
//   ['Ariel', 'Hendricks'],
//   ['Devin', 'Herbert'],
//   ['Reid', 'Smith'],
//   ['Peter', 'Daniels'],
//   ['Elexi', 'New'],
//   ['Sam', 'Kellogs'],
//   ['Jim', 'Norton'],
//   ['John', 'Alexander'],
//   ['Peter', 'Richardson'],
//   ['Amy', 'Manfield'],
//   ['Tomo', 'M'],
//   ['Jim', 'Bam'],
//   ['Nori', 'S'],
//   ['Chester', 'Daniels'],
//   ['Arnold', 'Shu'],
//   ['Louise', 'Ayers'],
//   ['Mike', 'Bamfield'],
//   ['Richard', 'Smith'],
//   ['Peter', 'Testing'],
//   ['Anna', 'Banana'],
//   ['Sarah', 'Linfield'],
//   ['Jim', 'Bean'],
//   ['Nitin', 'Nitin'],
//   ['Markucs', 'Danields'],
//   ['Amy', 'Johnston'],
//   ['Rachel', 'Ernack'],
//   ['Oceann', 'Jean'],
//   ['John', 'Dataset'],
//   ['Marc', 'Blacksmith'],
//   ['Jaydah', 'Sheffield'],
//   ['Tommy', 'Bahama'],
// ]);

// // Misc, Gender, Age, Family
// insert('MiscSearchPrefs(memberId, maxMonthlyBudget)', [
//   [1, 600],
//   [2, 1800],
//   [3, 1000],
//   [4, 2200],
//   [5, 900],
//   [6, 600],
//   [7, 800],
//   [8, 1000],
//   [9, 300],
//   [10, 900],
//   [11, 800],
//   [12, 800],
//   [13, 1000],
//   [14, 1400],
//   [15, 900],
//   [16, 600],
//   [17, 800],
//   [18, 1000],
//   [19, 400],
//   [20, 1900],
//   [21, 600],
//   [22, 700],
//   [23, 1000],
//   [24, 400],
//   [25, 900],
//   [26, 600],
//   [27, 800],
//   [28, 1000],
//   [29, 400],
//   [30, 1900],
//   [31, 600],
//   [32, 300],
//   [33, 1000],
//   [34, 400],
//   [35, 900],
//   [36, 600],
//   [37, 800],
//   [38, 1000],
//   [39, 400],
//   [40, 900],
//   [41, 100],
//   [42, 800],
//   [43, 1000],
//   [44, 400],
//   [45, 900],
//   [46, 1600],
//   [47, 700],
//   [48, 1000],
//   [49, 300],
//   [50, 900],
// ]);


// insert('GenderSearchPrefs(memberId, genderId)', [
//   [1, 1],
//   [1, 2],
//   [1, 3],
//   [2, 1],
//   [2, 3],
//   [3, 2],
//   [5, 2],
// ]);

// insert('AgeSearchPrefs(memberId, ageGroupId)', [
//   [1, 1],
//   [1, 4],
//   [1, 3],
//   [2, 1],
//   [2, 3],
//   [3, 4],
//   [5, 5],
//   [2, 2],
// ]);

// insert('FamilyStatusSearchPrefs(memberId, familyStatusId)', [
//   [1, 1],
//   [2, 3],
//   [3, 3],
//   [4, 2],
//   [5, 3],
//   [1, 4],
//   [3, 5],
//   [5, 5],

// ]);

// insert('SearchableInfo(memberId, genderId, birthYear, familyStatusId, maxMonthlyBudget)', [
//   [1, 1, 1993, 5, 600],
//   [2, 1, 2003, 1, 1800],
//   [3, 2, 2004, 2, 1000],
//   [4, 2, 1990, 2, 2200],
//   [5, 2, 1942, 1, 900],
//   [6, 3, 1955, 1, 600],
//   [7, 1, 1990, 1, 800],
//   [8, 1, 2003, 2, 1000],
//   [9, 2, 1958, 1, 300],
//   [10, 2, 1958, 1, 900],
//   [11, 3, 1985, 1, 800],
//   [12, 1, 1998, 3, 800],
//   [13, 2, 2000, 5, 1000],
//   [14, 1, 1994, 1, 1400],
//   [15, 1, 1999, 2, 900],
//   [16, 1, 1994, 1, 600],
//   [17, 1, 1996, 3, 800],
//   [18, 2, 1900, 5, 1000],
//   [19, 3, 1942, 5, 400],
//   [20, 2, 1943, 5, 1900],
//   [21, 1, 1995, 1, 600],
//   [22, 1, 1974, 2, 700],
//   [23, 1, 1984, 1, 2000],
//   [24, 1, 1982, 1, 400],
//   [25, 1, 1981, 3, 900],
//   [26, 3, 1980, 1, 600],
//   [27, 1, 1932, 1, 800],
//   [28, 1, 1974, 1, 1000],
//   [29, 2, 1987, 1, 400],
//   [30, 2, 1932, 1, 1900],
//   [31, 1, 1989, 1, 600],
//   [32, 3, 1986, 1, 300],
//   [33, 2, 1913, 1, 1000],
//   [34, 1, 1944, 1, 400],
//   [35, 1, 1998, 2, 900],
//   [36, 1, 2006, 4, 600],
//   [37, 1, 2002, 4, 800],
//   [38, 2, 2010, 1, 1000],
//   [39, 2, 2019, 1, 400],
//   [40, 1, 2020, 1, 900],
//   [41, 1, 2011, 1, 100],
//   [42, 2, 2005, 1, 800],
//   [43, 1, 2001, 4, 1000],
//   [44, 2, 2003, 4, 400],
//   [45, 2, 2004, 1, 900],
//   [46, 2, 1978, 3, 1600],
//   [47, 1, 1977, 2, 700],
//   [48, 1, 1983, 4, 1000],
//   [49, 2, 1998, 2, 300],
//   [50, 3, 1999, 1, 900],
// ]);

// simpleSelect('*', 'genderSearchPrefs');

// Close the DB connection
con.end();
