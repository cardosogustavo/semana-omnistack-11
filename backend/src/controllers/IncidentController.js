// Import connection to db
const connection = require("../database/connection");

module.exports = {
    // List incidents
    async list(request, response){
        // Pagination
        const { page = 1 } = request.query;
    
        // Total of items 
        const [count] = await connection("incidents").count();

        const incidents = await connection("incidents")
            .join("ongs", "ongs.id", "=", "incidents.ong_id")
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                "incidents.*",
                "ongs.name",
                "ongs.email",
                "ongs.whatsapp",
                "ongs.city",
                "ongs.uf"
            ]);


        // Header to response with total items
        response.header("X-Total-Count", count["count(*)"]);

        return response.json(incidents);
    },
    // Create incident
    async create(request, response) {
        // Getting HTTP body request
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        // Getting the ID of the ong
        const [id] = await connection("incidents").insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id });
    },

    // Delete incident
    async delete(request, response) {
        // Get the ID from the params
        const { id } = request.params;

        // Getting the ong id to compare with the id
        const ong_id = request.headers.authorization;

        const incident = await connection("incidents")
            .where("id", id)
            .select("ong_id")
            .first();

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: "Operation not permitted"});
        }

        await connection("incidents").where("id", id).delete();

        return response.status(204).send();
    }
}