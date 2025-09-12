const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bookRoutes = require("./routes/bookRoutes");
const connectDB = require("./db");

dotenv.config();


app.use(express.json());
connectDB().then(()=>{

app.use("/api/books",bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
})
.catch((error)=>{
  console.error("Failed to connect to MongoDB:", error);
  process.exit(1);
}) 