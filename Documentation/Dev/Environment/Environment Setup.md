# Environment Setup
Steps required to setup and run the app in your local development environment.

## First-Time Installations
These steps are only required once for each computer you are working on.  
### Install Visual Studio Code: https://code.visualstudio.com/  
### Install Node.js: https://nodejs.org/en/
### Install MySQL: https://www.mysql.com/products/community/
1. Use the config type: Development Computer
2. Use the default ports.
If either of these ports is taken by something already message the group and we can discuss changing ports. As per this [List of TCP & UDP Port Numbers](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers) it should be free. 
3. Use Strong Password Encryption for Authentication (The Default).
4. Setup your MySQL Root Password. 
5. Setup a dev user, this is the account we should be using to test our development setup.

NOTE: Having Usernames and Password in github IS VERY INSECURE, DO NOT EXPOSE YOUR DB TO THE INTERNET. This username and password is something I made up just for this.
```cmd
User-type: DB Admin
Username: notAdmin
Password: notAdmin99!!
``` 

6. Optional: Configure MySQL as a windows service.

I don't have it installed as a service or in my PATH so I navigate to the mySQL install directory via `CMD`:
```cmd
cd C:\Program Files\MySQL\MySQL Server 8.0\bin\
``` 
Then you will have to sign into your MySQL Server via CMD with:
```cmd
mysql -u root -p
``` 

As rootDB user then execute the code below to create our database. 
```cmd
CREATE DATABASE HTDB; 
``` 

To Test that everything is working set open your terminal in vscode to the /server directory and then run, you should see the sample code output in the console.
```cmd
node demodb.js
``` 


### Install the MySQL2 Node.js Driver
The mySQL2 node.js driver is included in the server package.json and should be grabbed when doing npm install (See below). [An Absolute Beginner's Guide to Using npm](https://nodesource.com/blog/an-absolute-beginners-guide-to-using-npm/) is linked if you're unfamiliar. We have to use the MySQL2 because the mySQL driver doesn't support the new MySQL 8 Secure DB authentication. See [StackOverflow Discussion](https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server) and [GitHub MySQL Issue](https://github.com/mysqljs/mysql/pull/1962).


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
