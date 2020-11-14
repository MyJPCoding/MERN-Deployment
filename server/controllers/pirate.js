const mongoose = require("mongoose");
const Pirate = mongoose.model("Pirate");

module.exports = {
    create: (req, res) => {
        Pirate.create(req.body)
            .then(pirate => res.json(pirate))
            .catch(err => res.status(400).json(err));
    },
    findAll: (req, res) => {
        Pirate.find()
            .then(pirate => res.json(pirate))
            .catch(err => res.status(400).json(err));
    },
    findOne: (req, res) => {
         Pirate.findOne({_id: req.params.id})
            .then(pirate => res.json(pirate))
            .catch(err => res.status(400).json(err));
    },
    update: (req, res) => {
        Pirate.findOneAndUpdate({_id: req.params.id}, req.body, {runValidators: true, new: true})
            .then(pirate => res.json(pirate))
            .catch(err => res.status(400).json(err));
    },
    delete: (req, res) => {
        Pirate.deleteOne({_id: req.params.id})
            .then(pirate => res.json(pirate))
            .catch(err => res.status(400).json(err));
    }
}