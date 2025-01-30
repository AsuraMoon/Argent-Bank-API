const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
       ("Connecté à MongoDB Atlas");
    })
    .catch((err) => {
       ("Erreur de connexion:", err);
    });
};

module.exports = dbConnection;
