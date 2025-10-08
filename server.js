const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./db");
const errorHandler = require("./middleware/errorHandler");

const app = express();

connectDB();

app.use(express.json());
 
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
