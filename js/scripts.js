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


//COMMENTAIRE DES VINS DONT ID EST 10

// Récupérer le bouton pour charger les commentaires et la section des commentaires
const loadCommentsBtn = document.getElementById('load-comments-btn');
const commentsSection = document.getElementById('comments-section');

// Ajouter un écouteur d'événements pour le clic sur le bouton
loadCommentsBtn.addEventListener('click', () => {
    // Vérifier si la section des commentaires est déjà visible
    if (commentsSection.style.display === 'none') {
        findCommentsById('10'); // Charger les commentaires du vin ID 10
        commentsSection.style.display = 'block'; // Afficher la section des commentaires
    }
});

// Utilisation de la fonction pour récupérer les commentaires du vin ayant l'ID 10
async function findCommentsById(id) {
    if (id === '10') {
        const apiURL10 = 'https://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines/10/comments';

        try {
            const response = await fetch(apiURL10);

            if (response.ok) {
                const comments = await response.json();
                displayComments(comments); // Appel de la fonction pour afficher les commentaires
            } else {
                console.error('La requête a échoué avec le statut :', response.status);
            }
        } catch (error) {
            console.error('Une erreur est survenue :', error);
        }
    }
}

// Fonction pour afficher les commentaires dans la section correspondante
function displayComments(comments) {
    const commentsList = document.getElementById('comments-list');

    if (comments.length === 0) {
        commentsList.textContent = "Aucun commentaire trouvé.";
    } else {
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `
                <p>Auteur: ${comment.author}</p>
                <p>Contenu: ${comment.content}</p>
                <p>Date: ${comment.date}</p>
                <hr>
            `;
            commentsList.appendChild(commentElement);
        });
    }
}


// Pour supprimer une image que l'utilisateur a ajouté d'un vin selectionné

function deletePics(){

    const deletePics = document.forms['frmDELETE'].btAdd;

}

function Authentification(){

let btValide = document.getElementById(valide);
let inputLogin = document.getElementById(login);


    fetch("https://cruth.phpnet.org/epfc/caviste/public/index.php/api/users")
    .then(response => {
        return response.json();
    })
    .then(users => {
    users.forEach(user => {

        if(inputLogin.value === user.login) {
            
            }
        })
    })
}
