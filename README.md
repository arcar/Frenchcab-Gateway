# Frenchcab-Gateway

# Prérequis
Pour ce projet, les outils suivants doivent être installés :

* Docker Desktop
* Node.js
* express
* Git

## Contexte 
Vous intégrez une équipe chargée de développer, sur cinq semaines, une application exploitant les données réelles des taxis de New York publiées par la NYC Taxi & Limousine Commission (TLC).

## Structuration du projet
Projet avec **4 repos** `Github`
```
Frenchcab-compose
-> Frenchcab-Backend + Frenchcab-Frontend + Frenchcab-Gateway
```
Le dossier `Frenchcab-compose` contient les autres dossiers du projet (`Frenchcab-Backend`, `Frenchcab-Frontend`, `Frenchcab-Gateway`) il est là pour orchetrer tous le projet.

## Installation 

### 1. Github

1. Cloner les autres repos dans le dossier `Frenchcab-compose` :
- `Frenchcab-Frontend` :
```powershell
https://github.com/arcar/Frenchcab-Gateway.git
```
Demander l'accès en tant que membre à `mmorkos-cyber`, puis lire le `contributing`.

2. Secrets **Github**
Dans ce repo ont été ajouté des secrets (`DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`), afin de pouvoir lancer le `workflows`.

3. `.github`
Dans `Frenchcab-Frontend` a été créer un dossier `github` qui contient le `workflows` avec un fichier `ci.yml`.
Actuellement le fichier `ci.yml`, sert uniquement à lancer `docker build` et `docker push`, le Frontend n'ayant à ce stade pas de test.

### 2. VM

1. Pour accéder à la VM :
```bash
ssh -i ~/Downloads/myKey.pem groupe2@{numéro api dans VM-linux.txt}
```
Il existe 4 utilisateurs crées (`utilisateur1`, `utilisateur2`, `utilisateur3`, `utilisateur4`). Chacun a un mot de passe qui se trouve dans le fichier text `VM-linux.txt`.

2. `deploy.sh`
Dans la VM a été crée un fichier `deploy.sh` qui avec `cron` se déclenche à intervalle de ....... pour faire un `docker pull` et un `docker up`.


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