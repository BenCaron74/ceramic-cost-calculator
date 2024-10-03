const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

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

// Modèle pour les matières premières
const MaterialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pricePer10Kg: { type: Number, required: true }
});
const Material = mongoose.model('Material', MaterialSchema);

// Modèle pour les calculs de céramique
const CeramicCalculationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  materialCost: { type: Number, required: true },
  laborCost: { type: Number, required: true },
  firingCostPerPiece: { type: Number, required: true },
  totalCost: { type: Number, required: true },
  unitCost: { type: Number, required: true },
  lotSize: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});
const CeramicCalculation = mongoose.model('CeramicCalculation', CeramicCalculationSchema);

// Log global pour toutes les requêtes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Route pour ajouter une matière première
app.post('/api/material', (req, res) => {
  console.log('Données reçues pour matière première :', req.body);
  const { name, pricePer10Kg } = req.body;

  const newMaterial = new Material({ name, pricePer10Kg });

  newMaterial.save()
    .then(material => {
      console.log('Matière première enregistrée :', material);
      res.json(material);
    })
    .catch(err => {
      console.error('Erreur lors de l\'enregistrement de la matière première :', err);
      res.status(500).json({ error: err.message });
    });
});

// Route pour récupérer toutes les matières premières
app.get('/api/materials', (req, res) => {
  Material.find()
    .then(materials => res.json(materials))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Route pour supprimer une matière première
app.delete('/api/material/:id', (req, res) => {
  const { id } = req.params;
  Material.findByIdAndDelete(id)
    .then(() => res.json({ success: true }))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Route pour ajouter un calcul de céramique
app.post('/api/calculation', (req, res) => {
  console.log('Données reçues pour le calcul de coût :', req.body);
  const { name, materialCost, laborCost, firingCostPerPiece, totalCost, unitCost, lotSize } = req.body;

  const newCalculation = new CeramicCalculation({
    name,
    materialCost,
    laborCost,
    firingCostPerPiece,
    totalCost,
    unitCost,
    lotSize
  });

  newCalculation.save()
    .then(calculation => res.json(calculation))
    .catch(err => {
      console.error('Erreur lors de l\'enregistrement du calcul :', err);
      res.status(500).json({ error: err.message });
    });
});

// Route pour récupérer tous les calculs
app.get('/api/calculations', (req, res) => {
  CeramicCalculation.find()
      .then(calculations => res.json(calculations))
      .catch(err => res.status(500).json({ error: err.message }));
});

// Route pour supprimer un calcul par ID
app.delete('/api/calculation/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log('ID reçu pour suppression :', id);

        // Suppression dans la base MongoDB
        const result = await CeramicCalculation.findByIdAndDelete(id); // Utilisez CeramicCalculation ici

        if (!result) {
            return res.status(404).json({ error: 'Calcul non trouvé' });
        }

        res.status(200).json({ message: 'Calcul supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression :', error);
        res.status(500).json({ error: 'Erreur lors de la suppression du calcul' });
    }
});

// Démarrage du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Serveur démarré sur le port ${port}`));
