<!-- 1.Create Project -->

npm init -y

<!-- 2.Install dependencies -->

npm i express mssql dotenv jsonwebtoken bcryptjs cookie-parser cloudinary socket.io
In package.json => set "type":"module" to use ES6 module syntax

<!-- 3.Install nodemon as dev dependency to run our server on change. -->

npm i nodemon -D
In package.json => scripts => "start":"nodemon server.js"
In package.json => "type":"module", import statement must have .js extension.

<!-- 4.Create .env file -->

Everything that comes from .env is a string.

<!-- 5.Accessing .env variables -->

require("dotenv").config();
process.env.<NAME*FROM*.ENV_FILE>
