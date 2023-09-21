# Tender-Testing (Notes App)

This repository contains the backend for a notes application that has been deployed to render.com. The frontend has been bundled into a production build and is stored as the build folder. This was my first attempt at deploying an application hence the name of the folder. Below, I document brief information about the various folders and files in the repository:

# controllers

This folder contains router files that handle requests made to the server e.g. post request made to create new notes on the server stored in notes.js file, post request made to create new users for the application stored in the users.js, post request for existing user to log into the application stored in login.js file and get request to fetch all and individual note resources from the server.

# models

The folder contains model files (template specification) for creating new users (user.js file) or new notes (note.js file).

# requests

Requests folder contain test request made to the server to fetch or create notes done with the VS Code rest client.

# tests

Tests folder contains various test files used for testing implemented functionality in the application. For instance, note_api.test.js is used to test note creation, updating and fetching from the server. Files like average.test.js, reverse.test.js are used to understand the concept of testing web apps.

# utils

Utils folder contains files like middleware.js for creating middlewares, for_testing.js used to create functions for learning web apps testing, logger.js for printing info and error about various processes in the app to the console and config.js that defines the port the application is run on and connects the app to MongoDB based on the mode the app is run in (test or dev mode).

Other files include: .env file for creating environment variables, eslintrc.js for eslint configuration, index.js for starting up the server and app.js to connect all routers together, middleware to files they're needed in and connect the app to MongoDB database .
