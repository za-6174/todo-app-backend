const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/AuthRoutes");
const cookieParser = require("cookie-parser");
const app = express();

app.listen(4000, () => {
    console.log("Server started on port 4000");
});

mongoose.connect("mongodb://0.0.0.0:27017/todo", {
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