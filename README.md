This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app), please visit [their README](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) for additional information.

### Overview

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

### Client-API communication

I followed [this](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/) tutorial to create and connect the API server. The basic idea is that, for development, React makes an API request to the Webpack dev server (client) which then proxies the request to the API server. There is some info at [this point](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/#the-apps-react-components) of the tutorial about making calls to the API from the client

### Getting Started

In the root of the directory install dependencies for the API server
```
npm install
```
Install dependencies for the client server
```
cd client
npm install
```
### Starting the servers

To start the client and API Server (note: the client server will auto-restart when changes are made but the API server will not)
```
npm start
```

To work with just the API server in development with the auto-restart functionality run the following
```
npm run api
```
You can view the client server at `localhost:3000` and the API server at `localhost:3001`.
