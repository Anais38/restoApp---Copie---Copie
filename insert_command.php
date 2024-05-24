<?php 
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        $conn = new PDO('mysql:host=localhost;dbname=menu', 'root', '');
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        if (isset($_POST['itemName']) && isset($_POST['quantity']) && isset($_POST['totalPrice'])) {
            $itemNames = $_POST['itemName'];
            $quantities = $_POST['quantity'];
            $totalPrices = $_POST['totalPrice'];

            // Initialiser une chaîne de caractères pour stocker les détails de la commande
            $orderDetails = '';

            // Boucle pour construire la chaîne de caractères des détails de la commande et calculer le prix total
            $totalPriceOfOrder = 0;
            for ($i = 0; $i < count($itemNames); $i++) {
                $itemName = $itemNames[$i];
                $quantity = $quantities[$i];
                $price = $totalPrices[$i] / $quantity; // Calcul du prix unitaire

                // Ajouter les détails de l'article et sa quantité à la chaîne de caractères
                $orderDetails .= "$quantity x $itemName, ";

                // Ajouter le prix total de cet élément à la commande
                $totalPriceOfOrder += $totalPrices[$i];
            }

            // Retirer la virgule en trop à la fin de la chaîne de caractères
            $orderDetails = rtrim($orderDetails, ", ");

            // Préparer et exécuter la requête d'insertion avec les détails de la commande et le prix total
            $stmt = $conn->prepare("INSERT INTO commande (order_details, total_prix) VALUES (:orderDetails, :totalPrice)");
            $stmt->bindParam(':orderDetails', $orderDetails);
            $stmt->bindParam(':totalPrice', $totalPriceOfOrder);

            if ($stmt->execute()) {
                echo "Commande insérée avec succès avec détails: $orderDetails et prix total $totalPriceOfOrder.<br>";
                
            } else {
                echo "Erreur lors de l'insertion de la commande.<br>";
            }
        } else {
            echo "Les données envoyées ne sont pas valides.";
        }
    } catch (PDOException $e) {
        echo "Erreur de base de données : " . $e->getMessage();
    }
} else {
    echo "Méthode de requête invalide.";
}
?>
