const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.disable("x-powered-by");

app.use(express.json());

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
