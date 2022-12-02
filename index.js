const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const User = require("./models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();
app.use(cors());

database_uri = process.env.DATABASE_URI;
app.use(express.json());
// ==================connect to mongoose==================

async function connect() {
    try {
        await mongoose.connect(database_uri);
        console.log("Connected");
    } catch (error) {
        console.log(error);
    }
}

connect();

app.use("/api/users",require("./routes/userRoutes"))
app.use("/api/skills",require("./routes/skillRoutes"))
app.use("/api/experience",require("./routes/experienceRoutes"))
app.use("/api/contacts",require("./routes/contactRoutes"))
app.use("/api/projects",require("./routes/projectRoutes"))
app.listen(8000);
