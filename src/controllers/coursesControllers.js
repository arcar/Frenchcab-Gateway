const coursesService = require("../services/coursesService.js");

// POST /courses
async function creerCourse(req,res){

    const {zone_depart, zone_arrivee, date, heure, passagers} = req.body;

    if(!zone_depart || !zone_arrivee || !date || !heure){
        return res.status(400).json({
            success:false,
            message:"zone_depart, zone_arrivee, date et heure sont obligatoires",
            status:400
        });
    }

    try{
        const course = await coursesService.creerCourse({
            zone_depart: Number(zone_depart),
            zone_arrivee: Number(zone_arrivee),
            date,
            heure,
            passagers: Number(passagers) || 1
        });
        res.status(201).json(course);
    }catch(error){
        console.error("Erreur création course :", error.message);
        res.status(error.status || 500).json({
            success:false,
            message:error.message,
            status:error.status || 500
        });
    }
}

// GET /courses
async function getCourses(req,res){
    try{
        const courses = await coursesService.getCourses();
        res.json(courses);
    }catch(error){
        console.error("Erreur liste courses :", error.message);
        res.status(error.status || 500).json({
            success:false,
            message:error.message,
            status:error.status || 500
        });
    }
}

// PATCH /courses/:id/annulation
async function annulerCourse(req,res){

    const id = Number(req.params.id);

    if(!Number.isInteger(id)){
        return res.status(400).json({
            success:false,
            message:"Identifiant de course invalide",
            status:400
        });
    }

    try{
        const resultat = await coursesService.annulerCourse(id);
        res.json(resultat);
    }catch(error){
        console.error("Erreur annulation course :", error.message);
        res.status(error.status || 500).json({
            success:false,
            message:error.message,
            status:error.status || 500
        });
    }
}

module.exports = {creerCourse, getCourses, annulerCourse};