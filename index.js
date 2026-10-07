const express = require("express");
require("dotenv").config();
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

const testRoutes = require("./src/routes/testRoutes");
const zonesRoutes = require("./src/routes/zonesRoutes");
const predictionsRoutes = require("./src/routes/predictionsRoutes");
const coursesRoutes = require("./src/routes/coursesRoutes");

app.use("/test", testRoutes)
app.use("/zones", zonesRoutes);
app.use("/predictions", predictionsRoutes);
app.use("/courses", coursesRoutes);

// Démarre le serveur seulement si le fichier est lancé directement (pas lors des tests)
if (require.main === module) {
  app.listen(3000, () => {
    console.log(`Application à l'écoute sur le port 3000!`);
  });
}

module.exports = app;
