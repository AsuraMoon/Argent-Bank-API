const mongoose = require("mongoose"); // Importation de Mongoose pour gérer la connexion à MongoDB.

// Fonction pour établir la connexion à la base de données MongoDB.
const dbConnection = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      // Connexion à MongoDB avec l'URL de la base de données issue des variables d'environnement.
      useNewUrlParser: true, // Option pour utiliser l'analyseur URL de la nouvelle version de MongoDB.
      useUnifiedTopology: true, // Option pour utiliser le moteur de surveillance des connexions unifié.
    })
    .then(() => {
      // Message de succès une fois connecté à la base de données.
      console.log("Connecté à MongoDB Atlas");
    })
    .catch((err) => {
      // Gestion des erreurs en cas d'échec de connexion.
      console.error("Erreur de connexion:", err);
    });
};

module.exports = dbConnection; // Exportation de la fonction pour pouvoir l'utiliser ailleurs dans le projet.
