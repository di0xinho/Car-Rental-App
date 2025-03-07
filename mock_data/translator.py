import os
import time
import logging
import requests, uuid, json
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception, before_sleep_log
from dotenv import load_dotenv

# Kod napisany na podstawie dokumentacji https://learn.microsoft.com/en-us/azure/ai-services/translator/quickstart-text-rest-api?tabs=python

# Konfigurowanie loggowania - na wypadek wyrzucenia błędów przy wysyłaniu/przetwarzaniu żądań przez serwer
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

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

    @retry(
        stop=stop_after_attempt(7),  # Maksymalnie 7 prób
        wait=wait_exponential(multiplier=3, min=5, max=60),  # Eksponencjalne opóźnienie (5s, 10s, 20s...)
        retry=retry_if_exception(lambda e: isinstance(e, requests.exceptions.RequestException) or 
                                                 (hasattr(e, 'response') and e.response is not None and e.response.status_code == 429)),  
        reraise=True  # Po 7 nieudanych próbach rzucamy wyjątek
    )
    def send_request(self, translation_from, translation_to, text):

        # Metoda służąca do wysłania żadania przetłumaczenia tekstu;
        # Jako wyjście otrzymujemy odpowiedź serwera w postaci pliku jsonowego

        # Tworzymy parametry zapytania, czyli:
        params = {
            'api-version': '3.0',
            'from': translation_from,
            'to': translation_to
        }

        # Dane znajdujące się w nagłówku zapytania
        headers = {
            'Ocp-Apim-Subscription-Key': self.api_key,
            'Ocp-Apim-Subscription-Region': self.location,
            'Content-type': 'application/json',
            'X-ClientTraceId': str(uuid.uuid4())
        }

        # Treść ciała zapytania, czyli tekst do tłumaczenia
        body = [{
            'text': text
        }]

        # W bloku try-except wysyłamy zapytanie
        try:
            response = requests.post(self.constructed_url, params=params, headers=headers, json=body)
            
            # Jeśli dostaliśmy 429 (za dużo zapytań), sprawdzamy, czy serwer nie zwrócił nagłówka Retry-After
            if response.status_code == 429:
                retry_after = int(response.headers.get("Retry-After", 5))  # Jeśli nie ma, domyślnie czekamy 5s
                logger.warning(f"Zbyt wiele żądań (429). Oczekiwanie {retry_after} sekund...")
                time.sleep(retry_after)
                raise requests.exceptions.RequestException("Too Many Requests (429)")

            # Jeśli mamy inny błąd HTTP, rzucamy wyjątek
            response.raise_for_status()  

             # Odbieramy odpowiedź w formie pliku json
            data = response.json()

            # Jeśli z jakichś powodów nie dostaliśmy odpowiedzi bądź nie ma wartości dla pola "translations" w pliku json,
            # to wtedy rzucamy odpowiedni wyjątek
            if not data or "translations" not in data[0]:
                raise ValueError(f"Niepoprawna odpowiedź API: {data}")

            # W momencie, gdy wszystko przebiegło jak należy zwracamy naszą odpowiedź w formie przetłumaczonego tekstu
            return data[0]["translations"][0]["text"]
        
        except requests.exceptions.RequestException as e:
            logger.error(f"Błąd sieciowy: {e}, ponawianie...")
            raise

        except (KeyError, IndexError, ValueError) as e:
            logger.error(f"Błąd parsowania odpowiedzi API: {e}, pełna odpowiedź: {response.text}")
            raise



    