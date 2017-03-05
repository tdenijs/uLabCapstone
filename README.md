# uLabCapstone

Fall 2016 to Winter 2017 CS Capstone Project with the Universal Design Lab

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app), please visit [their README](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) for additional information.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Make sure you have **Node** installed (v6.9.2 or later):

`node -v`

If you do not have Node installed you should do that now.

You also need **PostgreSQL v9.3.15** installed to use a local version of the DB

### Install Dependencies

In the root of the directory install dependencies for the API server

`npm install`

Install dependencies for the client server

```
cd client
npm install
```

### Starting the servers

#### Option 1: `npm start`

Run it from the **root directory** to start the client and API server together.

Run it from the **client directory** to just run the UI.

Note: the client server will auto-restart when changes are made but the API server will not.

#### Option 2: `npm run api`

Run it from the **root directory** to work with just the API server in development with the auto-restart functionality.

#### Observation:

You can view the client server at `localhost:3000` and the API server at `localhost:3001` in your browser.

## Directory Structure

Below is the directory structure. Everything in the client folder is the front-end UI from create-react-app. The additional files outside of the client folder are the back-end REST API Server. The client and the API server have their own `package.json` file where they define their specific dependencies, therefore they can be broken apart and ran as separate apps.

```
|_client
    |-__test__
    |-public
    |-src
    |-package.json
    |-start-client.js
|_server
    |-config
    |    |-.dbconfig-sample.js
    |    |-dbconnect.js
    |-moddleware
    |    |-grids.js
    |    |-index.js
    |    |-lists.js
    |    |-upload.js
    |    |-words.js
    |-routes
    |    |-index.js
    |-Tests
    |    |-development.postman_environment.json
    |    |-uLab.postman_collection.json
    |    |-var_data.json
    |-server.js
    |-swagger.json
    |-ulabdb.sql
|_package.json
|README.md

... and a few other things
```

## Client-API communication

[This](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/) tutorial was followed to create and connect the API server. Requests from the client are proxied to the API server. There is some info at [this point](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/#the-apps-react-components) of the tutorial about making calls to the API from the client

## Using a DB in development

### Step 1

The `ulabdb.sql` file can be used to create a local database for development.

Create a local database by running the following from the **root directory**.

```
psql -U <username> -f server/ulabdb.sql
```

For our team the username should be `postgres`.

### Step 2

Insdie the **config directory**, copy `.dbconfig-sample.js` and save it as `.dbconfig.js`,then set your values for connecting to the database in `.dbconfig.js` for Postgres.

Note: This file will be ignored so that your credentials will not be pushed to the repo.

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

### Running Client tests

Front end testing is ran with [Jest](https://facebook.github.io/jest/) using tests written with a combination of Jest and [Enzyme](http://airbnb.io/enzyme/). All tests are in the `client\__tests__` folder, which Jest automatically looks in. Mock functions are in `client\src\mocks.js`.

The client test script is defined in `client\package.json`. More information on this script can be found at [create-react-app](-app/blob/master/packages/react-scripts/template/README.md#running-tests).

```
"test": "react-scripts test --env=jsdom",
```

Run `npm test` in the **client** folder to execute the tests.

Run `npm test -- --coverage` to include information about test coverage.

### Running API test

API testing is ran with [newman](https://www.npmjs.com/package/newman), which executes tests written in [Postman](https://www.getpostman.com/). All testing files exported from Postman are in the **/server/Tests** folder. Data files used to assert variables should be placed in this folder.

Update the `"test"` script in `package.json` to use the desired variable data file and set the desired number of iterations.

```
"test": "newman run <collectionFile> -e <environmentFile> -n <numIterations> -d <variableDataFile>",
```

We currently only have one collection and one environment set up so those are already filled in for the script.

Run `npm run api` to start the API server then in a new session run `npm run test` to execute the tests.

**IMPORTANT: re-build your database (before and) after running the tests** because the testing will add and delete data during the testing process. 

<!-- - ## Deployment Add additional notes about how to deploy this on a live system -->

 ## Built With

- [React.js](https://facebook.github.io/react/) - UI framework
- [Express.js](http://expressjs.com/) - Web API framework for Node.js
- [PostgreSQL](https://www.postgresql.org/about/) - DBMS

## Authors

Portland State University CS Capstone Team:

- **Siggy Hinds** - _Team Lead/Front-End Developer_
- **Jiaqi Luo** - _GitHub Repo Admin/Back-End Developer_
- **Christopher Monk** - _GitHub Repo Admin/Back-End Developer_
- **Tristan deNijs** - _Front-End Developer_
- **Simone Talla** - _Front-End Developer_
- **Carson Volker** - _GitHub Repo Admin/Back-End Developer_
- **Anton Zipper** - _Front-End Developer_

## Sponsors

- **Samuel Sennott** - (uLab) samuel.sennott@gmail.com 954-980-5778
- **Juan Fernandez** - (7/Apps) juan@7apps.com (407)342-1202
- [Jason Brown](http://browniefed.com/) - browniefed@gmail.com

## License

This project is licensed under the MIT License - see the

<license.md> file for details</license.md>
