// Importation des modules nécessaires
const express = require("express"); // Framework pour créer un serveur web Node.js.
const dotEnv = require("dotenv"); // Charge les variables d'environnement à partir d'un fichier .env.
const cors = require("cors"); // Middleware pour permettre les requêtes cross-origin.
const swaggerUi = require("swagger-ui-express"); // Interface utilisateur pour documenter l'API.
const yaml = require("yamljs"); // Permet de charger et de lire des fichiers YAML.
const swaggerDocs = yaml.load("./swagger.yaml"); // Charge le fichier de documentation Swagger.
const dbConnection = require("./database/connection"); // Fonction pour gérer la connexion à la base de données.

// Charger les variables d'environnement
dotEnv.config(); // Configure les variables d'environnement à partir du fichier .env.

const app = express(); // Initialise une application Express.
const dbURL = process.env.DATABASE_URL; // URL de connexion à la base de données, lue depuis les variables d'environnement.
const PORT = process.env.PORT || 3001; // Définit le port sur lequel le serveur écoutera, avec une valeur par défaut de 3001.

// Connexion à la base de données
dbConnection(); // Appelle la fonction pour se connecter à la base de données.

// Middleware pour configurer l'application
app.use(cors()); // Active CORS pour autoriser les requêtes provenant d'autres domaines.
app.use(express.json()); // Parse les requêtes entrantes avec un payload JSON.
app.use(express.urlencoded({ extended: true })); // Parse les requêtes URL-encodées.

// Routes pour gérer les utilisateurs
app.use("/api/v1/user", require("./routes/userRoutes"));
// Montre les routes de gestion des utilisateurs sous le chemin '/api/v1/user'.

// Documentation de l'API
if (process.env.NODE_ENV !== "production") {
  // Si l'environnement n'est pas 'production', active la documentation Swagger.
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

// Route de base
app.get("/", (req, res) => {
  // Route GET par défaut pour tester si le serveur est opérationnel.
  res.send("Hello from my Express server v2!"); // Envoie une réponse simple.
});

// Démarrage du serveur
app.listen(PORT, () => {
  // Démarre le serveur sur le port défini.
  console.log(`Server running on port ${PORT}`); // Affiche un message dans la console pour confirmer que le serveur tourne.
});
