# ul_challenge

## Requirements

- MacOS or Linux Operating System
- NodeJS version 12 or higher
- git

## Get Started

- Clone the whole repository with `git@github.com:sebbsan/ul_challenge.git`
- open 2 terminals
- in one terminal, start the backend - see instructions below
- in the second terminal, run the frontend - see instructions below

## Solution - Backend

In `/server` a Node Express Server is providing the following API:

`POST /register` with payload, example:

```js
{
      "fullName": "Sebastian Weikart",
      "email": "sebastian.weikart@gmail.com",
      "password": "abc12121212a"
}
```

will create a new user.

`POST /login` with payload, example:

```js
{
      "email": "sebastian.weikart@gmail.com",
      "password": "password"
}
```

will login a user by returning a JWT.

I decided to use sessionless authentication using a JWT to avoid creating a server state and make things more complicated. As persistence layer, SQLLite is used, but other databases can be swapped in if needed as the access layer is abstracted using sequelize ORM. I decided to use bcrypt to hash the password as it's generally accepted to be a very safe hashing method. In terms of tests, I decided to implement a suite of End 2 End tests to verify the API, as this is giving us the best understanding of the system as a black box, and is testing all the layers of the architecture at once - the API, the controllers, the database access services and the actual database persistence.

How to run the server:

1. cd `server`
1. run `npm install` to install dependencies
1. run `npm run start:dev` will start the dev server on port `3001` - it will also initialise the database
1. run `npm test` to run test suite

## Solution - Frontend

A simple react app is available in `/client`. Right now it's hardwired to work with the development backend. The JWT is used to submit session information to the frontend and is kept in the local storage to keep the client logged in.

How to run the frontend:

1. cd `client`
1. run `npm install` to install dependencies
1. run `npm start` to launch the frontend dev server - it will be opened in your default browser
1. you can register and log in afterwards

