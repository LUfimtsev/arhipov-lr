const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();

app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/goods", require("./routes/goods"));
app.use("/api/shops", require("./routes/shops"));
app.use("/api/stocks", require("./routes/stocks"));
app.use("/api/contractors", require("./routes/contractors"));

const PORT = config.get("port") || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => {
      console.log("App has been started on port ", PORT);
    });
  } catch (e) {
    console.log("Server error: ", e.message);
    process.exit(1);
  }
}

start();
