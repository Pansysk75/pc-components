# PC Components App

Project for the Databases course in Aristotle University of Thessaloniki - 2023

## Developers
- Panos Syskakis
- Catherine Papadopoulou
- Nick Liouliakis

## Project Info
The project's main purpose is to develop an app that uses the SQL database we created in previous assignments.

The app consists of three parts: 
 1. A MySQL database
 2. A REST API server (Flask)
 3. A web app (HTML-CSS-JavaScript using Express-NodeJs)

The web app is deployed [here](http://159.89.215.209/)

For further details on how to run the API Server and the web app locally, follow the instructions in the corresponding folders.

## Limitations
1. User authentication is not handled properly. To mimic user-specific privileges, the visibility of some front-end elements is changed depending on the user's Username, but the web scripts and the API permit all actions from every user.
2. Not as efficient as it could be. For example, when creating a build, all components are fetched from the API, and the filters are only applied locally.
3. The coding style is not consistent in some places.
4. Not much user input validation. Issues such as SQL injection are prevented by PyMySQL, but better input validation would make the app more secure and the error messages more helpful.
