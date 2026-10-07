const zonesService = require("../services/zonesService.js");

// GET /zones
async function getZones(req,res){

    console.log("Récupération des zones");

    try{

        const zones = await zonesService.getZones();

        // le front attend directement un tableau de zones
        res.json(zones);

    }catch(error){

        console.error("Erreur zones :", error.message);

        res.status(500).json({
            success:false,
            message:"Impossible de récupérer les zones",
            status:500
        });

    }
}

module.exports = {getZones};