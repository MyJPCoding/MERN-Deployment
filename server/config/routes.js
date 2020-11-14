const pirate = require("../controllers/pirate");


module.exports = (app) => {
    app.get("/pirate", pirate.findAll);
    app.post("/pirate", pirate.create);
    app.get("/pirate/:id", pirate.findOne);
    app.delete("/pirate/:id", pirate.delete);
    app.put("/pirate/:id", pirate.update);
}