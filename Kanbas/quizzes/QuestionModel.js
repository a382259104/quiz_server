import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    type: { type: String, required: true, enum: ["MultipleChoice", "TrueFalse", "FillInTheBlanks"] },
    title: { type: String, required: true },
    points: { type: Number, required: true, default: 0 },
    question: { type: String, required: true },
    choices: [{ type: String }],
    correctChoiceIndex: { type: Number },
    correctAnswer: { type: Boolean },
    blanks: [{
        text: { type: String },
        correctAnswer: { type: String }
    }]
}, { collection: "questions" });

const Question = mongoose.model("Question", questionSchema);

export default Question;
