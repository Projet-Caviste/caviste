//window.onload = function(){

//Recherche les vins dont le nom contient ‘Chateau’
// Récupération des éléments du DOM
const searchForm = document.getElementById('search-form'); // Le formulaire de recherche
const searchInput = document.getElementById('search-input'); // Le champ de saisie de texte
const wineList = document.getElementById('wine-list'); // Le conteneur pour les résultats
let btElement;
let wineIdSelected;
 
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

/*
//Ajoute un commentaire pour le vin 10
// Récupération des éléments du DOM pour le formulaire de commentaire
const commentForm = document.getElementById('comment-form'); // Le formulaire de commentaire
const commentInput = document.getElementById('comment-input'); // Le champ de saisie du commentaire

// Écouteur d'événements pour le formulaire de commentaire
commentForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche la soumission du formulaire par défaut

    const wine_id = 10; // ID du vin 10
    const commentContent = commentInput.value; // Récupère le contenu du commentaire saisi par l'utilisateur

    // Appeler une fonction qui ajoute un commentaire pour le vin 10
    addComment(wine_id, commentContent);
});

// Fonction pour ajouter un commentaire
function addComment(wine_id, content) {
    const apiUrl = `https://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines/${wine_id}/comments`;
    const requestData = {
        content: content
    };

    // Effectuer une requête POST pour ajouter un commentaire
    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Commentaire ajouté avec succès :', data);

        // Effacer le champ de saisie après l'ajout du commentaire
        commentInput.value = '';
    })
    .catch(error => {
        console.error('Une erreur s\'est produite :', error);
    });
}

//Supprime le commentaire 3 du vin 10
// Récupération des éléments du DOM pour le bouton de suppression de commentaire
const deleteCommentButton = document.getElementById('delete-comment'); 

// Écouteur d'événements pour le bouton de suppression de commentaire
deleteCommentButton.addEventListener('click', function(event) {
    event.preventDefault();

    const wineIdToDelete = 10; // l'ID du vin
    const commentIdToDelete = 3; // l'ID du commentaire à supprimer

    // Fonction de suppression du commentaire
    deleteComment(wineIdToDelete, commentIdToDelete);
});

// Fonction pour supprimer un commentaire
function deleteComment(wine_id, commentId) {
    const apiUrl = `https://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines/${wine_id}/comments/${commentId}`;

    // Requête DELETE pour supprimer le commentaire
    fetch(apiUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // La suppression réussie 
            console.log(`Commentaire ${commentId} du vin ${wine_id} supprimé avec succès.`);

            // Echec de suppression
        } else {
            console.error(`Échec de la suppression du commentaire ${commentId} du vin ${wine_id}.`);
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



// Pour supprimer une image que l'utilisateur a ajouté d'un vin selectionné
function deletePics() {

}

//Création de 2 variables pour utiliser le login
let btValide = document.getElementById('valide');
let form = document.getElementById('loginUsers');
//Ecouteur d'evenement qui va nous permettre de vérifier le login de la personne quand il appuie sur le bouton
btValide.addEventListener("click", function() {
	Authentification();
});

function Authentification() {
    //On récupère le login et le mdp
	const login = document.getElementById('login').value;
	const password = document.getElementById('password').value;

    //On transforme les 2 valeurs en chaine ASCII pour comparer avec l'api
	const Auth = btoa(`${login}:${password}`)

    //On crée un objet et on le configure
	const option = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Basic ${Auth}`,
		},
	}
    //Appel de l'api
	fetch("https://cruth.phpnet.org/epfc/caviste/public/index.php/api/users/authenticate", option)
		.then(response =>
			response.json())
		.then(data => {
            //On vérifie la réponse de l'api
			if (data.success === true) {
                //On enregistre les valeurs dans un localStorage pour que l'uilisateur n'a pas besoin de se
                //connecter si la page a été rafraichit seulement 
                localStorage.setItem('login',login);
                localStorage.setItem('mot de passe',password);
                //On cache le formulaire  login et on affiche le bouton pour se déconnecter
                document.getElementById('loginSection').classList.add('hide');
                document.getElementById('logoutSection').classList.remove('hide');
			} else {
				alert('Connexion raté. Login invalide.');
			}
		})
}

const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', function() {
    //On affiche le formulaire de connexion et on cache le bouton de deconnexion
    document.getElementById('loginSection').classList.remove('hide');
    document.getElementById('logoutSection').classList.add('hide');
    //On supprime les 2 localStorage puisque l'utilisateur se deconnecte
    localStorage.removeItem("login");
    localStorage.removeItem("mot de passe");
});

document.addEventListener('DOMContentLoaded', function() {
    VérificationConnexion();
});

//C'est quasi la meme fonction que Affichage() sauf qu'on ne demande pas à l'utilisateur
//d'entrer ces identifiants puisqu'on vérifie s'ils ne sont pas dans  le localStorage
function VérificationConnexion() {
    // On crée 2 variables pour récupérer les localStorage
    const storeLogin = localStorage.getItem('login');
    const storePassword = localStorage.getItem('mot de passe');

    if (storeLogin && storePassword) {
        
        const Auth = btoa(`${storeLogin}:${storePassword}`);

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Basic ${Auth}`,
            },
        };

        fetch("https://cruth.phpnet.org/epfc/caviste/public/index.php/api/users/authenticate", options)
            .then(response => response.json())
            .then(data => {
                if (data.success === true) {
                    document.getElementById('loginSection').classList.add('hide');
                    document.getElementById('logoutSection').classList.remove('hide');
                } else {
                    alert('Connexion échouée. Identifiants invalides.');
                }
            })
    } else {
        // Si les informations de connexion ne sont pas présentes dans le localStorage
        console.log('Les identifiants de l\'utilisateur ne  sont pas dans le localStorage');
    }
}

//Création des 3 ul qui vont permettre de mettre les vins, leur description et les commentaires
let ulElement = document.querySelector(".vin");
let ulDescription = document.querySelector(".info");
let ulComments = document.querySelector("#commentsBox");

//Appel de l'api pour récuperer les vins 
fetch("https://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines")
	.then(response => {
		return response.json();
	})
	.then((wines) => {
        //Une boucle qui permet de récuperer le nom des vins un par un et les placer dans l'ul 
        //en créant un button pour interagir en affichant leur description
		wines.forEach(wine => {
			const liElementName = document.createElement("button");
			liElementName.innerText = wine.name;
			ulElement.appendChild(liElementName);
            //Un écouteur d'evenement qui va permettre de selection le vin que l'utilisateur a séléctionné
			liElementName.addEventListener('click', () => {
				fetch(`https://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines/${wine.id}`)
					.then(response => response.json())
					.then(selectionVin => {
						Affichage(wine);
					});
			});
		});
	});


function Affichage(wine) {

	wineIdSelected=wine.id;

	//C'est l'ul vide qui va nous permettre de placer les li avec la desciption 
	ulDescription.innerHTML = "";
	//On crée le li pour l'utiliser
	let liElementId = document.createElement("li");
	liElementId.innerText = "Numéro: " + wine.id;
	// On le met dans l'ul
	ulDescription.appendChild(liElementId);

	let liElementName = document.createElement("li");
	liElementName.innerText = "Nom: " + wine.name;
	ulDescription.appendChild(liElementName);

	let liElementRegion = document.createElement("li");
	liElementRegion.innerText = "Region: " + wine.region;
	ulDescription.appendChild(liElementRegion);

	let liElementCountry = document.createElement("li");
	liElementCountry.innerText = "Pays: " + wine.country;
	ulDescription.appendChild(liElementCountry);

	let liElementYear = document.createElement("li");
	liElementYear.innerText = "Année: " + wine.year;
	ulDescription.appendChild(liElementYear);

	let liElementCapacity = document.createElement("li");
	liElementCapacity.innerText = "Capacité: " + wine.capacity;
	ulDescription.appendChild(liElementCapacity);

	let liElementColor = document.createElement("li");
	liElementColor.innerText = "Couleur: " + wine.color;
	ulDescription.appendChild(liElementColor);

	let liElementPrice = document.createElement("li");
	liElementPrice.innerText = "Prix: " + wine.price;
	ulDescription.appendChild(liElementPrice);

	let ElementImg = document.createElement("img");
	let imageUrl = 'https://cruth.phpnet.org/epfc/caviste/public/pics/'
	ElementImg.src = imageUrl+wine.picture;
	ulDescription.appendChild(ElementImg);


	// Ajout de l'icône de pouce (like) Retrouver et afficher le nombre de Like d'un vin (aymard);
	let likeIcon = document.createElement("span");
			likeIcon.innerHTML = `&#128077; Likes: ` ;
			ulDescription.appendChild(likeIcon);
			
		
	async function getLikeCount() {
				const apiUrl = `https://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines/${wine.id}/likes-count`;
			
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

					// Convertir le champ "total" en nombre
					const totalLikes = parseInt(likes.total);
					// Mettre à jour le contenu de likeIcon avec le nombre de likes obtenu
					likeIcon.innerHTML = `&#128077;  ${totalLikes} Likes`;
					return totalLikes;
				} catch (error) {
					console.error('Erreur lors de la récupération du nombre de likes :', error.message);
					throw error;
				}
			}
	getLikeCount(wine.id);
		
	 // Ajout d'un gestionnaire d'événements pour afficher les commentaires lors du clic
	 liElementId.addEventListener('click', async () => {
        try {
            // Appel de la fonction pour afficher les commentaires correspondants au vin
            await findCommentsForWine();
        } catch (error) {
            console.error('Erreur lors de la récupération des commentaires :', error.message);
        }
    });

	
	function setAttributes(element, attributes) {
		for (let key in attributes) {
		  element.setAttribute(key, attributes[key]);
		}
	}

	let i = 0;

	//RETROUVER LES COMMENTAIRE DU VIN (aymard)
	async function findCommentsForWine() {
		const apiURL = `https://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines/${wine.id}/comments`;

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
			// Si la réponse est OK, nous continuons avec le traitement des commentaires
			const comments = await response.json();
	
			ulComments.innerHTML = '';		
				
				comments.forEach(comment => {

					let labelElement = document.createElement("label");
					labelElement.innerText = `${comment.user_id} : ${comment.content}`;
					ulComments.appendChild(labelElement);
				
					btElement = document.createElement("button");
					setAttributes(btElement,{id:`comments${i}`,class:"select"},na);
					labelElement.appendChild(btElement);
					i++;
				})

				console.log(ulComments);


		} catch (error) {
			console.error('Erreur lors de la récupération des commentaires :', error.message);
		}
	}
	// Appel de la fonction findCommentsForWine
	findCommentsForWine();
	let allInput = document.getElementById("commentsBox").getElementsByTagName("input");
	//console.log(allInput);
}


// Récupération des éléments du DOM pour le formulaire de modification de commentaire
const modifyCommentForm = document.getElementById('modify-comment-form');
const newCommentContentInput = document.getElementById('new-comment-content');


// Fonction pour remplir dynamiquement la liste déroulante avec les commentaires
async function fillCommentList() 		{
    const wineId = wineIdSelected; 

    try {
        const response = await fetch(`https://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines/${wineId}/comments`);
        const comments = await response.json();

        comments.forEach(comment => {
            const option = document.createElement('option');
            option.value = comment.id;
            option.textContent = `Commentaire #${comment.id}`;
            ulComments.appendChild(option);
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des commentaires :', error.message);
    }
}

// Appel de la fonction pour remplir la liste déroulante au chargement de la page
document.addEventListener('DOMContentLoaded', fillCommentList);

let selectedCommentId;

// Écouteur d'événements pour le formulaire de modification de commentaire
modifyCommentForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const wineId = 11; // ID du vin
    selectedCommentId = btElement; // ID du commentaire sélectionné
	console.log('ac2',btElement);
    const newCommentContent = newCommentContentInput.value; // Nouveau contenu du commentaire

    modifierCommentaire(wineId, selectedCommentId, newCommentContent);
});

async function modifierCommentaire(wineId, commentId, newContent) {

	commentId = selectedCommentId;

    const apiUrl = `https://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines/${wineId}/comments/${commentId}`;


    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: newContent })
        });

        if (!response.ok) {
            throw new Error(`La requête PUT a échoué avec le statut ${response.status}`);
        }

        const data = await response.json(); // Si l'API renvoie des données en réponse

        console.log('Commentaire modifié avec succès :', data);
        // Vous pouvez effectuer des actions supplémentaires après la modification du commentaire si nécessaire
    } catch (error) {
        console.error('Erreur lors de la modification du commentaire :', error.message);
    }
}

// Écouteur d'événements pour le formulaire de modification de commentaire
modifyCommentForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const wineId = wineIdSelected; // ID du vin
    const selectedCommentId = ulComments.value; // ID du commentaire sélectionné
    const newCommentContent = newCommentContentInput.value; // Nouveau contenu du commentaire

    modifierCommentaire(wineId, selectedCommentId, newCommentContent);
});


