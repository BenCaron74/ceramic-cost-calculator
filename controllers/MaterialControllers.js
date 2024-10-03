const Material = require('../models/Material');

// Ajouter un nouveau matériau
exports.addMaterial = async (req, res) => {
  const { name, costPerKg } = req.body;
  try {
    const material = new Material({ name, costPerKg });
    await material.save();
    res.status(201).json({ message: 'Matériau ajouté avec succès', material });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Récupérer la liste des matériaux
exports.getMaterials = async (req, res) => {
  try {
    const materials = await Material.find();
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
