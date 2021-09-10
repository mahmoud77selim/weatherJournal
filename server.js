/* server.js

// installed Express, Cors, BodyParser using node package manager from command line in the project path.
// npm  install express.
// npm  install cors.
// npm  install body-parser express now included body-parser middleware by default.

// Setup JS empty object to act as all routes endpoint.

// set express as required to run server and routes.
// take instache from express and declear it as app and start the instance.

// set cors as required to run the routes of the server it's a mechanism to indicate other server origins without security restriction between the server and the front end
// use Cors for cross origin requests allowance for the instance.

// set body-parser as required to run the routes of the server.

// Middleware
// configuring express to use body-parser as middle-ware.
// Initialize project main folder.

// function GET/POST get route
// function to test, spin up the server.

*/

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

projectData = {};

app.use(express.static("website"));
const getAll = (req, res) => res.status(200).send(projectData);
app.get("/all", getAll);

const postData = (req, res) => { projectData = req.body; console.log(projectData); res.status(200).send(projectData);}
app.post("/add", postData);

const port = 4000;
const hostname = "127.0.0.1";
const listening = () =>

console.log(`The server is running @ http://${hostname}:${port}`);
app.listen(port, listening);
