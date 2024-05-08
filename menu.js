function toggleCategory(categoryId) {
    console.log("Affichage de la catégorie avec l'ID :", categoryId);
    // Masquer toutes les catégories
    var categories = document.querySelectorAll('.menu');
    categories.forEach(function(cat) {
        cat.style.display = 'none';
    });

    // Afficher la catégorie correspondante
    var selectedCategory = document.getElementById(categoryId);
    if (selectedCategory) {
        selectedCategory.style.display = 'block';
    }
}

// Appeler toggleCategory avec l'ID de la catégorie "entrees" lorsque la page est chargée
document.addEventListener("DOMContentLoaded", function() {
    toggleCategory('1');
});

document.addEventListener('DOMContentLoaded', function() {
    // Sélection de la fenêtre de commande et de la liste des commandes
    const orderWindow = document.querySelector('.order-window');
    const orderList = orderWindow.querySelector('.order-list');

    // Fonction pour trouver un élément de commande spécifique dans la liste
    function findOrderItem(itemName) {
        return Array.from(orderList.children).find(item => item.textContent.startsWith(itemName));
    }

    // Fonction pour ajouter un élément de commande à la liste
    function addOrderItem(itemName, quantity) {
        const orderItem = document.createElement('li');
        orderItem.textContent = `${itemName}: ${quantity}`;
        orderList.appendChild(orderItem);
    }

    // Fonction pour mettre à jour la quantité d'un élément de commande
    function updateOrderItem(itemName, quantity) {
        const orderItem = findOrderItem(itemName);
        if (orderItem) {
            if (quantity === 0) {
                orderItem.remove(); // Supprime l'élément si la quantité est 0
            } else {
                orderItem.textContent = `${itemName}: ${quantity}`; // Met à jour la quantité sinon
            }
        } else {
            if (quantity > 0) {
                addOrderItem(itemName, quantity); // Ajoute l'élément s'il n'existe pas déjà
            }
        }
    }

    // Fonction pour gérer l'ajout ou la soustraction d'un élément de commande
    function addToOrder(event) {
        const menuItem = event.target.closest('.menu-item');
        const itemName = menuItem.querySelector('p').textContent;
        const quantityInput = menuItem.querySelector('.quantity');
        let quantity = parseInt(quantityInput.value);

        if (event.target.classList.contains('increment')) {
            quantity++;
        } else {
            quantity = Math.max(0, quantity - 1); // Assurez-vous que la quantité ne soit pas négative
        }

        quantityInput.value = quantity;
        updateOrderItem(itemName, quantity);
    }

    // Sélection de tous les boutons du compteur et ajout des écouteurs d'événements
    const counterButtons = document.querySelectorAll('.counter-btn');
    counterButtons.forEach(button => {
        button.addEventListener('click', addToOrder);
    });

    const checkoutBtn = document.querySelector('.checkout-btn');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const successMessage = document.getElementById('successMessage');
    const emptyOrderMessage = document.getElementById('emptyOrderMessage');

    // Fonction pour afficher le message de succès
    function displaySuccessMessage() {
        successMessage.style.display = 'block';
    }

    // Ajout d'un écouteur d'événements au bouton "Envoyer la commande"
    checkoutBtn.addEventListener('click', function() {
        // Vérifier si la commande est vide
        if (orderList.children.length === 0) {
            // La commande est vide
            emptyOrderMessage.style.display = 'block'; // Afficher le message "Votre commande est vide"
            confirmationMessage.style.display = 'none'; // Cacher le message de confirmation

            // Cacher le message "Votre commande est vide" après 1 seconde
            setTimeout(function() {
                emptyOrderMessage.style.display = 'none';
            }, 1000);
        } else {
            // Afficher le message de confirmation avec deux boutons
            confirmationMessage.style.display = 'block';
            emptyOrderMessage.style.display = 'none'; // Cacher le message "Votre commande est vide"
        }
    });

   // Ajout d'un écouteur d'événements au bouton "Oui" dans le message de confirmation
document.getElementById('confirmBtn').addEventListener('click', function() {
    confirmationMessage.style.display = 'none'; // Cacher le message de confirmation
    displaySuccessMessage(); // Afficher le message de succès
    setTimeout(function() {
        successMessage.style.display = 'none'; // Cacher le message de succès après quelques secondes
    }, 10000); // Masquer le message après 10 secondes
    emptyOrderMessage.style.display = 'none'; // Cacher le message "Votre commande est vide"
    
    // Récupérer tous les éléments de commande de la liste
    const orderItems = Array.from(orderList.children);

    // Préparer les données à envoyer au serveur
    const formData = new FormData();
    orderItems.forEach(item => {
        const itemName = item.textContent.split(':')[0].trim();
        const quantity = parseInt(item.textContent.split(':')[1].trim());
        formData.append('itemName[]', itemName);
        formData.append('quantity[]', quantity);
    });
// Requête AJAX pour envoyer les données au script PHP côté serveur
  fetch('insert_command.php', {
    method: 'POST', // Utilisation de la méthode POST pour envoyer les données
    body: formData    // Les données à envoyer, généralement un objet FormData contenant les champs du formulaire
  })
  .then(response => response.text()) // Récupérer la réponse du serveur au format texte
  .then(data => {
    alert(data); // Affichez la réponse du serveur (message de succès ou d'erreur)
  })
  .catch(error => {
    // Gestion des erreurs lors de l'envoi de la requête
    console.error('Erreur lors de l\'envoi des données au serveur :', error);
    alert('Erreur lors de l\'envoi des données au serveur.'); // Affichez une alerte en cas d'erreur
 });

    // Réinitialiser la commande après confirmation
    orderList.innerHTML = '';
});

        // Réinitialiser tous les compteurs à 0
        const quantityInputs = document.querySelectorAll('.quantity');
        quantityInputs.forEach(input => {
            input.value = 0;
        });
    });

    // Ajout d'un écouteur d'événements au bouton "Non" dans le message de confirmation
    document.getElementById('cancelBtn').addEventListener('click', function() {
        confirmationMessage.style.display = 'none'; // Cacher le message de confirmation
        emptyOrderMessage.style.display = 'none'; // Cacher le message "Votre commande est vide"
    });
