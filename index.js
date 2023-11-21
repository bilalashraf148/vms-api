require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
  const corsOptions = {
    origin: "*",
  };

  app.use(cors());

  // parse requests of content-type - application/json
  app.use(bodyParser.json());

  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  // database
  const db = require("./app/models");

  db.sequelize.sync();

  app.get("/", (req, res) => {
    res.json({ message: "Express API is Ready" });
  });

  // routes
  require('./app/routes/auth.routes')(app);
  require("./app/routes/vehicle.routes")(app);

  // set port, listen for requests
  const PORT = 8084;
  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
