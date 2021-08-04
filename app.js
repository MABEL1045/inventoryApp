const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const PORT = 5000;

const Db = mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to db")
  })
    
    // Import routes
    const productRoute = require("./src/routes/productRoute");
    const userRoute = require("./src/routes/userRoute");
    
    // // Parse json
    app.use(express.json());
    
    // // Set routes
    app.use("/api/products", productRoute);
    app.use("/api/user", userRoute);
    
    app.listen(PORT, () => console.log(`server listening on ${PORT}....`));

