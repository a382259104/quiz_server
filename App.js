import express from "express";
import Hello from "./Hello";
import Lab5 from "./Lab5";
const app = express()
app.use(express.json())
Lab5(app)
Hello(app)
app.listen(4000)