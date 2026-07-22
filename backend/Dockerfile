# Utiliser une image Node.js officielle légère
FROM node:18-alpine

# Définir le dossier de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source du backend
COPY . .

# Exposer le port sur lequel tourne l'application NestJS
EXPOSE 3000

# Commande pour lancer l'application en mode développement
CMD ["npm", "run", "start:dev"]