# Frenchcab-Gateway

# Prérequis
Pour ce projet, les outils suivants doivent être installés :

* Docker Desktop
* Node.js
* express
* Git

## État actuel

La structure de la gateway est **en place et testée**. L'architecture de base fonctionne : réception des requêtes, routage, appel du service concerné et renvoi de la réponse.


### Structure du projet

gateway/
├── src/
│ ├── routes/ # Définition des routes (endpoints exposés)
│ ├── controllers/ # Logique de traitement de chaque requête
│ ├── services/ # Appels vers les autres services (API Python, base de données…)
│ ├── middlewares/ # Traitements communs (gestion des erreurs, validation, logs…)
│ └── app.js # Point d'entrée de l'application
├── .env.example # Variables d'environnement attendues (sans les valeurs)
└── package.json


### Ajouter une nouvelle route

Pour étendre la gateway, suivre le même schéma que les routes existantes :

1. Créer le fichier de route dans `src/routes/`.
2. Créer le contrôleur correspondant dans `src/controllers/`.
3. Si la route appelle un autre service, ajouter la fonction d'appel dans `src/services/`.

La route `[test]` peut servir de modèle de référence.


### Lancer le projet

L'ensemble du projet se lance avec Docker Compose depuis la racine du dépôt :

```bash
docker compose up -d --build
docker compose ps
docker compose logs -f gateway
docker compose down
```