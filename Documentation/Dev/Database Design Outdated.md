# THIS IS OUT OF DATE, DO NOT USE AS REFERENCE

## Naming Conventions
* Tables always start with a capital letter and any additional words are also capitalized. There are no spaces or special characters in table names. (upper camel case aka Pascal case) E.G: TableName
* Columns always start with a lower case letter and any additional words are capitalized. (lower camel case) E.G: columnNameGoesHere

# Design
## Entities
 ### Members
 - UserID - Primary Key 
 - Username 
 - First Name
 - Last Name
 - Birth Year
 - Password (Salted & Hashed)
 - E-Mail Address - email VARCHAR(100)
 - Home Address (Use Friend's / Relative's if they don't have one)
 - Mailing Address
 - Contact Phone # (Use Friend's / Relative's if they don't have one)
 - Gender (M/F/Other)
 - Age Group (Can this be taken from birth year?)
 - Household Size (Docs say Family Status (Married, Single, Etc) However household size is more accurate and is more relevant than if someone is Married.)
 - Number of Household Members under 19 (AKA # of Kids, with the household size above we can get an accurate picture of what the people are looking for.)
 - Monthly Budget (Rounded to nearest $100.00)
 - Are you willing to purchase a home with others (Y/N)
 - Do you have a home to share? (Y/N)
 - Do you have pets (Y/N)
 - Pet Elaboration String (if so, elaborate)
 - Do you smoke (Y/N)
 - Smoke Elaboration String (if so, elaborate)
 - Do you have health/mobility issues (Y/N)
 - Mobility / Health Issues Elaboration String 
 - Do you have allergies (Y/N)
 - Allergies elaboration String. 
 - Work Status (full time, part time, retired, semi-retired, fulltime student, part time student, other - elaborate)
 - Profile Picture
 - Active Status (Active or Inactive)
 - Average Rating (Out of 5) - Calculated from ratings table filtered to UserID
 - Verification Status (Y/N)
 - Admin Notes String
 - Banned Status (Y/N)
 - Banned Reason String
 
 ### E-Mail Log
 - E-Mail ID - Primary Key
 - E-Mail Status (Send, Failed, Not-Sent) - Uses INT values where # is a status code
 - Target E-Mail (In case user changes e-mails)
 - Target UserID (So we can look up the user the e-mail is meant for)
 - E-Mail Message
 
 ### Bookmarks
 - Bookmark ID - Primary Key
 - Bookmarking UserID
 - Bookmarked Link 

 ### Blocked Users
 - BlockID - Primary Key
 - Blocked UserID - The UserID of the person blocked
 - Blocking UserID - The UserID of the person doing the blocking
 - Block Reason - Not sure we want to implement this but a dropdown menu might be nice (E.g Admin can get all Blocks for Reason SPAM). 

 ### User Ratings 
 - RatingID - Primary Key
 - UserID of rating person
 - UserID of rated person
 - Score (Int from 0-5) - The score the person gave

----- THIS NEEDS WORK - Not Yet Implimented + Needs Review -----
 ### Conversation (Messages) - Attached to 2 members, possible more? 
 #### I don't know if we want to store conversations in the DB itself
 - ConversationID
 - Message Time - What time the server recieved the message (UTC).
 - Sender UserID
 - Reciever UserID
 - Message String
-----------------------------------------------------------------

 ### Organization (Business and Service)
 - BusinessID - Primary Key 
 - Name of business / Organization
 - Incorporated (Y/N)
 - Owner Name
 - Contact Person First Name
 - Contact Person Last Name
 - Contact Phone #
 - Sign-in Username
 - Password (Salted and Hashed)
 - Business Phone #
 - Business Cell / Alt # (Optional)
 - Business E-Mail Address
 - Business Address
 - Address (Postal Code if customers do not visit place of business)
 - Verification Status (Y/N)

 ### Listing
 - ListingID - Primary Key
 - PosterID (aka BusinessID)
 - Approval Status (Y/N)
 - Average Rating (1 - 5)
 - Listing Category
 - Listing Text
 - Listing Image
 - Payment Required (Y/N) - Set "free" listing to N automatically and change paid listings to N once paid.
 
 ### Listing Review - Table names should be (Reviews_ListingID)
 - ReviewID - Primary Key
 - Reviewing UserID
 - Reviewed ListingID
 - Review String
 - Rating (1-5)

 ### Home aka (Members With Homes Listing)
- HomeID - Primary Key
- PostingUserID - Not primary key in case users post multiple homes
- Image(s)? - Link to images or treat the whole thing as a "forum post" style string with BBCODE?
- Address
- Postal Code (Can be used to give area for map, easier to parse than address string). 
- Pets Allowed (Y/N)
- Pets Allowed String (E.g: No Cats, but fish / birds ok).
- Smoking Allowed (Y/N)
- Wheelchair Accessible (Y/N)
- Cost (to nearest $50.00)

## Relationships
 - Member may have many Homes
 - Organization may have many Listings
 - Member may have conversations Database Documentation


# Just look at BDSetup.js, it will be more up to date than this documentation.
## Tables
### Listing
### CategoryType
### OrganizationReview
### Organization
### Admin
### MiscSearchPrefs
### GenderSearchPrefs
### AgeSearchPrefs
### FamilyStatusSearchPrefs
### MemberReview
### SearchableInfo
This table holds public information about the member that other users can filter by.
All the restriction fields should be singular (eg: Relgion, not Relgious)
column name | SQL Data Type | Example Data | Notes
------------ | -------------| ------------ | ----------
memberId | INT | 142 |Primary Key, References the member table.
genderId | INT | 2 | References the GenderType table.
birthYear | INT | 2001 | The member's year of birth, used to calculate age.
petRestrictions | BOOLEAN | TRUE | If the member has any restrictions in regards to pets.
petRestrictionsText | VARCHAR(255) | I really don't like dogs, they leave hair everywhere. | A field where the member can enter any additional information on their restriction. 
healthRestrictions | BOOLEAN | TRUE | If the member has any restrictions in regards to their health (EG: Required a CPAP Machine, Humidifier)
healthRestrictionsText | VARCHAR(255) | I have bad sleep apnea, I need to use my machine at night and it can be quite loud. | Text Field
religionRestrictions | BOOLEAN | TRUE | If the member has any restrictions in regards to pets.
religionRestrictionsText | VARCHAR(255) | I really don't like dogs, they leave hair everywhere. | A field where the member can enter any additional information on their restriction. 

### Member
This table holds the private information about the member, none of this information should be visible to any other member.

column name | SQL Data Type | Example Data | Notes
------------ | -------------| ------------ | ----------
id | INT | 142 |Primary Key, Auto Increments. Each member gets a unique ID for their account.
firstName | VARCHAR(50) | Larry | Member's first name.
lastName | VARCHAR(50) | Smith | Member's last name.
homeAddress | VARCHAR(255) | 134 Smithson Street, Kelowna, BC, Canada V1X 7N3 | A long string the user can use to enter their home address.
mailAddress | VARCHAR(255) | PO Box 12342, Kelowna, BC, V1V 1V1 | An optional mailing address.
email | VARCHAR(255) | LarryLizard@lizardmail.com | The users E-Mail address.
username | VARCHAR(50) | BOB2323 | The user's username.
password | VARCHAR(255) | asj10951241sadfasf2135=01masmas | The user's password (Salted and Hashed). 

### AgeGroupType
column name | SQL Data Type | Example Data | Notes
------------ | -------------| ------------ | ----------
id | INT | 2 |Primary Key, Auto Increments. Each age group gets it's own auto-incremented unique ID.
name | VARCHAR(20) | Single | Each age group gets a human readable name stored as a string.
minAge | INT | 45 | The minimum age in years required to be in a group.
maxAge | INT | 65 | The maximum age in years required to be in a group.

### FamilyStatusType
column name | SQL Data Type | Example Data | Notes
------------ | -------------| ------------ | ----------
id | INT | 3 | Primary Key, Auto Increments. Each family status gets it's own auto-incremented unique ID.
name | VARCHAR(20) | Couple with Kids | Each family status gets a human readable name stored as a string.

### GenderType
column name | SQL Data Type | Example Data | Notes
------------ | -------------| ------------ | ----------
id | INT | 3 | Primary Key, Auto Increments. Each gender gets it's own auto-incremented unique ID.
name | VARCHAR(20) | Female | Each gender gets a human readable name stored as a string.

