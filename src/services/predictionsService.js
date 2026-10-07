const axios = require("axios");

// Demande une estimation de durée à l'API Python
async function predireDuree(demande) {

    try {

        const response = await axios.post(
            `${process.env.BACKEND_URL}/predictions/duree`,
            demande
        );

        return response.data;

    } catch (error) {

        console.log(error.message);

        // On garde le statut renvoyé par le backend (422, 503...)
        const err = new Error(
            error.response?.data?.detail || "Impossible de contacter l'API Python"
        );
        err.status = error.response?.status || 500;
        throw err;

    }

}

module.exports = {predireDuree};