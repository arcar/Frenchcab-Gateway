const axios = require("axios");

// Enregistre une course planifiée
async function creerCourse(course) {
    try {
        const response = await axios.post(`${process.env.BACKEND_URL}/courses`, course);
        return response.data;
    } catch (error) {
        console.log(error.message);
        const err = new Error(
            error.response?.data?.detail || "Impossible de contacter l'API Python"
        );
        err.status = error.response?.status || 500;
        throw err;
    }
}

// Liste des courses planifiées
async function getCourses() {
    try {
        const response = await axios.get(`${process.env.BACKEND_URL}/courses`);
        return response.data;
    } catch (error) {
        console.log(error.message);
        const err = new Error(
            error.response?.data?.detail || "Impossible de contacter l'API Python"
        );
        err.status = error.response?.status || 500;
        throw err;
    }
}

module.exports = {creerCourse, getCourses};