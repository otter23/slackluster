/*
//create .gitignore file
//create backend and frontend folders

//BACKEND FOLDER

//Initialize a node module
  ~$ npm init -y

//Install dependencies:
  ~$ npm install bcryptjs cookie-parser cors csurf dotenv express \
  express-async-handler express-validator helmet jsonwebtoken morgan per-env \
  pg@">=8.4.1" sequelize@5 sequelize-cli@5

  ~$ npm install -D dotenv-cli nodemon

//add .env file
  -update file based on .env.example

//generate a JWT strong secret:
  ~$ openssl rand -base64 10
    -a library that should already be installed in your shell
    -create a random string using openssl
  ALT:
  ~$ node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

//add folder and file config/index.js
  -export an object that packages all the .env variables in a nice object with nice key names

//add .sequelizerc to root
  -tells sequelize where to initialize, and to look in /config/database.js for its db configuration

//add db/ to root

~$ npx sequelize init
  -creates database.js in config/ folder
  -creates  migrations/ models/ seeders/ folders in db/ folder

//create username that matches .env
  -can run psql command from CL
    ~$ psql -c "CREATE USER <username> PASSWORD '<password>' CREATEDB"
  -or can run query in psql directly
    =# CREATE USER <username> WITH PASSWORD '<password>' CREATEDB;

//create the database using sequelize-cli
  ~$ npx dotenv sequelize db:create
    -^'dotenv' tells sequelize to load db config env vars from the .env file


EXPRESS SETUP:
  -create express app.js
    -import numerous packages
  - add numerous middleware to app
  -create routes folder and index.js
    import route and add it to app
  -create folder and file bin/www
    -authenticates database connection
    -then starts express application to listen for server requests on .env port
  -add scripts to package.json
    "scripts": {
      "sequelize": "sequelize",
      "sequelize-cli": "sequelize-cli",
      "start": "per-env",
      "start:development": "nodemon -r dotenv/config ./bin/www",
      "start:production": "node ./bin/www"
    }
    also add sequelize script:
      "clean": "npx dotenv sequelize db:drop && npx dotenv sequelize db:create && npx dotenv sequelize db:migrate && npx dotenv sequelize db:seed:all"

  -add api route in routes/ import it in routes/index.js
  -add error handlers to app.js (inc sequelize error handlers)
  -add Users Table to sequelize and db (see sequelize below)


SEQUELIZE:

//add Users table migration and model files
  ~$ npx sequelize model:generate --name Users --attributes email:string,hashedPassword:string,username:string,title:string,onlineStatus:boolean,imageUrl:text
//add database-level constraints to migration file
//add model-level constraints and validations to model file:
    -use sequelize validator package
    https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
    //If a validation fails, no SQL query will be sent to the database at all.
    //Constraint is defined at SQL level, a constraint error will be thrown by db
    after a sql query and sequelize will forward it to javascript
//add User model scoping to prevent hashed password from leaving db
    https://sequelize.org/docs/v6/other-topics/scopes/
    -scopes help protect sensitive user information that should not be exposed to other users.
//add User Model methods for API route interaction with User table into model file

//migrate table
  ~$ npx dotenv sequelize db:migrate

  //add User table seed file
  ~$ npx sequelize seed:generate --name demo-user
//update seed file with user record objects
//seed all
  ~$ npx dotenv sequelize db:seed:all
//to undo all seed file
  ~$ npx dotenv sequelize db:seed:undo:all

//check database for correct table creation
  `$ psql <database name> -c 'SELECT * FROM "Users"'

//repeat above for the following in order
npx sequelize model:generate --name User --attributes email:string,hashedPassword:string,username:string,title:string,onlineStatus:boolean,imageUrl:text
npx sequelize model:generate --name Channel --attributes ownerId:integer,name:string,topic:string,description:string,isPrivate:boolean
npx sequelize model:generate --name Group --attributes creatorId:integer
npx sequelize model:generate --name Thread --attributes creatorId:integer
npx sequelize model:generate --name Message --attributes ownerId:integer,channelId:integer,groupId:integer,threadId:integer,content:text
npx sequelize model:generate --name UserChannel --attributes userId:integer,channelId:integer
npx sequelize model:generate --name UserGroup --attributes userId:integer,groupId:integer,hidden:boolean

npx sequelize seed:generate --name demo-user-data &&
npx sequelize seed:generate --name channel-data &&
npx sequelize seed:generate --name group-data &&
npx sequelize seed:generate --name thread-data &&
npx sequelize seed:generate --name message-data &&
npx sequelize seed:generate --name usersChannels-data
npx sequelize seed:generate --name usersGroups-data


//Slackluster Associations

//Users:
  * User hasMany Messages  /  Message belongsTo Users *

      User.hasMany(models.Message, { foreignKey: "ownerId" });
      Message.belongsTo(models.User, { foreignKey: "ownerId" });

  * User hasMany Channels  /  Channel belongsTo User *

      User.hasMany(models.Channel, { foreignKey: "ownerId" });
      Channel.belongsTo(models.User, { foreignKey: "ownerId" });

  * User hasMany Groups  /  Group belongsTo User *

      User.hasMany(models.Group, { foreignKey: "creatorId" });
      Group.belongsTo(models.User, { foreignKey: "creatorId" });

  * User hasMany Threads  /  Thread belongsTo User *

      User.hasMany(models.Thread, { foreignKey: "creatorId" });
      Thread.belongsTo(models.User, { foreignKey: "creatorId" });

//Messages:
  * Channel hasMany Messages  /  Message belongsTo Channel *

      Channel.hasMany(models.Message, { foreignKey: "channelId" });
      Message.belongsTo(models.Channel, { foreignKey: "channelId" });

  * Group hasMany Messages  /  Message belongsTo Group *

      Group.hasMany(models.Message, { foreignKey: "groupId" });
      Message.belongsTo(models.Group, { foreignKey: "groupId" });

  * Thread hasMany Messages  /  Message belongsTo Thread *

      Thread.hasMany(models.Message, { foreignKey: "threadId" });
      Message.belongsTo(models.Thread, { foreignKey: "threadId" });

//Many to Many:
  * User hasMany Channels  /  Channels hasMany User *

    const columnMapping = {
          through: "UserChannel",
          otherKey: "channelId",
          foreignKey: "userId",
      };

    User.belongsToMany(models.Channel, columnMapping);

    const columnMapping2 = {
          through: "UserChannel",
          otherKey: "userId",
          foreignKey: "channelId",
      };

    Channel.belongsToMany(models.User, columnMapping2);

  * User hasMany Groups  /  Groups hasMany User *

    const columnMapping3 = {
          through: "UserGroup",
          otherKey: "groupId",
          foreignKey: "userId",
      };

    User.belongsToMany(models.Group, columnMapping3);

    const columnMapping4 = {
          through: "UserGroup",
          otherKey: "userId",
          foreignKey: "groupId",
      };

    Group.belongsToMany(models.User, columnMapping4);




Heroku CLI - Connect to DB
  ~$ heroku pg:psql postgresql-colorful-48595 --app slackluster
  =# \dt - list tables
  =# \d table_name - describe a table
  =# select * from "Table"  to see data

  heroku run npm run sequelize db:migrate
  heroku run npm run sequelize db:seed:all


EXPRESS AUTHENTICATION FLOW:

The backend login flow in this project will be based on the following plan:
  1) The API login route will be hit with a request body holding a valid credential
     (either username or email) and password combination.
  2) The API login handler will look for a User with the input credential in
     either the username or email columns.
  3) Then the hashedPassword for that found User will be compared with the input
     password for a match.
  4) If there is a match, the API login route should send back a JWT in an
     HTTP-only cookie and a response body. The JWT and the body will hold the
     user's id, username, and email.

The backend sign-up flow in this project will be based on the following plan:
  1) The API signup route will be hit with a request body holding a username,
     email, and password.
  2) The API signup handler will create a User with the username, an email, and
     a hashedPassword created from the input password.
  3) If the creation is successful, the API signup route should send back a JWT
     in an HTTP-only cookie and a response body. The JWT and the body will hold
     the user's id, username, and email.

The backend logout flow will be based on the following plan:
  1) The API logout route will be hit with a request.
  2) The API logout handler will remove the JWT cookie set by the login or
     signup API routes and return a JSON success message.

Add User Auth Middlewares:
    -setTokenCookie()
      -sets a JWT cookie after user is logged in or signed up
    -restoreUser()
      -used for routes that require the identity of the current session use
      -"restores" session user based on JWT cookie created at log in/sign up
      -if user is found, adds user to a key on the req obj for later use in the route
      -if no user found, it removes the token cookie from the response
    -checkUserSession()
      -checks if restoreUser actually added a user to req.user
        -if req.user exists, then allows route to move on to next middleware
        -otherwise throws an error not allowing request to continue
    -requireAuth
      -array of 2 middleware
        -restoreUser
        -checkUserSession
      -ensures a session user was added to the request in req.user

Add User Auth Routes:
  -add user.js and session.js to routes/api/ folder
  -add following routes:

    -Login: POST /api/session
      -uses credentials and password to check db for existing user
      -if finds a use, sets token cookie, otherwise sends error

    -Logout: DELETE /api/session
      -sends HTTP request to remove the token cookie from browser
        -sets cookie value to 0 and adds expires=past date to cookie
      -also sends back "success" message

    -Signup: POST /api/users
      -is user successfully created in db, then add a jwt token cookie
      -otherwise passes sequelize validation error to error handler

    -Get session user: GET /api/session
      -returns the current session user as JSON under the key of user, if none exists returns {}

Add User Auth Route Error Request Body Validations:
    -use express-validator package to check form fields are ok before sending sql to db
    -validationResult gathers the results of all the check() middlewares that were run to
    determine which parts of the body (various keys) are valid and invalid.
    -validate log in and sign up request bodies



// FRONTEND FOLDER

create react template
  ~$ npx create-react-app . --template @appacademy/react-v17 --use-npm

Add dependencies:
  ~$ npm install js-cookie react-redux react-router-dom@^5 redux redux-thunk
  ~$ npm install -D redux-logger

Setup Redux Store

ALT with redux pre-added:
  ~$ npx create-react-app . --template @appacademy/react-redux-v17 --use-npm
  npm install js-cookie

add proxy to package.json

setup CSRF for both production and development environments
  - In development, the backend and frontend servers are separate
  - In production, the backend also serves up all the frontend assets, including
    the index.html and any JavaScript files in the frontend/build folder after
    running npm start in the frontend folder.

  -add a XSRF-TOKEN to any fetch requests that aren't HTTP "GET"
    -in production, add a XSRF-TOKEN to the frontend/build/index.html file
    -serve this file at "/" and any non /api routes using express.static middleware
      -attach XSRF-TOKEN cookie to that response
    -in development, need to call fetch to backend route that will send the
     cookie in response before loading application

add state to store to hold session information

Create log in component
  -create thunk action to handle log-in form submission
Create sign up component
  -create thunk action to handle signup form submission
Create log ou component
  -create thunk action to handle logout request

//week 15 - Authenticate Me Part 3: Deploy

//setup root with package.json to communicate with heroku
    //backend will serve the static frontend build

//Setup connection with Heroku
  ~$ heroku login
  heroku git:remote -a <name-of-Heroku-app>
    ~$ heroku git:remote -a slackluster

  Add enviro vars to heroku
    JWT_SECRET=xxxx
    JWT_EXPIRES_IN=604800
  //when ready for first build
    ~$ git push heroku main
    ~$ heroku run npm run sequelize db:migrate
    ~$ heroku run npm run sequelize db:seed:all
    ~$ heroku bash - open a shell if want

socket.io
backend: ~$ npm install socket.io
      -update .config/index.js with cors_origin .env variable
      -add a socket folder and setup a index.js file to instantiate the socket server
      -connect the express app and socketio in the /bin/www file and turn the connection on
frontend: ~$ npm install socket.io-client
      -import { io } from 'socket.io-client' and instantiate it then can start using it
      -create context to house socket instance and protect instantiation with auth

Make a gif:
  http://www.highchairdesign.com/2018/11/animated-gif-from-mov-copy.html
 ~$ brew install ffmpeg
 ~$ brew install gifsicle
 ~$ ffmpeg -i slackluster-example.mov -s 1200x1006 -pix_fmt rgb24 -r 10 -f gif - | gifsicle --optimize=3 --delay=8 > slackluster-example.gif

*/
/*

Challenges:
  socket.io - getting working in global react context (useRef) and getting working with express routes
  modals - click propagation
  css - inline styling wrap, scroll bar
  dynamic message display based on user, date and time
  dynamic resizing of chat/messages
  mobile optimization


TO FIX:
  -scroll to bottom after submit message
  -Fix modals so dragged click doesn't register outside
  -404 about page


FUTURE TODO:
  -add automatic messages when updating channel description or topic
  -add edited status boolean to a message table

  -link highlighting in message input
  -new message notification on side menu

  -check all message submission error handling
  -route protection? change main page path to exact ?


Future work:
  -landing page - choose your workspace
  -loading all messages in history is not efficient, won't scale as a chanel's messages grow, need to learn infinite scale
  -add state to hold a channel's current unsent message, would need to persist even if channel unmounts, could be in redux state, but not in db
  -add button for scroll to bottom of chat when new message
  -notify channel there are new messages (button)
  -add transition for deletion of message - http://reactcommunity.org/react-transition-group/transition
      -https://gist.github.com/Yarith/bcd7b715cff302fdf4512f538b769521
  -change app load to be only depended on isLoaded, and then route specific waiting for other slices of redux state




redux toolkit?
react-images-uploading - npm
rfdc - clone package npm


//SPA where only clicks can navigate
    //represent userId with a UUID
    //each URL is just a reference to something else under the hood
    //this gets parsed under the hood, so people can't just randomly peruse your site
    //that or you don't have urls at all
    //click handler in the img map list and don't user url param, pass down imageUrl form image object as prop


*/
