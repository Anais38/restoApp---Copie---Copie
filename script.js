// Fonction pour basculer entre les catégories de menu
function toggleCategory(categoryId) {
    var categories = document.querySelectorAll('.menu');

    // Parcourir toutes les catégories
    categories.forEach(function(cat) {
        // Cacher toutes les catégories sauf celle cliquée
        if (cat.id === categoryId) {
            cat.style.display = "block";
        } else {
            cat.style.display = "none";
        }
    });
}

// Appeler toggleCategory avec l'ID de la catégorie "entrees" lorsque la page est chargée
document.addEventListener("DOMContentLoaded", function() {
    toggleCategory('entrees');
});

// JavaScript pour le compteur de commande
document.addEventListener('DOMContentLoaded', function() {
    const orderWindow = document.querySelector('.order-window');
    const orderList = orderWindow.querySelector('.order-list');

    function findOrderItem(itemName) {
        return Array.from(orderList.children).find(item => item.textContent.startsWith(itemName));
    }

    function updateOrderItem(itemName, quantity) {
        const orderItem = findOrderItem(itemName);
        if (orderItem) {
            if (quantity === 0) {
                orderItem.remove(); // Supprime l'élément si la quantité est 0
            } else {
                orderItem.textContent = `${itemName}: ${quantity}`;
            }
        } else {
            if (quantity > 0) {
                addOrderItem(itemName, quantity); // Ajoute l'élément s'il n'existe pas déjà
            }
        }
    }

    function addOrderItem(itemName, quantity) {
        const orderItem = document.createElement('li');
        orderItem.textContent = `${itemName}: ${quantity}`;
        orderList.appendChild(orderItem);
    }

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

    const counterButtons = document.querySelectorAll('.counter-btn');
    counterButtons.forEach(button => {
        button.addEventListener('touchstart', addToOrder); // Modifier l'événement à 'touchstart'
    });

    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.addEventListener('touchstart', function() { // Modifier l'événement à 'touchstart'
        // Sélection de l'élément du message de confirmation
        const confirmationMessage = document.getElementById('confirmationMessage');

        // Fonction pour afficher le message de confirmation
        function afficherMessageConfirmation() {
            confirmationMessage.style.display = 'block'; // Afficher le message

            setTimeout(function() {
                confirmationMessage.style.display = 'none';
            }, 2000);
        }

        // Appeler la fonction pour afficher le message de confirmation lorsque le bouton est touché
        document.querySelector('.checkout-btn').addEventListener('touchstart', afficherMessageConfirmation);

    });
});
