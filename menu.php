<?php 
require("config/commande.php");
?>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menu du restaurant</title>
    <link rel="stylesheet" href="style menu.css">
    <script src="menu.js" defer> </script>
    
</head>
<body>
   <div class="container">
        <header>
            <nav>
                <ul class="minu">
                    <li><a href="acceuil.html">Accueil</a></li>
                    <li><a href="propos.html">À propos</a></li>
                    <li><a href="#offers">Offres</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </nav>
        </header>
        <div class="category-icons">
            <?php 
                $categories = afficher("catégories");
                foreach ($categories as $categorie):?>
                <div class="category-icon" onclick="toggleCategory('<?php echo htmlspecialchars($categorie->id, ENT_QUOTES); ?>')">
                     <img src="<?= $categorie->img ?>" alt="<?= $categorie->name ?>">
                     <p><?= $categorie->name ?></p>
                </div> 
            <?php endforeach; ?> 
        </div>


        
        <div class="menu" id="1">
            <ul>
			<?php 
            $entrees = afficher("entree");
            foreach($entrees as $entree):?>
                <li class="menu-item">
                    <img src="<?= $entree->img ?>" alt="<?= $entree->name ?>">
                    <p><?= $entree->name ?> </p>
                    <div class="item-details">
                        <p class="price"><?= $entree->prix ?></p>
                        <div class="order-counter">
                            <button class="counter-btn decrement">-</button>
                            <input type="number" value="0" class="quantity" readonly>
                            <button class="counter-btn increment">+</button>
                        </div>
                    </div>
                </li>
			<?php endforeach; ?>
            </ul>
        </div>
        
        <div class="menu" id="2">
            <ul>
            <?php
              $produits=afficher("plat_principaux");
             foreach($produits as $plat_principaux):?>
                <li class="menu-item">
                <img src="<?= $plat_principaux->img ?>" alt="<?= $plat_principaux->name ?>">
                    <p><?= $plat_principaux->name ?> </p>
                    <div class="item-details">
                         <p class="price"><?= $plat_principaux->prix ?></p>
                        <div class="order-counter">
                            <button class="counter-btn decrement">-</button>
                            <input type="number" value="0" class="quantity" readonly>
                            <button class="counter-btn increment">+</button>
                        </div>
                    </div>
                </li>
            <?php endforeach; ?>   
            </ul>
        </div>
        
        <div class="menu" id="3">
            <ul>
            <?php
              $produits=afficher("fruit_de_mer");
             foreach($produits as $fruit_de_mer):?>
                <li class="menu-item">
                    <img src="<?= $fruit_de_mer->img ?>" alt="<?= $fruit_de_mer->name ?>">
                    <p><?= $fruit_de_mer->name ?> </p>
                    <div class="item-details">
                        <p class="price"><?= $fruit_de_mer->prix ?></p>
                        <div class="order-counter">
                            <button class="counter-btn decrement">-</button>
                            <input type="number" value="0" class="quantity" readonly>
                            <button class="counter-btn increment">+</button>
                        </div>
                    </div>
             </li>
            <?php endforeach; ?>  
            </ul>
        </div>

        <div class="menu" id="4">
            <ul>
            <?php
              $produits=afficher("humberger");
             foreach($produits as $hamburger):?>
                <li class="menu-item">
                    <img src="<?= $hamburger->img ?>" alt="<?= $hamburger->name ?>">
                    <p><?= $hamburger->name ?> </p>
                    <div class="item-details">
                        <p class="price"><?= $hamburger->prix ?></p>
                        <div class="order-counter">
                            <button class="counter-btn decrement">-</button>
                            <input type="number" value="0" class="quantity" readonly>
                            <button class="counter-btn increment">+</button>
                        </div>
                    </div>
                </li>
            <?php endforeach; ?>  
            </ul>
        </div>
        
        <div class="menu" id="5">
            <ul>
            <?php
              $produits=afficher("pizzas");
             foreach($produits as $pizza):?>
                <li class="menu-item">
                    <img src="<?= $pizza->img ?>" alt="<?= $pizza->name ?>">
                    <p><?= $pizza->name ?> </p>
                    <div class="item-details">
                        <p class="price"><?= $pizza->prix ?></p>
                        <div class="order-counter">
                            <button class="counter-btn decrement">-</button>
                            <input type="number" value="0" class="quantity" readonly>
                            <button class="counter-btn increment">+</button>
                        </div>
                    </div>
                </li>
            <?php endforeach; ?>   
            </ul>
        </div>
        
        <div class="menu" id="6">
            <ul>
            <?php
              $produits=afficher("dessert");
             foreach($produits as $dessert):?>
                <li class="menu-item">
                    <img src="<?= $dessert->img ?>" alt="<?= $dessert->name ?>">
                    <p><?= $dessert->name ?> </p>
                    <div class="item-details">
                        <p class="price"><?= $dessert->prix ?></p>
                        <div class="order-counter">
                            <button class="counter-btn decrement">-</button>
                            <input type="number" value="0" class="quantity" readonly>
                            <button class="counter-btn increment">+</button>
                        </div>
                    </div>
                </li>
            <?php endforeach; ?>
            </ul>
        </div>
        
        <div class="menu" id="7">
            <ul>
            <?php
              $produits=afficher("boisson");
             foreach($produits as $boisson):?>
                <li class="menu-item">
                    <img src="<?= $boisson->img ?>" alt="<?= $boisson->name ?>">
                    <p><?= $boisson->name ?> </p>
                    <div class="item-details">
                        <p class="price"><?= $boisson->prix ?></p>
                        <div class="order-counter">
                            <button class="counter-btn decrement">-</button>
                            <input type="number" value="0" class="quantity" readonly>
                            <button class="counter-btn increment">+</button>
                        </div>
                    </div>
                </li>
            <?php endforeach; ?>   
            </ul>
        </div>
   </div>
   
    <div class="order-window">
        <h2>Votre Commande</h2>
        <ul class="order-list" id="command"></ul>
        <button class="checkout-btn">Envoyer la commande</button>
    </div>
    <div id="confirmationMessage" class="confirmation-message">
        <p>Voulez-vous vraiment passer votre commande ?</p>
        <button id="confirmBtn">Oui</button> 
        <button id="cancelBtn">Non</button>
    </div>
        
    <div id="successMessage" class="confirmation-message success-message">
        <p>Votre commande a été passée avec succès !</p>
    </div>
        
    <div id="emptyOrderMessage" class="confirmation-message" style="display: none;">
        <p>Votre commande est vide</p>
    </div> 
    
</body>
</html>
