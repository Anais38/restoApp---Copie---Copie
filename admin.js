document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Ici, vous enverrez les informations d'identification au backend pour vérification
    // Exemple simplifié pour démonstration
    if (username === 'admin' && password === 'adminpassword') {
        // Authentification réussie, rediriger vers la page d'accueil de l'administrateur
        window.location.href = 'admin_home.html';
    } else {
        // Afficher un message d'erreur
        document.getElementById('error-message').textContent = 'Nom d\'utilisateur ou mot de passe incorrect.';
    }
});

