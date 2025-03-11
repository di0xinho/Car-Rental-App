import { EmailClient } from "@azure/communication-email";
import dotenv from "dotenv";
dotenv.config();

// Klasa do obsługi emaili przez Azure
class EmailService {

  // W konstruktorze przypisywany jest connection string - aby można było skorzystać z usługi udostępnianej przez Azure;
  // adres email użytkownika do którego będzie wysyłany 6-cyfrowy kod jednorazowy; adres email nadawcy wiadomości z kodem
  constructor() {
    this.connectionString = process.env.COMMUNICATION_SERVICES_CONNECTION_STRING;
    this.emailClient = new EmailClient(this.connectionString);
    this.sender = process.env.EMAIL_SENDER
  }

  // Metoda, która pozwoli na przesłanie 6-cyfrowego kodu jednorazowego za pomocą adresu email
  async sendResetPasswordEmail(userEmail, resetCode) {
    try {
      const emailMessage = {
        senderAddress: this.sender,
        content: {
          subject: "Resetowanie hasła - Twój kod weryfikacyjny",
          plainText: `Witaj,\n\nOtrzymaliśmy prośbę o zresetowanie hasła do Twojego konta. \nAby kontynuować, wprowadź poniższy kod weryfikacyjny:\n\n${resetCode}\n\nKod ten wygaśnie za 15 minut. Jeśli to nie Ty inicjowałeś prośbę, możesz zignorować tę wiadomość.`,
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
}

export default new EmailService();
