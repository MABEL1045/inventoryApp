const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const PORT = 5000;

const Db = mongoose.connect("mongodb+srv://mabelDB:mabel6723@cluster0.k29nd.mongodb.net/inventory2?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to db"),
      app.listen(PORT, () => console.log(`server listening on ${PORT}....`));
  }
);

// Import routes
const productRoute = require("./src/routes/productRoute");
const userRoute = require("./src/routes/userRoute");

// // Parse json
app.use(express.json());

// // Set routes
app.use("/api/products", productRoute);
app.use("/api/user", userRoute);

console.log("Waiting for database...");
