import { ErrorRequestHandler } from "express";
import CustomError from "../utils/CustomError";

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);

  let statusCode = 500;
  let errorCode = "UNKOWN_ERROR";
  let errorMessage = "Something went wrong";

  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    errorCode = err.errorCode;
    errorMessage = err.message;
  }

  res
    .status(statusCode)
    .json({ error_code: errorCode, error_description: errorMessage });
};

export default errorHandler;
