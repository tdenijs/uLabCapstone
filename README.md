# uLabCapstone

Fall 2016 to Winter 2017 CS Capstone Project with the Universal Design Lab at Portland State University.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app), please visit [their README](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) for additional information.

## Contents
- [Getting Started](#getting-started)
- [Directory Structure](#directory-structure)
- [Client-API Communication](#client-api-communication)
- [Using a DB in Development](#using-a-db-in-development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Known Issues](#known-issues)
- [Authors](#portland-state-university-cs-capstone-team)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Make sure you have **Node v6.9.2 or later** installed :

`node -v`

If you do not have Node installed you should do that now.

You also need **PostgreSQL v9.3.15** installed to use a local version of the DB.

There is an `.editorconfig` file in the root of the project to maintain some indentation consistency across text editors. Some editors will read the file automatically while others will require a plugin to be installed, visit [editorconfig.org](editorconfig.org) for a complete list.

### Install Dependencies

Install dependencies for the API and client server by running `npm install` in the **root and client** directories.


### Starting the servers

#### Option 1: Start both servers

Run `npm start` from the **root directory** to start the client and API server together. The client server will auto-restart when any of it's code is changed but the API server will not.

#### Option 2: Run servers independently

Run `npm run api` from the **root directory** to just run the API server. The server will auto-restart when any of it's code is changed.

Run `npm start` from the **client directory** to just run the client server.


## Directory Structure

Below is the directory structure. Everything in the client folder is the front-end UI from create-react-app. The additional files outside of the client folder are for the API Server. The client and the API server have their own `package.json` file where they define their specific dependencies, therefore they can be broken apart and ran as separate apps.

```
|_client
    |-__test__
    |-public
    |-src
    |-package.json
    |-start-client.js
|_server
    |-config
    |-moddleware
    |-routes
    |-Tests
    |-server.js
    |-swagger.json
    |-ulabdb.sql
|-package.json
... and a few other things
```

## Client-API communication

[This](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/) tutorial was followed to create and connect the API server. Requests from the client are proxied to the API server.

## Using a DB in development

The `ulabdb.sql` file can be used to create a local Postgres database for development.

#### Step 1: Create a local DB
Create a local database by running the following from the **root directory**.

```
psql -U <username> -f server/ulabdb.sql
```

If you just installed Postgres they default username is usually `postgres`.

#### Step 2: Connect

In the **server/config directory**, copy `.dbconfig-sample.js` and save it as `.dbconfig.js`, then insert your Postgres `user` and `password`.

**Note:** This file will be ignored so that your credentials will not be pushed to the repo.

```javascript
const dbconfig = {
  hostname: "localhost",
  port    : "5432",
  dbname  :"ulabdb",
  user    : "",
  password: ""
}
```

#### Troubleshooting

If you meet wired connection issues, remove the quotation around number `5432` and try again.

## Testing

This section describes what tests are available and how to run them.

#### Running Client tests

Front end testing is ran with [Jest](https://facebook.github.io/jest/) using tests written with a combination of Jest and [Enzyme](http://airbnb.io/enzyme/). All tests are in the `client\__tests__` folder, which Jest automatically looks in. Mock functions are in `client\src\mocks.js`.

The client test script is defined in `client\package.json`. More information on this script can be found at [create-react-app](-app/blob/master/packages/react-scripts/template/README.md#running-tests).

```
"test": "react-scripts test --env=jsdom",
```

Run `npm test` in the **client** folder to execute the tests.

Run `npm test -- --coverage` to include information about test coverage.

#### Running API test

API testing is ran with [newman](https://www.npmjs.com/package/newman), which executes tests written in [Postman](https://www.getpostman.com/). All testing files exported from Postman are in the **/server/Tests** folder. Data files used to assert variables should be placed in this folder.

Update the `"test"` script in `package.json` to use the desired variable data file and set the desired number of iterations.

```
"test": "newman run <collectionFile> -e <environmentFile> -n <numIterations> -d <variableDataFile>",
```

Currently there is only one collection and one environment set up so those are already filled in for the script.

Run `npm run api` to start the API server, then in a new session run `npm run test` to execute the tests.

**IMPORTANT: re-build your database (before and) after running the tests** because the testing will add and delete data during the testing process.

The easiest way to create or update tests is to import the `uLab.postman_collection.json` into the Postman GUI, create or update your tests, then export the file back into the **Tests directory**.

<!-- - ## Deployment Add additional notes about how to deploy this on a live system -->
## Deployment

Deployment requirements will vary depending on the hosting platform, but the following steps are required for all cases.

#### Update Proxy Port
Update the desired port for the proxy in `client/package.json`
```json
  "proxy": "http://localhost:3001/",
```
On current VM we are using port `8080`.

#### Update hostname
Update the `hostname` in `client/src/App.js`.
```javascript
  hostname: "localhost:3001",
```
The app is currently hosted at `ulabcapstone.cs.pdx.edu`.

#### Configure the DB
Create the `.dbconfig.js` file from `.dbconfig-sample.js` in the `server/config` directory.
```javascript
const dbconfig = {
  hostname: "",
  port    : "5432",
  dbname  : "",
  user    : "",
  password: ""
}
```
#### Install Dependencies
Install dependencies in the **root and client** directories.

#### Create Build
Run `npm run build` in the client to build a static version of client. This will be served up from the API server.

#### Update image upload API
Update the file path for saving uploaded images to use the new build folder in production.
```javascript
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'client/public/img/');
  }
```

Change `client/public/img/` to `client/build/img`.

#### Deploy
Run `npm run deploy` in root to set environment variables to production and start the app.

You can also use `node server/server.js` to start the app.

#### Details of our deployment

The application for demo purposes was deployed on a virtual machine running Ubuntu Server 16.04 LTS.
We added a service user account to the server to host and manage the application and database.

We installed NGINX webserver for port forwarding and basic authentication.

We used port forwarding to route the application requests and responses from port 3001 to port 80 (the standard system http port).

We installed the apache2-utils package which provides the htpasswd and basic authentication support to NGINX.

After installing NGINX and apache2-utils via the apt package manager we edited the configuration file /etc/nginx/sites-available/default , with the following:

```nginx
server {
    # sets port 80 to listen for http requests and responses
    listen 80;

    # sets the http root folder to be the production build folder of the app
    root /home/app-user/client/build/;

    # defines the fully qualified domain name of the server
    server_name hostname.com;

    location / {
               # sets up basic authentication at the designated root
               auth_basic "Authorized Users Only";
               auth_basic_user_file /etc/nginx/.htpasswd;

               # sets up port forwarding from port 3001 to port 80
               proxy_set_header X-Forwarded-For $remote_addr;
               proxy_set_header Host $http_host;
               proxy_pass       "http://hostname.com:3001";
        }

}
```
## Known Issues
1. Uploading an image via taking a picture on iPad not working
2. Notifications to the user when an error occurs is lacking. For example if an image upload fails the user will not be notified that a failure occurred or why it happened.
3. The file name for a new image upload is dependent on the text the user enters. Currently the app allows user to not enter any text which results in a image being saved with no name, just an extention (ex. '.png')
4. If a user adds a word that already exists, it will result in duplicate file names for the image associated with the word. This could result in unexpected behavior for which image will display.
5. There are some responsive issues across devices and browsers for the UI

## Built With

- [React.js](https://facebook.github.io/react/) - UI framework
- [Express.js](http://expressjs.com/) - Web API framework for Node.js
- [PostgreSQL](https://www.postgresql.org/about/) - DBMS

## Portland State University CS Capstone Team:

#### UI Development Team:
- **Siggy Hinds** - _Team Lead/Developer_
- **Tristan deNijs** - _Developer_
- **Simone Talla** - _Product Owner/Developer_
- **Anton Zipper** - _QA Lead/Developer_

#### API Development Team:
- **Jiaqi Luo** - _Repo Admin/Developer_
- **Christopher Monk** - _Team Lead/Repo Admin/Developer_
- **Carson Volker** - _Repo Admin/Developer_
## Sponsors

- **Samuel Sennott** - (uLab) samuel.sennott@gmail.com (954)980-5778
- **Juan Fernandez** - (7/Apps) juan@7apps.com (407)342-1202
- [Jason Brown](http://browniefed.com/) - browniefed@gmail.com

## License

This project is licensed under the MIT License - see the
[LICENSE.md](LICENSE.md) file for details.
