const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.disable("x-powered-by");

app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api/v1", require("./routes"));

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).send({
      success: false,
      message: "Unauthorized",
    });
  }
});

module.exports = app;
