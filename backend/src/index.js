const express = require("express");
const authRoutes = require("./routes/auth.route.js");
const messageRoutes = require("./routes/message.route.js");
const dotenv = require("dotenv").config();
const connect_TO_DB = require("./lib/connectDB.js");
const createChatAppSchema = require("./models/createChatAppSchema.js");
const createUserTable = require("./models/user.model.js");
const cookieParser = require("cookie-parser");
const createMessageShcema = require("./models/message.model.js");
const cors = require("cors");

const app = express();

const PORT = process.env.DB_PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    
}))

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Sign Up on: http://localhost:${PORT}/api/auth/signup`);
    console.log(`Login on: http://localhost:${PORT}/api/auth/login`);
    console.log(`Logout on: http://localhost:${PORT}/api/auth/logout`);
    createChatAppSchema();
    createUserTable();
    createMessageShcema();
});