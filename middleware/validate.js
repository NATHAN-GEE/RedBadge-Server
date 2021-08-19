const jwt = require("jsonwebtoken");
const { UserModel } = require("../models");


const validateJWT = async (req, res, next) => {
  if (req.method == "OPTIONS") {
    next();
  } else if (req.headers.authorization) {
    const { authorization } = req.headers;
    const payload = authorization
      ? jwt.verify(authorization, process.env.TURTLES)
      : undefined;
    if (payload) {
      let foundUser = await UserModel.findOne({ where: { id: payload.id } });

      if (foundUser) {
        req.user = foundUser;
        next();
      } else {
        res.status(400).send({ message: "Not Authorized" });
      }
    } else {
      res.status(401).send({ message: "Invalid Token" });
    }
  } else {
    res.status(403).send({ message: "Fobidden not for you" });
  }
};
module.exports = validateJWT ;
