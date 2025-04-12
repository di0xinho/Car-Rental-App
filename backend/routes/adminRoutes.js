import express, { Router } from "express";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/BadRequest.js";
import NotFoundError from "../errors/NotFound.js";
import authMiddleware from "../middleware/authMiddleware.js";
import checkPermissions from "../utils/checkPermissions.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import User from "../models/userModel.js";

const router = express.Router();

// Endpoint zwracający wszystkich użytkowników wraz z filtrowaniem i paginacją
router.get("/get-all-users", authMiddleware, asyncWrapper(async (req, res) => {

    // Sprawdzenie, czy uprawnienia użytkownika są wystarczające (czy jest adminem)
    checkPermissions(req.user);

    const {
        search,
        username,
        email,
        firstName,
        surname,
        phoneNumber,
        isAdmin,
        gender,
        minDateOfBirth,
        maxDateOfBirth,
        minCreatedAt,
        maxCreatedAt,
        sort,
        page,
        limit
    } = req.query;

    // Tworzymy obiekt zapytania dynamicznie na podstawie parametrów
    const queryObject = {};

    // Wyszukiwanie pełnotekstowe
    if (search) {
        queryObject.$or = [
            { username: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { firstName: { $regex: search, $options: "i" } },
            { surname: { $regex: search, $options: "i" } }
        ];
    }

    // Filtry indywidualne
    if (username) queryObject.username = { $regex: username, $options: "i" };
    if (email) queryObject.email = { $regex: email, $options: "i" };
    if (firstName) queryObject.firstName = { $regex: firstName, $options: "i" };
    if (surname) queryObject.surname = { $regex: surname, $options: "i" };
    if (phoneNumber) queryObject.phoneNumber = Number(phoneNumber);
    if (isAdmin) queryObject.isAdmin = isAdmin === "true";
    if (gender) queryObject.gender = gender;

    // Filtry zakresowe dat narodzin
    if (minDateOfBirth || maxDateOfBirth) {
        queryObject.dateOfBirth = {};
        if (minDateOfBirth) queryObject.dateOfBirth.$gte = new Date(minDateOfBirth);
        if (maxDateOfBirth) queryObject.dateOfBirth.$lte = new Date(maxDateOfBirth);
    }

    // Filtry timestampów
    if (minCreatedAt || maxCreatedAt) {
        queryObject.createdAt = {};
        if (minCreatedAt) queryObject.createdAt.$gte = new Date(minCreatedAt);
        if (maxCreatedAt) queryObject.createdAt.$lte = new Date(maxCreatedAt);
    }

    // Budowanie zapytania
    let result = User.find(queryObject);

    // Sortowanie
    if (sort === "latest") {
        result = result.sort("-createdAt");
    } else if (sort === "oldest") {
        result = result.sort("createdAt");
    } else if (sort === "name-asc") {
        result = result.sort("surname firstName");
    } else if (sort === "name-desc") {
        result = result.sort("-surname -firstName");
    } else if (sort === "username-asc") {
        result = result.sort("username");
    } else if (sort === "username-desc") {
        result = result.sort("-username");
    }

    // Paginacja
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;
    result = result.skip(skip).limit(limitNum);

    // Pobranie wyników (bez wrażliwych danych)
    const users = await result.select(
        "-password -resetPasswordCode -resetPasswordCodeExpiry -resetPasswordAttempts"
    ).populate({
        path: 'favorites',
        select: 'make model year' // Wybierzemy sobie tylko markę, model i rok produkcji ulubionych aut
    });

    // Liczba rekordów
    const totalUsers = await User.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalUsers / limitNum);

    // Zwracamy użytkowników w odpowiedzi serwera
    res.status(StatusCodes.OK).json({
        message: "Lista użytkowników została zwrócona",
        totalUsers,
        numOfPages,
        currentPage: pageNum,
        users: users,
        success: true
    });
}));

// Endpoint odpowiedzialny za usunięcie wybranego użytkownika z bazy danych
router.delete(
  "/delete-user/:userId",
  authMiddleware,
  asyncWrapper(async (req, res) => {
    // Sprawdzenie, czy uprawnienia użytkownika są wystarczające (czy jest adminem)
    checkPermissions(req.user);

    // Pobranie id użytkownika z parametru ścieżki
    const userId = req.params.userId;

    // Wyszukiwanie użytkownika po numerze id
    const deletedUser = await User.findById(userId);

    // Jeśli użytkownik nie został znaleziony w bazie danych, to zwracany jest odpowiedni komunikat
    if (!deletedUser) {
      throw new NotFoundError("Nie znaleziono użytkownika o takim numerze id");
    }

    // Sprawdzenie, czy usuwane konto jest kontem administratora
    if (deletedUser.isAdmin) {
      throw new BadRequestError(
        "Użytkownik, którego próbujesz usunąć, ma konto administratora - operacja usuwania konta jest więc niemożliwa."
      );
    }

    // Wartości ustawiamy na undefined, aby przy zwracaniu usuwanego zasobu nic nie było widoczne
    deletedUser.password = undefined;
    deletedUser.resetPasswordCode = undefined;
    deletedUser.resetPasswordCodeExpiry = undefined;
    deletedUser.resetPasswordAttempts = undefined;

    // Usuwamy użytkownika
    await User.findByIdAndDelete(userId);

    // W przypadku pomyślnego usunięcia zasobu z bazy danych, wyświetlamy następujący komunikat
    res.status(StatusCodes.OK).json({
      message: "Użytkownik został usunięty z bazy danych",
      data: deletedUser,
      success: true,
    });
  })
);

export default router;
