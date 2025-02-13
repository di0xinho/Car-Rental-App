# Przed uruchomieniem skryptu należy sprawdzić, czy mamy zainstalowany język Pythona;
# Możemy to zrobić wpisując w linii komend polecenie: "python --version"
# Jeśli mamy zainstalowanego Pythona na naszym komputerze, to instalujemy wszystkie potrzebne biblioteki (bez nich nie uda nam się uruchomić skryptu);
# Do tego celu posłuży polecenie "pip install -r requirements.txt"
# Następnie pozostało już nam tylko uruchomić skrypt poleceniem "python mocking_script.py <ścieżka do pliku> <liczba rekordów>"

import random
import json
import argparse
from faker import Faker

# Tworzymy klasę generatora danych, gdzie w konstruktorze przyjmować będziemy ścieżkę do pliku, z którego pobierać będziemy adresy URL do zdjęć
# wykorzystywanych przy tworzeniu sztucznych danych oraz liczbę rekordów sztucznych samochodów jakie będziemy generować 
class MockDataGenerator:

    # Konstruktor
    def __init__(self, image_file, count):
        
        # Tworzymy obiekt Faker, który posłuży do generowania sztucznych danych
        self.fake = Faker()

        # Poniżej znajdują się zmienne, w których przechowywane są wartości z jakich będziemy tworzyć atrapy danych
        # Są to: marka samochodu, model, kolor, karoseria, skrzynia biegów, rodzaj paliwa, cena wypożyczenia (za godzinę),
        # adres URL do zdjęcia samochodu (zdjęcia pochodzą z serwisu https://www.gettyimages.com/), opis pojazdu, okres czasowy w jakim samochód jest wypożyczony
        # dostępność pojazdu (zmienna boolowska), maksymalna ilość pasażerów
        self.make_and_model = {
            'Audi': ['A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q2', 'Q3', 'Q5', 'Q7', 'Q8', 'R8'],
            'BMW': ['1 Series', '2 Series', '3 Series', '4 Series', '5 Series', 'X1', 'X3', 'X5'],
            'Fiat': ['Panda', 'Punto', '500'],
            'Ford': ['Focus', 'Mustang', 'Ranger'],
            'Honda': ['Civic', 'CR-V', 'Accord'],
            'Toyota': ['Corolla', 'Camry', 'RAV4'],
            'Volkswagen': ['Golf', 'Passat', 'Polo']
        }
        self.colors = ['czarny', 'biały', 'niebieski', 'szary', 'czerwony', 'granatowy']
        self.body_types = ['Sedan', 'Coupe', 'Hatchback', 'SUV', 'Crossover']
        self.gearbox_types = ['Manualna', 'Automatyczna']
        self.fuel_types = ['Benzyna', 'Diesel', 'Elektryk', 'Hybryda']
        self.hourly_prices = [25, 40, 50, 60, 70, 80, 90, 100, 120]
        self.image_urls = self.load_image_urls(image_file)
        self.description = "Idealny samochód na każdą okazję."
        self.booked_time_slots = []
        self.is_available = True
        self.count = count

    # Metoda wczytująca ścieżkę do pliku z adresami URL, adresy są potem przetrzymywane w tablicy "image_urls" w obiekcie generatora
    def load_image_urls(self, filename):
        with open(filename, 'r', encoding='utf-8') as file:
            return [line.strip() for line in file.readlines() if line.strip()]
    
    # Metoda generująca Generuje listę sztucznych danych o pojazdach
    def generate_mock_data(self):
        data = []
        for _ in range(self.count):
            make = random.choice(list(self.make_and_model.keys()))
            model = random.choice(self.make_and_model[make])
            record = {
                "make": make,
                "model": model,
                "capacity": self.fake.random_element(elements=(4, 5, 7)),
                "year": self.fake.random_int(min=1995, max=2022),
                "color": random.choice(self.colors),
                "bodyType": random.choice(self.body_types),
                "gearboxType": random.choice(self.gearbox_types),
                "mileage": self.fake.random_int(min=75000, max=350000),
                "fuelType": random.choice(self.fuel_types),
                "hourlyPrice": random.choice(self.hourly_prices),
                "imageUrl": random.choice(self.image_urls),
                "description": self.description,
                "bookedTimeSlots": self.booked_time_slots,
                "isAvailable": self.is_available
            }
            data.append(record)
        return data

    # Metoda zapisująca dane do pliku JSON
    def save_to_json(self, filename, data):
        with open(filename, 'w', encoding='utf-8') as outfile:
            json.dump(data, outfile, indent=4, ensure_ascii=False)

if __name__ == "__main__":
    # Tworzenie parsera argumentów dla linii poleceń
    parser = argparse.ArgumentParser(description="Pobieranie dwóch argumentów: ścieżki do pliku z adresami url zdjęć samochodów oraz liczby sztucznych danych do wygenerowania")
    parser.add_argument("file_path", type=str, help="Ścieżka do pliku z adresami url zdjęć samochodów")
    parser.add_argument("count", type=int, help="Liczba sztucznych danych do wygenerowania")

    # Paroswanie przyjętych z linii poleceń argumentów
    args = parser.parse_args()
    
    # Tworzenie generatora danych
    generator = MockDataGenerator(args.file_path, args.count)
    
    # Generowanie danych
    mock_data = generator.generate_mock_data()
    
    # Zapisywanie danych do pliku JSON
    generator.save_to_json("Mock_Data.json", mock_data)
    
    print(f"Wygenerowano dane (liczba pojazdów: {args.count}) i zapisano do Mock_Data.json")
