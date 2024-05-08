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
    
    function findOrderItem(itemName) {
        // Recherche de l'élément de commande correspondant exactement au nom de l'article
        return Array.from(orderList.children).find(item => {
            const itemNameElement = item.textContent.split(':')[1].trim(); // Récupérer le nom de l'article dans le texte de l'élément de commande
            return itemNameElement === itemName;
        });
    }
    
    let totalPrice = 0;

    // Fonction pour mettre à jour le prix total de la commande
    function updateTotalPrice() {
        const totalElement = document.getElementById('totalPrice');
        totalElement.textContent = `Prix total: ${totalPrice} DA`;
    }
  
    // Fonction pour ajouter un élément de commande à la liste
    function addOrderItem(quantity, itemName, price) {
        const itemPrice = quantity * price;
        const orderItem = document.createElement('li');
        orderItem.textContent = `${quantity} : ${itemName} ${itemPrice} DA`;
        orderList.appendChild(orderItem);
        totalPrice += itemPrice;
        updateTotalPrice();
    }
    
    function updateOrderItem(quantity, itemName, price) {
        const orderItem = findOrderItem(itemName);
        if (orderItem) {
            const itemPrice = quantity * price;
            orderItem.textContent = `${quantity}:${itemName}   ${itemPrice} DA`;
            // Mettre à jour le prix total en soustrayant le prix précédent de l'élément
            totalPrice -= parseFloat(orderItem.dataset.price);
            // Mettre à jour le prix total en ajoutant le nouveau prix de l'élément
            totalPrice += itemPrice;
            // Mettre à jour le prix de l'élément dans l'attribut de données pour une utilisation future
            orderItem.dataset.price = itemPrice;
            updateTotalPrice();
        } else {
                addOrderItem(quantity, itemName, price); // Ajoute l'élément s'il n'existe pas déjà
            }
    
        // Si la quantité est devenue zéro, réinitialiser le prix total à zéro
        if (quantity === 0) {
            totalPrice = 0;
            updateTotalPrice();
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
    
        // Vérifiez si l'élément existe déjà dans la liste de commandes
        const orderItem = findOrderItem(itemName);
    
        if (orderItem) {
            updateOrderItem(quantity, itemName, price); // Mettre à jour la quantité de l'élément existant
        } else {
            addOrderItem(quantity, itemName, price); // Ajouter l'élément à la liste de commandes
        }
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
