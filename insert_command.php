<?php
// Vérifier si des données ont été envoyées en POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Connexion à la base de données (à remplacer par vos informations de connexion)
    $conn = new PDO('mysql:host=localhost;dbname=menu', 'root', '');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Vérifier si les données sont des tableaux et les traiter individuellement
    if (is_array($_POST['itemName']) && is_array($_POST['quantity'])) {
        // Récupérer les tableaux des noms d'articles et des quantités depuis les données POST
        $itemNames = $_POST['itemName'];
        $quantities = $_POST['quantity'];

        // Boucler sur les tableaux itemName et quantity pour insérer chaque élément dans la base de données
        for ($i = 0; $i < count($itemNames); $i++) {
            // Récupérer le nom de l'article et la quantité actuels dans la boucle
            $itemName = $itemNames[$i];
            $quantity = $quantities[$i];
            $
            // Préparer et exécuter la requête d'insertion dans la table "commande"
            $stmt = $conn->prepare("INSERT INTO commande (article_name, quantity) VALUES (:itemName, :quantity)");
            $stmt->bindParam(':itemName', $itemName);
            $stmt->bindParam(':quantity', $quantity);

            // Exécuter la requête d'insertion
            if ($stmt->execute()) {
                // Afficher un message de succès si l'insertion est réussie
                echo "Commande insérée avec succès pour $itemName avec quantité $quantity.<br>";
            } else {
                // Afficher un message d'erreur si l'insertion échoue
                echo "Erreur lors de l'insertion de la commande pour $itemName avec quantité $quantity.<br>";
            }
        }
    } else {
        // Afficher un message si les données envoyées ne sont pas au format attendu (tableaux)
        echo "Les données envoyées ne sont pas valides.";
    }
} else {
    // Afficher un message si la méthode de requête n'est pas POST
    echo "Méthode de requête invalide.";
}
?>
