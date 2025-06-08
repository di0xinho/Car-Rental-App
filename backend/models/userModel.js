import mongoose from 'mongoose'

// Pola: username, email, password, isAdmin, resetPasswordToken, resetPasswordExpires, firstName, surname, phoneNumber, dateOfBirth, gender, favorites

// Definicja schematu dla modelu User
const userSchema = new mongoose.Schema(
  { 
    // Nazwa użytkownika
    username: {
      type: String,
      required: true,
    },
    // Adres email
    email: {
      type: String,
      required: true,
    },
    // Hasło (będzie oczywiście przechowywane w postaci zahaszowanej)
    password: {
      type: String,
      required: true,
    },
    // Czy użytkownik jest administratorem (zmienna boolowska)
    isAdmin: {
      type: Boolean,
      default: false,
    },
    // W przypadku zapomnienia przez użytkownika hasła do konta mamy:
    resetPasswordCode: String, // Jednorazowy kod numeryczny
    resetPasswordCodeExpiry: Date, // Data wygaśnięcia ważności 6-cyfrowego kodu jednorazowego
    resetPasswordAttempts: { type: Number, default: 0 }, // Limit prób resetowania hasła
    
    // Imię 
    firstName: {
      type: String,
      default: null,
    },
    // Nazwisko
    surname: {
      type: String,
      default: null,
    },
    // Numer telefonu
    phoneNumber: {
      type: Number,
      default: null,
    },
    // Data urodzin
    dateOfBirth: {
      type: Date,
      default: null,
    },
    // Płeć
    gender: {
      type: String,
      default: null,
    },
    // Lista ulubionych samochodów
    favorites: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'cars',
      default: [],
    },
    // Lista dokonanych wypożyczeń
    bookings: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'bookings',
      default: [],
    },
    recommended_cluster:{
      type: Number,
      default: null,
    }
  },

  // Ustawiamy timestamps na 'true', by móc podejrzeć datę utworzenia i modyfikacji dokumentu
  {
    timestamps: true,
  }
);

// Utworzenie modelu User na podstawie schematu i jego eksportacja, aby mógł być używany w innych częściach aplikacji
export default mongoose.model("users", userSchema)