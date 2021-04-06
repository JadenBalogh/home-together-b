# Milestone Progress
### Completed:
 - ER diagram
 - sample database connection code
 - database is setup but needs review
 - sample front-end table display code
 - review the database for users
 - get users from database on server

### Still needed:
 - about page front-end (static page - no database)
 - listings page front-end
 - user search page front-end
 - get listings from database on server
 - get users from server onto the client
 - get listings from server onto the client
 - create listing tables in database
 - add listings test data to database

### This week:
Athena:
 - about page front-end (static page - no database)
 - listings page front-end

Jaden:
 - get listings from database on server
 - get users from server onto the client
 - get listings from server onto the client

Alvin:
 - user search page front-end

Jared:
 - create listing tables in database
 - add listings test data to database

# Weekly Progress
## Nov 3-10
### Overview:  
 - setting up the database to have a users table with some sample data
 - get users from database on server with parameters
 - get users from server onto the client
 - user search page front-end

### Steps:  
 - Create a table called User with the following information fields
   - Gender (M/F/Other)
   - Age Group
   - Family Status (single/couple/couple with children/single parent/other group)
   - Maximum monthly budget (to nearest hundred)
 - Add 5 example rows of data into the User table
 - Ensure that all devs can create and update the database in their local environment with their particular settings
 - In the server.js file 
   - Import the mysql package
   - Create a connection to the local database
   - Create a new function called getUsers(gender, ageGroup, familyStatus, maxBudget) that gets users from the database with the specified filters
   - Create an express route called /get-users that takes the above parameters for the getUsers function as the Get params and then calls getUsers() with those parameters
 - In the UserSearch.js file in client/src/
   - Create a MemberList component to display the users on the page in a table (either in the same file or in its own)
   - Create a function to make a request to the server at the route /get-users (using fetch() for example)
   - Create the rest of the UserSearch page with the MemberList component as part of that page