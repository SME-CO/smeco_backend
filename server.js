const express = require("express");
const cors = require("cors");
const { sequelize } = require("./sequelize/models");

const app = express();

var corsOptions = {
  origin: "http://localhost:8000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */



//simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to SMECO API" });
});

require("./app/routes/customer.routes.js")(app);
require("./app/routes/merchant.routes.js")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}.`);
  await sequelize.sync();
  console.log('Database Connected!')
});
