const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const apiRoutes = require('./routes/api'); // Importation du fichier de routes

const app = express();

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/cost_calculator', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connecté'))
  .catch(err => console.log('Erreur de connexion MongoDB :', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Utilisation des routes API
app.use('/api', apiRoutes);

// Démarrage du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Serveur démarré sur le port ${port}`));
