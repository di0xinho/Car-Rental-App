// Importujemy mongoose do obsługi MongoDB 
const mongoose = require("mongoose");

// Wyłączenie strictQuery
mongoose.set('strictQuery', false);

// Połączenie z bazą danych MongoDB, adres pobierany oczywiście ze zmiennych środowiskowych 
mongoose.connect(process.env.MONGO_URL);

// Tworzymy uchwyt do połączenia
const connection = mongoose.connection;

// Zdarzenie zostanie wywołane tylko raz w przypadku połączenia
connection.once("connected", () => {
    console.log("Połączono się z bazą MongoDB")
});

// Zdarzenie wykona się za każdym razem, gdy wystąpi problem z połączeniem
connection.on("error", (error) =>{
    console.log("Nie udało się połączyć z bazą MongoDB", error);
});

module.exports = mongoose;