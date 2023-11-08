import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Platform, Keyboard, Pressable, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import PrimaryButton from '../components/PrimaryButton';
import Colors from '../constants/colors';

const InformationScreen = ({ navigation, route }) => {

    const [numOfQuestions, setNumOfQuestions] = useState('');
    const [difficulty, setDifficulty] = useState('none');
    const [isError, setIsError] = useState(false);

    navigation.setOptions({
        title: route.params.title
    })

    const pressHandler = () => {
        if ((numOfQuestions < 10 || numOfQuestions > 30)) {
            setIsError(true);
            Alert.alert("Error!", "You must answer at least 10 questions and at most 30 questions.", [
                {
                    text: 'Cancel'
                }
            ]);
            return;
        } else if (difficulty === 'none') {
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
                        style={isError ? [styles.input, { backgroundColor: Colors.error }] : styles.input} 
                        value={numOfQuestions}
                    />
                </View>
                <View style={Platform.OS === "android" && styles.dropdownContainer}>
                    <View style={Platform.OS === "ios" && styles.difficultyText}>
                        <Text style={styles.text}>Choose your difficulty.</Text>
                        <Text style={styles.text}>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</Text>
                    </View>
                    <Picker 
                        selectedValue={difficulty} 
                        onValueChange={currDifficulty => setDifficulty(currDifficulty)}
                        style={Platform.OS === "android" && styles.AndroidDropdown}
                        dropdownIconColor={Colors.text}
                    >
                        <Picker.Item 
                            label='None' 
                            value='none' 
                            style={Platform.OS === 'android' && difficulty === 'none' && styles.highlightedText} 
                            color={Platform.OS === 'ios' ? Colors.text : 'black'} 
                        />
                        <Picker.Item 
                            label='Easy' 
                            value='easy' 
                            style={Platform.OS === 'android' && difficulty === 'easy' && styles.highlightedText} 
                            color={Platform.OS === 'ios' ? Colors.text : 'black'} 
                        />
                        <Picker.Item 
                            label='Medium' 
                            value='medium' 
                            style={Platform.OS === 'android' && difficulty === 'medium' && styles.highlightedText} 
                            color={Platform.OS === 'ios' ? Colors.text : 'black'}
                        />
                        <Picker.Item 
                            label='Hard' 
                            value='hard' 
                            style={Platform.OS === 'android' && difficulty === 'hard' && styles.highlightedText} 
                            color={Platform.OS === 'ios' ? Colors.text : 'black'} 
                        />
                    </Picker>
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
    difficultyText: {
        flexDirection: 'row',
        marginBottom: -36,
    },
    AndroidDropdown: {
        height: 40,
        width: 40,
        marginTop: 50,
    },
    dropdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 8,
        marginBottom: 35,
    },
    highlightedText: {
        backgroundColor: 'yellow',
    },
})