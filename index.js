const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/AppRoutes");
const cookieParser = require("cookie-parser");
const app = express();
const cron = require('node-cron');
require('dotenv').config()

const checkForOverDues = require("./Crons/SendEmailReminders");

app.listen(4000, () => {
    console.log("Server started on port 4000");
});

mongoose.connect(`mongodb+srv://zainab:${process.env.MONGODB_PASSWORD}@cluster0.7xqsohr.mongodb.net/todo`, {
}).then(() => {
    console.log("DB Connection successfull");
}).catch(err => console.log("Error:" + err.message));

app.use(cors({  
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes)

// ===== scheduling cron job to run every 15 minutes
cron.schedule('*/15 * * * *', () => {
    checkForOverDues()
});
