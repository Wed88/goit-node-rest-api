import User from "../models/users.js";

export const saveUser = (data) => User.create(data);
