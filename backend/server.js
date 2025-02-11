// Importujemy moduł Express.js 
const express = require("express");

// Tworzymy instancję aplikacji Express
const app = express();

// Wczytujemy zmienne środowiskowe z pliku .env 
require("dotenv").config();

// Definiujemy port, na którym nasłuchuje serwer (domyślnie jest to to port 8000); w przeciwnym wypadku będzie to port 5000
const port = process.env.PORT || 5000;

// Tworzymy prosty endpoint 
app.get("/", (req, res) => {
    res.send("Hello world!");
});

// Uruchamiamy serwer i ustawiamy go na nasłuchiwanie na określonym porcie
// Po uruchomieniu w konsoli pojawi się komunikat informujący, na jakim porcie działa serwer
app.listen(port, () => {
    console.log(`Działam na porcie ${port}`);
});
