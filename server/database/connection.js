const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {  // Assure-toi que tu utilises la bonne variable d'environnement ici
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connecté à MongoDB Atlas");
    })
    .catch((err) => {
      console.log("Erreur de connexion:", err);
    });
};

module.exports = dbConnection;
