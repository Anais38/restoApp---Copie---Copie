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

// Sélection des éléments du DOM
const counters = document.querySelectorAll('.order-counter');
const quantityInputs = document.querySelectorAll('.quantity');
const decrementButtons = document.querySelectorAll('.decrement');
const incrementButtons = document.querySelectorAll('.increment');

// Ajout des écouteurs d'événements pour les boutons + et -
decrementButtons.forEach(button => {
    button.addEventListener('click', decrement);
});

incrementButtons.forEach(button => {
    button.addEventListener('click', increment);
});

// Fonction pour décrémenter la quantité
function decrement(event) {
    const counter = event.target.parentElement;
    const quantityInput = counter.querySelector('.quantity');
    let quantity = parseInt(quantityInput.value);

    if (quantity > 0) {
        quantity--;
        quantityInput.value = quantity;
    }
}

// Fonction pour incrémenter la quantité
function increment(event) {
    const counter = event.target.parentElement;
    const quantityInput = counter.querySelector('.quantity');
    let quantity = parseInt(quantityInput.value);

    quantity++;
    quantityInput.value = quantity;
}
document.addEventListener('DOMContentLoaded', function() {
    const orderWindow = document.querySelector('.order-window');
    const orderList = orderWindow.querySelector('.order-list');

    function addOrderItem(itemName, quantity) {
        const orderItem = document.createElement('li');
        orderItem.textContent = `${itemName}: ${quantity}`;
        orderList.appendChild(orderItem);
    }

    function addToOrder(event) {
        const menuItem = event.target.closest('.menu-item');
        const itemName = menuItem.querySelector('p').textContent;
        const quantity = parseInt(menuItem.querySelector('.quantity').value);
        if (quantity > 0) {
            addOrderItem(itemName, quantity);
        }
    }

    const incrementButtons = document.querySelectorAll('.increment');
    incrementButtons.forEach(button => {
        button.addEventListener('click', addToOrder);
    });

    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.addEventListener('click', function() {
        // Vous pouvez ajouter ici le code pour finaliser la commande
        alert('Votre commande a été passée avec succès !');
    });
});

