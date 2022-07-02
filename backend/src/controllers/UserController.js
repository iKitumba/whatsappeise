import fs from "node:fs";
import { resolve } from "node:path";
import bcrypt from "bcryptjs";

import User from "../models/User.js";
import generateToken from "../config/token.js";

export const listUsers = async (req, res) => {
  const { user_id } = req;
  const loggedUser = await User.findById(user_id);
  const users = await User.find({
    $and: [{ _id: { $ne: user_id } }, { _id: { $nin: loggedUser.contacts } }],
  });

  return res.json(users);
};

export const register = async (req, res) => {
  const { username, bio, password } = req.body;
  const { filename: avatar } = req.file;

  const user = new User({ username, bio, password, avatar });

  try {
    await user.save();

    const token = generateToken({ id: user._id });

    user.password = undefined;

    return res.json({ user, token });
  } catch (error) {
    fs.unlink(
      resolve(process.cwd(), "tmp", "uploads", "avatars", avatar),
      (err) => {
        if (err) {
          console.log(err);
        }

        const errorMessage = new Error(error).message;
        console.clear();
        console.log(errorMessage);
        return res
          .status(409)
          .send({ message: `this username (${username}) already exists` });
      }
    );
  }
};

export const authenticate = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid password" });
  }

  user.password = undefined;

  const token = generateToken({ id: user._id });

  return res.json({ user, token });
};
