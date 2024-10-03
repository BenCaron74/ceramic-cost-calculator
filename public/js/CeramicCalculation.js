const mongoose = require('mongoose');

// Définir le schéma pour les calculs de céramique
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

// Créer le modèle basé sur le schéma
const CeramicCalculation = mongoose.model('CeramicCalculation', CeramicCalculationSchema);

module.exports = CeramicCalculation;