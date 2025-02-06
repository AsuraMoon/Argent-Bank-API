const userService = require("../services/userService"); // Importation du service utilisateur pour la logique métier.

// Contrôleur pour créer un nouvel utilisateur.
module.exports.createUser = async (req, res) => {
  let response = {}; // Objet de réponse.

  try {
    // Appelle le service pour créer un utilisateur avec les données de la requête.
    const responseFromService = await userService.createUser(req.body);

    // Si tout se passe bien, structure la réponse avec un statut HTTP 200.
    response.status = 200;
    response.message = "User successfully created"; // Message de succès.
    response.body = responseFromService; // Corps de la réponse contenant les données utilisateur.
  } catch (error) {
    // En cas d'erreur, log l'erreur et structure la réponse avec un statut HTTP 400.
    console.error("Something went wrong in userController.js", error);
    response.status = 400;
    response.message = error.message; // Message d'erreur provenant du service.
  }

  // Envoie la réponse structurée au client.
  return res.status(response.status).send(response);
};

// Contrôleur pour connecter un utilisateur.
module.exports.loginUser = async (req, res) => {
  let response = {}; // Objet de réponse.

  try {
    // Appelle le service pour authentifier l'utilisateur avec les données de la requête.
    const responseFromService = await userService.loginUser(req.body);

    // Si tout se passe bien, structure la réponse avec un statut HTTP 200.
    response.status = 200;
    response.message = "User successfully logged in"; // Message de succès.
    response.body = responseFromService; // Corps de la réponse contenant le token JWT.
  } catch (error) {
    // En cas d'erreur, log l'erreur et structure la réponse avec un statut HTTP 400.
    console.error("Error in loginUser (userController.js)", error);
    response.status = 400;
    response.message = error.message; // Message d'erreur provenant du service.
  }

  // Envoie la réponse structurée au client.
  return res.status(response.status).send(response);
};

// Contrôleur pour obtenir le profil utilisateur.
module.exports.getUserProfile = async (req, res) => {
  let response = {}; // Objet de réponse.

  try {
    // Appelle le service pour récupérer les données du profil utilisateur.
    const responseFromService = await userService.getUserProfile(req);

    // Si tout se passe bien, structure la réponse avec un statut HTTP 200.
    response.status = 200;
    response.message = "Successfully got user profile data"; // Message de succès.
    response.body = responseFromService; // Corps de la réponse contenant les données du profil utilisateur.
  } catch (error) {
    // En cas d'erreur, log l'erreur et structure la réponse avec un statut HTTP 400.
    console.error("Error in userController.js", error);
    response.status = 400;
    response.message = error.message; // Message d'erreur provenant du service.
  }

  // Envoie la réponse structurée au client.
  return res.status(response.status).send(response);
};

// Contrôleur pour mettre à jour le profil utilisateur.
module.exports.updateUserProfile = async (req, res) => {
  let response = {}; // Objet de réponse.

  try {
    // Appelle le service pour mettre à jour les données du profil utilisateur.
    const responseFromService = await userService.updateUserProfile(req);

    // Si tout se passe bien, structure la réponse avec un statut HTTP 200.
    response.status = 200;
    response.message = "Successfully updated user profile data"; // Message de succès.
    response.body = responseFromService; // Corps de la réponse contenant les données mises à jour.
  } catch (error) {
    // En cas d'erreur, log l'erreur et structure la réponse avec un statut HTTP 400.
    console.error("Error in updateUserProfile - userController.js", error);
    response.status = 400;
    response.message = error.message; // Message d'erreur provenant du service.
  }

  // Envoie la réponse structurée au client.
  return res.status(response.status).send(response);
};
