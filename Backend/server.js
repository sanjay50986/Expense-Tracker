require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { connectDB } = require("./src/config/db");
const authRoutes = require("./src/routes/auth.router.js");
const incomeRoutes = require("./src/routes/income.router.js");
const expenseRoutes = require("./src/routes/expense.router.js");
const dashboardRoutes = require("./src/routes/dashboard.router.js");


const port = process.env.PORT || 8000;
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
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);


// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
}).on("error", (err) => {
    console.error("❌ Server failed to start:", err.message);
});

