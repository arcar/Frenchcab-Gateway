const axios = require("axios");

// Récupère la liste des zones avec l'API Python
async function getZones() {

    try {

        const response = await axios.get(
            `${process.env.BACKEND_URL}/zones`
        );

        return response.data;

    } catch (error) {

        console.log(error.message);

        throw new Error(
            "Impossible de contacter l'API Python"
        );

    }

}

module.exports = {getZones};