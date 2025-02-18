import express, { Router } from "express";
const router = express.Router();
import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { emailSchema, usernameSchema, passwordSchema, validateField } from "../utils/validateFields.js";
import { createJWT, attachCookie } from "../utils/authFunctions.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Endpoint obsługujący rejestrację użytkownika 
router.post("/register", async(req, res) => {

    try{
        // Pobieramy wszystkie dane z ciała zapytania
        const { username, email, password } = req.body;

        // W ciele zapytania należy umieścić wszystkie potrzebne wartości, czyli nazwę użytkownika, adres email oraz hasło
        // W przeciwnym wypadku serwer zwróci następującą odpowiedź...
        if (!username || !email || !password) {
            return res.status(StatusCodes.BAD_REQUEST)
            .json({message: "Ciało zapytania nie zawiera wszystkich wartości", success: false});
        }

        // Na początku sprawdzamy, czy użytkownik o podanym adresie email posiada już konto w aplikacji
        const userExists = await User.findOne({email: email});

        // Jeśli tak, to zwracamy odpowiedź, w której informujemy użytkownika o tym, że istnieje już konto o podanym adresie
        if(userExists){
            return res.status(StatusCodes.CONFLICT)
            .json({message: "Istnieje już konto, na które zarejestrowano podany adres e-mail", success: false});
        }

        // W przeciwnym wypadku...

        // Sprawdzamy, czy adres email i hasło spełniają warunki walidacji
        const emailValidation = validateField(email, emailSchema);
        const usernameValidation = validateField(username, usernameSchema);
        const passwordValidation = validateField(password, passwordSchema);

        // Jeśli nazwa użytkownika nie spełnia warunków, wtedy zwracamy odpowiednią odpowiedź
        if( !usernameValidation.isValid ){
            return res.status(StatusCodes.BAD_REQUEST)
            .json( {message: "Nazwa użytkownika nie spełnia warunków walidacji", errors: usernameValidation.errors, success: false} );
        }
        
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

// Endpoint obsługujący logowanie użytkownika 
router.post("/login", async(req, res) => {

    try{
        // Pobieramy wszystkie dane z ciała zapytania
        const { email, password } = req.body;

        // W ciele zapytania należy umieścić wszystkie potrzebne wartości, czyli adres email oraz hasło
        // W przeciwnym wypadku serwer zwróci następującą odpowiedź...
        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST)
            .json({message: "Ciało zapytania nie zawiera wszystkich wartości", success: false});
        }

        // Szukamy użytkownika w bazie wykorzystując do tego podany adres email
        const user = await User.findOne({ email: email });

        console.log(user);

        // Jeśli użytkownik nie istnieje w bazie danych, to zwracamy odpowiedź, w której informujemy użytkownika o tym, że dane są niepoprawne
        // (Z przyczyn bezpieczeństwa nie informujemy o tym, że podany użytkownik znajduje się bądź nie znajduje w bazie danych)
        if(!user){
            return res.status(StatusCodes.BAD_REQUEST)
            .json({message: "Wprowadzono niepoprawne dane", success: false});
        }

        // Porównujemy hasło znajdujące się w ciele zapytania z hasłem zapisanym w bazie (kolejno pierwszy i drugi parametr metody)
        const isMatch = await bcrypt.compare(password, user.password);

        // W sytuacji, gdy hasła są inne zwracamy następującą odpowiedź
        if(!isMatch){
            return res.status(StatusCodes.BAD_REQUEST)
            .json({message: "Wprowadzono niepoprawne dane", success: false});
        }
        
        // Tworzymy token JWT
        const token = createJWT(user);

        // W sytuacji, gdy wszystko przebiegło poprawnie, zwracamy odpowiednią odpowiedź serwera
        res.status(StatusCodes.OK)
        .json({ message: "Logowanie przebiegło pomyślnie", data: token, success: true });
        
    } // W przypadku błędu serwera, zwracany jest odpowiedni wyjątek
    catch(error){

        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Błąd podczas logowania się użytkownika do aplikacji", success: false, error });

    }
});

export default router;