# Project Milestones
This is a listing of all functional requirements for the Home Together project, organized by milestone and website section.

## Requirements and Design - October 14
This milestone involves building documentation, requirements and initial design.

### Features Overview
  - High level description of the site
  - Description of user groups for the system
  - Data Flow Diagram of the system architecture, in level 0 and 1
  - List of functional requirements at each milestone
  - Set of user stories for requirements
  - List of non-functional requirements
  - Options between 3 tech stacks
  - Testing approach and associated frameworks

## Peer Testing 1 - November 25
This milestone involves the core feature set for the primary user group, "home sharers". This includes map integration for searching, and the classified and user search pages. In this milestone, we focus on implementing a working backend first with only the most important front-end features.

### Features Overview
 - **About page**  
   - Site features
   - HomeTogether description
   - Home sharing definition
   - Website purpose
   - Contact info  
 - **Classified listing page**  
   - Selectable category hierarchy for filtering listings
   - Google Maps integration (filter and display listings by location)
   - Sortable results list
   - Listing database backend (manually entered data in this stage)  
 - **User search page**  
   - Google Maps integration (filter and display users by location)
   - Panel for filtering search results
   - Sortable results list
   - User database backend (manually entered data in this stage)

### Features by User Group
**Members**
 - View the about page including website purpose, background of Home Together, the definition of home sharing, and contact info.
 - View the listings section of the website. This must have a way to select the category of listing you want to filter by, as well as using a map to search by location. Categories include:
   - Classifieds:
     - Rentals 
     - House & Yard Services 
     - Legal & Sales 
     - Classes, Clubs & Events
   - Service Listings:
     - Cohousing, Co-ops, Intergenerational, planned neighborhoods
     - Home Share Facilitation & Matching Services  
     - Government & Non-Profit / Shared Living Supports and Services
     - Members with Homes to Share
 - View the user search section of the website. This must have a way to filter users by some basic properties, as well as using a map interface to filter by location. Results should also be sortable. In this phase, only a basic results list will be shown, as individual profile pages are not yet implemented. At this phase, search filters only include a small subset of the searchable properties described in Milestone 2:
   - Gender (M/F/Other)
   - Age Group
   - Family Status (single/couple/couple with children/single parent/other group)
   - Maximum monthly budget (to nearest hundred)

## Peer Testing 2 - February 24
This milestone is focused on the account creation process for all user groups, in addition to listing creation and user messaging. This is also when the front-end flow is refined and remaining pages are added.

### Features Overview
 - **Account creation flow**  
   - Log-in and log-out options
   - Sign up screen including display info
   - Account type options (home sharer or business)
   - Edit account info
   - View personal profile and set self as visible/invisible to others  
 - **Classified listings**  
   - Business accounts can view their active listing(s)
   - View individual listing pages
   - Post/edit listings as business account
   - Post/edit homes to share as personal account
   - Rating/review system  
 - **User interaction**  
   - View personal profiles of other users
   - Message other users (with email notifications)
   - Star rating system for other users

### Features by User Group
**Members**
 - Create a member account, which includes a sign up screen asking for the user’s personal information (NO identifying information is displayed to other users):
   - First name, last name
   - Birth Year
   - Username (display name)
   - Password
   - Email address (verified)
   - Home address (use a friend’s, relative’s or verifiable organization’s address if you don’t have one)
   - Mailing address (if different than home; use a friend’s, relative’s or verifiable organization’s address if you don’t have one)
   - Cell or Home phone number (use a friend’s, relative’s or verifiable organization’s address if you don’t have one)
 - As part of the signup process, members must submit their searchable profile information:
   - Gender (M/F/Other)
   - Age Group
   - Family Status (single/couple/couple with children/single parent/other group)
   - If couple: second person’s username
   - Maximum monthly rental budget (to nearest hundred)
   - Areas you are interested in living
   - Are you willing to purchase a home with others? (Y/N)
   - Do you have a home to share? (Y/N)
   - Do you have pets (Y/N); if so, elaborate
   - Do you smoke (Y/N); if so, elaborate
   - Do you have health/mobility issues (Y/N); if so, elaborate
   - Do you have allergies (Y/N); if so, elaborate
   - Work Status (full time, part time, retired, semi-retired, full time student, part time student, other - elaborate)
 - View their own profile page and edit their personal and display information.
 - Toggle their profile as active/inactive which determines whether they show up in search results.
 - Click on and view other users’ profiles from the user search results list.
 - Message other users through their profiles, with email notifications implemented.
 - Apply a rating (out of 5 stars) for other users.
 - View individual listing pages in the listings search results.
 - Post and edit listings in the Members with Homes to Share section of the listings page.
 - Apply a rating (out of 5 stars) for listings.

**Businesses**
 - Make a business account which will require a set of business information:
   - Full name of business/group/organization/person
   - Incorporated (Y/N); if so, give full incorporation name and owner name
   - Contact person first name/last name
   - Contact person phone number
   - Sign-in username
   - Password
   - Business phone number
   - Business cell
   - Business email address
   - Business address
   - Business mailing address (if different)
   - Address shown in map search (use postal code for general area if customers do not come to your place of business)
   - Website link (only if they have one)
 - Post and edit listings in every category except Members with Homes to Share.
 - View list of currently active listings on your business account.


## Final - April 8
This stage of the project is for finalizing the user interface, and adding safety and administrator features.

### Features Overview
 - **Safety**  
   - Report other users
   - Block other users
   - Verification process for business account and classifieds
   - Payment process for non-homesharing listings  
 - **Administration**  
   - Ban feature with reason field
   - View reports/complaints
   - Export lists of users/listings/businesses
   - Verify businesses and classified listings with reason field
   - View complete profiles of all users and businesses  
 - **User interface/user experience update**  
   - Standardize all pages
   - Ensure basic user experience standards are met
   - Update visuals and graphics
   - Add additional ways to navigate the website where appropriate

### Features by User Group
**Members**
 - Report other users through a form accessed through the other person’s profile.
 - Block other users through an option on the other person’s profile.

**Businesses**
 - Pay for classifieds through a Paypal payment process.
 - Wait for their listings to be approved before becoming public.

**Admins**
 - Admins are given an admin account with a desired username and password, which they can log in with through the usual form.
 - Access the admin page through the site home page, on which they can access a variety of admin features:
   - View active user reports, open and close reports.
   - Option to export desired site usage information to file (members/businesses/listings).
   - Review new listings and submit a verification form with approval or denial options with a written reason that gets sent to the business via email.
 - View the profiles of all users.
 - Ban any user through their profile with a form stating a reason which gets emailed informing the banned user.
