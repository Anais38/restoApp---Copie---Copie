Skip to content
Navigation Menu
Anais38
/
restoApp---Copie---Copie

Type / to search

Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
Settings
Comparing changes
Choose two branches to see what’s changed or to start a new pull request. If you need to, you can also  or learn more about diff comparisons.
 
...
 
 1 commit
 1 file changed
 1 contributor
Commits on May 4, 2024
Update menu.js

@sarah26123
sarah26123 committed 5 days ago
 Showing  with 25 additions and 7 deletions.
  32 changes: 25 additions & 7 deletions32  
menu.js
@@ -1,52 +1,65 @@
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
    let totalPrice = 0;

    // Fonction pour mettre à jour le prix total de la commande
    function updateTotalPrice() {
        const totalElement = document.getElementById('totalPrice');
        totalElement.textContent = `Prix total: ${totalPrice} DA`;
    }

    // Fonction pour ajouter un élément de commande à la liste
    function addOrderItem(itemName, quantity) {
    function addOrderItem(itemName, quantity ,price) {
        const orderItem = document.createElement('li');
        orderItem.textContent = `${itemName}: ${quantity}`;
        const itemPrice = quantity * price;
        orderItem.textContent = `${itemName}:  ${quantity} x ${price}= ${itemPrice} DA`;
        orderList.appendChild(orderItem);
        totalPrice += itemPrice;
        updateTotalPrice();
    }

    // Fonction pour mettre à jour la quantité d'un élément de commande
    function updateOrderItem(itemName, quantity) {
    function updateOrderItem(itemName, quantity,price) {
        const orderItem = findOrderItem(itemName);
        const itemPrice = quantity * price;
        if (orderItem) {
            if (quantity === 0) {
                orderItem.remove(); // Supprime l'élément si la quantité est 0
            } else {
                orderItem.textContent = `${itemName}: ${quantity}`; // Met à jour la quantité sinon
                orderItem.textContent = `${itemName}: ${quantity} x ${price} = ${itemPrice} DA`;
                totalPrice += itemPrice;
                updateTotalPrice();// Met à jour la quantité sinon
            }
        } else {
            if (quantity > 0) {
                addOrderItem(itemName, quantity); // Ajoute l'élément s'il n'existe pas déjà
                addOrderItem(itemName, quantity,price); // Ajoute l'élément s'il n'existe pas déjà
            }
        }
    }
@@ -56,6 +69,7 @@ document.addEventListener('DOMContentLoaded', function() {
        const menuItem = event.target.closest('.menu-item');
        const itemName = menuItem.querySelector('p').textContent;
        const quantityInput = menuItem.querySelector('.quantity');
        const price = parseFloat(menuItem.querySelector('.price').textContent);
        let quantity = parseInt(quantityInput.value);

        if (event.target.classList.contains('increment')) {
@@ -65,7 +79,8 @@ document.addEventListener('DOMContentLoaded', function() {
        }

        quantityInput.value = quantity;
        updateOrderItem(itemName, quantity);
        updateOrderItem(itemName, quantity,price);

    }

    // Sélection de tous les boutons du compteur et ajout des écouteurs d'événements
@@ -102,6 +117,7 @@ document.addEventListener('DOMContentLoaded', function() {
            emptyOrderMessage.style.display = 'none'; // Cacher le message "Votre commande est vide"
        }
    });


    // Ajout d'un écouteur d'événements au bouton "Oui" dans le message de confirmation
    document.getElementById('confirmBtn').addEventListener('click', function() {
@@ -119,6 +135,8 @@ document.addEventListener('DOMContentLoaded', function() {
        quantityInputs.forEach(input => {
            input.value = 0;
        });


    });

    // Ajout d'un écouteur d'événements au bouton "Non" dans le message de confirmation
Footer
© 2024 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Docs
Contact
Manage cookies
Do not share my personal information
Comparing b6270e3506097f241b15e13dd3b6cc3079c92f5d...e08dc822daf9c575ef9b9da660115955a8016ea9 · Anais38/restoApp---Copie---Copie
