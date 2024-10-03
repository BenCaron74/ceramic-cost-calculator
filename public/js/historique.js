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
        const response = await fetch('http://localhost:3000/api/calculations'); // Assurez-vous que l'URL est correcte
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des calculs');
        }
        const calculations = await response.json();

        const historyList = document.getElementById('historyList');
        historyList.innerHTML = ''; // Vider la liste avant de recharger

        calculations.reverse().forEach(calculation => {
            // Vérifiez que les propriétés existent
            const { name, totalCost, unitCost, _id } = calculation;
            if (name && totalCost != null && unitCost != null) {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <strong>${name}</strong><br>
                    Coût total : ${totalCost.toFixed(2)} €<br>
                    Coût unitaire : ${unitCost.toFixed(2)} €<br>
                    <button onclick="deleteCalculation('${_id}')">Supprimer</button>
                `;
                historyList.appendChild(listItem);
            } else {
                console.error('Calcul manquant des données nécessaires:', calculation);
            }
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des calculs :', error);
        alert('Erreur lors de la récupération des calculs.');
    }
}

// Suppression des calculs
async function deleteCalculation(id) {
    console.log('ID à supprimer :', id); // Ajout du log
    try {
        const response = await fetch(`http://localhost:3000/api/calculation/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Calcul supprimé avec succès');
            loadCalculations(); // Recharger la liste après suppression
        } else {
            const errorText = await response.text(); // Log des erreurs détaillées
            alert(`Erreur lors de la suppression du calcul : ${errorText}`);
            console.error('Erreur :', errorText);
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du calcul :', error);
        alert('Erreur lors de la suppression du calcul.');
    }
}

// Charger les matières premières et les calculs à l'ouverture
document.addEventListener('DOMContentLoaded', () => {
    loadCalculations();
});
