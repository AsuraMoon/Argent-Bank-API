const express = require('express');
const router = express.Router(); // Création d'un routeur Express pour définir des routes liées aux utilisateurs.
const userController = require('../controllers/userController'); // Importation des fonctions du contrôleur utilisateur.
const tokenValidation = require('../middleware/tokenValidation'); // Middleware pour valider les tokens JWT.

// Route pour l'inscription d'un nouvel utilisateur
router.post('/signup', userController.createUser);
// Appelle la méthode `createUser` du contrôleur pour créer un nouvel utilisateur à partir des données envoyées dans le corps de la requête.

// Route pour la connexion d'un utilisateur
router.post('/login', userController.loginUser);
// Appelle la méthode `loginUser` du contrôleur pour authentifier l'utilisateur et générer un token JWT si les identifiants sont valides.

// Route pour récupérer le profil de l'utilisateur
router.post(
  '/profile',
  tokenValidation.validateToken, // Middleware pour vérifier la validité du token JWT avant de procéder.
  userController.getUserProfile // Appelle la méthode `getUserProfile` du contrôleur pour renvoyer les informations de l'utilisateur.
);

// Route pour mettre à jour le profil de l'utilisateur
router.put(
  '/profile',
  tokenValidation.validateToken, // Middleware pour vérifier la validité du token JWT avant de procéder.
  userController.updateUserProfile // Appelle la méthode `updateUserProfile` du contrôleur pour mettre à jour les informations de l'utilisateur.
);

module.exports = router; // Exporte le routeur pour pouvoir l'utiliser dans l'application principale.
