# ul_challenge

## Requirements

- MacOS or Linux Operating System
- NodeJS version 12 or higher
- git

## Get Started

- Clone the whole repository with `git@github.com:sebbsan/ul_challenge.git`
- Start the backend
- Build the frontend

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

I decided to use sessionless authentication using a JWT to avoid creating a server state and make things more complicated.
As persistence layer, SQLLite is used, but other databases can be swapped in if needed.
I decided to use bcrypt to hash the password as it's generally accepted to be a safe hashing method.
I decided to implement a suite of End 2 End tests to verify that the API, the controllers and the database access works.
How to run the server:

1. cd `server`
1. run `npm install` to install dependencies
1. run `npm run start:dev` will start the dev server - it will also initialise the database
1. run `npm test` to run test suite

## Solution - Frontend

A simple react app is available in `/client`. Right now it's hardwired to work with the development backend.
