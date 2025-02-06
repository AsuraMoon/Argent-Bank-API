const mongoose = require("mongoose"); // Importation de Mongoose pour définir le modèle utilisateur.

// Définition du schéma utilisateur avec Mongoose.
const userSchema = new mongoose.Schema(
  {
    email: String, // Champ pour l'adresse e-mail de l'utilisateur.
    password: String, // Champ pour le mot de passe hashé de l'utilisateur.
    firstName: String, // Champ pour le prénom de l'utilisateur.
    lastName: String, // Champ pour le nom de famille de l'utilisateur.
  },
  {
    // Options supplémentaires pour le schéma.
    timestamps: true, // Ajoute automatiquement les champs `createdAt` et `updatedAt` au schéma.
    toObject: {
      // Transformation des objets lors de leur conversion en JSON ou objet JavaScript.
      transform: (doc, ret, options) => {
        ret.id = ret._id; // Renomme le champ `_id` en `id` pour une meilleure lisibilité.
        delete ret._id; // Supprime le champ `_id` de l'objet final.
        delete ret.password; // Supprime le champ `password` pour ne pas exposer les mots de passe hashés.
        delete ret.__v; // Supprime le champ `__v` utilisé par Mongoose pour la gestion des versions.
        return ret; // Retourne l'objet transformé.
      },
    },
  }
);

// Exportation du modèle utilisateur basé sur le schéma défini.
module.exports = mongoose.model("User", userSchema);
