import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Keyboard, Pressable, Alert } from 'react-native';

import PrimaryButton from '../components/PrimaryButton';
import DropdownButton from '../components/DropdownButton';
import Colors from '../constants/colors';

const InformationScreen = ({ navigation, route }) => {

    const [numOfQuestions, setNumOfQuestions] = useState('');
    const [difficulty, setDifficulty] = useState('none');
    const [isError, setIsError] = useState(false);

    const difficulties = ['easy', 'medium', 'hard'];

    navigation.setOptions({
        title: route.params.title
    })

    const pressHandler = () => {
        // if ((numOfQuestions < 10 || numOfQuestions > 30)) {
        //     setIsError(true);
        //     Alert.alert("Error!", "You must answer at least 10 questions and at most 30 questions.", [
        //         {
        //             text: 'Cancel'
        //         }
        //     ]);
        //     return;
        // } 
        if (difficulty === 'none') {
            Alert.alert("Error!", "You must select a difficulty.", [
                {
                    text: 'Cancel'
                }
            ]);
            return;
        }

        navigation.navigate("Question-Screen", {
            numOfQuestions: numOfQuestions,
            category: route.params.title,
            difficulty: difficulty
        });
    }

    return (
        <View style={styles.outerContainer}>
            <Pressable style={styles.innerContainer} onPress={Keyboard.dismiss}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>How many questions would you like to answer today?</Text>
                    <TextInput 
                        keyboardType='number-pad' 
                        maxLength={2} 
                        onChangeText={enteredText => setNumOfQuestions(enteredText)} 
                        // style={isError ? [styles.input, { backgroundColor: Colors.error }] : styles.input}
                        style={styles.input}
                        value={numOfQuestions}
                    />
                </View>
                <View style={styles.dropdownContainer}>
                    <View style={styles.difficultyText}>
                        <Text style={styles.text}>Choose your difficulty.</Text>
                    </View>
                    <View>
                        {difficulties.map(diff =>
                            <DropdownButton 
                            onPress={() => setDifficulty(diff)} 
                            style={difficulty === diff && styles.highlightedText}
                            >
                                {diff.charAt(0).toUpperCase() + diff.slice(1)}
                            </DropdownButton>   
                        )}
                    </View>
                </View>
                <View>
                    <PrimaryButton onPress={pressHandler} style={{ width: 200 }}>Submit</PrimaryButton>
                </View>
            </Pressable>
        </View>
    )
}

export default InformationScreen;

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        margin: 16,
    },
    text: {
        color: Colors.text,
        fontSize: 20,
        textAlign: 'left',
        marginRight: 30,
        paddingTop: 15,
    },
    input: {
        borderWidth: 3,
        borderColor: Colors.boxBorder,
        color: Colors.text,
        marginTop: 16,
        fontSize: 20,
        height: 40,
        width: 40,
        textAlign: 'center',
    },
    dropdownContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    difficultyText: {
        paddingLeft: 30,
        marginBottom: 10,
    },
    highlightedText: {
        backgroundColor: 'yellow',
    },
})