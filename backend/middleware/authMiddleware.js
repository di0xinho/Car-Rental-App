import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

// Middleware autoryzacji - sprawdza, czy użytkownik jest uwierzytelniony
const auth = async (req, res, next) => {

    // Pobieramy token jwt z ciasteczek
    const token = req.cookies.token;

    // W przypadku braku tokena, zwracamy odpowiedni błąd (Unauthorized)
    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Brak tokena uwierzytelniającego",
            success: false
        });
    }

    try {
        // Jeśli wszystko do tej pory było ok, to przechodzimy do weryfikacji tokena jwt
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // Dane o użytkowniku przechowujemy w obiekcie 'req.user'
        req.user = { userId: decoded.userId, email: decoded.email, role: decoded.role };  
        next(); // Na koniec przekazujemy żądanie do kolejnego middleware lub kontrolera
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Niepoprawny lub wygasły token",
            success: false
        });
    }
};

export default auth;
