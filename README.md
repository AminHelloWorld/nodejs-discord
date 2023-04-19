# Backend du chat en ligne Discord-Like developpé par Amin Hallouli, Shad Azuelos, et Nicolas Gilberto
Api accessible sur l'adresse http://139.59.208.123:8080 

Documentation POSTMAN avec tous les endpoints offerts par le projet :
https://www.postman.com/aminaminaminamin/workspace/devweb-discord-like-chat/collection/23425401-055c421c-f1ce-4f74-ad49-7bfe7eca7965?action=share&creator=23425401


## Config
Faire une copie de ecosystem.config.js.example nommée ecosystem.config.js

Dans le fichier ecosystem.config.js : 
 - Remplacer les valeurs de la configuration des bases de données avec celles correspondantes a la base de données à utiliser


## Project setup
```
git clone https://github.com/AminHelloWorld/nodejs-discord.git
cd ./nodejs-discord
npm install
```

Pour utiliser ce projet il est necessaire d'avoir installé le gestionnaire de processus PM2 qui peut être installé avec : 
```
 npm install pm2@latest -g
```
Une fois le projet lancé et la BDD synchronisée, il est necessaire de creer directement sur la BDD les roles de base id=1 "admin" et id=2 "default_user" et un utilisateur de base utilisant le role "admin".

## Lancer le projet
### Environnement de developpement 
```
npm run dev
```
### Environnement de production 
```
npm run prod
```
