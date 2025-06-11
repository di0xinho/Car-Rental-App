import mongoose from 'mongoose'

// Pola: make, model, capacity, year, color, bodyType, gearboxType, mileage, fuelType, hourlyPrice, imageUrl, description, bookedTimeSlots, isAvailable, createdBy

// Definiujemy schemat dla modelu Car
const carSchema = new mongoose.Schema(
    {
        make: { type: String, required: true }, // Marka pojazdu
        model: { type: String, required: true }, // Model pojazdu
        capacity: { type: Number, required: true }, // Liczba miejsc
        year: { type: Number, required: true }, // Rok produkcji
        color: { type: String, required: true }, // Kolor nadwozia
        bodyType: { type: String, required: true }, // Typ nadwozia 
        gearboxType: { type: String, required: true }, // Skrzynia biegów
        mileage: { type: Number, required: true }, // Przebieg (w km)
        fuelType: { type: String, required: true }, // Rodzaj Paliwa
        hourlyPrice: { type: Number, required: true }, // Cena wynajmu za godzinę
        imageUrl: { type: String }, // Adres URL do zdjęcia samochodu
        description: { type: String }, // Opis samochodu
        bookedTimeSlots: [ // Lista rezerwacji w postaci przedziałów czasowych
          {
            from: { type: Date, required: true }, // Data i godzina rozpoczęcia rezerwacji
            to: { type: Date, required: true }, // Data i godzina zakończenia rezerwacji
          },
        ],
        isAvailable: { type: Boolean, required: true, default: true }, // Czy samochód jest dostępny do wynajmu (zmienna boolowska) 
        createdBy: { type: mongoose.Types.ObjectId, ref: 'users', required: false }, // Identyfikator twórcy oferty
        modifiedBy: [ // Lista użytkowników, którzy modyfikowali zasób
          {
              userId: { type: mongoose.Types.ObjectId, ref: 'users' }, // Id użytkownika
              modifiedAt: { type: Date, default: Date.now } // Data modyfikacji
          }
      ],
      cluster: { type: Number, required: false } // Wartość 'cluster' jest wyznaczana przez model rekomendacji (grupuje się na jej podstawie podobne samochody)
      },
      
      {
        timestamps: true, // Ustawiamy timestamps na 'true', by móc podejrzeć datę utworzenia i modyfikacji dokumentu
      }
);

// Utworzenie modelu Car na podstawie schematu i jego eksportacja, aby mógł być używany w innych częściach aplikacji
export default mongoose.model("cars", carSchema)