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
        if (!response.ok) throw new Error('Erreur lors du chargement des matières');
        const materials = await response.json();

        const materialSelect = document.getElementById('materialSelect');
        materialSelect.innerHTML = '<option value="">Sélectionner une matière première</option>';

        materials.forEach(material => {
            const option = document.createElement('option');
            option.value = material._id;
            option.textContent = material.name;
            materialSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erreur :', error);
        alert('Erreur lors du chargement des matières premières. Veuillez réessayer.');
    }
}

// Fonction pour calculer les coûts et afficher le résultat instantanément
document.getElementById('calculationForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const ceramicName = document.getElementById('ceramicName').value;
    const materialSelect = document.getElementById('materialSelect').value;
    const materialCost = document.getElementById('materialCost').value;
    const laborCost = document.getElementById('laborCost').value;
    const firingCost = document.getElementById('firingCost').value;
    const lotSize = document.getElementById('lotSize').value;

    const totalCost = (parseFloat(materialCost) + parseFloat(laborCost) + parseFloat(firingCost)) * lotSize;
    const unitCost = totalCost / lotSize;

    document.getElementById('totalCost').textContent = `Coût total : ${totalCost.toFixed(2)} €`;
    document.getElementById('unitCost').textContent = `Coût par unité : ${unitCost.toFixed(2)} €`;
});
