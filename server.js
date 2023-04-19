const express = require("express");
const cors = require("cors");

const config =  require('./app/config/config.js');

const app = express();
const path = require("path");


app.options('*', cors()) 

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

require("./app/routes/user.routes")(app);
require("./app/routes/message.routes")(app);
require("./app/routes/channel.routes")(app);
require("./app/routes/role.routes")(app);

require('./app/routes/auth.routes')(app);

app.use(express.static(path.resolve(__dirname, config.FE_OUTPUT_DIR)));

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, config.FE_OUTPUT_DIR + "/index.html"));
});

// set port, listen for requests
app.listen(config.NODE_PORT, () => {
  console.log(`Server is running on port ${config.NODE_PORT} in ${config.NODE_ENV} mode.`);
});
