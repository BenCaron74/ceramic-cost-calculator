document.addEventListener('DOMContentLoaded', () => {
  const materialList = document.getElementById('materialList');
  const addMaterialForm = document.getElementById('addMaterialForm');

  // Charger les matières premières existantes
  const loadMaterials = async () => {
      try {
          const response = await fetch('/api/materials');
          if (!response.ok) throw new Error('Erreur lors du chargement des matières');
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
          console.error('Erreur :', err);
          alert('Erreur lors du chargement des matières premières. Veuillez réessayer.');
      }
  };

  // Fonction pour supprimer une matière première
  const deleteMaterial = async (materialId) => {
      try {
          const response = await fetch(`/api/material/${materialId}`, { method: 'DELETE' });
          if (!response.ok) throw new Error('Erreur lors de la suppression de la matière');
          alert('Matière supprimée avec succès');
          loadMaterials(); // Recharger la liste après suppression
      } catch (error) {
          console.error('Erreur :', error);
          alert('Erreur lors de la suppression. Veuillez réessayer.');
      }
  };

  // Ajouter une matière première
  addMaterialForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('materialName').value;
      const pricePer10Kg = document.getElementById('materialPrice').value;

      try {
          const response = await fetch('/api/material', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ name, pricePer10Kg })
          });
          if (!response.ok) throw new Error('Erreur lors de l\'ajout de la matière première');
          alert('Matière première ajoutée avec succès');
          addMaterialForm.reset();
          loadMaterials(); // Recharger la liste après ajout
      } catch (err) {
          console.error('Erreur :', err);
          alert('Erreur lors de l\'ajout de la matière première. Veuillez réessayer.');
      }
  });

  // Charger les matériaux existants au chargement de la page
  loadMaterials();
});
