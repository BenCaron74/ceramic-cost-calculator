const Material = require('../models/Material');

// Récupérer tous les matériaux
exports.getMaterials = async (req, res) => {
  try {
    const materials = await Material.find(); // Récupère tous les matériaux
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ajouter un matériau
exports.addMaterial = async (req, res) => {
  const { name, pricePer10Kg } = req.body;
  try {
    const newMaterial = new Material({ name, pricePer10Kg });
    const savedMaterial = await newMaterial.save();
    res.json(savedMaterial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
