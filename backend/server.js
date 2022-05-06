const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const app = express();
const route = require("./routes");
const compression = require("compression");
require("dotenv").config();
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https")
      res.redirect(301, `https://${req.header("host")}${req.url}`);
    else next();
  });
  app.use(
    compression({
      threshold: 0,
    })
  );
}
process.env.NODE_ENV === "development" && app.use(morgan("combined"));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// DB connect
const db = require("./db");
db.connect();

//route
route(app);

//build react app
app.use(express.static(path.join(__dirname, "public")));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

//deploy
app.listen(process.env.PORT, () => {
  console.log(`App listening at ${process.env.SERVER_PATH}`);
});
