# Phonebook - SPA

This project is a single-page application that holds both the frontend (react-app) and backend (express + mongoose) sides using the [express](http://expressjs.com/) web framework.

👉🏻 The application is accessible via Heroku: https://fullstackopen-p3-phonebook.herokuapp.com/

The data is kept in a Mongo DB instance located in a [MongoDB Atlas](https://www.mongodb.com/atlas/database).

NOTE 1: In order to apply any frontend changes in this server, you need to `git clone git@github.com:sergioruizsan/fullstackopen.git` the main repo. The frontend code is located under https://github.com/sergioruizsan/fullstackopen/tree/main/part3/phonebook

NOTE 2: 
To deploy the app to heroku, there is at least one environment variable reqiured, the one for the connection. Checkout the `.env.sample` for the variables needed. Setting the Mongo DB URI env variable can be done through the heroku CLI with the following command: `heroku config:set MONGODB_URI='mongodb+srv://<user>:<password>@cluster0.abwvbql.mongodb.net/personApp?retryWrites=true&w=majority'`

## Available Endpoints
If you have the VSCode [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client), you can trigger the requests from the file located in `requests/persons.rest`

## Available Scripts
In the project directory, you can run:

### `npm run start`
Starts the express server in production mode

### `npm run dev`
Starts the express server in development mode,
using `nodemon` to restart the server automatically whenever there are any changes in the backend code.

### `npm run build:ui`
Generates the production build for the frontend. The main repository is required to succesfully run this command, as mentioned earlier.

### `npm run deploy`
Deploys the application to Heroku

### `npm run deploy:full`
Runs both `npm run build:ui` and `npm run deploy`. The main repository is required to succesfully run this command, as mentioned earlier.

### `npm run logs:prod`
Shows the heroku logs

### `npm run lint`
Run eslint