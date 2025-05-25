import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({message: "No token, authorization denied"});
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      return next();
    } catch (error) {
      return res.status(401).json({message: "Token is not valid"});
    }
  } else {
    return res
      .status(401)
      .json({message: "Authorization header missing or not in correct format"});
  }
};

export default verifyToken;
