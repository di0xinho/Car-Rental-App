# FRONTEND

  Strona dostępna online pod adresem [CARENT](https://yellow-ground-02ec85703.6.azurestaticapps.net/)

## Technologie wykorzystane w projekcie
Projekt typu SPA.
  * Vue.js + TypeScript
  * Vue Router
  * Tailwind CSS

## Opis projektu

### Struktura

Projekt podzielić można na 3 częśći związane z rolą użytkowników:

  1. **Strona internetowa** dostępna dla każdego użytkownika
  2. **Panel użytkownika** dostępny dla zarejestrowanych i zalogowanych użytkowników
  3. **Panel administartora** dostępny dla użytkownika z uprawnieniami administratora

#### Strona internetowa

  1. **Strona główna** ('/')  
    Strona prezentująca firmę
  2. **O nas** (/_o-nas_)  
    Strona prezentująca firmę
  3. Wynajem
      - **Wynajem** ('/_wynajem'_)  
      Strona prezentująca samochody (z filtrowaniem według parmetrów samochodu i daty wypożyczenia oraz paginacją). Kliknięcie na karcie pojazdu przycisku "Wynajmij" rozpoczyna proces rezerwacji samochodu.  
      - **Rezerwacja** ('/_rezerwacja'_)  
      Strona z podsumowaniem danych dotyczących rezerwacji i wyborem sposobu płatności (aplikacja umożliwia dokonanie płatności online za pomocą Stripe lub wybór opcji "zapłać na miejscu")  
      _Uwaga: testowe kody kart kredytowych dostępne są na stronie_ [Stripe](https://docs.stripe.com/testing)
  4. **Samochody** ('/_samochody_')  
    Strona prezentująca listę samochodów (z filtrowaniem według parmetrów samochodu i paginacją). Kliknięcie przycisku "Zobacz szczegóły" na karcie pojazdu otwiera stronę prezentującą szczegółowy opis wybranego samochodu ('/_samochody_/_:id_')
  5. **Kontakt** ('/_kontakt_')  
    Strona z formularzem kontaktowym _(funkcjonalność nie zaimplementowana)_
  6. **Strona logowania** ('/_login_')  
    Strona umożliwiająca rejestrację nowego użytkownika i logowanie do istniejącego konta  
    _(uwaga: na chwilę obecną w aplikacji frontendowej nie zaimplementowano odzyskiwania hasła do istniejącego konta, odzyskiwanie hasła zostało zaimplemetowane tylko na backendzie)_

  Uwagi:
  - Zalogowany użytkownik na karcie samochodu w górnym prawy rogu zobaczy ikonę ("serduszko") umożliwiające dodanie/usunięcie samochodu z **listy ulubionych samochodów**
  - Na stronie Wynajem ('/wynajem') oraz Samochody ('/samochody') dodana jest sekcja 'Rekomendowane dla Ciebie' która wyświetla samochody na podstawie **systemu rekomendacji**.  
  System rekomendacji określa rekomendowany klaster samochodów na podstawie ankiety (ankieta otwiera się automatycznie na stronie Wynajem ('/wynajem') lub po kliknięciu przycisku "Zaczynamy" na stronie Samochody ('/samochody')). Po uzupełnieniu ankiety i otrzymaniu odpowiedzi z serwera, numer rekomendowanego klastra jest zapisywany w preferencjach użytkownika (stan aplikacji). Dla zalogowanego użytkownika, numer klastra zapisywany jest w danych użytkownika w bazie danych.
  - **Preferencje użytkownika** dotyczące samochodów potraktowane zostały jako stan aplikacji i są zapamiętywane pomiędzy poszczególnymi stronami gdzie odbywa się filtrowanie (ankieta dotycząca rekomendacji, w filtrach na stronach Samochody ('/_samochody_') i Wynajem ('/_wynajem'_))

#### Panel użytkownika

Po zalogowaniu się na konto w prawym górnym rogu strony pojawi się avatar wraz z nazwą użytkownika, będące linkiem do Panelu użytkownika

  1. **Strona główna** panelu ('/_user_')  
      - Zawiera sekcję prezentującą listę ulubionych samochodów użytkownika
      - Zawiera sekcję prezentującą aktywne wypożyczenie samochodu
      _Uwaga: Planowałem podłączenie się do API usługi_ [Flespi](https://flespi.com)_, która umożliwia zczytywanie danych telemetrycznych z samochodów albo nadajników gps np. położenie, przebieg, itp..(dostępne jest darmowe konto z możliwością testowania) i prezentowanie tych danych użytkownikowi (aktualne położenie samochodu, przejechane kilometry od rozpoczecia wypożyczenia do chwili obecnej).  
      Na stronie umieściłem tylko przygotowaną pod to rozwiązanie mapę z Google Maps API, ale wyświetlane dane (pozycja i przebieg) są zamockowane w 'frontend\src\utilities\carTelemetryUtils.ts'_
  2. **Moje rezerwacje** ('/_user_/_zamowienia_')  
    Wyświetlone w tabeli rezerwacje oczekujące na wynajem oraz aktywne wypożyczenia. Kliknięcie w tabeli wybranego wiersza, prezentuje w sekcji poniżej szczegóły danej rezerwacji
  3. **Historia Wynajmu** ('/_user_/_historia_')
    Wyśwetlone w tabeli rezerwacje zakończone oraz anulowane. Kliknięcie w tabeli wybranego wiersza, prezentuje w sekcji poniżej szczegóły danej rezerwacji
  4. **Ustawienia** ('/_user_/_ustawienia_')  
    Wyświetla dane użytkownika w formularzu umożliwiającym ich edycję

#### Panel administratora

Zalogowany użytkownik posiadający uprawnienia administratora w stopce strony głównej znajdzie link do panelu administratora ('/_admin_')

  1. **Wynajem** ('/_admin_/_wynajem_')  
    Tabela z listą aktualnie trwających wypożyczeń. Po kliknięciu w wybrany wiersz w sekcji poniżej wyświetlą się szczegóły rezerwacji.W sekcji szczegółów u góry dostepny jest przycisk:
      - "Zakończ wynajem" (po kliknięciu otworzy się modal z formularzem z polami daty i aktualnego przebiegu samochodu umożliwiający zakończenie wynajmu)
  2. **Rezerwacje** ('/_admin_/_rezerwacje_')  
    Tabela z listą rezerwacji oczekujących na wynajem. Po kliknięciu w wybrany wiersz w sekcji poniżej wyświetlą się szczegóły rezerwacji. W sekcji szczegółów u góry dostepne są przyciski:
      - "Rozpocznij wynajem" (po kliknięciu otworzy się modal z formularzem z polem daty umożliwiający rozpoczęcie wynajmu)
      - "Anuluj rezerwację" (po kliknięciu otworzy się modal z formularzem z wyborem statusu/powodu anulowania umożliwiający anulowanie rezerwacji)
      - "Usuń rezerwację" (po kliknięciu na stronie otworzy się modal z danymi rezerwacji i formularzem gdzie po wpisaniu 4 ostatnich cyfr ID rezerwacji, możliwe będzie jej trwałe usunięcie z bazy danych)
  3. **Historia** ('/_admin_/_historia_')  
    Tabela z listą rezerwacji które zostały zakończone lub anulowane. Po kliknięciu w wybrany wiersz w sekcji poniżej wyświetlą się szczegóły rezerwacji.
    W sekcji szczegółów u góry dostepne są przyciski:
      - "Zmień status" (po kliknięciu otworzy się modal z formularzem z wyborem statusu umożliwiający zmianę statusu rezerwacji)
      - "Usuń rezerwację" (po kliknięciu na stronie otworzy się modal z danymi rezerwacji i formularzem gdzie po wpisaniu 4 ostatnich cyfr ID rezerwacji, możliwe będzie jej trwałe usunięcie z bazy danych)
  4. **Samochody** ('/_admin_/_samochody_') 
      Tabela z listą samochodów dostępnych w ofercie (z filtrowaniem po marce, typie paliwa i cenie wynajmu). Po kliknięciu w wybrany wiersz w sekcji poniżej wyświetlą się szczegóły samochodu.  
      U góry strony znajduje się link "+ dodaj nowy" do strony umożliwiającej dodanie nowego samochodu do oferty  
      W sekcj szczegółów (po wybraniu samochodu w tabeli) w prawym górnym rogu dostępne będą dwa przyciski:
        - "Edytuj" (link do strony umożliwiającej edycję danych samochodu)
        - "Usuń" (na stronie otworzy się modal z danymi samochodu i formularzem gdzie po wpisaniu 4 ostatnich cyfr ID samochodu, możliwe będzie jego trwałe usunięcie z oferty)
  5. **Dodaj samochód** ('/admin/samochody/nowy')  
    Strona zawiera formularz umożliwiający dodanie nowego samochodu do oferty
  6. **Edytuj samochód** ('/admin/samochody/edytuj/:id')  
    Strona zawiera formularz umożliwiający edycję wybranego samochodu

### Struktura plików w projekcie - FRONTEND
  * /frontend/src/views  
    Widoki/Strony aplikacji (w katalogach 'user' i 'admin' zgrupowane strony odpowiednio dla panelu użytkownika i panelu administratora)
  * /frontend/src/components  
    Komponenty aplikacji wykorzystywane w widokach
  * /frontend/src/composables  
    Komponenty grupujące stan i logikę (zarówno useUser jak i useCarPreferences używają globalnego stanu aplikacji)
  * frontend\src\router\index.ts  
    Plik konfiguracyjny routingu (Vue Router)
  * frontend\src\utilities  
    Katalog grupujący logikę związaną z pobieraniem i przetwarzaniem danych.  
    W katalogu frontend\src\utilities\models znajdują się definicje klas i typów używane w projekcie
  * frontend\src\assets\main.css  
    Główny plik CSS dla TailwindCSS


## Uruchomienie aplikacji frontendowej lokalnie
1. Zainstaluj _dependencies_  
  _npm install_
2. Uruchom lokalny serwer deweloperski  
  _npm run dev_
3. Zbuduj aplikację  
  _npm run build_