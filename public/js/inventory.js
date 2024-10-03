document.addEventListener('DOMContentLoaded', () => {
  const materialList = document.getElementById('materialList');
  const addMaterialForm = document.getElementById('addMaterialForm');

  // Charger les matières premières existantes
  const loadMaterials = async () => {
    try {
      const response = await fetch('/api/materials');
      const materials = await response.json();

      // Affichage des matières
      materialList.innerHTML = '';
      materials.forEach(material => {
        const li = document.createElement('li');
        li.textContent = `${material.name} - ${material.pricePer10Kg} €/10kg`;
        materialList.appendChild(li);

        // Bouton de suppression
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.classList.add('delete-btn');
        deleteButton.onclick = () => deleteMaterial(material._id);
        li.appendChild(deleteButton);
      });
    } catch (err) {
      console.error('Erreur lors du chargement des matières premières :', err);
    }
  };

  // Fonction pour supprimer une matière
  const deleteMaterial = async (id) => {
    try {
      const response = await fetch(`/api/material/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Matière première supprimée avec succès');
        loadMaterials(); // Recharger la liste après suppression
      } else {
        console.error('Erreur lors de la suppression');
      }
    } catch (err) {
      console.error('Erreur lors de la suppression de la matière première :', err);
    }
  };

  // Soumettre le formulaire d'ajout de matière
  addMaterialForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const name = document.getElementById('materialName').value;
    const pricePer10Kg = document.getElementById('pricePer10Kg').value;

    try {
      const response = await fetch('/api/material', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, pricePer10Kg }),
      });
      if (response.ok) {
        console.log('Matière première ajoutée avec succès');
        loadMaterials(); // Recharger la liste après ajout
      }
    } catch (err) {
      console.error('Erreur lors de l\'ajout de la matière première :', err);
    }
  });

  loadMaterials();
});
