const express = require('express');
const router = express.Router();
const MaterialControllers = require('../controllers/MaterialControllers');  // Si vous avez déjà un contrôleur
const CeramicCalculation = require('../models/CeramicCalculation');
const Material = require('../models/Material');

// Route pour récupérer les matériaux
router.get('/materials', MaterialControllers.getMaterials);

// Route pour ajouter un matériau
router.post('/materials', MaterialControllers.addMaterial);

// Route pour supprimer une matière première
router.delete('/material/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Material.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route pour ajouter un calcul de céramique
router.post('/calculation', async (req, res) => {
  const { name, materialCost, laborCost, firingCostPerPiece, totalCost, unitCost, lotSize } = req.body;
  try {
    const newCalculation = new CeramicCalculation({
      name, materialCost, laborCost, firingCostPerPiece, totalCost, unitCost, lotSize
    });
    const calculation = await newCalculation.save();
    res.json(calculation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route pour récupérer tous les calculs
router.get('/calculations', async (req, res) => {
  try {
    const calculations = await CeramicCalculation.find();
    res.json(calculations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route pour supprimer un calcul par ID
router.delete('/calculation/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await CeramicCalculation.findByIdAndDelete(id);
    if (result) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Calcul non trouvé' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
