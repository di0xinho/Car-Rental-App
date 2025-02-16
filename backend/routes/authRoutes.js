import express, { Router } from "express";
const router = express.Router();
import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { emailSchema, passwordSchema, validateField } from "../utils/validateFields.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Prosty endpoint sprawdzający czy wszystko działa
router.get("/", (req, res) => {
    res.status(StatusCodes.OK).send("Hello from auth!");
});

// Endpoint obsługujący rejestrację użytkownika 
router.post("/register", async(req, res) => {

    try{
        // Pobieramy email z ciała zapytania
        const email = req.body.email;

        // Na początku sprawdzamy, czy użytkownik o podanym adresie email posiada już konto w aplikacji
        const userExists = await User.findOne({email: email});

        // Jeśli tak, to zwracamy odpowiedź, w której informujemy użytkownika o tym, że istnieje już konto o podanym adresie
        if(userExists){
            return res.status(StatusCodes.CONFLICT)
            .json({message: "Istnieje już konto, na które zarejestrowano podany adres e-mail", success: false});
        }

        // W przeciwnym wypadku...

        // Pobieramy hasło z ciała zapytania
        const password = req.body.password;

        // Sprawdzamy, czy adres email i hasło spełniają warunki walidacji
        const passwordValidation = validateField(password, passwordSchema);
        const emailValidation = validateField(email, emailSchema);

        // Jeśli adres email nie spełnia warunków, wtedy zwracamy odpowiednią odpowiedź
        if( !emailValidation.isValid ){
            return res.status(StatusCodes.BAD_REQUEST)
            .json( {message: "Adres email nie spełnia warunków walidacji", errors: emailValidation.errors, success: false} );
        }

        // Jeśli hasło nie spełnia warunków, wtedy zwracamy odpowiednią odpowiedź
        if( !passwordValidation.isValid ){
            return res.status(StatusCodes.BAD_REQUEST)
            .json( {message: "Hasło nie spełnia warunków walidacji", errors: passwordValidation.errors, success: false} );
        }

        // Trzymanie haseł w bazie danych w postaci niezaszyfrowanej (plaintext) jest niebezpieczne
        // Dlatego też należy użyć do tego celu funkcji haszującej (najlepiej z dodawaniem soli)
        // Najpopularniejszą biblioteką udostępniającą takie rozwiązanie jest bcryptjs
        
        // Generujemy sól
        const salt = await bcrypt.genSalt(10);

        // Haszujemy nasze hasło dodając do niego sól
        const hashedPassword = await bcrypt.hash(password, salt);

        // W miejsce hasła zapisanego w formacie tekstu jawnego zapisujemy zaszyfrowane hasło
        req.body.password = hashedPassword;

        // Na podstawie parametrów ciała zapytania jesteśmy w stanie stworzyć nowego użytkownika
        const newUser = new User(req.body);

        // Zapisujemy użytkownika w bazie danych
        await newUser.save();

        // W przypadku powodzenia, zwracamy następującą odpowiedź
        res.status(StatusCodes.OK)
        .json({ message: "Tworzenie konta przebiegło pomyślnie", success: true });

    } // W przypadku błędu serwera, zwracany jest odpowiedni wyjątek
    catch(error){
        
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Błąd podczas tworzenie konta", success: false, error });

    }
});

// router.post("/login", async(req, res) => {

// });

export default router;