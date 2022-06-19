# Slackluster

Inspired by slack.com, slackluster is a full-stack web app that allows Users to live chat with other users in a channel on both desktop and mobile.

### Live Site:
https://slackluster.herokuapp.com/

### Main Stack Technologies

- Javascrtipt, React.js, Redux, Plain old vanilla CSS3, Express, Sequelize, PostgreSQL

### Other Major Technologies / Packages used

- socket.io (for WebSockets)
- dayjs (for manipulating dates)

### slackluster in Action

![slackluster-example](https://user-images.githubusercontent.com/8154112/174501167-33303e7a-b373-4ce7-98dd-ee584353d03e.gif)

### Features
- Create an account and log out/sign in. or log in as a demo user
- Create, view, edit, and delete Channels with custom-built form components including channel name, topic and description inputs
- Create, view, edit, and delete Messages with custom-built auto res-sizing textarea component
- The entire app utilizes WebSockets (via socket.io) to dynamically update redux state based on other user's changes to the data in the data base
- Fully mobile friendly and partially optimized

### Future Features
- add a profile photo via AWS S3 upload
- Channel notifications when a new message is posted with scroll to bottom button
- message reactions
- direct messages and group messages

### Getting your Development Environment Up And Running

- Clone this repository (only main branch) to your local machine:
  - run: `bash git clone https://github.com/otter23/slackluster.git `
- Install Dependencies:
  - run: `npm install` in the root folder
- In /backend folder
  Create a '.env' file based on the 'example.emv' with proper settings for your development environment
  - Create a user in your local postgreSQL database that matches your .env
    - run: `psql -c "CREATE USER <username> PASSWORD '<password>' CREATEDB"`
  - run the following commands in order:
    - `npx dotenv sequelize create:db`
    - `npx dotenv sequelize db:migrate`
    - `npx dotenv sequelize db:seed:all`
- Start Backend Server:
  - run: `cd backend/ && npm start`
- Start Frontend Server:
  - run: `cd frontend/ && npm start`

## Challenges

- Socket.io:
  - new technology hadn't previously worked on, designing the data flow, so only one trip to the backend
- Dynamic CSS styling:
  - utilized js/css to keep the user at the bottom of the scroll view when appropriate as well as dynamically resize the add message textarea form and keep the scroll container the correct size to display overflow contents correctly 
  - in general, working without a css framework can be very challenging to get things to behave as desired.
