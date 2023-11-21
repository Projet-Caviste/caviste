//window.onload = function(){

//Recherche les vins dont le nom contient ‘Chateau’
// Récupération des éléments du DOM
const searchForm = document.getElementById('search-form'); // Le formulaire de recherche


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

    // Appele une fonction pour ajouter ou retirer le vin 10 parmi les favoris 
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








//vins france triés par année
document.addEventListener('DOMContentLoaded', function() {
    fetchAllFrenchWines();
    setUpYearFilter();
});

let allFrenchWines = []; // Variable pour stocker tous les vins français

function fetchAllFrenchWines() {
    fetch("https://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines?key=country&val=France&sort=year")
        .then(response => response.json())
        .then(data => {
            allFrenchWines = data; // Stocker tous les vins français
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données :', error);
        });
}

function setUpYearFilter() {
    const yearSelect = document.getElementById('tri2');

    if (yearSelect) {
        yearSelect.addEventListener('change', function() {
            const selectedYear = this.options[this.selectedIndex].text;
            displayWinesForYear(selectedYear);
        });
    } else {
        console.error('Élément select pour les années non trouvé');
    }
}

function displayWinesForYear(year) {
    const filteredWines = allFrenchWines.filter(wine => wine.year === year);
    const ulElement = document.querySelector(".vin");
    ulElement.innerHTML = ''; // Effacer la liste actuelle des vins

    filteredWines.forEach(wine => {
        const liElement = document.createElement("li");
        liElement.innerText = `${wine.name} - ${wine.year}`;
        ulElement.appendChild(liElement);
    });
}





       

// RETROUVER LE NOMBRE DE LIKE DU VIN 10 (aymard)

const getLikeCount = async () => {
    const wine_id = 10;
    const apiUrl = `https://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines/${wine_id}/likes-count`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`La requête GET a échoué avec le statut ${response.status}`);
        }

        const likes = await response.json();
        return likes.total;
    } catch (error) {
        console.error('Erreur lors de la récupération du nombre de likes :', error.message);
        throw error;
    }
};



  


// Pour supprimer une image que l'utilisateur a ajouté d'un vin selectionné
function deletePics(){
    const deletePics = document.forms['frmDELETE'].btAdd;              
}


let btValide = document.getElementById('valide');
let form = document.getElementById("loginUsers");

btValide.addEventListener("click", function() {
    Authentification();
});

function Authentification(){

    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    console.log(login);
    const Auth = btoa(`${login}:${password}`)

    const option = {
        method : "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Basic ${Auth}`,
        },
    }
        fetch("https://cruth.phpnet.org/epfc/caviste/public/index.php/api/users/authenticate",option)
            .then(response => 
                response.json())
            .then(data => {
                if(data.success === true){
                    form.remove();  
                    }else{ 
                    alert('Connexion raté. Login invalide.');
                }
            })
    
    }


    let ulElement = document.querySelector(".vin");
    let ulDescription = document.querySelector(".info");

    fetch("https://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines")
        .then(response => {
            return response.json();
        })
        .then((wines) => {       
            wines.forEach(wine => {
                const liElementName = document.createElement("button");
                liElementName.innerText = wine.name;
                ulElement.appendChild(liElementName);

                liElementName.addEventListener('click', () => {
                    fetch(`https://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines/${wine.id}`)
                        .then(response => response.json())
                        .then(selectionVin => {
                            Affichage(wine);
                        });
                });
            });
        });


        // Appel de la fonction pour récupérer la liste des vins depuis l'API
