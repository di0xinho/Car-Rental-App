import express, { Router } from "express";
const router = express.Router();
import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import convertToISODateWithMoment from "../utils/convertDateToISO.js";
import { emailSchema, usernameSchema, passwordSchema, resetCodeSchema, firstNameSchema, surnameSchema, phoneNumberSchema, genderSchema, dateOfBirthSchema, validateField } from "../utils/validateFields.js";
import { createJWT, attachCookie } from "../utils/authFunctions.js";
import authMiddleware from "../middleware/authMiddleware.js"
import bcrypt from "bcryptjs";
import emailService from "../utils/emailService.js";

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

        // W odpowiedzi serwera będzie dołączony token JWT
        attachCookie({ res, token });

        // W odpowiedzi serwera będziemy chcieli też zwrócić dane użytkownika i dlatego należy nie ujawniać hasła
        // Mimo, że hasło jest w postaci zaszyfrowanej (hasło haszujemy z dodatkiem soli przy pomocy 'bcryptjs' - przypomnienie),
        // to nigdy nie należy go ujawniać
        user.password = undefined;

        // W sytuacji, gdy wszystko przebiegło poprawnie, zwracamy odpowiednią odpowiedź serwera
        res.status(StatusCodes.OK)
        .json({ message: "Logowanie przebiegło pomyślnie", data: user, success: true });
        
    } // W przypadku błędu serwera, zwracany jest odpowiedni wyjątek
    catch(error){

        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Błąd podczas logowania się użytkownika do aplikacji", success: false, error });

    }
});

// Endpoint odpowiedzialny za zwrócenie informacji o koncie aktualnego użytkownika (aktualnie zalogowanego)
router.get("/get-current-user", authMiddleware, async(req, res) => {

    try{
        // Znajdujemy w bazie danych użytkowanika o danym numerze id
        const user = await User.findOne({ _id: req.user.userId });

        // Zabezpieczenie - jeśli dany użytkownik nie znajduje się w bazie danych, to wyświetlamy odpowiedni komunikat
        if(!user){
            return res.status(StatusCodes.NOT_FOUND)
            .json({message: "Wybrany użytkownik nie figuruje w bazie danych", success: false});
        }

        // Z przyczyn bezpieczeństwa hasło jak i dane dotyczące przypominania hasła są ustawiane jako undefined
        user.password = undefined;
        user.resetPasswordCode = undefined;
        user.resetPasswordCodeExpiry = undefined;
        user.resetPasswordAttempts = undefined;

        // W sytuacji, gdy wszystko przebiegło poprawnie, zwracamy odpowiednią odpowiedź serwera
        res.status(StatusCodes.OK)
        .json({ message: "Zwrócono dane na temat obecnego konta użytkownika", data: user, success: true });

    } // W przypadku błędu serwera, zwracany jest odpowiedni wyjątek
    catch (error) {

        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Wewnętrzny błąd serwera", success: false, error });

    }

})

// Endpoint zwracający dane na temat użytkownika (uogólnienie endpointa '/get-current-user', gdzie zwracaliśmy dane na temat AKTUALNEGO użytkownika, gdzie numer id był 
// pozyskiwany z odpowiedniego pliku cookie)
router.get("/get-user-by-id", authMiddleware, async(req, res) => {

    try{
        // Znajdujemy w bazie danych użytkowanika o danym numerze id
        const user = await User.findOne({ _id: req.body.userId });

         // Zabezpieczenie - jeśli dany użytkownik nie znajduje się w bazie danych, to wyświetlamy odpowiedni komunikat
         if(!user){
            return res.status(StatusCodes.NOT_FOUND)
            .json({message: "Wybrany użytkownik nie figuruje w bazie danych", success: false});
        }

         // Z przyczyn bezpieczeństwa hasło jak i dane dotyczące przypominania hasła są ustawiane jako undefined
         user.password = undefined;
         user.resetPasswordCode = undefined;
         user.resetPasswordCodeExpiry = undefined;
         user.resetPasswordAttempts = undefined;

         // W sytuacji, gdy wszystko przebiegło poprawnie, zwracamy odpowiednią odpowiedź serwera
         res.status(StatusCodes.OK)
         .json({ message: "Zwrócono dane na temat obecnego konta użytkownika", data: user, success: true });

    } // W przypadku błędu serwera, zwracany jest odpowiedni wyjątek
    catch (error) {

        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Wewnętrzny błąd serwera", success: false, error });

    }

})

