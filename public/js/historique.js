// Gestion des onglets
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.style.display = 'none');

    document.getElementById(tabName).style.display = 'block';

    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => button.classList.remove('active'));

    document.querySelector(`button[onclick="showTab('${tabName}')"]`).classList.add('active');
}

// Fonction pour charger les calculs
async function loadCalculations() {
    try {
        const response = await fetch('/api/calculations'); // Utilisez une URL relative
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des calculs');
        }
        const calculations = await response.json();

        const historyList = document.getElementById('historyList');
        historyList.innerHTML = ''; // Vider la liste avant de recharger

        calculations.reverse().forEach(calculation => {
            const li = document.createElement('li');
            li.textContent = `${calculation.name} - Coût total : ${calculation.totalCost} € - Coût par unité : ${calculation.unitCost} € - Taille du lot : ${calculation.lotSize}`;
            historyList.appendChild(li);
        });
    } catch (error) {
        console.error('Erreur :', error);
        alert('Erreur lors du chargement de l\'historique des calculs. Veuillez réessayer.');
    }
}

// Fonction pour supprimer un calcul par ID
async function deleteCalculation(calculationId) {
    try {
        const response = await fetch(`/api/calculation/${calculationId}`, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error('Erreur lors de la suppression du calcul');
        }
        alert('Calcul supprimé avec succès');
        loadCalculations(); // Recharger la liste après suppression
    } catch (error) {
        console.error('Erreur :', error);
        alert('Erreur lors de la suppression. Veuillez réessayer.');
    }
}

// Charger les calculs au chargement de la page
document.addEventListener('DOMContentLoaded', loadCalculations);
