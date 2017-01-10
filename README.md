# uLabCapstone
Fall 2016 to Winter 2017 CS Capstone Project with the Universal Design Lab

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app), please visit [their README](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) for additional information.



## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

#### Prerequisites

Make sure you have Node installed (v6.9.2 or later)

```
node -v
```
If you do not have Node installed yous should do that now.

#### Install Dependencies

In the root of the directory install dependencies for the API server
```
npm install
```
Install dependencies for the client server
```
cd client
npm install
```
#### Starting the servers

To start the client and API Server (note: the client server will auto-restart when changes are made but the API server will not)
```
npm start
```

To work with just the API server in development with the auto-restart functionality run the following
```
npm run api
```
You can view the client server at `localhost:3000` and the API server at `localhost:3001`.

## Directory Structure

Below is the directory structure. Everything in the client folder is the front-end UI from create-react-app. The additional files outside of the client folder are the back-end REST API Server. The client and the API server have their own `package.json` file where they define their specific dependencies, therefore they can be broken apart and ran as separate apps.
```
|_client
    |-public
    |-src
    |-package.json
    |-start-client.js
|_package.json
|_server.js

```

## Client-API communication

 [This](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/) tutorial was followed to create and connect the API server. Requests from the client are proxied to the API server. There is some info at [this point](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/#the-apps-react-components) of the tutorial about making calls to the API from the client

<!---## Testing

 Explain how to run the tests for this system

 #### Break down into end to end tests

 Explain what these tests test and why

 ```
 Give an example
 ```


 ## Deployment

 Add additional notes about how to deploy this on a live system -->

## Built With

* [React.js](https://facebook.github.io/react/) - UI framework
* [Express.js](http://expressjs.com/) - Web API framework for Node.js
* [PostgreSQL](https://www.postgresql.org/about/) - DBMS

## Authors

* **Siggy Hinds** - *Team Lead/Front-End Developer*
* **Jiaqi Luo** - *GitHub Repo Admin/Back-End Developer*
* **Christopher Monk** - *GitHub Repo Admin/Back-End Developer*
* **Tristan deNijs** - *Front-End Developer*
* **Simone Talla** - *Front-End Developer*
* **Carson Volker** - *GitHub Repo Admin/Back-End Developer*
* **Anton Zipper** - *Front-End Developer*

## Sponsors and Mentors

* **Samuel Sennott** - (uLab) samuel.sennott@gmail.com 954-980-5778
* **Juan Fernandez** - (7/Apps) juan@7apps.com  (407)342-1202
* [Jason Brown](http://browniefed.com/) - browniefed@gmail.com

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
