const mongoose = require("mongoose"); // Importation de Mongoose pour définir le modèle utilisateur.

// Définition du schéma utilisateur avec Mongoose.
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    }, // Champ pour l'adresse e-mail de l'utilisateur.
    password: {
      type: String,
      required: true,
    }, // Champ pour le mot de passe hashé de l'utilisateur.
    firstName: {
      type: String,
      required: true,
      trim: true,
    }, // Champ pour le prénom de l'utilisateur.
    lastName: {
      type: String,
      required: true,
      trim: true,
    }, // Champ pour le nom de famille de l'utilisateur.
    checking: {
      type: Number,
      default: 0,
    },
    saving: {
      type: Number,
      default: 0,
    },
    credit: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Ajoute automatiquement les champs `createdAt` et `updatedAt` au schéma.
    toObject: {
      transform: (doc, ret) => {
        ret.id = ret._id; // Renomme le champ `_id` en `id` pour une meilleure lisibilité.
        delete ret._id; // Supprime le champ `_id` de l'objet final.
        delete ret.password; // Supprime le champ `password` pour ne pas exposer les mots de passe hashés.
        delete ret.__v; // Supprime le champ `__v` utilisé par Mongoose pour la gestion des versions.
        return ret; // Retourne l'objet transformé.
      },
    },
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id; // Applique les mêmes transformations qu'au format `toObject`.
        delete ret._id;
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Exportation du modèle utilisateur basé sur le schéma défini.
module.exports = mongoose.model("User", userSchema);
