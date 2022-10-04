Smart-booking

Simple website for listing and booking hotels created by express and handlebars for back-end. It uses MongoDB Atlas as database for the back-end, but it can be easily switched to local database.

Supported functionality: login, register, logout, create, edit, search and delete. Passwords for users are stored hashed in database using Bcrypt.

package.json for client installs express, mongoose and express-handlebars, and some other libraries needed.

live demo: https://project-car-shop.herokuapp.com/

Local installation:

Download zipped folder
Open folder in terminal and run npm i
Create .env file in root directory and set DB_USERNAME and DB_PASSWORD there as global ENV variables
Install MongoDB locally and set address in /models/index.js
Server is set to port 3000, but you can change it in /root folder/index.js
Run "npm run local"
Open browser at http://localhost:3000 or http://127.0.0.1:3000
Enjoy :)