const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
dotenv.config();

const api = require("./routes/index.js");
const { sequelize } = require("./models/index.js");

const app = express();

app.set(
  "port",
  process.env.NODE_ENV === "production"
    ? process.env.PORT
    : process.env.DEV_PORT
);

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") morgan("combined")(req, res, next);
  else morgan("dev")(req, res, next);
});
app.use("/", express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session",
  })
);

sequelize
  .sync({ force: false })
  .then(() => {})
  .catch((err) => {
    console.error(err);
  });

let fileLength = 0;
let fileExt = ".png";
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "Images/");
  },
  filename(req, file, callback) {
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    const ext = ".jpg";
    fs.readdir("Images", (err, files) => {
      fileLength = files.length + 1;
      fileExt = ext;
      callback(null, `${files.length + 1}${ext}`);
    });
  },
});

const uploadWithOriginalFilename = multer({ storage: storage });
app.post(
  "/uploadFileWithOriginalFilename",
  uploadWithOriginalFilename.single("attachment"),
  function (req, res) {
    res.send({ file: req.file, files: null, length: fileLength, ext: fileExt });
  }
);

app.use("/api", api);

app.listen(app.get("port"), () => {
  const dir = "./Images";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
});
