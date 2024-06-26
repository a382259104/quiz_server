import Quiz from "./QuizModel.js"

const findAllQuestions = async (req, res) => {
    console.log(`Server attempting to get all questions for a quiz for ${req.params.quizId}`);
    const quizId = req.params.quizId;

    try {
        const quiz = await Quiz.findOne({ _id: quizId });
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        res.json(quiz.questions);
    } catch (error) {
        console.error("Error finding questions:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const createQuestion = async (req, res) => {
    console.log("Server attempting to create question");
    const quizId = req.params.quizId;
    const questionData = req.body;
    console.log(`this is the question id: ${questionData._id}`)
    try {
        const quiz = await Quiz.findOne({ _id: quizId });
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        quiz.questions.push(questionData);
        await quiz.save();
        res.status(201).json(questionData);
    } catch (error) {
        console.error("Error creating question:", error);
        res.status(400).json({ message: "Invalid request" });
    }
};

const updateQuestion = async (req, res) => {
    console.log("Server attempting to update a question for a quiz");
    const { quizId, questionId } = req.params;
    const questionData = req.body;
    try {
        const quiz = await Quiz.findOne({ _id: quizId });
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        console.log(`This is the question id ${questionId}`)
        // const question = quiz.questions.id(questionId);
        const question = quiz.questions.find(q => q._id.toString() === questionId);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        Object.assign(question, questionData);
        await quiz.save();
        res.json(question);
    } catch (error) {
        console.error("Error updating question:", error);
        res.status(400).json({ message: "Invalid request" });
    }
};

const deleteQuestion = async (req, res) => {
    console.log("Server attempting to delete a question for a quiz");
    const { quizId, questionId } = req.params;
    console.log(`The two parameters:${quizId}, ${questionId}`)
    try {
      const quiz = await Quiz.findByIdAndUpdate(
        quizId,
        { $pull: { questions: { _id: questionId } } },
        { new: true }
      );
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }
      res.json({ message: "Question deleted successfully" });
    } catch (error) {
      console.error("Error deleting question:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


function QuestionRoutes(app) {
    app.get("/api/quizzes/:quizId/questions", findAllQuestions);
    app.post("/api/quizzes/:quizId/questions", createQuestion);
    app.put("/api/quizzes/:quizId/questions/:questionId", updateQuestion);
    app.delete("/api/quizzes/:quizId/questions/:questionId", deleteQuestion);
}

export default QuestionRoutes;