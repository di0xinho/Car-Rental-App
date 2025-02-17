# REST API dla aplikacji do wypożyczania samochodów

## 📌 Wymagania
Przed uruchomieniem aplikacji należy upewnić się, że masz zainstalowane:
- [Node.js](https://nodejs.org/en) (zalecana wersja LTS),
- [MongoDB](https://www.mongodb.com/) (lokalnie lub w chmurze, np. MongoDB Atlas, Microsoft Azure - usługa Azure Cosmos DB for MongoDB),
- Menedżer pakietów `npm` (instalowany razem z Node.js),
- Konto na MongoDB Atlas lub Azure (jeśli planujesz wdrożenie).

Uwaga: Projekt testowany był na platformie Azure od firmy Microsoft

## 📥 Instalacja
1. **Sklonuj repozytorium**
   ```sh
   git clone https://github.com/di0xinho/Car-Rental-App.git
   cd Car-Rental-App
   ```
2. **Zainstaluj zależności** (należy przedtem przejść do katalogu `backend`)
   ```sh
   npm install
   ```

## ⚙️ Konfiguracja środowiska
1. **Utwórz plik `.env`** w głównym katalogu i dodaj zmienne środowiskowe. Wszystkie zmienne środowiskowe, które powinny znaleźć się w środku tego pliku dostępne są w pliku `.env.temp`.

2. **Upewnij się, że baza MongoDB działa poprawnie** (lokalnie lub w chmurze).

## 🚀 Uruchomienie aplikacji
1. **Wpisz polecenie uruchamiające aplikację** 
   ```sh
   npm start
   ```

## 📡 Testowanie API
Po uruchomieniu backendu, API będzie dostępne na porcie 8000 (domyślnie) pod adresem:
```
http://localhost:8000
```
Możesz testować endpointy za pomocą narzędzi takich jak:
- [Postman](https://www.postman.com/),
- [curl](https://curl.se/docs/).

