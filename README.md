# Opis aplikacji

Projektowana aplikacja to kompleksowy system rezerwacji samochodów, umożliwiający użytkownikom przeglądanie dostępnej floty pojazdów, dokonywanie rezerwacji oraz zarządzanie swoimi danymi. System przewiduje obsługę różnych ról użytkowników: administratorów, wolontariuszy i anonimowych gości, dostosowując funkcjonalności do ich uprawnień.

Aplikacja jest zaprojektowana z naciskiem na intuicyjną obsługę oraz wysoką wydajność. Wykorzystuje nowoczesne technologie:
- **Frontend:** Vue.js – framework zapewniający dynamiczny i responsywny interfejs użytkownika.
- **Backend:** Node.js + Express.js – odpowiadający za logikę biznesową oraz komunikację z bazą danych.
- **Baza danych:** MongoDB – dokumentowa baza danych przechowująca informacje o użytkownikach, pojazdach oraz rezerwacjach.

Dzięki zastosowaniu tych technologii aplikacja charakteryzuje się skalowalnością, szybkością działania oraz łatwością w utrzymaniu.

---

## Wymagania funkcjonalne według ról użytkowników

### **Administrator systemu**

| Nr  | **WYMAGANIE** | **Priorytet** |
|----|-------------|-----------|
| 1. | Jako administrator chcę, aby użytkownicy mogli zakładać konta i logować się, aby uzyskać dostęp do systemu. | Wysoki |
| 2. | Jako administrator chcę mieć możliwość rezerwacji samochodów z floty, wybierając formę płatności, daty wypożyczenia oraz opcję dodatkową – wynajem z kierowcą. | Wysoki |
| 3. | Jako administrator chcę przeglądać dostępne samochody oraz wyszukiwać je za pomocą filtrów. | Średni |
| 4. | Jako administrator chcę przeglądać historię wypożyczeń wszystkich użytkowników oraz filtrować wyniki. | Wysoki |
| 5. | Jako administrator chcę mieć dostęp do listy ulubionych pojazdów. | Średni |
| 6. | Jako administrator chcę edytować swój profil, zmieniając podstawowe dane osobowe. | Średni |
| 7. | Jako administrator chcę przeglądać listę wszystkich użytkowników i zarządzać ich kontami. | Wysoki |
| 8. | Jako administrator chcę dodawać, edytować i usuwać pojazdy z systemu. | Wysoki |
| 9. | Jako administrator chcę, aby użytkownicy mogli resetować hasło w przypadku jego zapomnienia. | Wysoki |
| 10. | Jako administrator chcę mieć możliwość włączenia trybu ciemnego. | Niski |

### **Użytkownik systemu – Wolontariusz**

| Nr  | **WYMAGANIE** | **Priorytet** |
|----|-------------|-----------|
| 1. | Jako użytkownik chcę mieć możliwość zakładania konta i logowania się. | Wysoki |
| 2. | Jako użytkownik chcę móc rezerwować samochody, wybierając formę płatności oraz daty wypożyczenia. | Wysoki |
| 3. | Jako użytkownik chcę przeglądać dostępne samochody i wyszukiwać je za pomocą filtrów. | Średni |
| 4. | Jako użytkownik chcę przeglądać historię moich wypożyczeń oraz filtrować wyniki i pobierać szczegóły w formacie PDF. | Wysoki |
| 5. | Jako użytkownik chcę mieć dostęp do listy ulubionych pojazdów. | Średni |
| 6. | Jako użytkownik chcę edytować swój profil, zmieniając podstawowe dane osobowe. | Średni |
| 7. | Jako użytkownik chcę mieć możliwość resetowania hasła. | Wysoki |
| 8. | Jako użytkownik chcę móc włączyć tryb ciemny. | Niski |

### **Anonimowy użytkownik – Gość**

| Nr  | **WYMAGANIE** | **Priorytet** |
|----|-------------|-----------|
| 1. | Jako anonimowy użytkownik chcę móc przeglądać listę dostępnych samochodów. | Wysoki |
| 2. | Jako anonimowy użytkownik chcę móc korzystać z wyszukiwarki i filtrów. | Średni |
| 3. | Jako anonimowy użytkownik chcę mieć możliwość rejestracji i utworzenia konta. | Wysoki |
| 4. | Jako anonimowy użytkownik chcę móc włączyć tryb ciemny. | Niski |

