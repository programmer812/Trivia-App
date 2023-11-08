import { useContext, useState } from "react";
import { View, StyleSheet, Pressable, Keyboard, KeyboardAvoidingView, Alert } from "react-native";

import FormInput from "../components/FormInput";
import PrimaryButton from "../components/PrimaryButton";
import { login } from "../components/util/request";

import Colors from "../constants/colors";
import { AuthContext } from "../store/context/auth-context";

const LoginScreen = ({ navigation }) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const authCtx = useContext(AuthContext);

    const handleLogin = async () => {
        try {
            const response = await login({
                username: username,
                password: password
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

    return (
        <KeyboardAvoidingView style={styles.outerContainer}>
            <Pressable style={styles.innerContainer} onPress={Keyboard.dismiss}>
                <View style={styles.input}>
                    <FormInput 
                        label="Username" 
                        textInputProps={{
                            onChangeText: (text) => setUsername(text),
                            value: username
                        }} 
                    />
                </View>
                <View style={styles.input}>
                    <FormInput 
                        label="Password" 
                        textInputProps={{
                            onChangeText: (text) => setPassword(text),
                            value: password,
                            textContentType: "password",
                            secureTextEntry: !isPasswordVisible,
                        }}
                        isPassword={true}
                        isPasswordVisible={isPasswordVisible}
                        setIsPasswordVisible={setIsPasswordVisible}
                    />
                </View>
                <View style={styles.buttons}>
                    <PrimaryButton onPress={handleLogin}>Login</PrimaryButton>
                    <PrimaryButton 
                        style={styles.createUser} 
                        color={Colors.text} 
                        onPress={() => navigation.navigate("SignUp")}
                    >
                        Create a new user
                    </PrimaryButton>
                </View>
            </Pressable>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen;

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