// Endpoint odpowiedzialny za aktualizację danych o użytkowniku z bieżącego konta
router.patch("/update-user", authMiddleware, async(req, res) => {

    try{
        // Pobieramy numer id użytkownika z ciasteczka
        const userId = req.user.userId

        // Pobieramy dane, które będzie aktualizować z ciała zapytania
        const { firstName, surname, phoneNumber, dateOfBirth, gender } = req.body;

         // W ciele zapytania należy umieścić wszystkie potrzebne wartości, czyli adres email oraz hasło
        // W przeciwnym wypadku serwer zwróci następującą odpowiedź...
        if (!firstName || !surname || !phoneNumber || !dateOfBirth || !gender) {
            return res.status(StatusCodes.BAD_REQUEST)
            .json({message: "Ciało zapytania nie zawiera wszystkich wartości", success: false});
        }

        // Pobieramy użytkownika z bazy danych
        const user = await User.findById(userId);

        // jeśli dany użytkownik nie znajduje się w bazie danych, to wyświetlamy odpowiedni komunikat
        if(!user){
            return res.status(StatusCodes.NOT_FOUND)
            .json({message: "Wybrany użytkownik nie figuruje w bazie danych", success: false});
        }

        // Sprawdzamy, czy przekazane w żądaniu dane spełniają warunki walidacji
        const firstNameValidation = validateField(firstName, firstNameSchema);
        const surnameValidation = validateField(surname, surnameSchema);
        const phoneNumberValidation = validateField(phoneNumber, phoneNumberSchema);
        const dateOfBirthValidation = validateField(dateOfBirth, dateOfBirthSchema);
        const genderValidation = validateField(gender, genderSchema);

        // Jeśli imię nie spełnia warunków, wtedy zwracamy odpowiednią odpowiedź
        if( !firstNameValidation.isValid ){
            return res.status(StatusCodes.BAD_REQUEST)
            .json( {message: "Imię nie spełnia warunków walidacji", errors: firstNameValidation.errors, success: false} );
        }

        // Jeśli nazwisko nie spełnia warunków, wtedy zwracamy odpowiednią odpowiedź
        if( !surnameValidation.isValid ){
            return res.status(StatusCodes.BAD_REQUEST)
            .json( {message: "Nazwisko nie spełnia warunków walidacji", errors: surnameValidation.errors, success: false} );
        }

        // Jeśli data urodzenia nie spełnia warunków, wtedy zwracamy odpowiednią odpowiedź
        if( !dateOfBirthValidation.isValid ){
            return res.status(StatusCodes.BAD_REQUEST)
            .json( {message: "Data urodzenia nie spełnia warunków walidacji", errors: dateOfBirthValidation.errors, success: false} );
        }

        // Jeśli płeć nie spełnia warunków, wtedy zwracamy odpowiednią odpowiedź
        if( !genderValidation.isValid ){
            return res.status(StatusCodes.BAD_REQUEST)
            .json( {message: "Płeć nie spełnia warunków walidacji", errors: genderValidation.errors, success: false} );
        }

        // Jeśli numer telefonu nie spełnia warunków, wtedy zwracamy odpowiednią odpowiedź
        if( !phoneNumberValidation.isValid ){
            return res.status(StatusCodes.BAD_REQUEST)
            .json( {message: "Numer telefonu nie spełnia warunków walidacji", errors: phoneNumberValidation.errors, success: false} );
        }

        // Przypisujemy polom użytkownika odpowiednie wartości przekazane w ciele zapytania
        user.firstName = firstName;
        user.surname = surname;
        user.dateOfBirth = convertToISODateWithMoment(dateOfBirth);
        user.phoneNumber = phoneNumber;
        user.gender = gender;

        // Zapisanie stanu rekordu w bazie
        await user.save();

        // W przypadku, gdy aktualizacja danych użytkownika przebiegła poprawnie, serwer wysyła odpowiedni komunikat
        res.status(StatusCodes.OK).json({
            message: "Aktualizacja danych użytkownika przebiegła pomyślnie",
            success: true,
        });
        
    } // W przypadku błędu serwera, zwracany jest odpowiedni wyjątek
    catch (error) {

        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Wewnętrzny błąd serwera", success: false, error });

    }

})

// Endpoint odpowiedzialny za żądanie resetowania hasła
router.post("/forgot-password", async (req, res) => {
    try {
        // Pobieramy adres email z ciała zapytania
        const email = req.body.email;

        // Walidacja adresu email
        const emailValidation = validateField(email, emailSchema);
        
        // W przypadku nie przejścia procesu walidacji, wysyłamy odpowiedni komunikat...
        if (!emailValidation.isValid) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Adres email nie spełnia warunków walidacji",
                errors: emailValidation.errors,
                success: false,
            });
        }

        // Wyszukujemy użytkownika o podanym adresie e-mail
        const user = await User.findOne({ email });

        // Zwracamy tę samą odpowiedź niezależnie, czy użytkownik istnieje
        if (!user) {
            return res.status(StatusCodes.OK).json({
                message: "Jeśli konto istnieje, otrzymasz wiadomość email ze stosownymi instrukcjami",
                success: true,
            });
        }

        // Ustawienie czasu po którym będzie można dalej resetować hasła oraz limit prób do ich resetowania 
        const hourAgo = new Date(Date.now() - 60 * 60 * 1000);
        const limit = 3;

        if (user.resetPasswordAttempts >= limit && user.resetPasswordCodeExpiry > hourAgo) {
            return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
                message: "Przekroczono limit prób resetowania hasła. Spróbuj ponownie za godzinę.",
                success: false,
            });
        }

        // Generowanie 6-cyfrowego kodu
        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Czas ważności 6-cyfrowego kodu
        const expiryTime = new Date(Date.now() + 15 * 60 * 1000);

        // Aktualizacja użytkownika
        await User.findByIdAndUpdate(user._id, {
            resetPasswordCode: resetCode,
            resetPasswordCodeExpiry: expiryTime,
            $inc: { resetPasswordAttempts: 1 },
        });

        // Wysyłanie emaila przez Azure
        try {
            const emailSent = await emailService.sendResetPasswordEmail(user.email, resetCode);

            console.log(`Kod resetowania hasła dla ${user.email}: ${resetCode}`);

            if (!emailSent) {
                console.warn(`Nie udało się wysłać emaila do ${user.email}`);
            }
        } catch (error) {
            console.error("Błąd podczas wysyłania emaila:", error);
        }

        // Resetowanie liczby prób po 24h
        setTimeout(async () => {
            await User.findByIdAndUpdate(user._id, { resetPasswordAttempts: 0 });
        }, 24 * 60 * 60 * 1000);

        // W przypadku, gdy proces wysyłania maila przebiegł pomyślnie, wysyłamy odpowiedni komunikat
        res.status(StatusCodes.OK).json({
            message: "Kod resetujący hasło został wysłany na Twój adres email. Kod wygasa po 15 minutach.",
            success: true,
        });

    } // W przypadku błędu serwera, zwracany jest odpowiedni wyjątek
    catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Wewnętrzny błąd serwera",
            success: false,
            error,
        });
    }
});

