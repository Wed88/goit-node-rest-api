import HttpError from "../helpers/HttpError.js";

const isFileHere = (req, res, next) => {
  if (!req.file) {
    return next(HttpError(400, "Not found file"));
  }
  next();
};

export default isFileHere;
