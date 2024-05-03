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
    function addOrderItem(itemName, quantity ,price) {
        const orderItem = document.createElement('li');
        const itemPrice = quantity * price;
        orderItem.textContent = `${itemName}:  ${quantity} x ${price}= ${itemPrice} DA`;
        orderList.appendChild(orderItem);
        totalPrice += itemPrice;
        updateTotalPrice();
    }

    // Fonction pour mettre à jour la quantité d'un élément de commande
    function updateOrderItem(itemName, quantity,price) {
        const orderItem = findOrderItem(itemName);
        const itemPrice = quantity * price;
        if (orderItem) {
            if (quantity === 0) {
                orderItem.remove(); // Supprime l'élément si la quantité est 0
            } else {
                orderItem.textContent = `${itemName}: ${quantity} x ${price} = ${itemPrice} DA`;
                totalPrice += itemPrice;
                updateTotalPrice();// Met à jour la quantité sinon
            }
        } else {
            if (quantity > 0) {
                addOrderItem(itemName, quantity,price); // Ajoute l'élément s'il n'existe pas déjà
            }
        }
    }

    // Fonction pour gérer l'ajout ou la soustraction d'un élément de commande
    function addToOrder(event) {
        const menuItem = event.target.closest('.menu-item');
        const itemName = menuItem.querySelector('p').textContent;
        const quantityInput = menuItem.querySelector('.quantity');
        const price = parseFloat(menuItem.querySelector('.price').textContent);
        let quantity = parseInt(quantityInput.value);

        if (event.target.classList.contains('increment')) {
            quantity++;
        } else {
            quantity = Math.max(0, quantity - 1); // Assurez-vous que la quantité ne soit pas négative
        }

        quantityInput.value = quantity;
        updateOrderItem(itemName, quantity,price);
       
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
        emptyOrderMessage.style.display = 'none'; // Cacher le message "Votre commande est vide"
    });
});