fetch("https://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines")
.then(response => response.json())
.then((wines) => {
    wines.forEach(wine => {
        // Création d'un bouton pour chaque vin
        const liElementName = document.createElement("button");
        liElementName.innerText = wine.name;
        ulElement.appendChild(liElementName);

        // Ajout d'un gestionnaire d'événement au clic sur le bouton
        liElementName.addEventListener('click', () => {
            // Appel de la fonction pour afficher les détails du vin
            Affichage(wine);
            // Appel de la fonction pour trouver les commentaires du vin
            findCommentsForWine(wine.id);
        });
    });
});
    function Affichage(wine){

        ulDescription.innerHTML = "";
        let liElementId = document.createElement("p");
        liElementId.innerText = "ID: " + wine.id;
        ulDescription.appendChild(liElementId);

        let liElementName = document.createElement("p");
        liElementName.innerText = "Nom: " + wine.name;
        ulDescription.appendChild(liElementName);

        let liElementRegion = document.createElement("p");
        liElementRegion.innerText = "Region: " + wine.region;
        ulDescription.appendChild(liElementRegion);

        let liElementCountry = document.createElement("p");
        liElementCountry.innerText = "Pays: " + wine.country;
        ulDescription.appendChild(liElementCountry);

        let liElementYear = document.createElement("p");
        liElementYear.innerText = "Année: " + wine.year;
        ulDescription.appendChild(liElementYear);

        let liElementCapacity = document.createElement("p");
        liElementCapacity.innerText = "Capacité: " + wine.capacity;
        ulDescription.appendChild(liElementCapacity);

        let liElementColor = document.createElement("p");
        liElementColor.innerText = "Couleur: " + wine.color;
        ulDescription.appendChild(liElementColor);

        let liElementPrice = document.createElement("p");
        liElementPrice.innerText = "Prix: " + wine.price;
        ulDescription.appendChild(liElementPrice);
        
        
        // Ajout de l'icône de pouce (like)
     getLikeCount()
     .then(totalLikes => {
         let likeIcon = document.createElement("span");
         likeIcon.innerHTML = "&#128077; Likes: " + totalLikes; // Ajout du nombre de likes
         ulDescription.appendChild(likeIcon);
     })
     .catch(error => {
         console.error('Erreur lors de la récupération du nombre de likes :', error.message);
     });

     //RETROUVER LES COMMENTAIRE DU VIN  10 (aymard)
// Récupération des éléments du DOM

// Appel de la fonction pour trouver les commentaires du vin
findCommentsForWine(wine.id);
}

// ...

// Fonction pour trouver les commentaires d'un vin
async function findCommentsForWine(wine_id) {
    const apiURL = `https://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines/${wine_id}/comments`;

    try {
        const response = await fetch(apiURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`La requête GET a échoué ${response.status}`);
        }
        const comments = await response.json();

        // Créer un conteneur div pour les commentaires
        let commentairesDiv = document.createElement('div');
        commentairesDiv.id = 'commentaires';

         // Vérifier s'il y a des commentaires
         if (comments && comments.length > 0) {
            // Afficher le contenu de chaque commentaire dans la div des commentaires
            comments.forEach(comment => {
                let liElementComments = document.createElement("p");
                liElementComments.innerText = "Commentaire: " + comment.content;
                commentairesDiv.appendChild(liElementComments);
            });

            // Sélectionnez le corps du document et ajoutez la div des commentaires à ulDescription
            ulDescription.appendChild(commentairesDiv);
        } else {
            console.log('Aucun commentaire trouvé.');
        }

        // Sélectionnez le corps du document et ajoutez la div des commentaires à ulDescription
        ulDescription.appendChild(commentairesDiv);
    } catch (error) {
        console.error('Erreur lors de la récupération des commentaires :', error.message);
    }
}


// Fonction pour modifier un commentaire
function modifierCommentaire(commentId, nouveauContenu) {
    // Vérifier si l'utilisateur est connecté (exemple : vérification d'une variable de session)

    if (isAuthenticated) {
        // Construire l'URL pour la modification du commentaire
        const baseURL = 'https://cruth.phpnet.org/epfc/caviste/public/index.php/api';
        const URL = `${baseURL}/comments/${commentId}`;

        // Données pour la requête PUT
            
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        const Auth = btoa(`${login}:${password}`);

        const requestData = {
            method: 'PUT',
            body: JSON.stringify({
                content: nouveauContenu
            }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Basic ${Auth}`
            }
        };

        // Effectuer la requête PUT pour mettre à jour le commentaire
        fetch(URL, requestData)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`La requête PUT a échoué avec le statut ${response.status}`);
                }
            })
            .then(data => {
                console.log(data); // Afficher la réponse de la requête
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour du commentaire :', error.message);
            });
    } else {
        console.error('L\'utilisateur n\'est pas connecté. Autorisation refusée.');
    }
}

// Exemple d'utilisation de la fonction
modifierCommentaire();

