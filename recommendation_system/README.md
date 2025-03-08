# Dokumentacja modelu rekomendacji samochodów

## Opis ogólny

Model rekomendacji dla wypożyczalni samochodów wykorzystuje algorytm k-średnich (KMeans) do grupowania samochodów na podstawie ich cech. Celem jest przypisanie nowych samochodów do odpowiednich grup (klastrów), które odpowiadają preferencjom użytkowników. Model działa na danych samochodów w formie ramki danych (`DataFrame`), którą przygotowuje i normalizuje przed rozpoczęciem uczenia. Użytkownicy mogą za pomocą aplikacji webowej (serwera Flask) wprowadzić dane dotyczące samochodów i otrzymywać rekomendacje na podstawie klasyfikacji do odpowiednich klastrów (wprowadzanie danych możliwe jest za pośrednictwem głównego API).

## Struktura projektu

Projekt składa się z trzech głównych plików:
1. **`model.py`** – zawiera definicję klasy `Model`, która implementuje logikę trenowania, przechowywania i przewidywania w modelu k-średnich.
2. **`app.py`** – plik obrazujący, jak używać modelu do trenowania, predykcji oraz zapisywania i ładowania modelu.
3. **`server.py`** – implementacja serwera Flask, który umożliwia korzystanie z modelu w aplikacji webowej, udostępniając API do predykcji oraz pobierania rekomendowanych samochodów.

## 1. **`model.py`**

### Opis

W pliku **`model.py`** znajduje się klasa `Model`, która odpowiedzialna jest za:
- Przygotowanie danych (normalizacja, kodowanie one-hot),
- Budowanie i trenowanie modelu k-średnich,
- Zapis i wczytywanie wytrenowanego modelu,
- Predykcję klastra dla nowych danych,
- Uzyskiwanie samochodów przypisanych do konkretnego klastra.

### Klasa `Model` – Metody:

- **`__init__(self, data: pd.DataFrame)`** – Inicjalizuje model, przygotowując dane do przetwarzania.
- **`get_data_frame_from_path(file_path: str)`** – Statyczna metoda, która ładuje dane z pliku JSON.
- **`save_model(filename="model.dat")`** – Zapisuje wyuczony model do pliku.
- **`load_model(filename="model.dat")`** – Ładuje zapisany model z pliku.
- **`prepare_data()`** – Przygotowuje dane (normalizacja, kodowanie one-hot).
- **`normalize_data(columns: list)`** – Normalizuje dane za pomocą `MinMaxScaler`.
- **`one_hot_encode_data(columns: list)`** – Zastosowuje kodowanie one-hot dla kategorii.
- **`check_silhouette_score()`** – Oblicza wskaźnik sylwetki, mierzący jakość dopasowania modelu.
- **`build_model(k=5)`** – Buduje model k-średnich z domyślną liczbą 5 klastrów.
- **`train_model(k=5)`** – Trenuje model i zapisuje go do pliku.
- **`predict_cluster(new_data: pd.DataFrame)`** – Przewiduje klaster dla nowej próbki danych.
- **`get_observations_by_cluster(cluster_id: int)`** – Zwraca samochody należące do danego klastra.

## 2. **`app.py`**

### Opis

Plik **`app.py`** demonstruje użycie klasy `Model`. Pozwala na:
- Wczytanie danych z pliku JSON,
- Przygotowanie danych i trenowanie modelu,
- Sprawdzenie jakości modelu,
- Predykcję klastra dla nowej obserwacji,
- Uzyskanie rekomendacji dla użytkownika.

### Przykład użycia:

```python
# Pobieranie danych jako DataFrame
data_frame = Model.get_data_frame_from_path("data.json")

# Tworzenie i trenowanie modelu
model = Model(data_frame)
model.prepare_data()
model.build_model(k=5)

# Sprawdzanie jakości modelu
score = model.check_silhouette_score()

# Wczytanie modelu i predykcja
model_2 = Model.load_model()

# Przewidywanie dla nowej obserwacji
new_observation = pd.DataFrame({
    "capacity": [4],
    "year": [2018],
    "bodyType": ["SUV"],
    "gearboxType": ["Automatyczna"],
    "mileage": [108467],
    "fuelType": ["Benzyna"],
    "hourlyPrice": [78],
})
predicted_cluster = model_2.predict_cluster(new_observation)

# Wyświetlanie wyników
print(f"Przewidziany klaster: {predicted_cluster[0]}")
```

## 3. **`server.py`**

### Opis

Plik **`server.py`** implementuje prostą aplikację webową przy użyciu Flask. Serwer udostępnia dwa główne endpointy:
- **`/predict`** – Przyjmuje dane samochodu w formacie JSON i zwraca przewidywany klaster.
- **`/get-cars-from-cluster/<int:cluster_id>`** – Przyjmuje identyfikator klastra i zwraca listę samochodów należących do tego klastra.

### Przykłady zapytań:

1. **Predykcja klastra:**
   ```bash
   POST /predict
   Body:
   {
       "capacity": 4,
       "year": 2018,
       "bodyType": "SUV",
       "gearboxType": "Automatyczna",
       "mileage": 108467,
       "fuelType": "Benzyna",
       "hourlyPrice": 78
   }
   ```

   **Odpowiedź:**
   ```json
   {
       "predicted_cluster": 2
   }
   ```

2. **Pobieranie samochodów z klastra:**
   ```bash
   GET /get-cars-from-cluster/2
   ```

   **Odpowiedź:**
   ```json
   [
       {
           "capacity": 4,
           "year": 2018,
           "bodyType": "SUV",
           "gearboxType": "Automatyczna",
           "mileage": 108467,
           "fuelType": "Benzyna",
           "hourlyPrice": 78
       },
       ...
   ]
   ```