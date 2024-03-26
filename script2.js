
document.addEventListener('DOMContentLoaded', function() {
    var backgroundImage = document.querySelector('.background-image');
    backgroundImage.onload = function() {
        backgroundImage.style.opacity = '1';
    }
    backgroundImage.src = 'background-image.jpg'; // Assurez-vous de mettre le bon chemin vers votre image
});
