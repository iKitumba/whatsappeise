import jwt from "jsonwebtoken";

export default function generateToken(params = {}) {
  return jwt.sign(params, process.env.SECRET_TOKEN_KEY, {
    expiresIn: 86400,
  });
}
