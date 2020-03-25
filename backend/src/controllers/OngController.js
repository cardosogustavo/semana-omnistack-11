// Getting crypto package
const crypto = require("crypto");
// Connection to db
const connection = require("../database/connection");

module.exports = {
    // List all the ongs
    async list(request, response) {
        const ongs = await connection("ongs").select("*");

        return response.json(ongs);
    },

    
    // Create new entry in table ongs
    async create(request, response) {
        // Getting the body from HTTP request
        const { name, email, whatsapp, city, uf } = request.body;

        // Creating a random ID (4 bytes converted to HEX characters)
        const id = crypto.randomBytes(4).toString("HEX");

        // Inserting values to db table
        await connection("ongs").insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });

        return response.json({ id });
    }
};
