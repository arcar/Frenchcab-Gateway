const axios = require("axios");


async function getVersion() {

    console.log("URL Python :", process.env.BACKEND_URL);

    try {

        const response = await axios.get(`${process.env.BACKEND_URL}/modele/version`);

        return response.data;

    } catch (error) {

        console.log(error.message);

        throw new Error(
            "Impossible de contacter l'API Python"
        );

    }

}

module.exports = {getVersion};