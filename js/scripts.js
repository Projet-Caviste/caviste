//window.onload = function(){

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
function searchWines(name) {
    const apiUrl = `https://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines/search?keyword=${name}`; 

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

/** 
//Ajoute ou retire le vin 10 parmi ses préférés
// Récupération de l'élément de vin correspondant au vin 10
const wine10 = document.querySelector('.wine-10'); // Rajouter une classe "wine-10" à l'élément du vin 10

// Écouteur d'événements pour ajouter ou retirer le vin 10 parmi les favoris
wine10.addEventListener('click', function() {
    const isLiked = wine10.classList.contains('liked'); // Vérifie si le vin 10 est déjà dans les favoris

    // Appeler une fonction pour ajouter ou retirer le vin 10 parmi les favoris 
    likeOrUnlikeWine(10, !isLiked); // Inverse (true devient false et vice versa)
});

// Fonction pour ajouter ou retirer le vin parmi les favoris
function likeOrUnlikeWine(wineId, like) {
    const apiUrl = `https://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines/${wineId}/like`;
    const requestData = {
        like: like // true pour ajouter aux favoris, false pour retirer des favoris
    };

    // Une requête POST 
    fetch(apiUrl, {
        method: 'POST', 
        body: JSON.stringify(requestData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Mettez à jour l'apparence de l'élément (ajouté ou retiré des favoris)
        if (like) {
            wine10.classList.add('liked');
        } else {
            wine10.classList.remove('liked');
        }
    })
    .catch(error => {
        console.error('Une erreur s\'est produite :', error);
    });
}
*/



//RETROUVER LES COMMENTAIRE DU VIN  10 (aymard)

async function findCommentsForWine(wine_id) {
    const apiURL10 = `https://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines/${wine_id}/comments`;

    try {
        const response = await fetch(apiURL10, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`La requête GET a échoué ${response.status}`)
        } 
        const comments = await response.json();
        // Afficher le contenu de chaque commentaire
        comments.forEach(comment => {
            console.log('Commentaire:', comment.content);
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des commentaires :',error.message);
    }
}
//appel de la fonction
findCommentsForWine(8);


// RETROUVER LE NOMBRE DE LIKE DU VIN 10 (aymard)

// Définition de la fonction asynchrone pour récupérer le nombre de likes pour le vin 10
async function getLikeCount(wine_id) {
    // Définition de l'URL de l'API
    const apiURL11 = `https://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines/${wine_id}/likes-count`;

    try {
        // Utilisation de l'API Fetch pour effectuer une requête GET
        const response = await fetch(apiURL11, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Vérification si la réponse est OK (statut HTTP 200-299)
        if (!response.ok) {
            // Si la réponse n'est pas OK, déclencher une erreur avec le statut HTTP
            throw new Error(`La requête a échoué avec le statut ${response.status}`);
        }

        // Extraction des données JSON de la réponse
        const data = await response.json();

        // Affichage du nombre total de likes dans la console
        console.log(`Nombre de likes pour le vin ${wine_id}  :`, data.total);
    } catch (error) {
        // Gestion des erreurs : affichage de l'erreur dans la console
        console.error('Erreur lors de la récupération du nombre de likes :', error.message);
    }
}
// Appel de la fonction asynchrone
getLikeCount(7);


//MODIFIER LE COMMENTAIRE 3 DU VIN 10 (aymard)


  


// Pour supprimer une image que l'utilisateur a ajouté d'un vin selectionné
function deletePics(){
    const deletePics = document.forms['frmDELETE'].btAdd;              
}

let btValide = document.getElementById('valide');
let inputLogin = document.getElementById('login');
let form = document.getElementById("loginUsers");
btValide.addEventListener("click", function() {
    Authentification(inputLogin);
});

function Authentification(inputLogin) {
    if(inputLogin.value === ""){
        alert('Notez un login');
        return;
    }else{
    fetch("https://cruth.phpnet.org/epfc/caviste/public/index.php/api/users")
        .then(response => {
            return response.json();
        })
        .then(users => {
            let trouve = users.find(user => user.login === inputLogin.value);

            if (trouve) { 
                alert(`Bienvenue, ${trouve.login}! Tu es connecté.`);  
                form.remove();
            let succes = fetch("https://cruth.phpnet.org/epfc/caviste/public/index.php/api/users/authenticate")
                .then(response => {
                    return response.json();
                }).then(val => {
                    succes = true;
                    alert('succes');
                })
            } else { 
                alert('Connexion raté. Login invalide.');
            }
        })
    }
}
