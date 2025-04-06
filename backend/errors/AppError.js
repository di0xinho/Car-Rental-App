class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.success = false;
    }
  }

  export default AppError;