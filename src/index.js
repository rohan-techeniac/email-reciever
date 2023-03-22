const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config/config");
const dotenv = require("dotenv");
const startImap = require("./services/imap.service");

//Setup Server
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();
const PORT = config.PORT || 3000;

app.listen(PORT, () => {
  startImap();
  console.log(`App listening on port ${PORT}`);
});

module.exports = app;
