// admin.js

// Récupération du formulaire
const loginForm = document.getElementById('login-form');

// Ajout d'un écouteur d'événement pour le soumission du formulaire
loginForm.addEventListener('submit', function(event) {
    // Empêcher le comportement par défaut du formulaire
    event.preventDefault();

    // Récupérer la valeur du champ de code d'authentification
    const codeValue = document.getElementById('code').value;

    // Vérifier si le code est valide
    if (codeValue === '2024') {
        // Redirection vers la page d'accueil si le code est correct
        window.location.href = 'accueil.html';
    } else {
        // Affichage d'un message d'erreur si le code est incorrect
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = 'Code d\'authentification incorrect. Veuillez réessayer.';
    }
});
