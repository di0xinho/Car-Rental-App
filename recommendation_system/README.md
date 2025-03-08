# Dokumentacja modelu rekomendacji samochodów

## Opis ogólny

Model rekomendacji dla wypożyczalni samochodów wykorzystuje algorytm k-średnich (KMeans) do grupowania samochodów na podstawie ich cech. Celem jest przypisanie nowych samochodów do odpowiednich grup (klastrów), które odpowiadają preferencjom użytkowników. Model działa na danych samochodów w formie ramki danych (`DataFrame`), którą przygotowuje i normalizuje przed rozpoczęciem uczenia. Użytkownicy mogą za pomocą aplikacji webowej (serwera Flask) wprowadzić dane dotyczące samochodów i otrzymywać rekomendacje na podstawie klasyfikacji do odpowiednich klastrów (wprowadzanie danych możliwe jest za pośrednictwem głównego API).

## Struktura projektu

Projekt składa się z trzech głównych plików:
1. **`model.py`** – zawiera definicję klasy `Model`, która implementuje logikę trenowania, przechowywania, przewidywania w modelu k-średnich oraz zapisu oznaczonych danych do pliku JSON.
2. **`app.py`** – plik obrazujący, jak używać modelu do trenowania, predykcji oraz zapisywania i ładowania modelu oraz zapisu oznaczonych danych do pliku JSON.
3. **`server.py`** – implementacja serwera Flask, który umożliwia korzystanie z modelu w aplikacji webowej, udostępniając API do predykcji.

## 1. **`model.py`**

### Opis

W pliku **`model.py`** znajduje się klasa `Model`, która odpowiedzialna jest za:
- Przygotowanie danych (normalizacja, kodowanie one-hot),
- Budowanie i trenowanie modelu k-średnich,
- Zapis i wczytywanie wytrenowanego modelu,
- Predykcję klastra dla nowych danych,
- Uzyskiwanie samochodów przypisanych do konkretnego klastra,
- Dodanie kolumny 'cluster' do oryginalnej ramki danych w celu oznaczenia rekordów (etykietowanie danych).

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
- **`add_cluster_column()`** – Dodaje do oryginalnej ramki danych kolumnę 'cluster', która przyporządkowuje każdy rekord danych do danego klastra.

## 2. **`app.py`**

### Opis

Plik **`app.py`** demonstruje użycie klasy `Model`. Pozwala na:
- Wczytanie danych z pliku JSON,
- Przygotowanie danych i trenowanie modelu,
- Sprawdzenie jakości modelu,
- Predykcję klastra dla nowej obserwacji,
- Uzyskanie rekomendacji dla użytkownika,
- Zapis oznaczonych rekordów danych do pliku JSON.

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

# Pobranie kolekcji samochodów należących pod przewidziany klaster
cars = model_2.get_observations_by_cluster(predicted_cluster[0])

# Wyświetlamy pierwsze 3 samochody z rekomendacji
N = 3
first_three_cars = cars[:N]
print(f"\nTrzy pierwsze samochody z rekomendacji:\n\n{first_three_cars}")

# Dodanie do ramki danych kolumny 'cluster'
labeled_data = model_2.add_cluster_column()

# Pobranie ścieżki do zapisu pogrupowanych danych
output_filepath = os.getenv("OUTPUT_FILEPATH")
  
# Zapis ramki danych do formatu JSON jako tablica rekordów
records = labeled_data.to_dict(orient='records')

# Zapisanie danych do pliku JSON
with open(output_filepath, 'w') as f:
    json.dump(records, f, indent=2)

print(f"Ukończono proces grupowania danych. Lokalizacja pliku: {output_filepath}\n")
```

## 3. **`server.py`**

### Opis

Plik **`server.py`** implementuje prostą aplikację webową przy użyciu Flask. Serwer udostępnia jeden endpoint:
- **`/predict`** – Przyjmuje dane samochodu w formacie JSON i zwraca przewidywany klaster.

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