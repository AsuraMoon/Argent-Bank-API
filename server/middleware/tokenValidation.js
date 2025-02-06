const jwt = require('jsonwebtoken'); // Bibliothèque pour gérer les tokens JWT.

// Middleware pour valider les tokens JWT
module.exports.validateToken = (req, res, next) => {
  let response = {}; // Objet pour structurer la réponse en cas d'erreur.

  try {
    // Vérifie si le header `authorization` est présent dans la requête.
    if (!req.headers.authorization) {
      throw new Error('Token is missing from header'); // Lève une erreur si le token est absent.
    }

    // Extraction du token à partir de l'en-tête `authorization`.
    const userToken = req.headers.authorization.split('Bearer')[1].trim();

    // Vérification et décryptage du token avec la clé secrète.
    const decodedToken = jwt.verify(
      userToken, // Token utilisateur.
      process.env.SECRET_KEY || 'default-secret-key' // Clé secrète utilisée pour signer le token.
    );

    return next(); // Si le token est valide, passe au middleware ou à la route suivante.
  } catch (error) {
    console.error('Error in tokenValidation.js', error); // Log de l'erreur pour le débogage.

    // Préparation de la réponse en cas d'erreur.
    response.status = 401; // Statut HTTP 401 : non autorisé.
    response.message = error.message; // Message d'erreur spécifique.
  }

  // Envoie la réponse en cas d'erreur (si le `try` échoue).
  return res.status(response.status).send(response);
};
