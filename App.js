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

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
mongoose.connect(CONNECTION_STRING);


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

UserRoutes(app)
Hello(app)
CourseRoutes(app)
ModuleRoutes(app)
Lab5(app)


app.listen(process.env.PORT || 4000);