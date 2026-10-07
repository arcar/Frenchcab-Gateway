const predictionsService = require("../services/predictionsService.js");

// POST /predictions/duree
async function predireDuree(req,res){

    const {zone_depart, zone_arrivee, date, heure} = req.body;

    if(!zone_depart || !zone_arrivee || !date || !heure){
        return res.status(400).json({
            success:false,
            message:"zone_depart, zone_arrivee, date et heure sont obligatoires",
            status:400
        });
    }

    try{

        const resultat = await predictionsService.predireDuree({
            zone_depart: Number(zone_depart),
            zone_arrivee: Number(zone_arrivee),
            date,
            heure
        });

        res.json(resultat);

    }catch(error){

        console.error("Erreur prédiction :", error.message);

        res.status(error.status || 500).json({
            success:false,
            message:error.message,
            status:error.status || 500
        });

    }
}

module.exports = {predireDuree};