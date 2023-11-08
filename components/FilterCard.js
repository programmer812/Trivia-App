import { View, Text, Pressable, StyleSheet } from "react-native";

const FilterCard = ({ children, backgroundColor, onPress, dimensions }) => {
    return (
        <View style={
            [{ 
                backgroundColor: backgroundColor, 
                height: dimensions, 
                width: dimensions,
                borderRadius: dimensions / 2 
            }, styles.outerContainer]}
        >
            <Pressable 
                onPress={onPress} 
                android_ripple={{ color: '#cccccc' }} 
                style={({ pressed }) => pressed && styles.pressed}
            >
                <View style={
                    [{ 
                        height: dimensions, 
                        width: dimensions, 
                        borderRadius: dimensions / 2 
                    }, styles.innerContainer]}
                >
                    <Text style={styles.text}>{children}</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default FilterCard;

const styles = StyleSheet.create({
    outerContainer: {
        justifyContent: 'center',
        elevation: 5,
        overflow: 'hidden',
    },
    innerContainer: {
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