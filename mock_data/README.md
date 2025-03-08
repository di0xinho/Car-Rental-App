# Dokumentacja aplikacji do mockowania danych

## Wprowadzenie

Podprojekt mockowania danych służy do generowania i manipulacji danymi samochodów w zagwarantowania sztucznej bazy danych dla aplikacji. W skład podprojektu wchodzi kilka modułów odpowiedzialnych za różne aspekty procesu mockowania, tłumaczenia tekstu oraz generowania opisów. Całość została podzielona na oddzielne pliki, aby zapewnić lepszą organizację kodu i modularność.

---

## Struktura Plików

### 1. `mocking_script.py`

Plik `mocking_script.py` zawiera klasę `MockDataGenerator`, która służy do generowania sztucznych danych samochodów, tłumaczenia ich opisów oraz zapisywania tych danych w formacie JSON. Wykorzystuje on bibliotekę `Faker` (https://pypi.org/project/Faker/) do generowania danych oraz wielowątkowość do przyspieszenia procesu generowania rekordów.

## Klasa `MockDataGenerator`

### Konstruktor (`__init__`)

```python
def __init__(self, image_file, count, model_name, task, translation_from, translation_to):
```

- **Opis:** Konstruktor klasy `MockDataGenerator`. Ustawia wszystkie zmienne instancyjne i inicjalizuje obiekty potrzebne do działania klasy.
- **Parametry:**
  - `image_file`: Ścieżka do pliku zawierającego adresy URL zdjęć.
  - `count`: Liczba rekordów samochodów do wygenerowania.
  - `model_name`: Nazwa modelu do generowania opisów.
  - `task`: Zadanie związane z generowaniem opisu.
  - `translation_from`: Język źródłowy do tłumaczenia.
  - `translation_to`: Język docelowy do tłumaczenia.

### Metoda `load_image_urls`

```python
def load_image_urls(self, filename):
```

- **Opis:** Wczytuje adresy URL zdjęć samochodów z pliku tekstowego.
- **Parametry:** 
  - `filename`: Ścieżka do pliku z adresami URL zdjęć.
- **Zwraca:** Listę adresów URL.

### Metoda `determine_mileage`

```python
def determine_mileage(self, year):
```

- **Opis:** Określa przebieg samochodu na podstawie jego wieku. Starsze samochody mają większy przebieg.
- **Parametry:** 
  - `year`: Rok produkcji samochodu.
- **Zwraca:** Przebieg w kilometrach (wartość losowa zależna od wieku).

### Metoda `determine_gearbox_and_fuel`

```python
def determine_gearbox_and_fuel(self, make, model, year):
```

- **Opis:** Określa typ skrzyni biegów i rodzaj paliwa na podstawie marki, modelu i roku produkcji samochodu.
- **Parametry:**
  - `make`: Marka samochodu.
  - `model`: Model samochodu.
  - `year`: Rok produkcji samochodu.
- **Zwraca:** Krotkę zawierającą typ skrzyni biegów i rodzaj paliwa.

### Metoda `determine_hourly_price`

```python
def determine_hourly_price(self, year):
```

- **Opis:** Określa cenę wynajmu samochodu na godzinę na podstawie jego wieku. Nowe samochody są droższe, starsze tańsze.
- **Parametry:** 
  - `year`: Rok produkcji samochodu.
- **Zwraca:** Cenę wynajmu za godzinę (wartość losowa zależna od wieku).

### Metoda `generate_single_record`

```python
def generate_single_record(self, _):
```

- **Opis:** Generuje pojedynczy rekord danych samochodu. Tworzy wszystkie właściwości samochodu, takie jak marka, model, kolor, rok produkcji, typ skrzyni biegów, rodzaj paliwa, przebieg, cena wynajmu oraz opis. Tłumaczy również opis samochodu na wskazany język.
- **Parametry:** 
  - `_`: Indeks używany w pętli (ignorowany).
- **Zwraca:** Rekord danych samochodu (słownik).

### Metoda `generate_mock_data`

```python
def generate_mock_data(self):
```

- **Opis:** Generuje listę sztucznych danych samochodów przy użyciu podejścia jednowątkowego.
- **Zwraca:** Listę danych samochodów.

### Metoda `generate_mock_data_parallel`

```python
def generate_mock_data_parallel(self):
```

- **Opis:** Generuje listę sztucznych danych samochodów przy użyciu podejścia wielowątkowego, co znacząco skraca czekanie na wygenerowanie wszystkich danych.
- **Zwraca:** Listę danych samochodów.

### Metoda `save_to_json`

```python
def save_to_json(self, filename, data):
```

- **Opis:** Zapisuje wygenerowane dane samochodów do pliku w formacie JSON.
- **Parametry:**
  - `filename`: Ścieżka do pliku, w którym mają zostać zapisane dane.
  - `data`: Dane do zapisania (lista rekordów).
- **Zwraca:** wartość `None`.

---

### 2. `description_generator.py`

Plik zawiera klasę `DescriptionGenerator`, której zadaniem jest generowanie opisu samochodu na podstawie danych wejściowych. Opis jest tworzony za pomocą modelu generatywnego, który jest ładowany z biblioteki `transformers`.

#### Importy:
- `pipeline` z `transformers`: Jest to funkcja, która pozwala na łatwe ładowanie i używanie modeli językowych w zadaniach takich jak generacja tekstu.
- `CarData` z `Car_Data`: Klasa reprezentująca dane pojazdu, której instancje są wykorzystywane do generowania opisu samochodu.

#### Funkcja pomocnicza:
- **remove_newlines(text)**:
  - **Opis**: Funkcja pomocnicza, która usuwa znaki nowej linii (`\n`) i nadmiarowe spacje z tekstu. 
  - **Argumenty**: 
    - `text` (str): Tekst, z którego mają zostać usunięte znaki nowej linii.
  - **Zwraca**: Przetworzony tekst bez nowych linii.

#### Klasa: `DescriptionGenerator`
Klasa ta jest odpowiedzialna za generowanie opisów samochodów. Używa modelu generatywnego z biblioteki `transformers`, który na podstawie wstępnie przygotowanego tekstu tworzy pełny opis pojazdu.

##### Atrybuty:
- **generator**: 
  - Zainicjowany za pomocą funkcji `pipeline` z biblioteki `transformers`. Jest to obiekt wykorzystywany do generowania tekstu.
  - **Typ**: Pipeline dla zadania "text-generation" (generacja tekstu).
  
- **max_new_tokens**: 
  - Określa maksymalną liczbę nowych tokenów, które mogą zostać wygenerowane w opisie.
  - **Typ**: `int`
  
##### Metody:
- **__init__(self, model_name, framework, max_new_tokens)**:
  - **Opis**: Konstruktor klasy. Inicjalizuje generator za pomocą modelu z biblioteki `transformers` oraz ustawia maksymalną liczbę nowych tokenów do wygenerowania.
  - **Argumenty**:
    - `model_name` (str): Nazwa modelu generatywnego.
    - `framework` (str): Framework, w którym model jest załadowany (np. "pt" dla PyTorch).
    - `max_new_tokens` (int): Maksymalna liczba nowych tokenów do wygenerowania w opisie.
  
- **generate_description(self, car_data)**:
  - **Opis**: Główna metoda klasy. Tworzy wstępny tekst opisu na podstawie danych samochodu, a następnie generuje opis z wykorzystaniem modelu generatywnego.
  - **Argumenty**:
    - `car_data` (CarData): Obiekt zawierający dane samochodu, na podstawie których zostanie wygenerowany opis.
  - **Zwraca**:
    - **str**: Wygenerowany opis samochodu lub komunikat o błędzie, jeśli coś poszło nie tak.
  
  - **Działanie**:
    1. Z danych pojazdu (marka, model, kolor, rok produkcji, typ skrzyni biegów, paliwo, cena wynajmu) tworzony jest wstępny tekst opisu.
    2. Na podstawie tego tekstu model generatywny tworzy pełny opis samochodu.
    3. Otrzymany tekst jest przetwarzany, aby usunąć zbędne znaki nowej linii oraz zapewnić, że końcowy tekst jest pełnym zdaniem.
    4. Jeśli model nie wygenerował poprawnego tekstu, metoda zwróci komunikat o błędzie.

---

### 3. `translator.py`

Plik zawiera klasę `Translator`, która odpowiada za tłumaczenie tekstu z jednego języka na inny za pomocą usługi Microsoft Translator. Klasa ta wykorzystuje API usługi Translator Text i implementuje mechanizm ponawiania prób w przypadku błędów.

#### Klasa: `Translator`
Klasa ta służy do komunikacji z usługą Translator Text w celu przetłumaczenia tekstu z jednego języka na inny (np. z angielskiego na polski).

##### Atrybuty:
- **api_key** (str): Klucz API niezbędny do uwierzytelnienia się w usłudze.
- **location** (str): Lokalizacja usługi Translator, np. 'westeurope'.
- **constructed_url** (str): Pełny adres URL usługi API do tłumaczenia tekstu.

##### Metody:
- **__init__(self)**:
  - **Opis**: Konstruktor klasy. Inicjalizuje podstawowy URL usługi Translator i ustawia zmienne `api_key` i `location` na `None` (muszą być przypisane później).
  
- **init_main_params(self, api_key, location)**:
  - **Opis**: Umożliwia inicjalizację niezmiennych parametrów `api_key` oraz `location`.
  - **Argumenty**:
    - `api_key` (str): Klucz API.
    - `location` (str): Lokalizacja usługi Translator.
  
- **send_request(self, translation_from, translation_to, text)**:
  - **Opis**: Wysyła zapytanie do usługi Translator Text w celu przetłumaczenia tekstu.
  - **Argumenty**:
    - `translation_from` (str): Język źródłowy (np. 'en' dla angielskiego).
    - `translation_to` (str): Język docelowy (np. 'pl' dla polskiego).
    - `text` (str): Tekst do przetłumaczenia.
  - **Zwraca**: Przetłumaczony tekst.
  - **Opis działania**: 
    - Metoda wysyła zapytanie POST do API Translator Text, w którym przekazuje tekst do przetłumaczenia, a także wymagane nagłówki i parametry.
    - Obsługuje ponawianie prób w przypadku napotkania błędów sieciowych lub kodu odpowiedzi HTTP 429 (zbyt wiele żądań).
    - W przypadku błędów podczas parsowania odpowiedzi API (np. brak danych w odpowiedzi), wyrzuca wyjątek.
    - Loguje błędy i ostrzeżenia, jeśli wystąpią problemy z połączeniem lub przetwarzaniem odpowiedzi.

##### Dekoratory:
- **@retry**: Automatycznie ponawia próbę wysyłania żądania w przypadku wystąpienia określonych wyjątków, takich jak błędy sieciowe lub status 429 (Too Many Requests). Zastosowano wykładnicze opóźnienie (zaczynając od 5 sekund) oraz maksymalną liczbę prób równą 7.

---

### 4. `Car_Data.py`

Plik zawiera klasę `CarData`, która jest prostą reprezentacją danych samochodu. Klasa ta przechowuje informacje o samochodach, które będą używane w dalszych częściach systemu, takich jak generowanie opisów, zapisywanie do pliku JSON, etc.

#### Klasa: `CarData`
Klasa ta przechowuje dane o samochodach, takie jak marka, model, kolor, rok produkcji, typ skrzyni biegów, rodzaj paliwa i cena wynajmu na godzinę.

##### Atrybuty:
- **car_make** (str): Marka samochodu (np. 'Audi', 'BMW', 'Ford').
- **car_model** (str): Model samochodu (np. 'A4', 'Mustang', 'Civic').
- **color** (str): Kolor samochodu (np. 'Czarny', 'Biały').
- **year** (int): Rok produkcji samochodu.
- **gearboxType** (str): Typ skrzyni biegów (np. 'Manualna', 'Automatyczna').
- **fuel** (str): Rodzaj paliwa, którym samochód jest napędzany (np. 'Benzyna', 'Diesel').
- **hourlyPrice** (float): Cena wynajmu samochodu na godzinę.

##### Metody:
- **__init__(self, car_make, car_model, color, year, gearboxType, fuel, hourlyPrice)**:
  - **Opis**: Konstruktor klasy, który inicjalizuje wszystkie atrybuty klasy na podstawie podanych danych wejściowych.
  - **Argumenty**:
    - `car_make` (str): Marka samochodu.
    - `car_model` (str): Model samochodu.
    - `color` (str): Kolor samochodu.
    - `year` (int): Rok produkcji.
    - `gearboxType` (str): Typ skrzyni biegów.
    - `fuel` (str): Rodzaj paliwa.
    - `hourlyPrice` (float): Cena wynajmu na godzinę.

---

### 5. `app.py`

Plik ten jest głównym plikiem uruchomieniowym, który odpowiada za generowanie danych sztucznych przy użyciu modelu językowego oraz tłumaczenie wygenerowanych opisów samochodów. Wykorzystuje on różne klasy i funkcje zaimportowane z innych plików w projekcie.

#### Przepływ działania:
1. **Argumenty linii poleceń**:
   - Program wykorzystuje bibliotekę `argparse` do pobierania dwóch argumentów z linii poleceń:
     - `file_path` (str): Ścieżka do pliku z adresami URL zdjęć samochodów.
     - `count` (int): Liczba sztucznych danych (samochodów) do wygenerowania.

2. **Inicjalizacja generatora danych**:
   - Program tworzy instancję klasy `MockDataGenerator`, przekazując do niej:
     - Ścieżkę do pliku z URL-ami zdjęć samochodów.
     - Liczbę sztucznych danych, które mają zostać wygenerowane.
     - Parametry związane z modelem językowym (`model_name`, `task`) oraz parametry tłumaczenia (`translation_from`, `translation_to`).

3. **Generowanie danych**:
   - W poprzednich wersjach programu generowanie danych odbywało się sekwencyjnie (jednowątkowo), ale w tym przypadku zastosowano równoległość przy generowaniu atrap samochodów za pomocą funkcji `generate_mock_data_parallel()`, co przyspiesza proces.

4. **Zapis danych do plików**:
   - Po wygenerowaniu danych, są one zapisywane w formacie JSON do dwóch plików:
     - `Mock_Data.json` – główny plik wynikowy.
     - `../recommendation_system/train_data/train_data.json` – plik, który zostanie użyty w przyszłości do trenowania modelu rekomendacji.

5. **Podsumowanie**:
   - Na końcu skryptu wyświetlana jest informacja o wygenerowanych danych oraz liczbie pojazdów.

#### Argumenty:
- `file_path` (str): Ścieżka do pliku z URL-ami zdjęć samochodów.
- `count` (int): Liczba sztucznych danych (samochodów) do wygenerowania.

#### Wykorzystane elementy:
- **`argparse`** – do obsługi argumentów linii poleceń.
- **`MockDataGenerator`** – główny generator danych, odpowiedzialny za tworzenie sztucznych danych samochodów i tłumaczenie ich opisów.
- **Równoległość** – wykorzystywanie równoległych zadań do generowania danych (metoda `generate_mock_data_parallel()`).

---

### Przykład użycia pliku `app.py`

Plik `app.py` jest skryptem uruchamianym z poziomu linii poleceń, który wymaga dwóch argumentów:

1. **Ścieżka do pliku z adresami URL zdjęć samochodów** (`file_path`).
2. **Liczba sztucznych danych do wygenerowania** (`count`).

#### Uruchomienie skryptu:
Aby uruchomić skrypt **(pamiętaj aby znajdować się wewnątrz katalogu ze skryptem)**, należy użyć następującego polecenia w terminalu:

```bash
python app.py <ścieżka_do_pliku> <liczba_sztucznych_danych>
```

#### Przykład:

Załóżmy, że mamy plik tekstowy `car_images.txt` zawierający listę URL-ów do zdjęć samochodów, a chcemy wygenerować 100 sztucznych danych.

Polecenie do uruchomienia skryptu wyglądałoby tak:

```bash
python app.py image_urls.txt 100
```

#### Wyjaśnienie:
- **`image_urls.txt`** – ścieżka do pliku zawierającego adresy URL zdjęć samochodów (każdy URL w osobnej linii).
- **`100`** – liczba sztucznych danych samochodów, które mają zostać wygenerowane.

#### Działanie skryptu:
1. Skrypt załaduje plik `image_urls.txt` i odczyta zawarte w nim URL-e zdjęć samochodów.
2. Następnie wygeneruje 100 sztucznych danych samochodów, bazując na URL-ach zdjęć.
3. Wygenerowane dane zostaną zapisane w dwóch plikach JSON:
   - `Mock_Data.json` (główny plik wynikowy).
   - `../recommendation_system/train_data/train_data.json` (do użycia w modelu rekomendacji).

Po zakończeniu procesu generowania danych skrypt wypisze na ekranie informację o liczbie wygenerowanych danych:

```bash
Wygenerowano dane (liczba pojazdów: 100) i zapisano do Mock_Data.json
```

---

## Podsumowanie

Podprojekt mockowania danych składa się z kilku modułów, które współpracują ze sobą, aby zapewnić generowanie, tłumaczenie i prezentowanie danych samochodowych. Modularność kodu pozwala na łatwą modyfikację poszczególnych części, a także testowanie poszczególnych funkcji w izolacji.
