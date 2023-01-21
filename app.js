// import express.js
const express = require("express");

// create express app
const app = express();

// server static files
app.use('/static', express.static("public"));

// define challenge route
app.get("/challenge/:word", (req, res) => {
  const word = req.params.word;
  if(word === "flag"){
    res.send("flag{mMm_yUmmm3rS_b4ge1s}");
  } else {
    res.send("Not the flag");
  }
});
