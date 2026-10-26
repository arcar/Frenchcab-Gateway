const versionService = require("../services/versionService.js");

// test
async function getVersion(req,res){

    console.log("Récupération du modele");

    try{

        const modele = await versionService.getVersion();

        console.log("modele récupérée");

        res.json({
            success:true,
            data:plants
        });


    }catch(error){

        console.error("Erreur test :", error.message);

        res.status(500).json({
            success:false,
            message:"Impossible de récupérer le modele",
            status:500
        });

    }
}

module.exports = {getVersion};