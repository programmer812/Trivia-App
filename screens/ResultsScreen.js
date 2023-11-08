import { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import he from "he";

import PrimaryButton from "../components/PrimaryButton";
import Colors from "../constants/colors";
import { QuizScoresContext } from "../store/context/quiz-score-context";
import { insertQuizScore } from "../components/util/database";

const ResultsScreen = ({ navigation, route }) => {

    const quizScoresCtx = useContext(QuizScoresContext);

    const [questionNum, setQuestionNum] = useState(1);
    const [numOfCorrectAns, setNumOfCorrectAns] = useState(0);

    const userAnswers = route.params.userAnswers; // array of user answers
    const questions = route.params.fetchedQuestions; // array of questions
    const allPossibleAnswers = route.params.answersForEveryQuestion;
    const category = route.params.category;
    const difficulty = route.params.difficulty;

    useEffect(() => {
        const userAnswer = userAnswers[questionNum - 1];
        const correctAnswer = questions[questionNum - 1].correct_answer;
        if (userAnswer === correctAnswer) {
            setNumOfCorrectAns(numOfCorrectAns + 1);
        }
    }, [questionNum]);

    while (questionNum <= questions.length) {
        
        const questionObj = questions[questionNum - 1];
        const possibleAnswers = allPossibleAnswers[questionNum - 1];
        const userAnswer = userAnswers[questionNum - 1];
        const correctAnswer = questionObj.correct_answer;

        const handleNext = async () => {
            if (questionNum === questions.length) {
                const grade = (numOfCorrectAns / userAnswers.length) * 100;
                quizScoresCtx.addQuizScore(category, difficulty, grade);
                const quizScore = {
                    category: category,
                    difficulty: difficulty,
                    grade: grade,
                    date: new Date().toISOString().slice(0, 19).replace('T', ' ')
                }
                insertQuizScore(quizScore)
                    .then((result) => {
                        console.log(result);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                navigation.navigate("Home");
                return;
            }
            setQuestionNum(questionNum + 1);
        }

        return (
            <View style={styles.rootContainer}>
                <View>
                    <Text style={styles.question}>{he.decode(decodeURIComponent(questionObj.question))}</Text>
                </View>
                <View>
                    {possibleAnswers.map((answer, index) => (
                        <View key={index} style={
                            userAnswer === answer && userAnswer !== correctAnswer 
                                ? [styles.answerContainer, styles.wrongAnswer]
                                : correctAnswer === answer
                                    ? [styles.answerContainer, styles.rightAnswer]
                                    : styles.answerContainer
                            }
                        >
                            <Text style={styles.answer}>{he.decode(decodeURIComponent(answer))}</Text>
                        </View>
                    ))}
                </View>
                <View>
                    <PrimaryButton 
                        style={styles.button} 
                        onPress={handleNext}
                    >
                        {questionNum === questions.length ? "Go Back To Home" : "Next"}
                    </PrimaryButton>
                </View>
                {questionNum === questions.length && (
                    <View style={styles.marksContainer}>
                        <Text style={styles.marks}>{numOfCorrectAns} / {userAnswers.length}</Text>
                    </View>
                )}
            </View>
        )
    }
}

export default ResultsScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
    },
    question: {
        color: Colors.text,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    answerContainer: {
        borderWidth: 2,
        borderColor: Colors.boxBorder,
        borderRadius: 8,
        margin: 16,
    },
    answer: {
        color: Colors.text,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    rightAnswer: {
        backgroundColor: '#30cd30',
    },
    wrongAnswer: {
        backgroundColor: '#d01010',
    },
    button: {
        width: 200,
        alignSelf: 'center',
    },
    marksContainer: {
        borderColor: Colors.boxBorder,
        borderWidth: 2,
        width: '40%',
        height: '12%',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    marks: {
        color: Colors.text,
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 5,
    },
})