const knex = require("knex");
const configuration = require("../../knexfile");

// Connection to DB with the development configuration
const connection = knex(configuration.development); 

// Exporting the connection variable
module.exports = connection;