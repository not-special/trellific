const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/api');
const HttpError = require("./models/httpError");
const cors = require("cors")
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

mongoose.set("useFindAndModify", false);

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true, })
  .then(() => console.log(`Database connected successfully`))
  .catch(err => console.log(err));

mongoose.Promise = global.Promise;

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

app.use('/api', routes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }
  res.status(err.code || 500);
  res.json({ error: err.message || "An unknown error occured" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
