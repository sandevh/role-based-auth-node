import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/dbConnection.js"
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

dbConnection();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});