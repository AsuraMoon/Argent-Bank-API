const User = require("../database/models/userModel"); // Modèle de l'utilisateur pour interagir avec la base de données.
const bcrypt = require("bcrypt"); // Bibliothèque pour le hachage des mots de passe.
const jwt = require("jsonwebtoken"); // Bibliothèque pour la gestion des tokens JWT.

// Création d'un nouvel utilisateur
module.exports.createUser = async (serviceData) => {
  try {
    // Vérifie si un utilisateur avec cet email existe déjà.
    const user = await User.findOne({ email: serviceData.email });
    if (user) {
      throw new Error("Email already exists"); // Lève une erreur si l'email est déjà utilisé.
    }

    // Hachage du mot de passe avec un facteur de coût de 12.
    const hashPassword = await bcrypt.hash(serviceData.password, 12);

    // Création d'un nouvel utilisateur avec les données fournies.
    const newUser = new User({
      email: serviceData.email,
      password: hashPassword,
      firstName: serviceData.firstName,
      lastName: serviceData.lastName,
    });

    // Sauvegarde de l'utilisateur dans la base de données.
    let result = await newUser.save();

    return result; // Retourne le résultat (nouvel utilisateur créé).
  } catch (error) {
    console.error("Error in userService.js", error); // Affiche l'erreur dans la console pour débogage.
    throw new Error(error); // Relance l'erreur pour une gestion ultérieure.
  }
};

// Récupération du profil utilisateur
module.exports.getUserProfile = async (serviceData) => {
  try {
    // Extraction et décodage du token JWT de l'en-tête d'autorisation.
    const jwtToken = serviceData.headers.authorization
      .split("Bearer")[1]
      .trim();
    const decodedJwtToken = jwt.decode(jwtToken);

    // Recherche de l'utilisateur dans la base de données à partir de l'ID contenu dans le token.
    const user = await User.findOne({ _id: decodedJwtToken.id });

    if (!user) {
      throw new Error("User not found!"); // Lève une erreur si l'utilisateur n'existe pas.
    }

    return user.toObject(); // Retourne l'utilisateur sous forme d'objet JSON.
  } catch (error) {
    console.error("Error in userService.js", error);
    throw new Error(error); // Relance l'erreur pour une gestion ultérieure.
  }
};

// Authentification de l'utilisateur
module.exports.loginUser = async (serviceData) => {
  try {
    // Recherche de l'utilisateur à partir de son email.
    const user = await User.findOne({ email: serviceData.email });

    if (!user) {
      throw new Error("User not found!"); // Lève une erreur si l'utilisateur n'existe pas.
    }

    // Vérification de la validité du mot de passe fourni par l'utilisateur.
    const isValid = await bcrypt.compare(serviceData.password, user.password);

    if (!isValid) {
      throw new Error("Password is invalid"); // Lève une erreur si le mot de passe est incorrect.
    }

    // Génération d'un token JWT contenant l'ID utilisateur.
    const token = jwt.sign(
      { id: user._id }, // Payload du token.
      process.env.SECRET_KEY || "default-secret-key", // Clé secrète pour signer le token.
      { expiresIn: "1d" } // Le token expire après 1 jour.
    );

    return { token }; // Retourne le token au client.
  } catch (error) {
    console.error("Error in userService.js", error);
    throw new Error(error); // Relance l'erreur pour une gestion ultérieure.
  }
};

// Mise à jour du profil utilisateur
module.exports.updateUserProfile = async (serviceData) => {
  try {
    // Extraction et décodage du token JWT de l'en-tête d'autorisation.
    const jwtToken = serviceData.headers.authorization
      .split("Bearer")[1]
      .trim();
    const decodedJwtToken = jwt.decode(jwtToken);

    // Mise à jour des informations de l'utilisateur dans la base de données.
    const user = await User.findOneAndUpdate(
      { _id: decodedJwtToken.id }, // Critère de recherche : ID utilisateur.
      {
        firstName: serviceData.body.firstName, // Mise à jour du prénom.
        lastName: serviceData.body.lastName, // Mise à jour du nom de famille.
      },
      { new: true } // Retourne le document mis à jour.
    );

    if (!user) {
      throw new Error("User not found!"); // Lève une erreur si l'utilisateur n'existe pas.
    }

    return user.toObject(); // Retourne l'utilisateur mis à jour sous forme d'objet JSON.
  } catch (error) {
    console.error("Error in userService.js", error);
    throw new Error(error); // Relance l'erreur pour une gestion ultérieure.
  }
};
