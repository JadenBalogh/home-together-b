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
drop('ListingReview')
drop('Listing');
drop('CategoryType');
drop('OrganizationReview');
drop('Organization');
drop('Admin');
drop('LocationPreference');
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
    'minMonthlyBudget INT,' +
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
    // Number of people the member is willing to live with
    'minHomeCapacity INT,' +
    'maxHomeCapacity INT,' +
    // Account Text Profile?
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

create(
  'LocationPreference (' +
    'memberId INT,' +
    'locationId INT,' +
    'PRIMARY KEY (memberId, locationId),' +
    'FOREIGN KEY (memberId) REFERENCES Member(id),' +
    'FOREIGN KEY (locationId) REFERENCES Location(id)' +
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
    'contactEmail VARCHAR(100),' +
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
    'parentId INT, ' +
    'name VARCHAR(100), ' +
    'paymentRequired BOOLEAN, ' +
    'FOREIGN KEY (parentId) REFERENCES CategoryType(id)' +
  ')'
);

// Parent categories
insert('CategoryType(parentId, name, paymentRequired)', [
  [null, 'Rentals', true],
  [null, 'House & Yard Services', true],
  [null, 'Legal & Sales', true],
  [null, 'Classes, Clubs & Events', true],
  [null, 'Cohousing, Co-ops, Intergenerational, Planned Neighborhoods', false],
  [null, 'Home Share Facilitation & Supporting Services', false],
  [null, 'Home Sharing Businesses, Groups and Organizations', false],
  [null, 'Government & Human Service Agencies offering Shared Living', false],
  [null, 'Information & Services', false],
  [null, 'Members with Homes to Share', false],
]);

// Subcategories
insert('CategoryType(parentId, name, paymentRequired)', [
  [4, 'House', true],
  [4, 'Partial House / Suite Up or Down', true],
  [4, 'Duplex / Triplex', true],
  [4, 'Apartment', true],
  [4, 'Condo / Townhouse', true],
  [4, 'Rural', true],
  [4, 'Country', true],
  [4, 'Other', true],
  [14, 'Carpet Cleaning', true],
  [14, 'Computer & Technical Services', true],
  [14, 'Delivery Services', true],
  [14, 'Duct Cleaning', true],
  [14, 'Gardening, Yard Work, & Yard Maintenance', true],
  [14, 'Handyman Services', true],
  [14, 'Housekeeper / Cleaner', true],
  [14, 'Home Care Services', true],
  [14, 'House Maintenance & Repair', true],
  [14, 'Meal Services', true],
  [14, 'Moving & Storage', true],
  [14, 'Organizing / De-Cluttering', true],
  [14, 'Pet Services', true],
  [14, 'Ride Sharing & Transportation', true],
  [14, 'Window Cleaning', true],
  [14, 'Other', true],
  [24, 'Multi-Ownership Purchasing: Legalities', true],
  [24, 'Multiple Ownership Sales / Purchasing: Realtors', true],
  [24, 'Multi-Owner / Tenant / Shared Home Insurance', true],
  [24, 'Shared Vehicle Insurance & Legalities', true],
  [24, 'Understanding Home Sharing & Taxes', true],
  [24, 'Multi-Tenant Rentals & Leases', true],
  [24, 'Shared Homes A-Z', true],
  [34, 'Classes & Lessons', true],
  [34, 'Events and Activities', true],
  [34, 'Exercise Classes', true],
  [34, 'Groups & Clubs', true],
  [34, 'Other', true],
  [44, 'Cohousing Groups & Communities', false],
  [44, 'Cooperatives', false],
  [44, 'Communal Living', false],
  [44, 'Eco Villages', false],
  [44, 'Intergenerational Living', false],
  [44, 'Other', false],
  [54, 'Home Share Meetups & Get-togethers', false],
  [54, 'Seminars and Workshops: (Shared &amp; Companion Living)', false],
  [54, 'Home Share Classes', false],
  [64, 'Home Sharing Groups and Organizations', false],
  [64, 'Home & Companion Finding/ Matching Businesses', false],
  [64, 'Home & Companion Matching Businesses', false],
  [64, 'Home & Companion Educational Program Providers', false],
  [74, 'Agencies Serving Seniors', false],
  [74, 'Agencies Addressing Low Income Housing', false],
  [74, 'Agencies Serving Youth', false],
  [74, 'Agencies Serving the Homeless', false],
  [74, 'Agencies Serving other Individuals and Groups', false],
  [74, 'Home Care Agencies', false],
  [84, 'Information & Services', false],
  [94, 'Members with Homes to Share', false],
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
    // Store the average as a decimal number with 3 significant digits and 2 decimal places e.g: 2.31
    // This value should be updated only when a NEW/Updated review is added.
    'ratingAverage DECIMAL(3,2),' +
    // Used to show the number of ratings a listing has eg: 4.3 Stars - 337 Ratings
    'ratingCount INT,' +
    // Start and end date, Important for Classes / Vacation Listings
    'startDate DATE,' +
    'endDate DATE,' +
    'description VARCHAR(10000),' +
    // Plural, expects comma delimited lists of images eg: "https://imgbox.com/asd123a.png, https://dogdoggroomingcompany.org/imgbest.jpg"
    // As the client expents most listings to have at least 6 photos minimum this allows an n number of images to be stored without having 
    // to create an additional table and row for each image reference. 
    
    'imageURLs VARCHAR(200),' +
    'locationId INT,' +
    'categoryId INT,' +
    'organizationId INT,' +
    'FOREIGN KEY (locationId) REFERENCES Location(id),' +
    'FOREIGN KEY (categoryId) REFERENCES CategoryType(id),' +
    'FOREIGN KEY (organizationId) REFERENCES Organization(id)' +
  ')'
);

create(
  'ListingReview (' +
    'id INT AUTO_INCREMENT PRIMARY KEY,' +
    'listingId INT,' +
    // Should be a star rating from 0-5 (INT).
    'reviewScore INT,' +
    'reviewText VARCHAR (2000),' +
    // Only display if this is set to true, if this is set to false when a review moderator pulls up the moderation queue grab this.
    'moderationApproved BOOLEAN,' +
    'FOREIGN KEY (listingId) REFERENCES Listing(id)' +
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
  [true,'Factorio Housings', '2018-6-12', 'factoriohousing.com', '778-583-1991', 'contact@factoriohousing.com', '555 Rutland Road South', 'V1X5F3', true],
  [true,'Bobby\'s Rentals', '2020-1-1', '-', '250-373-9909', 'bobbyrental@gmail.com', '33 Lester Road', 'V1A3D3', false],
  [false,'Sketchy Mat\'s Businesses', '2021-1-1', '-', '558-500-2121', 'qiweuh@gmail.com', '101 Lambda Way', 'A1Z3X3', false],
  [true,'SUPER_MEGA_ORGANIZATION', '1900-1-1', 'SITE', 'PHONE', 'E-MAIL', 'ADDRESS', 'POSTAL_CODE', true],
]);

