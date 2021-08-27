require("dotenv").config();
const Express = require("express");
const app = Express();
const db = require("./db");
const userController = require("./controllers/userController");
const motherController = require("./controllers/motherController");
const babyController = require("./controllers/babyController");

app.use(Express.json()); //Must be above all routes
app.use(require("./middleware/headers"));
app.use("/user", userController);
app.use("/mother", motherController);
app.use("/baby", babyController);

db.authenticate()
  .then(() => db.sync())
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`App server is listening on ${process.env.PORT}`);
    });
  });
