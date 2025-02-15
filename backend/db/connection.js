// Importujemy mongoose do obsługi MongoDB 
import mongoose from 'mongoose';

// Metoda służąca do nawiązania połączenia z bazą danych
const connection = (mongo_url, database_name) => {
    
    // Wyłączenie strictQuery
    mongoose.set('strictQuery', false);

    // Połączenie z bazą danych MongoDB, adres i nazwę bazy danych pobierany oczywiście ze zmiennych środowiskowych 
    mongoose.connect(mongo_url, {dbName: database_name});

    // Zdarzenie zostanie wywołane tylko raz w przypadku połączenia
    mongoose.connection.once("connected", () => {
        console.log("Połączono się z bazą MongoDB")
    });

    // Zdarzenie wykona się za każdym razem, gdy wystąpi problem z połączeniem
    mongoose.connection.on("error", (error) =>{
        console.log("Nie udało się połączyć z bazą MongoDB", error);
    });
}

export default connection;