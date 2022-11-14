// 여기는 메인 서버 스크립트입니다.

const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");
dotenv.config();

const api = require("./routes/index.js");
const { sequelize } = require("./models/index.js");
const db = require("./models/index.js");

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
// "public"폴더에 프론트를 구현할 겁니다.
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
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/api", api);

app.listen(app.get("port"), () => {
  const dir = "./Images";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  console.log(app.get("port") + "서버 열렸다");
});
