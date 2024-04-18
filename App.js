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
import QuizRoutes from "./Kanbas/quizzes/QuizRoutes.js";
import QuestionRoutes from "./Kanbas/quizzes/QuestionRoutes.js";



const CONNECTION_STRING = `${process.env.DB_CONNECTION_STRING}/kanbas` || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING);

console.log(`Mongo Connection String:${CONNECTION_STRING}`)
console.log(`Frontend URL:${process.env.FRONTEND_URL}`)

// Event listener for successful connection
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
  });
  
  // Event listener for connection error
  mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
  });
  
  // Event listener for disconnected
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
  });


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

QuizRoutes(app)
QuestionRoutes(app)

Lab5(app)


app.listen(process.env.PORT || 4000);