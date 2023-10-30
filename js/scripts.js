/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project


//Recherche les vins dont le nom contient ‘Chateau’
// Récupération des éléments du DOM
const searchForm = document.getElementById('search-form'); // Le formulaire de recherche
const searchInput = document.getElementById('search-input'); // Le champ de saisie de texte
const wineList = document.getElementById('wine-list'); // Le conteneur pour les résultats

// Écouteur d'événements pour le formulaire de recherche
searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche la soumission du formulaire par défaut

    const keyword = searchInput.value; // Récupère le terme de recherche saisi par l'utilisateur

    // Appeler une fonction qui effectue la recherche et met à jour la liste de vins
    searchWines(keyword);
});

// Fonction pour effectuer la recherche des vins et mettre à jour la liste
function searchWines(Chateau) {
    const apiUrl = `https://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines/search?keyword=${Chateau}`; // Construit l'URL de l'API avec le terme de recherche

    fetch(apiUrl) // Effectue une requête GET vers l'API
        .then(response => response.json()) // Convertit la réponse en JSON
        .then(data => {
            wineList.innerHTML = ''; // Efface les résultats précédents

            if (data.length === 0) {
                wineList.textContent = "Aucun résultat trouvé."; // Affiche un message si aucun résultat n'est trouvé
            } else {
                data.forEach(wine => {
                    // Crée une carte pour chaque vin trouvé
                    const wineCard = document.createElement('div');
                    wineCard.classList.add('card', 'mb-3');
                    wineCard.innerHTML = `
                        <div class="card-body">
                            <h5 class="card-title">${wine.name}</h5>
                            <p class="card-text">Année: ${wine.year}</p>
                            <p class="card-text">Pays: ${wine.country}</p>
                        </div>
                    `;
                    wineList.appendChild(wineCard); // Ajoute la carte à la liste
                });
            }
        })
        .catch(error => {
            console.error('Une erreur s\'est produite :', error); // Gère les erreurs
        });
}