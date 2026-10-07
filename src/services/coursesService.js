const axios = require("axios");

// Transforme une erreur axios en erreur avec le statut du backend
function convertirErreur(error) {
    console.log(error.message);
    const err = new Error(
        error.response?.data?.detail || "Impossible de contacter l'API Python"
    );
    err.status = error.response?.status || 500;
    return err;
}

// Enregistre une course planifiée
async function creerCourse(course) {
    try {
        const response = await axios.post(`${process.env.BACKEND_URL}/courses`, course);
        return response.data;
    } catch (error) {
        throw convertirErreur(error);
    }
}

// Liste des courses planifiées
async function getCourses() {
    try {
        const response = await axios.get(`${process.env.BACKEND_URL}/courses`);
        return response.data;
    } catch (error) {
        throw convertirErreur(error);
    }
}

// Annule une course planifiée
async function annulerCourse(id) {
    try {
        const response = await axios.patch(
            `${process.env.BACKEND_URL}/courses/${id}/annulation`
        );
        return response.data;
    } catch (error) {
        throw convertirErreur(error);
    }
}

module.exports = {creerCourse, getCourses, annulerCourse};