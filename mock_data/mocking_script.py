# Przed uruchomieniem skryptu należy sprawdzić, czy mamy zainstalowany język Pythona;
# Możemy to zrobić wpisując w linii komend polecenie: "python --version"
# Jeśli mamy zainstalowanego Pythona na naszym komputerze, to instalujemy wszystkie potrzebne biblioteki (bez nich nie uda nam się uruchomić skryptu);
# Do tego celu posłuży polecenie "pip install -r requirements.txt"
# Następnie pozostało już nam tylko uruchomić skrypt poleceniem "python mocking_script.py <ścieżka do pliku> <liczba rekordów>"

import os
import random
import json
import time
import threading
from dotenv import load_dotenv
from faker import Faker
from concurrent.futures import ThreadPoolExecutor
from description_generator import DescriptionGenerator
from translator import Translator
from Car_Data import CarData

# Tworzymy klasę generatora danych, gdzie w konstruktorze przyjmować będziemy ścieżkę do pliku, z którego pobierać będziemy adresy URL do zdjęć
# wykorzystywanych przy tworzeniu sztucznych danych oraz liczbę rekordów sztucznych samochodów jakie będziemy generować 
class MockDataGenerator:

    # Konstruktor
    def __init__(self, image_file, count, model_name, task, translation_from, translation_to):
        
        # Tworzymy obiekt Faker, który posłuży do generowania sztucznych danych 
        self.fake = Faker()

        # Tworzymy także obiekt translatora, który tłumaczyć będzie opisy samochodów
        self.translator = Translator()

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
        self.colors = ['Czarny', 'Biały', 'Niebieski', 'Szary', 'Czerwony', 'Granatowy']
        self.body_types = ['Sedan', 'Coupe', 'Hatchback', 'SUV', 'Crossover']
        self.gearbox_types = ['Manualna', 'Automatyczna']
        self.fuel_types = ['Benzyna', 'Diesel', 'Elektryk', 'Hybryda', 'Gaz']
        self.image_urls = self.load_image_urls(image_file)
        self.booked_time_slots = []
        self.is_available = True
        self.count = count

        # Parametry dla modelu językowego (pod generowanie opisu samochodu)
        self.model_name = model_name
        self.task = task

        # Wczytujemy zmienne z pliku .env i wczytujemy je do translatora
        load_dotenv()
        self.translator.init_main_params(os.getenv("TRANSLATOR_API_KEY"), os.getenv("LOCATION"))

        # Przypisujemy do zmiennych języki w ramach, których ma przebiegać tłumaczenie
        self.translation_from = translation_from
        self.translation_to = translation_to

        # Tworzymy lock, który będzie używany do synchronizacji
        self.translator_lock = threading.Lock()

    # Metoda wczytująca ścieżkę do pliku z adresami URL, adresy są potem przetrzymywane w tablicy "image_urls" w obiekcie generatora
    def load_image_urls(self, filename):
        with open(filename, 'r', encoding = 'utf-8') as file:
            return [line.strip() for line in file.readlines() if line.strip()]
    
    # Metoda generująca i zwracająca pojedynczy rekord 
    def generate_single_record(self, _):
        make = random.choice(list(self.make_and_model.keys()))
        model = random.choice(self.make_and_model[make])
        capacity = self.fake.random_element(elements=(4, 5, 7))
        year = self.fake.random_int(min=1995, max=2022)
        color = random.choice(self.colors)
        bodyType = random.choice(self.body_types)
        gearboxType = random.choice(self.gearbox_types)
        mileage = self.fake.random_int(min=75000, max=350000)
        fuelType = random.choice(self.fuel_types)
        hourlyPrices = self.fake.random_int(min=25, max=120)
        imageUrl = random.choice(self.image_urls)

        color_dictionary = { "Czarny": "black", "Biały": "white", "Niebieski": "blue", "Szary": "grey", "Granatowy": "purple", "Czerwony": "red" }
        gearbox_dictionary = { "Manualna": "manual", "Automatyczna": "automatic" }
        fuel_dictionary = { "Benzyna": "petrol", "Diesel": "diesel", "Elektryk": "electric", "Hybryda": "hybrid", "Gaz": "gas" }

        # Funkcja lambda do translacji
        translate = lambda dictionary, value: dictionary.get(value, value)

        # Użycie funkcji lambda do tłumaczenia wartości
        color_en = translate(color_dictionary, color)
        gearbox_en = translate(gearbox_dictionary, gearboxType)
        fuel_en = translate(fuel_dictionary, fuelType)

        # Tworzenie obiektu z danymi auta
        car_info = CarData(
            car_make=make,
            car_model=model,
            color=color_en,
            year=year,
            gearboxType=gearbox_en,
            fuel=fuel_en,
            hourlyPrice=hourlyPrices
        )

        # Inicjalizacja generatora (jako framework używamy tutaj PyTorcha)
        generator = DescriptionGenerator(model_name="distilgpt2", framework="pt", max_new_tokens=200)

        # Generowanie opisu
        description_en = generator.generate_description(car_info)

        # Tłumaczenie opisu przez tłumacza
        # description = self.translator.send_request(self.translation_from, self.translation_to, description_en)

        # Użycie locka, by zablokować dostęp do translatora na czas wykonania
        with self.translator_lock:
            description = self.translator.send_request(self.translation_from, self.translation_to, description_en)

        # Wszystkie dane o samochodzie zbieramy do rekordu
        record = {
            "make": make,
            "model": model,
            "capacity": capacity,
            "year": year,
            "color": color,
            "bodyType": bodyType,
            "gearboxType": gearboxType,
            "mileage": mileage,
            "fuelType": fuelType,
            "hourlyPrice": hourlyPrices,
            "imageUrl": imageUrl,
            "description": description,
            "bookedTimeSlots": self.booked_time_slots,
            "isAvailable": self.is_available
        }

        return record
    
    # Metoda generująca listę sztucznych danych o pojazdach (podejście jednowątkowe)
    def generate_mock_data(self):
        data = []

        # Czas przed rozpoczęciem zadania
        start_time = time.time()

        # W pętli for tworzymy rekordy danych w zależności od liczby jaką podaliśmy w wierszu poleceń
        for _ in range(self.count):
           
            # Tworzymy rekord danych używając metody generującej i zwracającej rekord
            record = self.generate_single_record(_)

            # Utworzony rekord dodajemy do naszej kolekcji
            data.append(record)

        # Czas po zakończeniu zadania
        end_time = time.time()

        # Obliczanie różnicy
        elapsed_time = end_time - start_time
        print(f"Czas wykonania generowania danych: {elapsed_time} sekund")

        return data
    
    # Metoda generująca listę sztucznych danych o pojazdach (podejście wielowątkowe)
    def generate_mock_data_parallel(self):
        data = []

        # Czas przed rozpoczęciem zadania
        start_time = time.time()

        # Do obliczeń stosujemy pulę wątków, gdzie obliczenia wykonują obiekty ThreadPoolExecutor
        # Liczba egzekutorów jest równa liczbie wątków procesora - przyspieszy to znaczącą operacje generowania sztucznych danych
        with ThreadPoolExecutor() as executor:
            # Egzekutor przyjmuje następujące parametry: zadanie, które ma wykonać oraz ilość tych zadań 
            results = executor.map(self.generate_single_record, range(self.count)) 
            data.extend(results)

        # Czas po zakończeniu zadania
        end_time = time.time()

        # Obliczanie różnicy
        elapsed_time = end_time - start_time
        print(f"Czas wykonania generowania danych: {elapsed_time} sekund")

        return data

    # Metoda zapisująca dane do pliku JSON
    def save_to_json(self, filename, data):
        with open(filename, 'w', encoding = 'utf-8') as outfile:
            json.dump(data, outfile, indent = 4, ensure_ascii = False)

    
