const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connecté à MongoDB Atlas");
    })
    .catch((err) => {
      console.log("Erreur de connexion:", err);
    });
};

module.exports = dbConnection;
