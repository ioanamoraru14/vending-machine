# [![Sails.js logo](http://balderdashy.github.io/sails/images/logo.png "Sails.js")](http://sailsjs.com)

# Boilerplate Sails.js

A [Sails](https://sailsjs.com) boilerplate application


### Features

+ JWT Authentication (Bearer)
+ Password encryption (bcrypt)
+ Authentication middleware

On branch `websockets`
+ Socket Authentication

## Setup

### Intall everything
```sh
npm install
```

### Setup env
```sh
cp .env.example .env
```

Update `DATABASE_URL` with your details

### Lift sails
```
# fire up the server
sails lift
```

**When using branch `websockets`:**  
After you are connected, make a `PUT` request to `/socket` to update the `socket_id` of the user in database