// Value Template
// [approvalStatus,'Title', 'Website', 'Phone', 'E-Mail', 'Description', categoryId, organizationId],
insert('Listing(approvalStatus, title, creationDate, website, phone, email, description, ratingAverage, locationId, categoryId, organizationId)', [
  [true,'Suzanne\'s Rentals', new Date('2015-07-15'), 'No Website', '250-555-8001', 'Suzzanne@Gmail.test', 'I\'m looking to rent out rooms in my apartment. Cost is $600 a month for a 1 bedroom or $900.00 a month for a 2 Bedroom.',4.5, 1, 134, 54],
  [true,'Larry\'s Lizard Rental Service', new Date('2020-08-08'), 'larryzlizards.com', '250-555-1234', 'larry@larryzlizards.com', 'Lizzzzzzzzzaaaaaaaaaaaaaaaaaarrrrrrrdddddddddssssssssssss',2, 11, 304, 4],
  [true,'Grass Assassins Grass Cutting Service', new Date('2020-09-11'), 'grassassassins.com', '250-555-0987', 'contact@grassassassins.com', 'We will cut your grass for a fair and reasonable price, our specialty is cutting grass so quiet you would never hear it', 4, 1, 224, 14],
  [true,'Grass B Gone Landscaping Service', new Date('2020-10-17'), 'grassbgone.ca', '413-555-1983', 'info@grassbgone.ca', 'Tired of watering the lawn every week? Tired of paying to get your lawn mowed? Contact us about our xeroscaping services, never water again!', 3.5, 11, 224, 24],
  [false,'Dog Walking - CHEAP', new Date('2020-10-22'), 'legitdogwalkingcomapany.xyz', '250-555-1111', 'walking@dogCorp.xyz', 'Will walk your dog for cheap, please pay via Monero Money Transfer', 1, 1, 304, 74],
  [true,'Bob\s Insurance', new Date('2020-10-25'), 'BobInsuranceco.co', '250-555-3021', 'RequestAQuote@Bobinsuranceco.co', 'Worried about your dog burning down the kitchen while you\re away? Have a look at our new fire insurance polices today. We\'re number one in the region for a reason!', 3, 1, 84, 84],
  [true,'YogiBear Yoga', new Date('2020-11-03'), 'Yogibear.com', '250-555-1101', 'Contact@YogiBear.com', 'Come on down to our Yoga studio, your first class is free with 0 obligation to join!', 3, 1, 34, 84],
  [true,'Dagwood Senior\'s Community', new Date('2020-11-12'), 'No Website', '250-555-2301', 'DagwoodCommunity@gmail.test', 'Come join us for a free seminar about our community living initative, tea and snacks will be provided! Dagwood Senior Center is home to the Dagwood ride-sharing and community assistance club, contact us for details!', 3, 1, 34, 54],
  [true,'YMCA Healthy Living Initiative', new Date('2020-11-21'), 'ymca.ca', '250-555-3001', 'HealthyLiving@ymca.ca', 'Come join us for our new living alone seminar, where we\'ll cover budgeting, cooking at home, common household maintenance and repairs, and much more!', 3, 1, 34, 84],
  [true,'BC Housing - Housing Placement Service', new Date('2020-11-26'), 'placement.housingassistance.gov.bc.ca', '250-555-8000', 'HousingAssistance@gov.bc.ca', 'We\'ll help you find an afforable place to live', 4, 1, 84, 44],
  [true,'BC Housing - Lease Assistance Service', new Date('2015-12-06'), 'leasehelp.housingassistance.gov.bc.ca', '250-555-8001', 'HousingAssistance@gov.bc.ca', 'We\'ll help you create, mange disputes, and understand lease agreements in BC', 4, 1, 84, 44],
  [true,'Jeff', new Date('2021-03-15'), 'No Website', '250-555-8001', 'No E-Mail', '70+ Year old Male, looking for assistance around the house in exchange for a free room. Utilities extra.', 4, 1, 94, 64],
]);

