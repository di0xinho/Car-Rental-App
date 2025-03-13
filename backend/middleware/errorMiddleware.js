import { StatusCodes } from "http-status-codes";

const errorMiddleware = (err, req, res, next) => {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Wewnętrzny błąd serwera", success: false, error: err.message });
};

export default errorMiddleware;