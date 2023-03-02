const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
const cors = require("cors");
const path = require("path");
const initDatabase = require("./startUp/initDatabase");
const routes = require("./routes");
const ImportData = require("./Dataimport");
require("dotenv").config({ path: path.resolve(__dirname, "./.env.example") });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api", routes);
app.use("/api/import", ImportData);

mongoose.set("strictQuery", true);
const PORT = process.env.PORT ?? 8080;
async function start() {
  try {
    mongoose.connection.once("open", () => {
      initDatabase();
    });

    await mongoose.connect(process.env.MONGO_URI);

    app.listen(PORT, () => {
      console.log(chalk.green(`Server has been started on port ${PORT}...`));
    });
  } catch (e) {
    console.log(chalk.red(e.message));
    process.exit(1);
  }
}
start();
