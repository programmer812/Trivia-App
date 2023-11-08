import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

import Colors from "../constants/colors";

const FormInput = ({ label, textInputProps, isPassword, isPasswordVisible, setIsPasswordVisible }) => {
    return (
        <View style={styles.rootContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.input} {...textInputProps} />
            {isPassword && (
                <Pressable style={styles.eyeIcon} onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                    <Ionicons name={isPasswordVisible ? "eye" : "eye-off"} size={28} color={Colors.button} />
                </Pressable>
            )}
        </View>
    )
}

export default FormInput;

const styles = StyleSheet.create({
    rootContainer: {
        marginHorizontal: 16,
    },
    label: {
        color: Colors.text,
        fontSize: 23,
        fontFamily: 'Poppins-Medium',
        paddingBottom: 5,
    },
    input: {
        borderColor: Colors.boxBorder,
        borderWidth: 2,
        width: '100%',
        height: 30,
        color: Colors.text,
        fontSize: 20,
    },
    eyeIcon: {
        position: 'absolute',
        right: '5%',
        bottom: 0,
    }
})