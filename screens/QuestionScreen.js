import { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import axios from "axios";
import he from "he";

import PrimaryButton from "../components/PrimaryButton";
import Colors from "../constants/colors";

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

const QuestionScreen = ({ navigation, route }) => {

    const [fetchedQuestions, setFetchedQuestions] = useState({
        response_code: 0,
        results: []
    });
    const [sessionToken, setSessionToken] = useState('');
    const [selectedAnswer, setSelectedAnswer] = useState({
        id: -1,
        answer: ''
    });
    const [numberOfShuffles, setNumberOfShuffles] = useState(1);
    const [questionNum, setQuestionNum] = useState(1);
    const [answersPerQuestion, setAnswersPerQuestion] = useState([]);
    const [answersForEveryQuestion, setAnswersForEveryQuestion] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [isError, setIsError] = useState(false);
    const [iteratedOver, setIteratedOver] = useState(true);
    const isInitialRender = useRef(true);

    const numOfQuestions = route.params.numOfQuestions;
    const category = route.params.category;
    const difficulty = route.params.difficulty;

    let categoryNum;

    switch (category) {
        case 'Math': {
            categoryNum = 19;
            break;
        } case 'Science': {
            const categoryNumArr = [17, 18, 30];
            categoryNum = categoryNumArr[Math.floor(Math.random()*categoryNumArr.length)];
            break;
        } case 'History': {
            const categoryNumArr = [20, 23];
            categoryNum = categoryNumArr[Math.floor(Math.random()*categoryNumArr.length)];
            break;
        } case 'Geography': {
            categoryNum = 22;
            break;
        } case 'English': {
            const categoryNumArr = [10, 13];
            categoryNum = categoryNumArr[Math.floor(Math.random()*categoryNumArr.length)];
            break;
        } default: {
            return;
        }
        
    }

    const SESSION_TOKEN_URL = "https://opentdb.com/api_token.php?command=request"

    useEffect(() => {
        const fetchToken = async () => {
            const response = await axios.get(SESSION_TOKEN_URL);
            const sessionTokenObj = response.data;
            setSessionToken(sessionTokenObj.token);
        }

        fetchToken();
    }, []);

    const OPENDB_URL = "https://opentdb.com/api.php"

    const API_URL = `${OPENDB_URL}?token=${sessionToken}&amount=${numOfQuestions}&category=${categoryNum}&difficulty=${difficulty}`;

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await axios.get(API_URL);
            setFetchedQuestions({
                response_code: response.data.response_code,
                results: response.data.results,
            });
            if (fetchedQuestions.response_code === 1) {
                Alert.alert("Error!", "No Questions Available. Please try again.", [
                    {
                        text: 'Back',
                        onPress: () => navigation.goBack()
                    }
                ]);
            }
        }

        fetchQuestions();
    }, []);

    const questions = fetchedQuestions.results;

    useEffect(() => {
        setIteratedOver(true);
    }, [isError]);

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }
        if (userAnswers.length < questionNum) {
            setIsError(true);
            return;
        }
        if (questionNum === questions.length) {
            navigation.navigate("Results-Screen", {
                userAnswers: userAnswers,
                fetchedQuestions: fetchedQuestions.results,
                answersForEveryQuestion: answersForEveryQuestion,
                category: category,
                difficulty: difficulty
            });
        }
        setIsError(false);
        setNumberOfShuffles(1);
        setQuestionNum(questionNum + 1);
    }, [userAnswers, iteratedOver]);

    while (questionNum <= questions.length) {
        navigation.setOptions({
            title: `Question ${questionNum}`
        });

        const questionObj = questions[questionNum - 1];

        if (numberOfShuffles === 1) {
            const answers = shuffle([questionObj.correct_answer, ...questionObj.incorrect_answers]);
            setAnswersPerQuestion(answers);
            setAnswersForEveryQuestion(currAnswersForEveryQuestion => [ ...currAnswersForEveryQuestion, answers ]);
            setNumberOfShuffles(numberOfShuffles + 1);
        }

        const applyPressed = (answer, id) => {
            setSelectedAnswer({
                id: id,
                answer: answer
            });
        }

        const handleNextQuestion = () => {
            let counter = 0;
            answersPerQuestion.map((answer, index) => {
                if (selectedAnswer.id === index) {
                    setUserAnswers(currUserAnswers => [ ...currUserAnswers, selectedAnswer.answer ]);
                    setSelectedAnswer({
                        id: -1,
                        answer: ''
                    });
                    counter++;
                }
            })
            if (counter === 0) {
                setIteratedOver(false);
            }
        }

        return (
            <View style={styles.rootContainer}>
                <View>
                    <Text style={styles.question}>{he.decode(decodeURIComponent(questionObj.question))}</Text>
                </View>
                <View>
                    {answersPerQuestion.map((answer, index) => (
                        <View key={index} style={styles.answerContainer}>
                            <Pressable 
                                onPress={applyPressed.bind(this, answer, index)} 
                                style={selectedAnswer.id === index && styles.pressed}
                            >
                                <Text style={styles.answer}>{he.decode(decodeURIComponent(answer))}</Text>
                            </Pressable>
                        </View>
                    ))}
                </View>
                <View>
                    <PrimaryButton 
                        style={styles.button} 
                        onPress={handleNextQuestion}
                    >
                        {questionNum === questions.length ? "Submit" : "Next"}
                    </PrimaryButton>
                </View>
                {isError && <Text style={styles.error}>Please select an answer.</Text>}
            </View>
        )
    }
}

export default QuestionScreen;

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
    pressed: {
        backgroundColor: Colors.pressed,
    },
    answer: {
        color: Colors.text,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        width: 175,
        alignSelf: 'center',
    },
    error: {
        color: 'red',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: -24,
    }
})
