import jwt from "jsonwebtoken";

// Poniżej znajdują się metody, które zostaną wykorzystane w procesie autentykacji użytkownika

// Metoda tworząca token JWT
const createJWT = (user) => {
    return jwt.sign( { userId: user._id }, process.env.JWT_SECRET_KEY, { 
        expiresIn: process.env.JWT_LIFETIME,
    });
}

// Metoda zwracająca plik cookie z tokenem przyznającym dostęp do aplikacji
const attachCookie = ({ res, token }) => {

    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + lifetime),
        
    })
    
};

export { createJWT, attachCookie };
