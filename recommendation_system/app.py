import argparse
import pandas as pd
from model import Model

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Ścieżka do pliku z danymi samochodów")
    parser.add_argument("file_path", type=str, help="Ścieżka do pliku JSON")
    args = parser.parse_args()

    # Pobieranie danych jako DataFrame
    data_frame = Model.get_data_frame_from_path(args.file_path)

    # Tworzenie i trenowanie modelu
    model = Model(data_frame)
    model.prepare_data()
    model.build_model(k=5)
    model.save_model()

    # Wczytanie modelu i predykcja
    model_2 = Model.load_model()  
    
    # Tworzenie nowej obserwacji do predykcji
    new_observation = pd.DataFrame({
        "capacity": [4],
        "year": [2018],
        "bodyType": ["SUV"],
        "gearboxType": ["Automatyczna"],
        "mileage": [108467],
        "fuelType": ["Benzyna"],
        "hourlyPrice": [78],
    })

    # Wykorzystanie napisanej metody predict_cluster() do zapisania wyniku predykcji modelu
    predicted_cluster = model_2.predict_cluster(new_observation)

    # Wyświetlamy wynik predykcji
    print(f"Przewidziany klaster: {predicted_cluster[0]}")
