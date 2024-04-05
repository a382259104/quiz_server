import "dotenv/config.js";
import express from "express";
import session from "express-session";
import Lab5 from "./Lab5.js";
import cors from "cors";
import Hello from "./Hello.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import mongoose from "mongoose";
import UserRoutes from "./Users/routes.js";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING);

console.log(`So we are connecting to:${CONNECTION_STRING}`)
console.log(`Just making sure the environment is right(FRONTEND_URL):${process.env.FRONTEND_URL}`)


const app = express()
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
}));

const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}

app.use(session(sessionOptions));
app.use(express.json())

CourseRoutes(app)
ModuleRoutes(app)
UserRoutes(app)
Hello(app)

Lab5(app)


app.listen(process.env.PORT || 4000);