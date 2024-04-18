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

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    assignedto: { type: String },
    quizType: { type: String, enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"], default: "Graded Quiz" },
    points: { type: Number, default: 0 },
    assignmentGroup: { type: String, enum: ["Quizzes", "Exams", "Assignments", "Project"], default: "Quizzes" },
    shuffleAnswers: { type: String, enum: ["Yes", "No"], default: "Yes" },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: String, enum: ["No", "Yes"], default: "No" },
    showCorrectAnswers: { type: String, enum: ["No", "Yes"], default: "No" },
    accessCode: { type: String, default: "" },
    oneQuestionAtATime: { type: String, enum: ["Yes", "No"], default: "Yes" },
    webcamRequired: { type: String, enum: ["No", "Yes"], default: "No" },
    lockQuestionsAfterAnswering: { type: String, enum: ["No", "Yes"], default: "No" },
    dueDate: { type: Date },
    availableDate: { type: Date },
    untilDate: { type: Date },
    questions: [questionSchema],
    course: { type: String, required: true },
    published: {type:Boolean}
},
    { collection: "quizzes" });

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
