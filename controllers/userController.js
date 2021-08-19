const router = require("express").Router();
const { UserModel } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  let { email, password } = req.body; //destructuring what the user sent you with the params of email and password.
  try {
    const user = await UserModel.create({
      email,
      password: bcrypt.hashSync(password, 13),
    });
    let token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.TURTLES,
      {
        expiresIn: 60 * 60 * 24,
      }
    );
    res.status(201).json({
      message: "user successfully registered.",
      user: user,
      sessionToken: token,
    });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({
        message: "email already in use",
      });
    } else {
      res.status(500).json({
        message: "Failed to register user.",
      });
    }
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    let userLogin = await UserModel.findOne({
      where: {
        email: email,
      },
    });
    if (userLogin) {
      let passwordCompare = await bcrypt.compare(password, userLogin.password);
      if (passwordCompare) {
        let token = jwt.sign({ id: userLogin.id }, process.env.TURTLES, {
          expiresIn: 60 * 60 * 24,
        });
        res.status(200).json({
          user: userLogin,
          message: `you are logged in.`,
          sessionToken: token,
        });
      } else {
        res.status(401).json({
          message: "Incorrect email or password.",
        });
      }
    } else {
      res.status(401).json({
        message: "Incorrect email or password.",
      });
    }
  } catch (err) {
    res.status(501).json({
      message: "Failed to complete request.",
    });
  }
});

module.exports = router;
