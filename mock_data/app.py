import argparse
from mocking_script import MockDataGenerator

if __name__ == "__main__":

    # Wybór odpowiednich parametrów dla modelu językowego
    model_name = "flax-community/papuGaPT2" # Nazwa modelu
    task = "text-generation" # Zadanie do wykonania

    # Wybór opcji tłumaczenia opisów samochodów
    translation_from = "en" # Tłumaczenie z danego języka
    translation_to = "pl" # Tłumaczenie na dany język

    # Tworzenie parsera argumentów dla linii poleceń
    parser = argparse.ArgumentParser(description="Pobieranie dwóch argumentów: ścieżki do pliku z adresami url zdjęć samochodów oraz liczby sztucznych danych do wygenerowania")
    parser.add_argument("file_path", type=str, help="Ścieżka do pliku z adresami url zdjęć samochodów")
    parser.add_argument("count", type=int, help="Liczba sztucznych danych do wygenerowania")

    # Paroswanie przyjętych z linii poleceń argumentów
    args = parser.parse_args()

    # Tworzenie generatora danych
    generator = MockDataGenerator(args.file_path, args.count, model_name, task, translation_from, translation_to)
    
    # Generowanie danych

    # Poprzednio generowanie danych było robione w sposób liniowy (jednowątkowo)
    # mock_data = generator.generate_mock_data()  

    # Teraz udało nam się zastosować równoległość do generowania atrap samochodów
    mock_data = generator.generate_mock_data_parallel()
    
    # Zapisywanie danych do pliku JSON
    generator.save_to_json("Mock_Data.json", mock_data)
    
    print(f"Wygenerowano dane (liczba pojazdów: {args.count}) i zapisano do Mock_Data.json")