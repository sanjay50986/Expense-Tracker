require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { connectDB } = require("./src/config/db");
const authRoutes = require("./src/routes/auth.router")


const app = express();


// Middleware to handle cors

app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());
connectDB();

app.use("/api/v1/auth", authRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Sever running on port ${port}`));