const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

let corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

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
require('./app/routes/colorMatrix.routes')(app);
require('./app/routes/product.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8084;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
