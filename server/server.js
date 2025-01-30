const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDocs = yaml.load('./swagger.yaml');
const dbConnection = require('./database/connection');

// Charger les variables d'environnement
dotEnv.config();



const app = express();
const dbURL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 3001;

// Connexion à la base de données
dbConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes pour gérer les utilisateurs
app.use('/api/v1/user', require('./routes/userRoutes'));

// API Documentation
if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

app.get('/', (req, res) => {
  res.send('Hello from my Express server v2!');
});

app.listen(PORT, () => {
});
