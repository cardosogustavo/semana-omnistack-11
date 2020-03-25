// Const to save the framework
const express = require("express");
const routes = require("./routes");
const cors = require("cors");


// Const that includes all he framework functionality
const app = express();

// Inform app that will use JSON
app.use(express.json());

app.use(cors());
app.use(routes);

/**
 * Tipos de parâmetros
 * 
 * Query params: Parâmetros nomeados enviados na rota após "?" (filtros, paginação)
 * Route params: Parâmetros utilizados para identificar recursos (/users)
 */

// Listen on that port
app.listen(3333);