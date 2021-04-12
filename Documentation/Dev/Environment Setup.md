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

## Updating the Live Server
Once you have completed a set of changes, you can publish these to the live development server on Heroku using the following steps:
1. Open VS Code and open a new Terminal window. In the terminal, change to the `/client` directory and create a build using `npm`:
```cmd
cd client
npm run build
```
2. Navigate to the project folder in your file explorer, and locate the newly created `build` directory in the `client` folder.
3. Cut the entire `build` folder from this directory, and navigate to the `server` directory. Delete any existing `build` folder in `server` and replace it with the new one.
4. Commit these changes to the `dev` branch.
5. Go to the [Heroku dashboard](https://dashboard.heroku.com/apps/home-together-b) and sign into `home-together-b` with your admin credentials. (See the transition document for details about becoming an admin).
6. The site should automatically deploy these changes. However, to manually deploy, go to the deploy tab, scroll down to Manual Deploy, select the `dev` branch, and press Deploy Branch. After a short while, the site should be fully up to date!
