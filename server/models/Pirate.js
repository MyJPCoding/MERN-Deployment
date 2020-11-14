const mongoose = require("mongoose");

const PirateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [2, "Names must be two or more characters!"]
    },
    imageUrl: {
        type: String,
        required: true,
        minlength: [4, "Smallest url must be 4 characters"],
    },
    chests: {
        type: Number,
        required: true,
    },
    catchPhrase: {
        type: String,
        required: true,
        minlength: [2, "Catch Phrase must be two or more characters!"]
    },
    crewPosition: {
        type: String,
        required: true
    },
    pegLeg: {
        type: Boolean
    },
    eyePatch: {
        type: Boolean
    },
    hookHand: {
        type: Boolean
    },
}, {timestamps: true});

mongoose.model("Pirate", PirateSchema);