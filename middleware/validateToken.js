const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validationToken = asyncHandler(async (req, res, next) => {
    let token;

    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("Invalid or expired token");
      }

      req.user = decoded;
      next();
    });
}

 if (!token) {
    res.status(401);
    throw new Error("Access denied: No token provided");
  }
});

module.exports = validationToken;