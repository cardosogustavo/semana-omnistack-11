const express = require("express");

// Getting router utilities
const routes = express.Router();

// Controllers
const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

// Session route
routes.post("/sessions", SessionController.create);

// Ongs routes
routes.get("/ongs", OngController.list);
routes.post("/ongs", OngController.create);

// Profile route
routes.get("/profile", ProfileController.list);

// Incident routes
routes.post("/incidents", IncidentController.create); 
routes.get("/incidents", IncidentController.list);
routes.delete("/incidents/:id", IncidentController.delete);

// Exporting the routes variable
module.exports = routes;
