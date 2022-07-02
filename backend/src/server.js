import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import http from "node:http";
import { resolve } from "node:path";
import { Server } from "socket.io";
import routes from "./routes.js";

const app = express();
const server = http.Server(app);
const io = new Server(server, {
  cors: "*",
});

const connectedUsers = {};

io.on("connection", (socket) => {
  const { user } = socket.handshake.query;
  connectedUsers[user] = socket.id;
});

/**
 * Database setup
 */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Conected to Database");

    app.use((req, res, next) => {
      req.io = io;
      req.connectedUsers = connectedUsers;

      return next();
    });
    app.use(cors());
    app.use(
      "/avatar",
      express.static(resolve(process.cwd(), "tmp", "uploads", "avatars"))
    );
    app.use(express.json());
    app.use(routes);

    server.listen(5000, () => console.log("App running on port 5000"));
  })
  .catch((err) => {
    console.log(`Error connecting to DB: ${new Error(err).message}`);
  });
