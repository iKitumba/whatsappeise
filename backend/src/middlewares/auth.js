import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Not token provided" });
  }

  const parts = authHeader.split(" ");

  if (!parts.length === 2) {
    return res.json(401).json({ message: "Token error" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: "Token malformatted" });
  }

  jwt.verify(token, process.env.SECRET_TOKEN_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token invalid" });
    }

    req.user_id = decoded.id;

    next();
  });
};
