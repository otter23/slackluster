# Slackluster

Live Site: https://slackluster.herokuapp.com/

Git Wiki: https://github.com/otter23/slackluster

## Slackluster at a Glance

Slackluster is a full stack application clon of Slack.com

## Application Architecture and Technologies

- Javascript, React.js, Redux, HTM5L, CSS3, Express, PostgreSQL, Sequelize

## Getting Development Environment Up And Running

- Clone this repository (only this branch) to your local machine:
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
  - run: `cd backend/`
  - run: `npm start`
- Start Frontend Server:
  - run: `cd frontend/`
  - run: `npm start`

## Challenges

- ## CSS

  - Working without a framework can be very challenging to get things to behave as intended.
