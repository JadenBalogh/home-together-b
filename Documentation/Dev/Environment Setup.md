# Environment Setup
Steps required to setup and run the app in your local development environment.

## First-Time Installations
These steps are only required once for each computer you are working on.  
### Install Visual Studio Code: https://code.visualstudio.com/  

### Install Node.js: https://nodejs.org/en/

### Install MySQL: https://www.mysql.com/products/community/ - Download "Community Server" I'd use the windows installer but you can install manually.
1. Use the config type: Development Computer

2. Use the default ports.
If either of these ports is taken by something already message the group and we can discuss changing ports. As per this [List of TCP & UDP Port Numbers](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers) it should be free. 

3. Use Strong Password Encryption for Authentication (The Default).

4. Setup your MySQL Root Password. 

5. Setup a "dev" user, this is the account we should be using to test our development setup.

NOTE: Pull from github if you haven't already, the following setup instructions presume you have a local copy of the code.

6. Create a file in "/server" named ".env.local", this file is ignored by git and will not be pulled/pushed to github. Copy the code below into that file.
```
HOST='localhost'
USER='YOUR_USERNAME'
PASSWORD='YOUR_PASSWORD'
DATABASE='YOUR_DB_NAME'
``` 
replace "YOUR_USERNAME" & "YOUR_PASSWORD" with the information from your "Dev" user.

7. Configure MySQL as a windows service.
NOTE: This guide will only cover running MySQL as a service but it's not technically required.

8. Navigate to the mySQL install directory via `CMD`(Not required if MySQL is in your PATH):
```cmd
cd C:\Program Files\MySQL\MySQL Server 8.0\bin\
``` 

9. Sign into your MySQL Server via CMD with your ROOT password:
```cmd
mysql -u root -p
``` 

10. As the root DB user create a database, replace "YOUR_DATABASE_NAME" with the name for your DB.
```cmd
CREATE DATABASE YOUR_DATABASE_NAME; 
``` 

11. Replace "YOUR_DATABASE_NAME" in ".env.local" with whatever you used above.

12. Start the console in your home-together-b directory in VScode, CD to the server directory and then run npm install for the MySQL Driver to be installed.
```cmd
cd server
npm install
```

13. To test that everything working run the DBSetup.js file with node: 
```cmd
node DBSetup.js
``` 
If everything is setup properly you will see the DBSetup output in your Terminal. 

### Install the MySQL2 Node.js Driver
The mySQL2 node.js driver is included in the server package.json and should be grabbed when doing npm install. [An Absolute Beginner's Guide to Using npm](https://nodesource.com/blog/an-absolute-beginners-guide-to-using-npm/) is linked if you're unfamiliar. We have to use the MySQL2 because the mySQL driver doesn't support the new MySQL 8 Secure DB authentication. See [StackOverflow Discussion](https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server) and [GitHub MySQL Issue](https://github.com/mysqljs/mysql/pull/1962).


## Updating your Local Version
Every time you pull new changes into your local branch or do a first-time installation, you should do the following steps.

### Client-side
Open VS Code and open a new Terminal window. In the terminal, change to the `/client` directory and install the required client-side packages using `npm`:
```cmd
cd client
npm install
```

### Server-side
Open VS Code and open a new Terminal window. In the terminal, change to the `/server` directory and install the required server-side packages using `npm`:
```cmd
cd server
npm install
```

## Running the App Locally
Every time you want to test your changes or run the app locally, you should do the following steps. Note that both the client and the server will automatically update if you save changes to their respective files while they are running, so restarting the client and server after every code change is not required.

### Starting the DB
1. If any strutural changes were made to the database then there may be foreign key constraints not dropped by the table (EG: We removed a table, but you pulled an updated DBSetup.js before dropping the current tables and so no longer have a drop table command for this). We can sort-of get around this by just leaving all the /drop commands for all the tables we have ever made in the DBsetup but just so there is documentation for how to fix this. 

1.1. Navigate to the mySQL install directory via `CMD`(Not required if MySQL is in your PATH):
```cmd
cd C:\Program Files\MySQL\MySQL Server 8.0\bin\
``` 

1.2. Sign into your MySQL Server via CMD with your ROOT password:
```cmd
mysql -u root -p
``` 

1.3 Drop your current database, use the name you stored in your .env
```cmd
DROP DATABASE IF EXISTS YOUR_DATABASE_NAME; 
``` 

1.4. Re-create the DB, using the same name as stored in your .env
```cmd
CREATE DATABASE IF NOT EXISTS YOUR_DATABASE_NAME; 
``` 

2. If you installed as a service above when you start your computer the MySQL database should already be running. You can manually control the service if need be. See: [MySQL Windows Service Docs](https://dev.mysql.com/doc/mysql-windows-excerpt/8.0/en/windows-start-service.html)

3. Run `node DBSetup.js` in the `/server` directory. This will drop the tables, re-create them, then add in testing data.




### Client-side
Open VS Code and open a new Terminal window. In the terminal, change to the `/client` directory and run the client using `npm`:
```cmd
cd client
npm start
```
You can cancel this process by using `ctrl + c` in the Terminal window.

### Server-side
Open VS Code and open a new Terminal window. In the terminal, change to the `/server` directory and run the server using `npm`:
```cmd
cd server
npm start
```
You can cancel this process by using `ctrl + c` in the Terminal window.
