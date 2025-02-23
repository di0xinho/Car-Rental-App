import os
import requests, uuid, json
from dotenv import load_dotenv

# Kod napisany na podstawie dokumentacji https://learn.microsoft.com/en-us/azure/ai-services/translator/quickstart-text-rest-api?tabs=python

# Klasa Translator odpowiedzialna za tłumaczenie tekstu z języka angielskiego na język polski
class Translator:

    # Konstruktor
    def __init__(self):
        # Przypisujemy do zmiennych dane, które nie będą zmieniać się w czasie takie jak endpoint oraz ścieżka
        endpoint = "https://api.cognitive.microsofttranslator.com"
        path = '/translate'
        
        # Pozostałe zmienne takie jak api_key, location, translation_from czy translation_to zostawiamy narazie puste
        self.api_key = None
        self.location = None

        self.constructed_url = endpoint + path

    # Metoda służy do zainicjalizowania
    def init_main_params(self, api_key, location):
        # Przypisujemy klucz do zmiennej; podobnie postępujemy z lokalizacją naszej usługi
        self.api_key = api_key
        self.location = location

    # Metoda służąca do wysłania żadania przetłumaczenia tekstu;
    # Jako wyjście otrzymujemy odpowiedź serwera w postaci pliku jsonowego
    def send_request(self, translation_from, translation_to, text):

        # Tworzymy parametry zapytania, czyli:
        params = {
        'api-version': '3.0', # wersję API
        'from': translation_from, # Tłumaczenie z danego języka 
        'to': translation_to # Tłumaczenie na dany język 
        }

        # Dane znajdujące się w nagłówku zapytania
        headers = {
        'Ocp-Apim-Subscription-Key': self.api_key,
        # location required if you're using a multi-service or regional (not global) resource.
        'Ocp-Apim-Subscription-Region': self.location,
        'Content-type': 'application/json',
        'X-ClientTraceId': str(uuid.uuid4())
        }

        # Treść ciała zapytania, czyli tekst do tłumaczenia
        body = [{
            'text': text
        }]

        # Wysyłamy zapytanie
        request = requests.post(self.constructed_url, params=params, headers=headers, json=body)

        # Odbieramy odpowiedź w formie pliku json
        response = request.json()

        # Pobranie tekstu tłumaczenia
        translated_text = response[0]["translations"][0]["text"]

        return translated_text



    