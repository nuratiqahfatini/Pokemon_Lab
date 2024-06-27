//import express library
const express = require("express");

//import mongoose library to interact with mongoDb
const mongoose = require ("mongoose")

//import the method override package to convert post to delete or put/patch
const methodOverride = require ("method-override")

//Initialize the Express application
const app = express();

//Use method override
app.use(methodOverride("_method"))

//Import and configure dotenv to load env variables from .env files
require("dotenv").config();

//set the port for the server to listen, default to 3000
const port = process.env.PORT || 3000;

//Mongo Connection URI
//configuration to connect to mongodb
const mongoURI=`mongodb+srv://${process.env.mongo_user}:${process.env.mongo_pass}@${process.env.mongo_host}/${process.env.mongo_db_name}`

mongoose
.connect(mongoURI)
.then(() => {
    console.log("The connection to Mongo DB was successful")
})
.catch((error) => {
    //This block executes if the initial connection fails
    console.error("Error connecting to Mongo DB: ", error)
}); 

//Middleware to parse URL encoded data
app.use(express.urlencoded({ extended: false }));

//Import the router file pokemonController.js
const pokemonRouter = require("./controller/pokemonController")

//Redirect requests to pokemon controller
app.use("/pokemon",pokemonRouter)

//Redirect root route
app.get("/", (req,res) => {
    res.redirect("/pokemon")
})

//Start server on specified port and log a message
app.listen(port, () => console.log("listening on port: ", port));

