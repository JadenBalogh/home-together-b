# Database Design
This is a summary of the different entities and relationships extracted from our functional requirements.
I'd like to add the MySQL Datatypes to this but I'm not sure if that's overkill. 
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
 - Family Size # (Number of people in the household)
 - Kids (#)
 - Maximum Monthly Rental Budget (To nearest $50.00)
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
 - Target E-Mail (In case user changes e-mails) - email VARCHAR(100)
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
 - Member may have conversations