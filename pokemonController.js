
//Import express library to create route handlers
const express = require ("express")

//Create a new router object from express to handle routes
const router = express.Router()

//Import out pokemon model
const Pokemon= require ('../models/pokemonSchema')

//Define a GET route to /pokemon path
router.get("/", (req,res) => {
    //Use pokemon model to query the database for all pokemon documents
    Pokemon.find({}).
    then((allPokemons) => {
        //Render index.ejs file from the views
        res.render("index.ejs",{pokemons : allPokemons})
    })
    .catch ((err) => {
        //Log the error to console to debug later
        console.error (err)
        //Send unsuccessful response message to the user
        res.status (500).send ("Error Accessing Pokemon Data")
    })
    
})

//define GET route
router.get("/new", (req, res) => {
    // Route to render the new Pokémon form
    res.render('new.ejs');
});

// Route to render the edit Pokémon form
router.get('/:id/edit', async (req, res) => {
    const pokemon = await Pokemon.findById(req.params.id);
    res.render('edit.ejs', { pokemon });
});

router.get("/pokemon", (req,res) => {
    //Use pokemon model to query the database for all pokemon documents
    Pokemon.find({})
    .then((allPokemons) => {
        //Render index.ejs file from the views 
        res.render("index.ejs", {pokemons : allPokemons})
    })
    .catch((err) => {
        //Send unsuccessful message to the user 
        res.status(500).send("Error Acesssing Pokemon Data!!!")
    })
})


//Define a get route to get the particular pokemon details
router.get("/:id", (req,res) => {
    //Retrieve particular fruit info from mongoDb
    Pokemon.findById (req.params.id)
    .then((foundPokemon) => {
        res.render ("show.ejs", {pokemons : foundPokemon})
    })
    .catch ((err) => {
        //Executes in case of error
        //Send this error message with status 500 to end user
        console.error (err)
        res.status (500).send("Error while accessing pokemon details")
    })
})

//POST route to handle form submission
router.post("/pokemon", (req, res) => {
//If checked then returns on and below code returns true, else false
//Save the pokemon details to mongodb
Pokemon.create(req.body)
.then((success) => {
    //Redirect to Pokemon
    res.redirect ("/pokemon")
})
.catch ((err) => {
    console.error (err)
    //Send back error message to end user
    res.status (500).send("Error creating a new pokemon!")
}) 
})

//Define a GET route to SHOW edit page
router.get("/:id/edit", (req,res) => {
    //use pokemon model to find a pokemon 
    Pokemon.findById(req.params.id)
    .then((foundPokemon) => {
        //Pass the found route to edit.ejs for form pre filling
        res.render("edit.ejs", {pokemons : foundPokemon})
    }).catch ((err) => {
        console.error(err)
        res.status(500).send("Error finding pokemon details to edit")
    })
})

//Route to seed fruit data into database
router.get ("/seed/sure/yes", (req,res) => {
    //Create multiple pokemon entries in the database using seed file
    //Import the seed data
    const pokemonData = require("../models/pokemon")
    Pokemon.create (pokemonData)
    .then((data) => res.redirect ("/pokemon"))
    .catch((err) => console.error (err))
})

//Define a PUT route to handle updates to specific fruit by its ID
router.put("/:id", (req,res) => {
    //Convert the ready to eat from on to boolean true/false
    req.body.readyToEat = req.body.readyToEat === "on"
    //Use the pokemon model to update it
    Pokemon.findByIdAndUpdate(req.params.id, req.body,{new:true})
    .then((updatedPokemon) => {
        //Validate if successfully updated or not
        if (!updatedPokemon) {
            throw new Error ("Pokemon details not updated")
        }

        //Redirect back to Pokemon
        res.redirect ("/pokemon")
    })
    .catch((err) => { console.error (err)
    res.status(500).send("Failed to update pokemon details")
})
})

//Create a DELETE route to delete a fruit
router.delete("/:id", (req,res) => {
    //Use pokemon model to find the pokemon by id and delete it
    Pokemon.findByIdAndDelete(req.params.id)
    .then((data) => {
        //Validate if data has been deleted or not
        if (!data) {
            throw new Error ("Nothing to delete here!")
        }

        //If successfully deleted, redirect to pokemon page
        res.redirect ("/pokemon")
    }).catch((err) => {
        //If there is an error during deletion display error to user
         //Send error response to end user
        console.error (err)
        res.status(500).send("Error deleting the pokemon!!!")
    })
})

//Export the router object to make it available in other parts of routerlication 
module.exports = router;

