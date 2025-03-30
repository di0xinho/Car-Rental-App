# Wybór odpowiedniego obrazu bazowego
FROM node:22

# Ustawienie katalogu roboczego w kontenerze
WORKDIR /app

# Kopiowanie plików aplikacji
COPY package*.json ./

# Instalacja zależności
RUN npm install 

# Kopiowanie kodu aplikacji
COPY . .

# Eksponowanie portu
EXPOSE 8000

# Uruchamianie aplikacji
CMD ["npm", "start"]
