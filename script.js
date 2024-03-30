// Fonction pour basculer entre les catégories de menu
function toggleCategory(categoryId) {
    // Sélection de toutes les catégories de menu
    var categories = document.querySelectorAll('.menu');

    // Parcourir toutes les catégories
    categories.forEach(function(cat) {
        // Vérifier si la catégorie correspond à l'ID spécifié
        if (cat.id === categoryId) {
            cat.style.display = "block"; // Afficher la catégorie si c'est la bonne
        } else {
            cat.style.display = "none"; // Masquer les autres catégories
        }
    });
}

// Appeler toggleCategory avec l'ID de la catégorie "entrees" lorsque la page est chargée
document.addEventListener("DOMContentLoaded", function() {
    toggleCategory('entrees');
});

// JavaScript pour le compteur de commande
document.addEventListener('DOMContentLoaded', function() {
    // Sélection de la fenêtre de commande et de la liste des commandes
    const orderWindow = document.querySelector('.order-window');
    const orderList = orderWindow.querySelector('.order-list');

    // Fonction pour trouver un élément de commande spécifique dans la liste
    function findOrderItem(itemName) {
        return Array.from(orderList.children).find(item => item.textContent.startsWith(itemName));
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

    // Fonction pour ajouter un élément de commande à la liste
    function addOrderItem(itemName, quantity) {
        const orderItem = document.createElement('li');
        orderItem.textContent = `${itemName}: ${quantity}`;
        orderList.appendChild(orderItem);
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

    // Sélection de tous les boutons du compteur
    const counterButtons = document.querySelectorAll('.counter-btn');
    counterButtons.forEach(button => {
        button.addEventListener('click', addToOrder); // Ajouter un écouteur d'événements à chaque bouton
    });

    const checkoutBtn = document.querySelector('.checkout-btn');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const successMessage = document.getElementById('successMessage');
    const emptyOrderMessage = document.getElementById('emptyOrderMessage');

    // Ajout d'un écouteur d'événements au bouton "Envoyer la commande"
    checkoutBtn.addEventListener('click', function() {
        // Vérifier si la commande est vide
        if (orderList.children.length === 0) {
            // La commande est vide
            emptyOrderMessage.style.display = 'block'; // Afficher le message "Votre commande est vide"
            successMessage.style.display = 'none'; // Cacher le message de succès
            confirmationMessage.style.display = 'none'; // Cacher le message de confirmation

            // Cacher le message "Votre commande est vide" après 1 seconde
            setTimeout(function() {
                emptyOrderMessage.style.display = 'none';
            }, 1000);
        } else {
            // Afficher le message de confirmation avec deux boutons
            confirmationMessage.style.display = 'block';
            successMessage.style.display = 'none'; // Cacher le message de succès
            emptyOrderMessage.style.display = 'none'; // Cacher le message "Votre commande est vide"
        }
    });

    // Ajout d'un écouteur d'événements au bouton "Oui" dans le message de confirmation
    document.getElementById('confirmBtn').addEventListener('click', function() {
        confirmationMessage.style.display = 'none'; // Cacher le message de confirmation
        successMessage.style.display = 'block'; // Afficher le message de succès
        setTimeout(function() {
            successMessage.style.display = 'none'; // Cacher le message de succès après quelques secondes
        }, 1000); // Masquer le message après 1 seconde
        emptyOrderMessage.style.display = 'none'; // Cacher le message "Votre commande est vide"
        // Réinitialiser la commande
        orderList.innerHTML = '';

        // Réinitialiser tous les compteurs à 0
        const quantityInputs = document.querySelectorAll('.quantity');
        quantityInputs.forEach(input => {
            input.value = 0;
        });
    });

    // Ajout d'un écouteur d'événements au bouton "Non" dans le message de confirmation
    document.getElementById('cancelBtn').addEventListener('click', function() {
        confirmationMessage.style.display = 'none'; // Cacher le message de confirmation
        successMessage.style.display = 'none'; // Cacher le message de succès
        emptyOrderMessage.style.display = 'none'; // Cacher le message "Votre commande est vide"
    });
});
