import { useContext, useState } from "react";
import { View, StyleSheet, Pressable, Keyboard, KeyboardAvoidingView, Alert } from "react-native";

import FormInput from "../components/FormInput";
import PrimaryButton from "../components/PrimaryButton";
import { createUser } from "../components/util/request";

import Colors from "../constants/colors";
import { AuthContext } from "../store/context/auth-context";

const SignUpScreen = ({ navigation }) => {
    
    const [isPassword1Visible, setIsPassword1Visible] = useState(false);
    const [isPassword2Visible, setIsPassword2Visible] = useState(false);
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const authCtx = useContext(AuthContext);

    const handleSignUp = async () => {
        if (username.length === 0) {
            Alert.alert("Error!", "You must enter a username.", [
                {
                    text: 'Cancel'
                }
            ]);
        } else if (password1.length < 7) {
            Alert.alert("Error!", "Password must be at least 7 characters long.", [
                {
                    text: 'Cancel'
                }
            ]);
        } else if (password1 !== password2) {
            Alert.alert("Error!", "Passwords do not match.", [
                {
                    text: 'Cancel'
                }
            ]);
        } else {
            try {
                const response = await createUser({
                    username: username,
                    password: password1
                })
                if (response.data.token) {
                    authCtx.authenticate(response.data.token);
                } else {
                    Alert.alert("Error!", "Username or password is incorrect. Please try again.", [
                        {
                            text: 'Cancel'
                        }
                    ]);
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <KeyboardAvoidingView style={styles.outerContainer}>
            <Pressable style={styles.innerContainer} onPress={Keyboard.dismiss}>
                <View style={styles.input}>
                    <FormInput 
                        label="Username" 
                        textInputProps={{
                            onChangeText: (text) => setUsername(text),
                            value: username,
                            maxLength: 10 
                        }} 
                    />
                </View>
                <View style={styles.input}>
                    <FormInput 
                        label="Password" 
                        textInputProps={{
                            onChangeText: (text) => setPassword1(text),
                            value: password1,
                            textContentType: "password",
                            secureTextEntry: !isPassword1Visible,
                        }}
                        isPassword={true}
                        isPasswordVisible={isPassword1Visible}
                        setIsPasswordVisible={setIsPassword1Visible}
                    />
                </View>
                <View style={styles.input}>
                    <FormInput 
                        label="Confirm Password" 
                        textInputProps={{
                            onChangeText: (text) => setPassword2(text),
                            value: password2,
                            textContentType: "password",
                            secureTextEntry: !isPassword2Visible,
                        }}
                        isPassword={true}
                        isPasswordVisible={isPassword2Visible}
                        setIsPasswordVisible={setIsPassword2Visible}
                    />
                </View>
                <View style={styles.buttons}>
                    <PrimaryButton onPress={handleSignUp}>Sign Up</PrimaryButton>
                    <PrimaryButton 
                        style={styles.createUser} 
                        color={Colors.text} 
                        onPress={() => navigation.navigate("Login")}
                    >
                        Back to Login
                    </PrimaryButton>
                </View>
            </Pressable>
        </KeyboardAvoidingView>
    )
}

export default SignUpScreen;

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        paddingBottom: 24,
    },
    buttons: {
        alignItems: 'center',
        paddingTop: 24,
    },
    createUser: {
        backgroundColor: 'transparent',
        opacity: 0.9,
    },
})