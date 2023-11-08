import { createContext, useState } from "react";

export const QuizScoresContext = createContext({
    quizScores: [],
    addQuizScore: (category, difficulty, grade) => {}
});

const QuizScoresContextProvider = ({ children }) => {

    const [quizScores, setQuizScores] = useState([]);

    const addQuizScore = (category, difficulty, grade) => {
        setQuizScores(currQuizScores => [...currQuizScores, {
            category: category,
            difficulty: difficulty,
            grade: grade
        }]);
    }

    const value = {
        quizScores: quizScores,
        addQuizScore: addQuizScore
    };

    return (
        <QuizScoresContext.Provider value={value}>{children}</QuizScoresContext.Provider>
    )
}

export default QuizScoresContextProvider;
