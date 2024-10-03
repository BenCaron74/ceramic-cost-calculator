// Gestion des onglets
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.style.display = 'none');

    document.getElementById(tabName).style.display = 'block';

    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => button.classList.remove('active'));

    document.querySelector(`button[onclick="showTab('${tabName}')"]`).classList.add('active');
}

// Charger les matières premières pour le formulaire de calcul
async function loadMaterials() {
    try {
        const response = await fetch('/api/materials');
        const materials = await response.json();

        const materialSelect = document.getElementById('materialSelect');
        materialSelect.innerHTML = '<option value="">Sélectionner une matière première</option>';

        materials.forEach(material => {
            const option = document.createElement('option');
            option.value = material._id;
            option.textContent = `${material.name} - ${material.pricePer10Kg} €/10kg`;
            materialSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des matières premières :', error);
        alert('Erreur lors du chargement des matières premières.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadMaterials();  // Charger les matières premières au démarrage
    loadCalculations();  // Charger les calculs enregistrés au démarrage
});


// Enregistrement des calculs
document.getElementById('calculationForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const ceramicName = document.getElementById("ceramicName").value;
    const materialQuantity = parseFloat(document.getElementById("materialQuantity").value);
    const materialId = document.getElementById("materialSelect").value;
    const laborHours = parseFloat(document.getElementById("laborHours").value);
    const laborRate = parseFloat(document.getElementById("laborRate").value);
    const firingCost = parseFloat(document.getElementById("firingCost").value);
    const piecesPerFiring = parseInt(document.getElementById("piecesPerFiring").value);

    // Vérifier si une matière première a été sélectionnée
    if (!materialId) {
        alert("Veuillez sélectionner une matière première");
        return;
    }

    // Calcul du coût de la matière première (en grammes ou en kilos)
    const selectedMaterial = document.querySelector(`#materialSelect option[value="${materialId}"]`).textContent;
    const materialPrice = parseFloat(selectedMaterial.split(' - ')[1].split('€/10kg')[0]);
    const materialCost = (materialQuantity / (unit === 'g' ? 1000 : 1)) * (materialPrice / 10);

    // Calcul du coût unitaire
    const laborCost = laborHours * laborRate;
    const firingCostPerPiece = firingCost / piecesPerFiring;
    const unitCost = (materialCost + laborCost + firingCostPerPiece) / piecesPerFiring;
    const totalCost = unitCost * piecesPerFiring;

    const newCalculation = {
        name: ceramicName,
        materialCost: materialCost,
        laborCost: laborCost,
        firingCostPerPiece: firingCostPerPiece,
        totalCost: totalCost,
        unitCost: unitCost,
        lotSize: piecesPerFiring
    };

    // Enregistrer le calcul
    try {
        const response = await fetch('/api/calculation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCalculation)
        });

        if (response.ok) {
            alert('Calcul enregistré avec succès');
            loadCalculations();  // Recharger les calculs
        } else {
            alert('Erreur lors de la sauvegarde du calcul');
        }
    } catch (error) {
        console.error('Erreur lors de la sauvegarde du calcul :', error);
    }
});


// Charger les matières premières et les calculs à l'ouverture
document.addEventListener('DOMContentLoaded', () => {
    loadMaterials();

});
