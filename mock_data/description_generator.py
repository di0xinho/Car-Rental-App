from transformers import pipeline
from Car_Data import CarData

# Metoda usuwająca z tekstu znak nowej linii
def remove_newlines(text):
        return text.replace("\n", " ").strip()

# Klasa generatora opisu samochodu
class DescriptionGenerator:
    # Konstruktor
    def __init__(self, model_name, framework, max_new_tokens):
        self.generator = pipeline("text-generation", model=model_name, framework=framework)
        self.max_new_tokens = max_new_tokens

    # Metoda zwracająca wygenerowany opis samochodu przyjmująca jako argument dane samochodu na podstawie, których ma powstać dla niego opis
    def generate_description(self, car_data):
        car_make = car_data.car_make
        car_model = car_data.car_model
        color = car_data.color
        year = car_data.year
        gearboxType = car_data.gearboxType
        fuel = car_data.fuel
        hourlyPrice = car_data.hourlyPrice

        text = (f"So are you interested in our offer? I think the {color} {car_make} {car_model} is the perfect car for you. "
                f"In our rental offer, you will find vehicles that are safe and comfortable. That is why we strive to make the cars "
                f"in our offer as young as possible – the offer of this car, where the year of manufacture is {year}, is proof of that. "
                f"This model is distinguished by its {gearboxType} transmission and reliable {fuel} drive, providing excellent driving "
                f"dynamics and comfort. This makes it perfect for both long-distance travel and urban conditions. "
                f"The rental cost is only {hourlyPrice} PLN per hour, making it an attractive option for those looking for a reliable means of transport.")

        # Generowanie tekstu
        result = self.generator(
            text,
            max_new_tokens=self.max_new_tokens,
            num_return_sequences=1,
            do_sample=True,
            temperature=0.7,
            repetition_penalty=1.2,  # Zapobiega powtarzaniu się fragmentów tekstu
            pad_token_id=50256 
        )

        # Sprawdzamy, czy coś zostało wygenerowane
        if result and "generated_text" in result[0]:
            generated_text = result[0]["generated_text"]

            # Usunięcie niepełnego zdania na końcu, jeśli model nie dokończył
            last_period_index = generated_text.rfind(".")
            if last_period_index != -1:
                generated_text = generated_text[:last_period_index + 1]

            return remove_newlines(generated_text)

        return "Błąd podczas generowania tekstu"
