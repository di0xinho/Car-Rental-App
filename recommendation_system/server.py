import os
from flask import Flask, request, jsonify
import pandas as pd
from model import Model
from dotenv import load_dotenv

# Tworzenie instancji aplikacji Flaska
app = Flask(__name__)

# Ładowanie zmiennych środowiskowych z pliku
load_dotenv()

# Zapisujemy do zmiennej odpowiadającej za ścieżkę do modelu odpowiednią wartość z pliku ze zmiennymi środowiskowymi (.env)        
MODEL_PATH = os.getenv("MODEL_PATH")
try: # Ładujemy model z pliku
    model = Model.load_model(MODEL_PATH)
    if model is None: # W przypadku, gdy model jest pusty - zwracamy odpowiedni komunikat
        raise ValueError("Nie udało się wczytać modelu.")
except Exception as e: # W przypadku, gdy nie uda nam się wczytać modelu
    print(f"Błąd podczas wczytywania modelu: {e}")
    model = None

# Endpoint odpowiedzialny za zwrócenie w odpowiedzi przewidywanego klastra, do którego model zaliczył daną obserwację
@app.route("/predict", methods=["POST"])
def predict():
    # Jeśli model jest pusty...
    if model is None:
        return jsonify({"error": "Model nie został poprawnie wczytany."}), 500
    
    try:
        # Pobieramy dane z żądania JSON
        data = request.get_json()
        if not data: # Jeśli nie ma żadnych danych w środku
            return jsonify({"error": "Brak danych w żądaniu."}), 400
        
        # Wymagane pola
        required_fields = ["capacity", "year", "bodyType", "gearboxType", "mileage", "fuelType", "hourlyPrice"]

        # Jeśli, któreś z pól nie znajduje się w ciele żądania, to zwracamy odpowiedni komunikat
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Brak wymaganych pól w danych."}), 400
        
        # Przedstawiamy obserwację w postaci ramki danych
        new_observation = pd.DataFrame([data])
        
        # Dokonujemy predykcji wykorzystując nasz wyuczony model; wynik predykcji zapisujemy do zmiennej
        predicted_cluster = model.predict_cluster(new_observation)

        # Wynik zwracamy w postaci jsona
        return jsonify({"predicted_cluster": int(predicted_cluster[0])})
    except Exception as e: # W przypadku błędu serwera...
        return jsonify({"error": f"Błąd przetwarzania danych: {str(e)}"}), 400
    
if __name__ == "__main__": # Aplikacja jest dostępna na localhoście, na porcie 8001
    app.run(host="127.0.0.1", port=8001, debug=True)