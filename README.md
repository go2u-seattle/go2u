# ![Go2U App](project-logo.png)


> ### The description of Go2U app [Go2U](https://github.com/go2u-seattle/go2u) API spec.

This repo is functionality complete — PRs and issues welcome!

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- `npm run dev` to start the local server

Alternately, to quickly try out this repo in the cloud, you can [![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/remix/realworld)

# Code Overview

## Dependencies
- [Joi]
- [Joi-objectid]
- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript 
- [google](www.google.com) - 
- [jest] for unit/integration testing (npm i jest --save-dev)

## Application Structure

- `server.js` - The server point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `config/` - This folder contains configuration for passport as well as a central location for configuration/environment variables.
- `routes/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the schema definitions for our Mongoose models.

## Error Handling

In `server.js`, we define a error-handling middleware for handling Mongoose's `ValidationError`. This middleware will respond with a 422 status code and format the response to have [error messages the clients can understand](https://github.com/gothinkster/realworld/blob/master/API.md#errors-and-status-codes)

## Authentication

Requests are authenticated using the `Authorization` header with a valid JWT. We define two express middlewares in `routes/auth.js` that can be used to authenticate requests. The `required` middleware configures the `express-jwt` middleware using our application's secret and will return a 401 status code if the request cannot be authenticated. The payload of the JWT can then be accessed from `req.payload` in the endpoint. The `optional` middleware configures the `express-jwt` in the same way as `required`, but will *not* return a 401 status code if the request cannot be authenticated.


<br />



# To do:
- unit-testing:
  - Any functions without external depdencies such as generateAuthToken function
- Integration Testing:
  - user:
    - testing object
    - testing exceptions
      1. Post with wrong values [null, undefined, NaN, '', 0, false] for (id, name, email, password, phone, loginType, priflePicture)
      2. getByUserId with null values [null, undefined, NaN, '', 0, false]
      3. getAll with empty results, returning values.
      4. 