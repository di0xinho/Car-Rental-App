import pandas as pd
import joblib
from sklearn.preprocessing import MinMaxScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

# Interpretacja miary jakości modelu (sylwetki) pochodzi z następującego artykułu naukowego:
# https://www.researchgate.net/publication/296472831_Temperature_Compensated_Electronic_Nose_for_Fruit_Ripeness_Determination_Using_Component_Correction_Principal_Component_Analysis

class Model:

    # Konstruktor, który przyjmuje ścieżkę do pliku json z danymi samochodów
    def __init__(self, data: str):

        self.data_frame = pd.read_json(data)
        self.data_frame_encoded = None # Przechowywanie przetworzonych danych

        # Usuwamy kolumny, które nie będą używane w modelu
        self.data_frame = self.data_frame.drop(columns=["make", "model", "color", "imageUrl", "description", "bookedTimeSlots", "isAvailable"])

    # Metoda, która wyświetla surową ramkę danych przed przetworzeniem
    def show_data_frame(self):
        print(self.data_frame)

    # Metoda, która wyświetla przetworzoną ramkę danych, gotową do trenowania modelu
    def show_data_frame_encoded(self):
        if self.data_frame_encoded is not None:
            print(self.data_frame_encoded.head())
        else:
            print("Ramka danych nie przeszła jeszcze operacji przygotowania danych")

    # Metoda, która przygotowuje dane do trenowania modelu
    def prepare_data(self):
        self.data_frame_encoded = self.data_frame.copy()

        self.normalize_data(["capacity", "year", "mileage", "hourlyPrice"]) # Normalizacja wartości liczbowych
        self.one_hot_encode_data(["fuelType", "gearboxType", "bodyType"]) # Kodowanie zmiennych kategorycznych/jakościowych metodą one-hot encoding

    # Metoda normalizująca wartości liczbowe do zakresu [0,1] za pomocą MinMaxScaler
    def normalize_data(self, columns: list):
        scaler = MinMaxScaler()
        self.data_frame_encoded[columns] = scaler.fit_transform(self.data_frame_encoded[columns])

    # Metoda kodująca zmienne kategoryczne metodą one-hot encoding
    def one_hot_encode_data(self, columns: list):
        self.data_frame_encoded = pd.get_dummies(self.data_frame_encoded, columns=columns).astype(int)

    # Metoda, która interpretuje wynik silhouette score (miary jakości klastrów)
    def get_description_score(self, score):
        if score > 0.7:
            return "Silna struktura modelu"
        elif score > 0.5:
            return "Dobra struktura modelu"
        elif score > 0.25:
            return "Słaba struktura modelu"
        else:
            return "Zła struktura modelu"

    # Metoda sprawdzająca jakość klastrowania za pomocą silhouette score
    def check_silhouette_score(self):
        if not hasattr(self, "kmeans"):
            raise ValueError("Model KMeans nie został jeszcze zbudowany! Użyj metody build_model().")

        score = silhouette_score(self.data_frame_encoded, self.kmeans.labels_)
        description_score = self.get_description_score(score)

        print("Silhouette Score:", score)
        return score, description_score

    # Metoda tworząca model K-Means i przypisuje etykiety klastrów do danych (domyślna liczba centrów to 3)
    def build_model(self, k=3):
        self.kmeans = KMeans(n_clusters = k, random_state=42, n_init=10)
        self.data_frame_encoded["cluster"] = self.kmeans.fit_predict(self.data_frame_encoded)

    # Metoda zapisująca model do postaci obiektu Pythona;
    # Przyjmuje jako argument nazwę pliku pod jaką ma zostać zapisany model
    def save_model(self, filename="kmeans_model.pkl"):
        
        if not hasattr(self, "kmeans"):
            raise ValueError("Model KMeans nie został jeszcze zbudowany! Użyj metody build_model().")

        joblib.dump(self.kmeans, filename)
        print(f"Model zapisany do pliku: {filename}")

    # Metoda wczytująca model k-średnich z pliku 
    def load_model(self, filename="kmeans_model.pkl"):
        
        self.kmeans = joblib.load(filename)
        print(f"Model wczytany z pliku: {filename}")