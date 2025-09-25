import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  const token = req.cookies?.token; // optional chaining in case cookies are undefined

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // attach userId to req for controllers
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

export default isAuth;
