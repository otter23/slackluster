# Slackluster

Inspired by slack.com, slackluster is a full-stack web app that allows Users to live chat with other users in a given channel on both dekptop and mobile.

### Live Site:
https://slackluster.herokuapp.com/


## Main Stack Technologies

- Javascrtipt, React.js, Redux, Plain old vanilla CSS3, Express, Sequelize, PostgreSQL

## Other Major Technologies / Packages used

- dayjs (for manipulating dates)

### Features
- Create an account and log out/sign in. o r log in as a demo user
- Create, view, edit, and delete Channels with custom-built form components including channel name, topic and description inputs
- Create, view, edit, and delete Messages with custom-built form components
- The entire app utilizes web sockets (socket.io) to dynamically update statye based on other user's changes to the data in the data base
- Fully mobile friendly and partially optimized
- 
Create, view, edit, and delete Identifications with comments and a taxonomy typeahead with automated consensus calculation on Observations.
Homempage grid view with My Observations, Observations waiting to be identified by the community, and recently verified observations.

## Future Features
- add a profile photo via aws S3 upload
- Channel notifications when a new message is posted



## Getting Development Environment Up And Running

- Clone this repository (only main branch) to your local machine:
  - `bash git clone https://github.com/otter23/slackluster.git `
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

- ## CSS

  - Working without a framework can be very challenging to get things to behave as intended.


# slackluster in Action

## Splash page

## log-in / signup

## main app view

## channel details

## forms

## fully mobile optimized

