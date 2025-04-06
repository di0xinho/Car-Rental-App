import UnauthorizedError from "../errors/Unauthorized.js";

const checkPermissions = (requestUser) => {

    if (requestUser.role === true) return

    throw new UnauthorizedError("Nie możesz tego zrobić. Nie masz wystarczających uprawnień");
}

export default checkPermissions;