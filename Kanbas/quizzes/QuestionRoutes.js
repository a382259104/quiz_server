import Question from "./QuestionModel.js";

const findAllQuestions = async (req, res) => {
    console.log("Server attempting to get all questions");
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (error) {
        console.error("Error finding questions:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const findQuestionById = async (req, res) => {
    console.log("Server attempting to get question by ID");
    const questionId = req.params.questionId;
    try {
        const question = await Question.findById(questionId);
        if (question) {
            res.json(question);
        } else {
            res.status(404).json({ message: "Question not found" });
        }
    } catch (error) {
        console.error("Error finding question:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const createQuestion = async (req, res) => {
    console.log("Server attempting to create question");
    const questionData = req.body;
    try {
        const newQuestion = await Question.create(questionData);
        res.status(201).json(newQuestion);
    } catch (error) {
        console.error("Error creating question:", error);
        res.status(400).json({ message: "Invalid request" });
    }
};

const updateQuestion = async (req, res) => {
    console.log("Server attempting to update question");
    const questionId = req.params.questionId;
    const questionData = req.body;
    try {
        const updatedQuestion = await Question.findByIdAndUpdate(questionId, questionData, { new: true });
        if (updatedQuestion) {
            res.json(updatedQuestion);
        } else {
            res.status(404).json({ message: "Question not found" });
        }
    } catch (error) {
        console.error("Error updating question:", error);
        res.status(400).json({ message: "Invalid request" });
    }
};

const deleteQuestion = async (req, res) => {
    console.log("Server attempting to delete question");
    const questionId = req.params.questionId;
    try {
        const deletedQuestion = await Question.findByIdAndDelete(questionId);
        if (deletedQuestion) {
            res.json({ message: "Question deleted successfully" });
        } else {
            res.status(404).json({ message: "Question not found" });
        }
    } catch (error) {
        console.error("Error deleting question:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

function QuestionRoutes(app) {
    app.get("/api/questions", findAllQuestions);
    app.get("/api/questions/:questionId", findQuestionById);
    app.post("/api/questions", createQuestion);
    app.put("/api/questions/:questionId", updateQuestion);
    app.delete("/api/questions/:questionId", deleteQuestion);
}

export default QuestionRoutes;
