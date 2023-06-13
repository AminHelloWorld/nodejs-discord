# Backend du chat en ligne Discord-Like developpé par Amin Hallouli, Shad Azuelos, et Nicolas Gilberto
Api accessible sur l'adresse http://dev-discord.aminhe.live/api/ et http://prod-discord.aminhe.live/api/

Documentation POSTMAN avec tous les endpoints offerts par le projet :
https://www.postman.com/aminaminaminamin/workspace/devweb-discord-like-chat/collection/23425401-055c421c-f1ce-4f74-ad49-7bfe7eca7965?action=share&creator=23425401


## Avant d'installer le projet
Pour lancer ce projet il est necessaire d'avoir Node JS d'installé dans la machine.
Il est necessaire d'avoir une base de données Postgres qui tourne et qui est accessible.

## Config
Faire une copie de ecosystem.config.js.example nommée ecosystem.config.js

Dans le fichier ecosystem.config.js : 
 - Remplacer les valeurs de la configuration des bases de données avec celles correspondantes a la base de données à utiliser
    name correspond au nom du procès lancé par l'environnement.
    error_file correspond au repertoire relatif du fichier ou les logs d'erreur seront stockés.
    out_file correspond au repertoire relatif du fichier ou les logs normaux seront stockés.
    NODE_ENV correspond au environnement.
    NODE_PORT correspond au port sur lequel le projet sera exposé.
    DB_HOST correspond a l'ip/url de la BDD
    DB_PORT correspond au port de la BDD.
    DB_USER correspond a l'utilisateur de la BDD.
    DB_PASSWORD correspond au mot de passe de l'utilisateur de la BDD.
    DB_NAME correspond au nom de la BDD utilisée pour le projet.

    FE_OUTPUT_DIR correspond au repertoire relatif ou le build du frontent est stocké (cela permet de faire le routage vers le frontend).    

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
