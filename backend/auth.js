const jwt = require("jsonwebtoken"); 

let auth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send("Unauthenticated");
    }
    const verify_token = jwt.verify(token, "strickey");
    req.user = verify_token;
    next();
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
};

module.exports = {auth};