//Member sampple data
insert('Member(firstName, lastName, homeAddress, mailAddress, phoneNumber, email, username)', [
  ['Sin', 'Claire', '123 Tester Road', '123 Tester Road', '1112223333', 's.claire@gmail.com', 's.claire'],
  ['Abe', 'Sasel', '124 Tester Road', '124 Tester Road', '1112223334', 'a.sasel@gmail.com', 'a.sasel'],
  ['Danny', 'Lester', '125 Tester Road', '125 Tester Road', '1112223335', 'danny776@gmail.com', 'danny776'],
  ['Chester', 'Tirane', '126 Tester Road', '126 Tester Road', '1112223336', 'tiranee@gmail.com', 'tiranee'],
  ['Ephy', 'Cat', '127 Tester Road', '127 Tester Road', '1112223337', 'ephycat@gmail.com', 'ephycat'],
  ['Fiona', 'Hasan', '128 Tester Road', '128 Tester Road', '1112223338', 'f.hasan@gmail.com', 'hasan223'],
  ['Gerard', 'Black', '129 Tester Road', '129 Tester Road', '1112223339', 'BlackG@gmail.com', 'Gerardo'],
  ['Tin', 'Tin', '130 Tester Road', '130 Tester Road', '1112223340', 'tintin@tintin.com', 'tintin'],
]);

insert('SearchableInfo(memberId, genderId, birthYear, familyStatusId, minMonthlyBudget, maxMonthlyBudget, petRestrictions, petRestrictionsText, healthRestrictions, healthRestrictionsText, religionRestrictions, religionRestrictionsText, smokingRestrictions, smokingRestrictionsText, dietRestrictions, dietRestrictionsText, allergies, allergiesText, hasHousing, minHomeCapacity, maxHomeCapacity, housingDescription, profileText)', [
  [4, 14, 1996, 4, 2000, 3500, true, 'Alergic to cats', false, '', false, '', false, '', false, '', true, 'Cats', false, 2, 2, '', 'I am a police officer'],
  [14, 4, 1989, 4, 800, 1200, false, '', false, '', false, '', false, '', false, '', false, '', false, 2, 3, '', 'What?'],
  [24, 4, 1969, 14, 300, 700, true, 'I dont like animals', false, '', false, '', true, 'Weed only', false, '', false, '', false, 3, 8, '', 'Just vibing'],
  [34, 24, 1988, 14, 1200, 1500, false, '', false, '', true, 'Must be religious', false, '', false, '', false, '', false, 4, 4, '', 'Hello!'],
  [44, 14, 2001, 24, 1300, 1600, false, '', false, '', false, '', false, '', false, '', false, '', false, 2, 4, '', 'I stream, so I may be loud'],
  [54, 14, 1977, 34, 700, 1000, false, '', false, '', false, '', false, '', false, '', false, '', false, 3, 3, '', 'Looking for other quiet people'],
  [64, 4, 1956, 44, 900, 1300, true, 'Only wolves', true, 'Cannot climb stairs', false, '', false, '', false, '', false, '', false, 5, 9, '', 'Looking for people to party'],
  [74, 4, 1929, 4, 5000, 10000, false, '', false, '', false, '', false, '', false, '', false, '', true, 2, 2, 'I own a large home with 2 bedrooms', ''],
]);

insert('LocationPreference(memberId, locationId)', [
  [4, [1, 11, 21, 31, 41]],
  [14, [31, 41]],
  [24, [41]],
  [34, [11, 21, 31, 41]],
  [44, [1, 11, 21, 31, 41]],
  [54, [21, 31, 41]],
  [64, [31, 41]],
  [74, [1, 11, 21, 31, 41]],
]);

simpleSelect('*', 'CategoryType');

// Close the DB connection
con.end();