// Endpoint obsługujący resetowanie hasła
router.post("/reset-password/:userId", async(req, res) => {
    try {
        // Pobieramy identyfikator użytkownika z parametru URL oraz kod resetujący i nowe hasło z ciała zapytania
        const { userId } = req.params;
        const { resetCode, newPassword } = req.body;

        // Sprawdzamy, czy kod resetujący i nowe hasło spełniają warunki walidacji
        const resetCodeValidation = validateField(resetCode, resetCodeSchema);
        const passwordValidation = validateField(newPassword, passwordSchema);

        // W przypadku nie przejścia poszczególnych procesów walidacji, wysyłamy odpowiedni komunikat...
        if (!resetCodeValidation.isValid) {
            return res.status(StatusCodes.BAD_REQUEST)
                .json({ message: "Kod jednorazowy nie spełnia warunków walidacji", errors: resetCodeValidation.errors, success: false });
        }

        if (!passwordValidation.isValid) {
            return res.status(StatusCodes.BAD_REQUEST)
                .json({ message: "Hasło nie spełnia warunków walidacji", errors: passwordValidation.errors, 
                        success: false });
        }

        // Szukamy użytkownika w bazie danych wykorzystując podany identyfikator
        const user = await User.findById(userId);

        // Jeśli użytkownik nie został znaleziony w bazie danych, to zwracamy odpowiednią odpowiedź
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND)
            .json({ message: "Użytkownik nie znaleziony", 
                    success: false });
        }

        // Sprawdzamy, czy podany kod resetujący jest poprawny
        if (user.resetPasswordCode !== resetCode) {
            return res.status(StatusCodes.UNAUTHORIZED)
            .json({ message: "Nieprawidłowy kod resetujący", 
                success: false });
        }

        // Teraz zajmiemy się hasłem...

        // Aktualizujemy hasło użytkownika
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

         // W miejsce hasła zapisanego w formacie tekstu jawnego zapisujemy zaszyfrowane hasło
        req.body.password = hashedPassword;

        // Ustawiamy nowe hasło użytkownikowi
        user.password = req.body.password;

        // Zmieniamy wartość kodu resetującego hasło oraz czas jego wygaśnięcia na undefined 
        user.resetPasswordCode = undefined;
        user.resetPasswordCodeExpiry = undefined;

        // Zapisujemy zmiany w bazie
        await user.save();

        // W przypadku, gdy proces resetowania hasła przebiegł pomyślnie, wysyłamy odpowiedni komunikat
        res.status(StatusCodes.OK).json({
            message: "Proces resetowania i nadawania nowego hasła przebiegł pomyślnie",
            success: true,
        });

    } // W przypadku błędu serwera, zwracany jest odpowiedni wyjątek
    catch (error) {

        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Błąd serwera", 
                error: error.message, 
                success: false });
    }

});

// Endpoint odpowiedzialny za poprawne wylogowanie użytkownika z aplikacji
router.delete("/logout", async(req, res) => {

    try{
        // Nadpisujemy istniejące ciasteczko 'token' nowym ciasteczkiem o nazwie 'logout'
        // W ten sposób radzimy sobie z unieważnieniem poprzedniego tokena uwierzytelniającego 
        res.cookie('token', 'logout', {
            httpOnly: true,
            expires: new Date(Date.now() + 1000), // ciasteczko wygasa po 1 sekundzie
          });

         // Serwer zwraca odpowiedni komunikat
         res.status(StatusCodes.OK).json({
            message: "Użytkownik został wylogowany pomyślnie",
            success: true,
        });

    } // W przypadku błędu serwera, zwracany jest odpowiedni wyjątek
    catch (error) {

        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Wewnętrzny błąd serwera",
            success: false,
            error,
        });

    }

})

export default router;