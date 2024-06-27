//Import Mongoose library for mongoDb interaction
const mongoose = require("mongoose")

//Define the schema for the pokemon colletion
const pokemonSchema = new mongoose.Schema ({

      id: { type: String, unique: true },
      name: { type: String, required: true },
      img: { type: String },
      type: [{ type: String }], 
      stats: {
        hp: { type: String, required: true },
        attack: { type: String, required: true },
        defense: { type: String, required: true },
        spattack: { type: String, required: true }, 
        spdefense: { type: String, required: true },
        speed: { type: String, required: true },
      },
      moves: {
        level: [{
          learnedat: String,
          name: { type: String, required: true },
          gen: { type: String, required: true },
        }],
        tmhm: [{
          learnedat: String,
          name: { type: String, required: true },
          gen: { type: String, required: true },
        }],
        egg: [{
          name: { type: String, required: true },
          gen: { type: String, required: true },
        }],
        tutor: [{
          name: { type: String, required: true },
          gen: { type: String, required: true },
        }],
        gen34: [{
          name: { type: String, required: true },
          method: { type: String, required: true },
        }],
      },
      damages: {
        normal: String,
        fire: String,
        water: String,
        electric: String,
        grass: String,
        ice: String,
        fight: String,
        poison: String,
        ground: String,
        flying: String,
        psychic: String,
        bug: String,
        rock: String,
        ghost: String,
        dragon: String,
        dark: String,
        steel: String,
      },
      misc: {
        sex: {
          male: String,
          female: String,
        },
        abilities: {
          normal: [String],
          hidden: [String],
        },

        classification: String,
        height: String,
        weight: String,
        capturerate: String,
        eggsteps: String,
        expgrowth: String,
        happiness: String,
        evpoints: [String],
        fleeflag: String,
        entreeforestlevel: String,
      }
    })

//Create a model from the schema
const Pokemon = mongoose.model ("Pokemon", pokemonSchema)

//Export the fruit model to be used in our application
module.exports = Pokemon