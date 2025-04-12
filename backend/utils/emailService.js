import { EmailClient } from "@azure/communication-email";
import dotenv from "dotenv";
dotenv.config();

// Klasa do obsługi emaili przez Azure
class EmailService {

  constructor() {
    this.connectionString = process.env.COMMUNICATION_SERVICES_CONNECTION_STRING;
    this.emailClient = new EmailClient(this.connectionString);
    this.sender = process.env.EMAIL_SENDER
  }

  // Uniwersalna metoda do wysyłania różnych typów emaili
  async sendEmail(userEmail, subject, content) {
    try {
      const emailMessage = {
        senderAddress: this.sender,
        content: {
          subject: subject,
          plainText: content,
        },
        recipients: {
          to: [{ address: userEmail }],
        },
      };

      const poller = await this.emailClient.beginSend(emailMessage);
      const response = await poller.pollUntilDone();

      console.log("E-mail wysłany, ID wiadomości:", response.id);
      return true;
    } catch (error) {
      console.error("Błąd podczas wysyłania emaila:", error);
      return false;
    }
  }

  // Metoda do resetowania hasła wykorzystująca uniwersalną metodę sendEmail
  async sendResetPasswordEmail(userEmail, resetCode) {
    const subject = "Resetowanie hasła - Twój kod weryfikacyjny";
    const content = `Witaj,\n\nOtrzymaliśmy prośbę o zresetowanie hasła do Twojego konta. \nAby kontynuować, wprowadź poniższy kod weryfikacyjny:\n\n${resetCode}\n\nKod ten wygaśnie za 15 minut. Jeśli to nie Ty inicjowałeś prośbę, możesz zignorować tę wiadomość.`;
    
    return this.sendEmail(userEmail, subject, content);
  }

  // Metoda do wysyłania szczegółów rezerwacji wykorzystująca uniwersalną metodę sendEmail
  async sendBookingDetails(userEmail, booking_details, bookingCar) {
    const subject = "Dokonałeś rezerwacji samochodu | Car Rental Merito";
    const content = `Witaj,\n\Dokonałeś rezerwacji samochodu z naszej floty. Poniżej znajdują się informacje dotyczące rezerwacji.\n\nMarka pojazdu: ${bookingCar.make}\nModel pojazdu: ${bookingCar.model}\nŁączna ilość godzin wypożyczenia: ${booking_details.totalHours}\nWypożyczenie od: ${booking_details.bookedTimeSlots.from}\nWypożyczenie do: ${booking_details.bookedTimeSlots.to}\nKwota do zapłaty: ${booking_details.totalPrice}\nRezerwacja z kierowcą: ${booking_details.driver ? "tak" : "nie"}\nCzy opłacone: ${booking_details.isPaid ? "tak" : "nie"}\n\nPo dokonaniu rezerwacji udaj się pod adres wypożyczalni, który znajdziesz poniżej.\n\n Adres wypożyczalni: Car Rental Merito | Gajda & Mykhailiuk & Michalski, ul. Radosna 21, 11-222 Warszawa\n\nWidzimy się na miejscu :)`;
    
    return this.sendEmail(userEmail, subject, content);
  }
}

export default new EmailService();