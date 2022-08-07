# Phonebook - SPA

This project is a single-page application that holds both the frontend (react-app) and backend (axios) using the [express](http://expressjs.com/) web framework.

The application is available in Heroku: https://fullstackopen-p3-phonebook.herokuapp.com/

The data is kept in memory instead of a DB.

IMPORTANT: In order to apply any frontend changes in this server, you need to `git clone git@github.com:sergioruizsan/fullstackopen.git` the main repo. The frontend is located under https://github.com/sergioruizsan/fullstackopen/tree/main/part3/phonebook

## Available Endpoints

If you have VSCode [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client), you can trigger the requests from the file located in `requests/persons.rest`

## Available Scripts

In the project directory, you can run:

### `npm run dev`
Starts the express server in production mode


### `npm run dev`
Starts the express server in development mode,
using `nodemon` to restart the server automatically whenever there are any changes in the backend code.

### `npm run build:ui`
Generates the production build for the frontend.

### `npm run deploy`
Deploys the application to Heroku

### `npm run deploy:full`
Runs both `npm run build:ui` and `npm run deploy`

### `npm run logs:prod`
Shows the heroku logs