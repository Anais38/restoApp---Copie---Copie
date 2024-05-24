
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Interface Cuisine</title>
    <link rel="stylesheet" href="cuisine.css">
</head>
<body>
<?php
// Connexion à la base de données
$dsn = 'mysql:host=localhost;dbname=menu';
$username = 'root';
$password = ''; // Modifiez si nécessaire

try {
    $conn = new PDO($dsn, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Requête pour obtenir toutes les commandes
    $stmt = $conn->query("SELECT * FROM commande");

    // Récupération des résultats
    $commandes = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage();
    $commandes = []; // Assurer que $commandes est défini en cas d'erreur
}
?>

<?php if (!empty($commandes)): ?>
    <?php foreach ($commandes as $commande): ?>
        <div id="commande_<?= $commande['idCommande'] ?>" class="commandes-style">
            <h2>Commande n°<?= htmlspecialchars($commande['idCommande']) ?>:</h2>
            <?php
            // Remplacer les virgules par des sauts de ligne dans les détails de la commande
            $orderDetails = str_replace(',', '<br>', htmlspecialchars($commande['order_details']));
            ?>
           <p><?= $orderDetails ?></p>
            <button onclick="marquerCommePrete(<?= $commande['idCommande'] ?>)">Prête</button>
        </div>
    <?php endforeach; ?>
<?php else: ?>
    <p>Aucune commande disponible.</p>
<?php endif; ?>

<script>
   function marquerCommePrete(idCommande) {
    // Supprimer la commande de l'interface
    var commandeDiv = document.querySelector("#commande_" + idCommande);
    if (commandeDiv) {
        commandeDiv.remove();
        console.log("La commande " + idCommande + " est marquée comme prête.");
        
    }
}

</script>
</body>
</html>

