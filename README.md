# Your Application Name
Fifo web app

## Running the Application
To run the application, use the following command:
- npm run start

## Running Tests
To run the tests, use the following command:
- npm run test


## MongoDB Connection
### App Database
- URL: mongodb+srv://atlascluster.1eln5es.mongodb.net/fifo-db?retryWrites=true&w=majority
- Host: atlascluster.1eln5es.mongodb.net
- Authentication User & Password:
  - User: mongodb-user
  - Password: vNXBObWAlXbs00Kv
  - DB Name: fifo-db

### Test Database
- URL: mongodb+srv://atlascluster.1eln5es.mongodb.net/fifo-test?retryWrites=true&w=majority
- Host: atlascluster.1eln5es.mongodb.net
- Authentication User & Password:
  - User: mongodb-user
  - Password: vNXBObWAlXbs00Kv
  - DB Name: fifo-test

Enjoy your time! :)


## Context
- All the queue is managed by a cron & web-socket to communicate to the front-end.
- That was my first time with mongodb / mongoose / jest :) (was working with postgreSQL & typeORM)

## Technos
- All tests are made with jest & ts-jest

## Why not using BullMQ ?!
I discovered bullMQ library but after writing all my back code so it was too late to refacto all of my code with this lib.
