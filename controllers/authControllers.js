import * as authServices from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const signup = async (req, res) => {
  const newUser = await authServices.saveUser(req.body);

  res.status(201).json({
    email: newUser.email,
  });
};

export default {
  signup: ctrlWrapper(signup),
};
