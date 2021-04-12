# Environment Setup
Steps required to setup and run the app in your local development environment.

## First-Time Installations
These steps are only required once for each computer you are working on.  
#### Install Visual Studio Code: https://code.visualstudio.com/  

#### Install Node.js: https://nodejs.org/en/

*NOTE: Pull from github if you haven't already, the following setup instructions presume you have a local copy of the code.*

### Setup environment variables
Create a file in "/server" named ".env.local". This file is ignored by git and will not be pulled/pushed to github. Copy the **secret** code from the Transition Guide into this file.

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
