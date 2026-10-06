const express = require("express");
require("dotenv").config();
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

const testRoutes = require("./src/routes/testRoutes");

app.use("/test", testRoutes)

// Démarre le serveur seulement si le fichier est lancé directement (pas lors des tests)
if (require.main === module) {
  app.listen(3000, () => {
    console.log(`Application à l'écoute sur le port 3000!`);
  });
}

module.exports = app;
