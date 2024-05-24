
function toggleCategory(categoryId) {
    console.log("Affichage de la catégorie avec l'ID :", categoryId);
    var categories = document.querySelectorAll('.menu');
    categories.forEach(function(cat) {
        cat.style.display = 'none';
    });

    var selectedCategory = document.getElementById(categoryId);
    if (selectedCategory) {
        selectedCategory.style.display = 'block';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    toggleCategory('1');
});

document.addEventListener('DOMContentLoaded', function() {
    const orderWindow = document.querySelector('.order-window');
    const orderList = orderWindow.querySelector('.order-list');

    function calculateTotalPrice(quantity, unitPrice) {
        return quantity * unitPrice;
    }

    function updateTotalOrderPrice() {
        let total = 0;
        orderList.querySelectorAll('li').forEach(item => {
            const quantityElement = item.querySelector('.quantity');
            const totalPriceElement = item.querySelector('.total-price');
            if (quantityElement && totalPriceElement) {
                const quantity = parseInt(quantityElement.textContent);
                const totalPrice = parseFloat(totalPriceElement.textContent);
                total += totalPrice;
            } else {
                console.error("Un élément nécessaire n'a pas été trouvé.");
            }
        });
        const totalPriceElement = document.getElementById('totalPrice');
        if (totalPriceElement) {
            totalPriceElement.textContent = `Prix total: ${total} DA`;
        } else {
            console.error("L'élément totalPrice n'a pas été trouvé.");
        }
        return total;
    }
    

    function findOrderItem(itemName) {
        return Array.from(orderList.children).find(item => item.querySelector('.item-name').textContent === itemName);
    }

    function updateOrderItem(itemName, quantity, unitPrice) {
        const orderItem = findOrderItem(itemName);
        if (orderItem) {
            if (quantity === 0) {
                orderItem.remove();
            } else {
                const totalPrice = calculateTotalPrice(quantity, unitPrice);
                orderItem.querySelector('.quantity').textContent = quantity;
                orderItem.querySelector('.total-price').textContent = totalPrice;
            }
        } else {
            if (quantity > 0) {
                addOrderItem(itemName, quantity, unitPrice);
            }
        }
        updateTotalOrderPrice();
    }

    function addOrderItem(itemName, quantity, unitPrice) {
        const orderItem = document.createElement('li');
        const totalPrice = calculateTotalPrice(quantity, unitPrice);
        orderItem.innerHTML = `<span class="item-name">${itemName}</span> <span class="quantity">${quantity}</span> <span class="total-price">${totalPrice}</span>DA`;
        orderList.appendChild(orderItem);
        updateTotalOrderPrice();
    }

    function addToOrder(event) {
        const menuItem = event.target.closest('.menu-item');
        const itemName = menuItem.querySelector('p').textContent;
        const quantityInput = menuItem.querySelector('.quantity');
        const unitPrice = parseFloat(menuItem.querySelector('.price').textContent);
        let quantity = parseInt(quantityInput.value);

        if (event.target.classList.contains('increment')) {
            quantity++;
        } else {
            quantity = Math.max(0, quantity - 1);
        }

        quantityInput.value = quantity;
        updateOrderItem(itemName, quantity, unitPrice);
    }

    const counterButtons = document.querySelectorAll('.counter-btn');
    counterButtons.forEach(button => {
        button.addEventListener('click', addToOrder);
    });

    const checkoutBtn = document.querySelector('.checkout-btn');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const successMessage = document.getElementById('successMessage');
    const emptyOrderMessage = document.getElementById('emptyOrderMessage');

    function displaySuccessMessage() {
        successMessage.style.display = 'block';
    }

    checkoutBtn.addEventListener('click', function() {
        if (orderList.children.length === 0) {
            emptyOrderMessage.style.display = 'block';
            confirmationMessage.style.display = 'none';
            setTimeout(function() {
                emptyOrderMessage.style.display = 'none';
            }, 1000);
        } else {
            confirmationMessage.style.display = 'block';
            emptyOrderMessage.style.display = 'none';
        }
    });

    document.getElementById('confirmBtn').addEventListener('click', function() {
        confirmationMessage.style.display = 'none';
        displaySuccessMessage();
        setTimeout(function() {
            successMessage.style.display = 'none';
        }, 2000);
        emptyOrderMessage.style.display = 'none';

        const orderItems = Array.from(orderList.children);
        if (orderItems.length > 0) {
            const formData = new FormData();
            orderItems.forEach(item => {
                const itemName = item.querySelector('.item-name').textContent;
                const quantity = parseInt(item.querySelector('.quantity').textContent);
                const totalPrice = parseFloat(item.querySelector('.total-price').textContent);
                formData.append('itemName[]', itemName);
                formData.append('quantity[]', quantity);
                formData.append('totalPrice[]', totalPrice);
            });

            fetch('insert_command.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                alert(data);
            })
            .catch(error => {
                console.error('Erreur lors de l\'envoi des données au serveur :', error);
                alert('Erreur lors de l\'envoi des données au serveur.');
            });
        } else {
            console.error('La liste des éléments de commande est vide.');
            alert('La liste des éléments de commande est vide.');
        }

        orderList.innerHTML = '';
        updateTotalOrderPrice();

        const quantityInputs = document.querySelectorAll('.quantity');
        quantityInputs.forEach(input => {
            input.value = 0;
        });
    });

    document.getElementById('cancelBtn').addEventListener('click', function() {
        confirmationMessage.style.display = 'none';
        emptyOrderMessage.style.display = 'none';
    });
});
