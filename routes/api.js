const express = require('express');
const router = express.Router();
const MaterialControllers = require('../controllers/MaterialControllers');
const Material = require('../models/Material');
const CeramicCalculation = require('../models/CeramicCalculation');

// Route pour récupérer les matériaux
router.get('/materials', MaterialControllers.getMaterials);

// Route pour ajouter un matériau
router.post('/materials', MaterialControllers.addMaterial);

module.exports = router;

// Route pour ajouter une matière première
router.post('/material', (req, res) => {
  const { name, pricePer10Kg } = req.body;
  const newMaterial = new Material({ name, pricePer10Kg });
  newMaterial.save()
    .then(material => res.json(material))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Route pour récupérer toutes les matières premières
router.get('/materials', (req, res) => {
  Material.find()
    .then(materials => res.json(materials))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Route pour supprimer une matière première
router.delete('/material/:id', (req, res) => {
  const { id } = req.params;
  Material.findByIdAndDelete(id)
    .then(() => res.json({ success: true }))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Route pour ajouter un calcul de céramique
router.post('/calculation', (req, res) => {
  const { name, materialCost, laborCost, firingCostPerPiece, totalCost, unitCost, lotSize } = req.body;
  const newCalculation = new CeramicCalculation({
    name, materialCost, laborCost, firingCostPerPiece, totalCost, unitCost, lotSize
  });
  newCalculation.save()
    .then(calculation => res.json(calculation))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Route pour récupérer tous les calculs
router.get('/calculations', (req, res) => {
  CeramicCalculation.find()
      .then(calculations => res.json(calculations))
      .catch(err => res.status(500).json({ error: err.message }));
});

// Route pour supprimer un calcul par ID
router.delete('/calculation/:id', (req, res) => {
  const { id } = req.params;
  CeramicCalculation.findByIdAndDelete(id)
    .then(result => result ? res.json({ success: true }) : res.status(404).json({ error: 'Calcul non trouvé' }))
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
