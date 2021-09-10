/* app.js

#newDate  is new instance of date converted to tring
#server   is the server address to send and receive information
#apiUrl   is instance of base API URL to get information and zip code = as user entry
#myApiKey is my personal API Key generated from my account on openweathermap.org
#error    is instance of error HTML DOM object

-- Using four main functions to get the weather forecasting Details from api.openweathermap.org

1-reqApiData
  Get entry values, fetch data from API and handle error if any on UI
  Async function and await keyword to make promises to return data while use try-catch statement with condition

2-postData
  Use post route to retrive data from Weather-Jornal server.js and handle error if any on UI
  Async function and await keyword to make promises to return apiRes while use try-catch statement
  Added POST route to ensure correct retrieval of data from the server.

3-updateUI
  post data to update user interface and handle error if any on UI
  Async function and await keyword to fetch data while use try-catch statement and save to server

4-generate
  Set the received weather forecasting Details to the entry result objects called by event listener
  get values with condition to confirm received data then execute next code

-- Using event listener to the Generate button HTML DOM to execute function 4-generate in case of click


### Project Objective

This project was about working with Web APIs and asynchronous code, 
creating a web app that uses OpenWeatherMap API to get weather based on user's location, and dynamically update UI.

### Building
To get the project up and running I followed these steps:
1. Setting up project environment, making sure I have Node and packages installed, and included in my server.js file.

1. Acquired API credentials from OpenWeatherMap website.
1. Created async functions to fetch weather data and store it on my local server. 
1. Set up a function that updated UI dynamically.


*/

let newDate      = new Date().toDateString();
const server     = "http://127.0.0.1:4000";
const apiUrl     = "https://api.openweathermap.org/data/2.5/weather?zip=";
const myApiKey   = ",&appid=7910e16f620f566a2edd8d3e9448c296&units=metric";
const error      = document.getElementById("error");

const reqApiData = async (zip) => {
try {const res   = await fetch(apiUrl + zip + myApiKey);
const data       = await res.json();
if (data.cod != 200) {error.innerHTML = data.message;
setTimeout((_) =>  (error.innerHTML = ""), 2000);
throw `${data.message}`;} return data;} catch (error) {console.log(error);}};

const postData   = async (url = "", info = {}) => {
const res        = await fetch(url, { method: "POST",
headers: { "Content-Type": "application/json", },
body: JSON.stringify(info),});
try {const apiRes = await res.json();
console.log(`Data saved!`, apiRes);
return apiRes;} catch (error) {console.log(error);}};

const updateUI = async () => {
const res = await fetch(server + "/all");
try {const saveApiRes = await res.json();
document.getElementById("date").innerHTML = saveApiRes.newDate;
document.getElementById("city").innerHTML = saveApiRes.city;
document.getElementById("temp").innerHTML = saveApiRes.temp + " ℃";
document.getElementById("description").innerHTML = saveApiRes.description;
document.getElementById("content").innerHTML = saveApiRes.feelings;} 
catch (error) {console.log(error);}};

const generate = () => {
const zip = document.getElementById("zip").value;
const feelings = document.getElementById("feelings").value;
reqApiData(zip).then((data) => {
if (data) { const {main: { temp },name: city, weather: [{ description }],} = data;
const info = {newDate, city, temp: Math.round(temp), description, feelings, };

postData(server + "/add", info); updateUI();
document.getElementById("entry").style.opacity = 1;}});};

document.getElementById("generate").addEventListener("click", generate);