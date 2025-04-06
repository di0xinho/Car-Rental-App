import jwt from "jsonwebtoken";

// Poniżej znajdują się metody, które zostaną wykorzystane w procesie autentykacji użytkownika

// Metoda tworząca token JWT
const createJWT = (user) => {

    const payload = { userId: user._id, email: user.email, role: user.isAdmin };

    return jwt.sign( payload, process.env.JWT_SECRET_KEY, { 
        expiresIn: process.env.JWT_LIFETIME,
    });
}

// Metoda zwracająca plik cookie z tokenem przyznającym dostęp do korzystania z funkcjonalności aplikacji
const attachCookie = ({ res, token }) => {

    res.cookie("token", token, {
        httpOnly: true,
        expiresIn: new Date(Date.now() + process.env.JWT_LIFETIME),
        secure: process.env.NODE_ENV === "Production",
    });
};

export { createJWT, attachCookie };
