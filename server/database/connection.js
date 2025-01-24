const { MongoClient, ServerApiVersion } = require('mongodb');

// Remplace <db_password> par ton mot de passe MongoDB Atlas dans l'URI
const uri = process.env.DATABASE_URL; // Ton URI MongoDB que tu as dans ton .env

const dbConnection = async () => {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    // Connexion au serveur MongoDB
    await client.connect();
    // Envoi d'un ping pour vérifier la connexion
    await client.db("admin").command({ ping: 1 });
    console.log("Connecté à MongoDB avec succès !");
  } catch (err) {
    console.error("Erreur de connexion MongoDB:", err);
  } finally {
    // Fermeture de la connexion une fois l'opération terminée
    await client.close();
  }
};

module.exports = dbConnection;
