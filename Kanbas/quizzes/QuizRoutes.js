import Quiz from "./QuizModel.js";


export default function QuizRoutes(app) {

    const findAllQuizzes = async (req, res) => {
        console.log("Server attempting to get all quizzes");
        const quizzes = await Quiz.find();
        res.json(quizzes);
    };

    const findQuizById = async (req, res) => {
        console.log("Server attempting to get quiz by ID");
        const quizId = req.params.quizId;
        try {
            const quiz = await Quiz.findById(quizId);
            if (quiz) {
                res.json(quiz);
            } else {
                res.status(404).json({ message: "Quiz not found" });
            }
        } catch (error) {
            console.error("Error finding quiz:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };

    const createQuiz = async (req, res) => {
        console.log("Server attempting to create quiz"); 
        const quizData = req.body;
        delete quizData._id;
        try {
            const newQuiz = await Quiz.create(quizData);
            res.status(201).json(newQuiz);
        } catch (error) {
            console.error("Error creating quiz:", error);
            res.status(400).json({ message: "Invalid request" });
        }
    };

    const updateQuiz = async (req, res) => {
        console.log("Server attempting to update quiz");
        const quizId = req.params.quizId;
        const quizData = req.body;
        try {
            const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, quizData, { new: true });
            if (updatedQuiz) {
                res.json(updatedQuiz);
            } else {
                res.status(404).json({ message: "Quiz not found" });
            }
        } catch (error) {
            console.error("Error updating quiz:", error);
            res.status(400).json({ message: "Invalid request" });
        }
    };

    const deleteQuiz = async (req, res) => {
        console.log("Server attempting to delete quiz");
        const quizId = req.params.quizId;
        try {
            const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
            if (deletedQuiz) {
                res.json({ message: "Quiz deleted successfully" });
            } else {
                res.status(404).json({ message: "Quiz not found" });
            }
        } catch (error) {
            console.error("Error deleting quiz:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };

    app.get("/api/quizzes", findAllQuizzes);
    app.get("/api/quizzes/:quizId", findQuizById);
    app.post("/api/quizzes", createQuiz);
    app.put("/api/quizzes/:quizId", updateQuiz);
    app.delete("/api/quizzes/:quizId", deleteQuiz);
}
