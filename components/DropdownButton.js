import { Text, Pressable, StyleSheet } from "react-native";

const DropdownButton = ({ children, onPress, style }) => {
    return (
        <Pressable 
            onPress={onPress}
            style={[styles.container, style]}
        >
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    )
}

export default DropdownButton;

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: 150,
        borderWidth: 3,
        borderColor: 'yellow',
        justifyContent: 'center',
        margin: 8,
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        color: 'red'
    }
})