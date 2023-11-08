import { useContext } from "react";
import { Text } from "react-native"
import { QuizScoresContext } from "../store/context/quiz-score-context";

const UserAnalyticsScreen = () => {

    const quizScoresCtx = useContext(QuizScoresContext);

    console.log(quizScoresCtx);

    return (
        <Text>Hello.</Text>
    )
}

export default UserAnalyticsScreen;
