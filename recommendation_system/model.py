import pandas as pd
import pickle
from sklearn.preprocessing import MinMaxScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

class Model:

    # Konstruktor przyjmujący jako argument ramkę danych, które będziemy wykorzystywać do uczenia modelu
    def __init__(self, data: pd.DataFrame):

        # W środku znajdują się pola pod:
        # Model k-średnich (centroidów), ramkę danych (która jeszcze nie została poddana odpowiednim przekształceniom)
        # ramkę danych (która została poddana odpowiednim przekształceniom - normalizacja, one-hot-encoding itp.)
        # nazwy cech, z których powstanie model
        # pole pod MinMaxScaler 
        self.kmeans = None 
        self.data_frame = data
        self.data_frame_encoded = None  
        self.feature_names = ["capacity", "year", "mileage", "hourlyPrice", "fuelType", "gearboxType", "bodyType"]
        self.scaler = MinMaxScaler()

        # Usuwamy zbędne kolumny, które nie będą brane pod uwagę w czasie uczenia modelu
        self.data_frame = self.data_frame.drop(
            columns=["make", "model", "color", "imageUrl", "description", "bookedTimeSlots", "isAvailable"]
        )

    # Statyczna metoda do pobierania DataFrame z pliku JSON
    @staticmethod
    def get_data_frame_from_path(file_path: str):
        return pd.read_json(file_path)
    
    # Metoda zapisująca model
    def save_model(self, filename="model.dat"):
        if self.kmeans is None:
            raise ValueError("Model KMeans nie został jeszcze zbudowany! Użyj metody build_model().")
        
        # Zapis do pliku
        with open(filename, "wb") as file:
            pickle.dump(self, file)

        print(f"Model zapisany do pliku: {filename}")

    # Statyczna metoda do wczytywania modelu K-Means
    @staticmethod
    def load_model(filename="model.dat"):
        # Odczyt z pliku
        model = None
        with open(filename, "rb") as file:
            model = pickle.load(file)
        
        print(f"Model załadowany z pliku: {filename}")
        return model 

    # Metoda przygotowująca dane do procesu uczenia (wywołuje w swoim ciele metody odpowiedzialne za normalizację oraz one-hot-encoding)
    def prepare_data(self):
        self.data_frame_encoded = self.data_frame.copy()
        self.normalize_data(["capacity", "year", "mileage", "hourlyPrice"])
        self.one_hot_encode_data(["fuelType", "gearboxType", "bodyType"])

    # Metoda odpowiedzialna za normalizację danych
    def normalize_data(self, columns: list):
        self.data_frame_encoded[columns] = self.scaler.fit_transform(self.data_frame_encoded[columns])

    # Metoda odpowiedzialna kodowanie z "gorącą jedynką"
    def one_hot_encode_data(self, columns: list):
        self.data_frame_encoded = pd.get_dummies(self.data_frame_encoded, columns=columns).astype(int)

    # Metoda zwracająca miarę jakości modelu w postaci wskaźnika sylwetki
    def check_silhouette_score(self):
        if self.kmeans is None:
            raise ValueError("Model KMeans nie został jeszcze zbudowany! Użyj metody build_model().")

        score = silhouette_score(self.data_frame_encoded, self.kmeans.labels_)
        print("Silhouette Score:", score)
        return score

    # Metoda odpowiedzialna za budowanie modelu (domyślna liczba centrów to 5)
    def build_model(self, k=5):
        self.kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
        self.data_frame_encoded["cluster"] = self.kmeans.fit_predict(self.data_frame_encoded)

    # Metoda odpowiedzialna za trening modelu
    def train_model(self, k=5):
        self.prepare_data()
        self.kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
        self.kmeans.fit(self.data_frame_encoded)
        self.save_model("kmeans_model.pkl")  # Automatyczne zapisanie modelu

    # Metoda odpowiedzialna za przewidywanie do jakiego centrum zostanie przyporządkowana nowa próbka
    def predict_cluster(self, new_data: pd.DataFrame):
        if self.kmeans is None:
            raise ValueError("Model KMeans nie został jeszcze zbudowany! Użyj metody build_model().")

        # One-hot encoding dla nowych danych
        observation_encoded = pd.get_dummies(new_data, columns=["fuelType", "gearboxType", "bodyType"]).astype(int)

        # Normalizacja wartości liczbowych
        observation_encoded[["capacity", "year", "mileage", "hourlyPrice"]] = self.scaler.transform(
            observation_encoded[["capacity", "year", "mileage", "hourlyPrice"]])

        # Dodanie brakujących kolumn
        missing_cols = set(self.data_frame_encoded.columns) - set(observation_encoded.columns)
        for col in missing_cols:
            observation_encoded[col] = 0

        # Usunięcie "cluster", jeśli istnieje
        if "cluster" in observation_encoded.columns:
            observation_encoded = observation_encoded.drop(columns=["cluster"])

        # Dopasowanie kolejności kolumn
        observation_encoded = observation_encoded[self.data_frame_encoded.columns.drop("cluster")]

        # Na koniec zwracanie odpowiedniego klastra wykorzystując metodę 'predict' w modelu kmeans
        return self.kmeans.predict(observation_encoded)
