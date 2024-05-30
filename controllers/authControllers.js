import * as authServices from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import compareHash from "../helpers/compareHash.js";
import { createToken } from "../helpers/jwt.js";
import gravatar from "gravatar";
import path from "path";
import fs from "fs/promises";
import Jimp from "jimp";

const AVATAR_PATH = path.resolve("public", "avatars");

const register = async (req, res) => {
  const data = req.body;
  const user = await authServices.findUser({ email: data.email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(data.email);
  const newUser = await authServices.saveUser({ ...data, avatarURL });

  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const comparePassword = await compareHash(password, user.password);
  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const { _id: id } = user;
  const payload = {
    id,
  };

  const token = createToken(payload);
  await authServices.updateUser({ _id: id }, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await authServices.updateUser({ _id }, { token: "" });

  res.status(204).json();
};

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const updateAvatar = async (req, res) => {
  const { path: sourcePath, filename } = req.file;
  const destinationPath = path.join(AVATAR_PATH, filename);
  await saveConvertedImage(sourcePath, destinationPath);
  await fs.unlink(sourcePath);

  const { _id } = req.user;
  const avatarURL = `${req.protocol}://${req.get(
    "host"
  )}/${"avatars"}/${filename}`;
  await authServices.updateUser({ _id }, { avatarURL });

  res.json({
    avatarURL,
  });
};

const saveConvertedImage = async (src, dest) => {
  Jimp.read(src)
    .then((image) => {
      return image.resize(250, 250).write(dest);
    })
    .catch((err) => console.log(err.message));
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
