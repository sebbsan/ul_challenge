# ul_challenge

UL Challenge

Solution:
In `/server` a Node Express Server is providing the following API:

`POST /register` with payload, example:

```
{
      "fullName": "Sebastian Weikart",
      "email": "sebastian.weikart@gmail.com",
      "password": "abc12121212a"
}
```

will create a new user.

`POST /login` with payload, example:

```
{
      "email": "sebastian.weikart@gmail.com",
      "password": "password"
}
```

Will login a user by returning a JWT.
The system does not maintain a session - instead a JWT is created which can be validated by a client to verify that a uaer has logged in.

As persistence layer, SQLLite is used.
How to run the server:

1.  cd `server`
1.  run `npm install` to install dependencies
1.  run `npm run migrate` to create and migrate the schema your local database (SQLLite3 is configured)
1.  run `npm test` to run test suite
1.  start the server with `npm run`
