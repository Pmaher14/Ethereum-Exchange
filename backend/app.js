const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");

const web3 = require('web3');
const Tx = require('ethereumjs-tx');

const app = express();

web3js = new web3(new web3.providers.HttpProvider("https://rinkeby.infura.io/v3/5d7be0f26d3b4f66a94ce7584df498fc"));
var balance = web3js.eth.getBalance("0xD6aE8250b8348C94847280928c79fb3b63cA453e");
balance = balance / 1e18;
// balance = web3js.fromWei(balance, 'ether');
console.log(balance);

mongoose
  .connect(
    "mongodb+srv://patrick:" +
      process.env.MONGO_ATLAS_PW +
      "@cluster0-vqoxf.mongodb.net/test"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/user", userRoutes);

module.exports = app;
