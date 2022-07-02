import { Router } from "express";
import multer from "multer";

import multerConfig from "./config/multer.js";
import authMiddleware from "./middlewares/auth.js";

import {
  register,
  authenticate,
  listUsers,
} from "./controllers/UserController.js";
import {
  addOrRemoveContact,
  findContactFromAnUser,
} from "./controllers/ContactController.js";
import { getMessages, newMessage } from "./controllers/MessageController.js";

const routes = Router();
const multerAvatarConfig = multerConfig("avatars");

// User routes
routes.get("/users/list", authMiddleware, listUsers);
routes.post(
  "/users/register",
  multer(multerAvatarConfig).single("avatar"),
  register
);

routes.post("/users/authenticate", authenticate);

// Contact routes
routes.get("/contacts", authMiddleware, findContactFromAnUser);
routes.patch("/contacts/:contact_id", authMiddleware, addOrRemoveContact);

// Message routes
routes.post("/message/:receiver_id", authMiddleware, newMessage);
routes.get("/message/:receiver_id", authMiddleware, getMessages);

export default routes;
