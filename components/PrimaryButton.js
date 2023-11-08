import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../constants/colors";

const PrimaryButton = ({ children, onPress, style, color }) => {
    return (
        <View style={[styles.outerContainer, style]}>
            <Pressable 
                onPress={onPress}
                android_ripple={{ color: '#cccccc' }} 
                style={({ pressed }) => pressed && styles.pressed}
            >
                <View style={[styles.innerContainer, style]}>
                    <Text style={[styles.text, { color: color }]}>{children}</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default PrimaryButton;

const styles = StyleSheet.create({
    outerContainer: {
        height: 50,
        width: 200,
        borderRadius: 30,
        backgroundColor: Colors.button,
        justifyContent: 'center',
        elevation: 5,
        overflow: 'hidden',
    },
    innerContainer: {
        height: 50,
        width: 200,
        borderRadius: 30,
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    pressed: {
        opacity: 0.5,
    },
})
