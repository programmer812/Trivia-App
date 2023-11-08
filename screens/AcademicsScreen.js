import { View, StyleSheet } from 'react-native';

import FilterCard from '../components/FilterCard';

const AcademicsScreen = ({ navigation }) => {

    const goToInformationScreen = (title) => {
        navigation.navigate("Information-Screen", { title: title })
    }

    return (
        <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
                <FilterCard backgroundColor="#00ffff" dimensions={150} onPress={goToInformationScreen.bind(this, "Math")}>Math</FilterCard>
                <FilterCard backgroundColor="#ffe4c4" dimensions={150} onPress={goToInformationScreen.bind(this, "Science")}>Science</FilterCard>
            </View>
            <View style={styles.innerContainer}>
                <FilterCard backgroundColor="#7fff00" dimensions={150} onPress={goToInformationScreen.bind(this, "History")}>History</FilterCard>
                <FilterCard backgroundColor="#ff7f50" dimensions={150} onPress={goToInformationScreen.bind(this, "Geography")}>Geography</FilterCard>
            </View>
            <View style={styles.innerContainer}>
                <FilterCard backgroundColor="#008800" dimensions={150} onPress={goToInformationScreen.bind(this, "English")}>English</FilterCard>
            </View>
        </View>
    )
}

export default AcademicsScreen;

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    innerContainer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-evenly',
    },
})