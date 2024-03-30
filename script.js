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
    checkoutBtn.addEventListener('click', function() {
        const confirmationMessage = document.getElementById('confirmationMessage');

        // Fonction pour afficher le message de confirmation
        function afficherMessageConfirmation() {
            confirmationMessage.style.display = 'block';
            setTimeout(function() {
                confirmationMessage.style.display = 'none';
            }, 2000); // Masquer le message après 2 secondes
        }

        document.querySelector('.checkout-btn').addEventListener('click', afficherMessageConfirmation);
    });
});
