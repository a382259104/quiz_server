import express from "express";
import Lab5 from "./Lab5.js";
import cors from "cors";
import Hello from "./Hello.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";

const app = express()
app.use(cors())
app.use(express.json())

Hello(app)
CourseRoutes(app)
ModuleRoutes(app)
Lab5(app)


app.listen(process.env.PORT || 4000);