const app = require("./app");
require("dotenv").config();
const mongoose = require("mongoose");

const PORT = process.env.PORT || 2100;
app.listen(PORT, () => console.log(`---- server running on port ${PORT}`));
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB ..."))
  .catch((err) => console.log(err.message));
