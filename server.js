require('dotenv').config();  // Charge les variables d'environnement du fichier .env
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const apiRoutes = require('./routes/api'); // Importation du fichier de routes

const app = express();

// Connexion à MongoDB
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cost_calculator';
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
  serverSelectionTimeoutMS: 30000,  // 30 secondes de délai d'attente
})
  .then(() => console.log('MongoDB connecté'))
  .catch(err => console.log('Erreur de connexion MongoDB :', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Utilisation des routes API
app.use('/api', apiRoutes);

// Gestion des erreurs 404 (routes non trouvées)
app.use((req, res, next) => {
  res.status(404).send('Route non trouvée');
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erreur serveur');
});

// Démarrage du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Serveur démarré sur le port ${port}`));