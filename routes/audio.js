const { Router } = require("express");
const db = require("../models/index.js");
const fs = require("fs");
const path = require("path");
const router = Router();

// "/api/audio"
router
  .route("/")
  .get((req, res) => {
    const filename = "./audios/If_I_Had_a_Chicken.mp3";
    fs.readFile(filename, (err, data) => {
      res.writeHead(200, {
        "Content-Type": "audio/mp3",
      });
      res.write(data);
      res.end();
    });
  })
  .post((req, res) => {});

module.exports = router;
