# Dependencies
Node.js (https://nodejs.org/en/ - requires Node >= 18 to run)<br />
Typescript (https://www.typescriptlang.org/)

# Usage
Clone main repository and run ```cd hyperion```

# Environment variables
For the application run successfully we need a few environment variables. You can easily create environment variables by running a simple command. You can chain all the environment variables in one command separated by spaces. Command syntax ```npm run env:generate ${ENV_VARNAME}={ENV_VARKEY} ${ENV_VARNAME}={ENV_VARKEY} ```.
<br />
Example env script generation for this project, copy the below command and run in root directory: 
```
npm run env:generate PORT=4000 DB_USER=admin DB_PASS=wZN8mm2JJyWWckQu APP_SECRET=applicationsecret
```
On success you should have a new ```.env``` file created with all you environment variables ready for use in you application

# Installing Dependencies
To install Backend Server Dependencies run ```npm install``` in the root directory <br />
To install Client/Frontend Dependencies run ```npm run client:install```

# Build Dist Files
Simply run ```npm run build``` in the root dir, this will comple all typescript files to a JavaScript in ```./dist``` folder. This is the folder that runs in production. (see below)

# Running Application
Once all the steps above have compelted, you can simply run this application:
To run in development mode, simply run ```npm run hyperion:dev ``` in the root directory, or ```npm run hyperion:prod ``` to run in production mode. NB - Please note you need to build the app first to run in production mode

# Test Application
Your Application is now running! Navigate to localhost:3000 on the browser t see you application. You can also test the server status by going to localhost:```port```, where ```port``` is the environment variable that your server is running on, for this app it uses 4000 as default server port