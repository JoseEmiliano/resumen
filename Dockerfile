FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Primero copiamos los json para aprovechar el cache de capas de Docker
COPY package*.json ./
RUN npm install

# --- ESTA ES LA LÍNEA QUE FALTA ---
# Copia todo el resto de tus archivos (app.js, modelos, etc.) al contenedor
COPY . .

# El puerto que usa Express
EXPOSE 3000

# Comando para desarrollo (definido en tu package.json)
CMD ["npm", "run", "dev"]