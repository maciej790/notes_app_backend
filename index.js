const express = require("express");
const bcrypt = require("bcrypt");
const db = require('./database/db');
const auth = require('./routes/auth');
const notes = require('./routes/notes');
const bodyParser = require("body-parser");
const session = require('express-session');
const checkIfUserAuth = require('./middlewares/auth/checkIfUserAuth');

const cors = require("cors");

const app = express();

app.use(cors({
  origin: "*", // Dostosuj do portu frontendu
  credentials: true
}));

app.use(bodyParser.json());

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use('/auth', auth);
app.use('/notes', checkIfUserAuth, notes);

app.listen(3000, () => {
  console.log(`Serwer działa na porcie ${3000}`);
});