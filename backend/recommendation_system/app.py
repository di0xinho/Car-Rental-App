import argparse
from model import Model

if __name__ == "__main__":

     # Tworzenie parsera argumentów dla linii poleceń
    parser = argparse.ArgumentParser(description="Pobieranie jednego argumentu: ścieżki do pliku z danymi samochodów")
    parser.add_argument("file_path", type=str, help="Ścieżka do pliku z danymi samochodów")
    
    # Paroswanie przyjętych z linii poleceń argumentów
    args = parser.parse_args()

    # Tworzenie modelu
    model = Model(args.file_path)

    # Przygotowanie danych
    model.prepare_data()

    # Zbudowanie modelu z wybraną liczbą klastrów (u nas k - liczba centrów wynosi 5)
    model.build_model(k=5)

    # Sprawdzenie jakości modelu
    score, desc = model.check_silhouette_score()
    
    # Zapisanie modelu do pliku
    model.save_model() # Zostawimy domyślną nazwę pliku (czyli wywołujemy metodę bez argumentów)



