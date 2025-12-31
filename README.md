# Green Miles - Prototype de Programme de Décarbonisation

Ce projet est un prototype d'une application web pour une compagnie aérienne, conçue pour promouvoir la décarbonisation en récompensant les passagers pour leurs choix de voyage écologiques. L'application calcule l'empreinte carbone de chaque vol et attribue des "Points Verts" aux utilisateurs, qu'ils peuvent utiliser pour monter en grade (Bronze, Silver, Gold, Platinum).

## Logique Métier Clé

Le cœur de l'application réside dans son système de calcul de l'empreinte carbone et d'attribution de points.

### 1. Calcul de l'Empreinte Carbone

L'empreinte carbone d'un passager pour un vol donné est calculée en suivant une méthodologie précise :

1.  **Émissions Totales du Vol** : On calcule d'abord les émissions totales de CO2 équivalent (CO2e) pour l'ensemble du vol, en se basant sur la distance, la consommation de l'avion et des facteurs de conversion standards (`co2EmissionFactor`, `radiativeForcingFactor`).
2.  **Pondération par Classe** : Un passager en classe Affaires occupe plus d'espace qu'un passager en classe Économique. Pour refléter cet impact, un facteur de pondération est appliqué (`classWeighting`).
3.  **Empreinte Individuelle** : L'empreinte finale du passager est le résultat de la division des émissions totales par le nombre d'unités de passagers pondérées, multiplié par le poids de sa propre classe.

Ce calcul est effectué par la fonction `calculateCarbonFootprint` dans `utils/carbonCalculator.js`.

### 2. Attribution des "Points Verts"

Les points sont attribués de manière inversement proportionnelle à l'empreinte carbone. Moins un vol pollue, plus il rapporte de points.

La formule est la suivante :
`Points = Arrondi( (Constante de Base / Empreinte Carbone) * Multiplicateur SAF )`

-   **Constante de Base** : Un facteur fixe (`30000`) pour mettre les points à une échelle agréable.
-   **Empreinte Carbone** : Le résultat du calcul précédent.
-   **Multiplicateur SAF (Sustainable Aviation Fuel)** : Un bonus est accordé pour les classes de billets qui sont supposées contribuer davantage au financement des carburants durables (ex: +20% pour Éco Flex, +50% pour Business).

Cette logique est implémentée directement dans le contrôleur `controllers/flightController.js` lors de la réservation.

## Architecture et Technologies

-   **Framework Backend** : Express.js
-   **Base de Données** : MongoDB avec Mongoose comme ODM
-   **Moteur de Vues** : EJS (Embedded JavaScript)
-   **Styling** : Tailwind CSS
-   **Gestion des Sessions** : `express-session` avec `connect-mongo` pour le stockage en base de données.
-   **Authentification** : Gestion manuelle avec mots de passe hachés via `bcryptjs`.

## Structure du Projet

```
.
├── controllers/    # Contient la logique métier (que faire quand une route est appelée)
│   ├── authController.js
│   ├── bookingController.js
│   ├── flightController.js
│   └── userController.js
├── models/         # Définit les schémas de la base de données (User, Flight, Booking)
│   ├── Booking.js
│   ├── Flight.js
│   └── User.js
├── public/         # Fichiers statiques (CSS, images)
│   └── css/
├── routes/         # Définit les URL de l'application
│   ├── bookings.js
│   ├── flights.js
│   └── users.js
├── utils/          # Fonctions utilitaires, comme le calcul de l'empreinte carbone
│   └── carbonCalculator.js
├── views/          # Fichiers de template EJS pour l'interface utilisateur
│   ├── partials/
│   └── ...
├── .env.example    # Fichier d'exemple pour les variables d'environnement
├── carbonConfig.js # Constantes pour le calcul de l'empreinte et des points
├── index.js        # Point d'entrée principal de l'application
├── package.json    # Dépendances et scripts du projet
└── seed.js         # Script pour peupler la base de données avec des données de test
```

## Installation et Démarrage

Suivez ces étapes pour lancer le projet en local.

1.  **Cloner le dépôt**
    ```bash
    git clone <URL_DU_DEPOT>
    cd <NOM_DU_DOSSIER>
    ```

2.  **Installer les dépendances**
    ```bash
    npm install
    ```

3.  **Configurer les variables d'environnement**
    Créez un fichier `.env` à la racine du projet en vous basant sur le fichier `.env.example` (s'il existe) ou en utilisant les variables suivantes :
    ```
    MONGODB_URI=mongodb://localhost:27017/greenmiles
    SESSION_SECRET=votre_secret_de_session_ici
    ```

4.  **Peupler la base de données (Optionnel)**
    Pour avoir des données de test (vols, utilisateurs), lancez le script de "seeding" :
    ```bash
    npm run seed
    ```

5.  **Lancer le serveur de développement**
    Cette commande lancera le serveur avec `nodemon` (redémarrage automatique) et compilera le CSS de Tailwind en temps réel.
    ```bash
    npm run dev
    ```

L'application sera alors accessible à l'adresse `http://localhost:3000`.

## Scripts Disponibles

-   `npm start` : Démarre l'application en mode production.
-   `npm run dev` : Démarre l'application en mode développement avec rechargement à chaud.
-   `npm run seed` : Exécute le script `seed.js` pour remplir la base de données avec des données initiales.
-   `npm run build:css` : Compile le fichier CSS de Tailwind une seule fois.

## Structure de la Base de Données

### Collection `users`
-   `username` (String)
-   `email` (String, unique)
-   `password` (String, haché)
-   `greenPoints` (Number)
-   `badge` (String: 'Bronze', 'Silver', 'Gold', 'Platinum')

### Collection `flights`
-   `from`, `to`, `airline` (String)
-   `date` (Date)
-   `distance` (Number, en km)
-   `aircraftType` (String)
-   ...et d'autres détails de vol.

### Collection `bookings`
-   `user` (ObjectId, ref: 'User')
-   `flight` (ObjectId, ref: 'Flight')
-   `class` (String: 'economy', 'business', 'economy_flex')
-   `pointsEarned` (Number) : Points gagnés pour cette réservation spécifique.
