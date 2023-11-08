import { View, StyleSheet, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import FilterCard from '../components/FilterCard';
import PrimaryButton from '../components/PrimaryButton';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../store/context/auth-context'; 
import { fetchQuizScores } from '../components/util/database';

const HomeScreen = ({ navigation }) => {

    // const authCtx = useContext(AuthContext);

    navigation.setOptions({
        // headerLeft: () => (
        //     <PrimaryButton 
        //         onPress={() => {
        //             navigation.navigate("User-Analytics");
        //         }} 
        //         style={styles.userIcon}
        //     >
        //         G
        //     </PrimaryButton>
        // ),
        // headerRight: () => (
        //     <Pressable onPress={authCtx.logout}>
        //         <MaterialIcons name='logout' size={45} color="red" />
        //     </Pressable>
        // )
    });

    return (
        <View style={styles.homeContainer}>
            <FilterCard 
                backgroundColor="red"
                dimensions={200}
                onPress={() => navigation.navigate("Academics")}
            >Academics</FilterCard>
            {/* <FilterCard 
                backgroundColor="#8080ff"
                dimensions={200}
                onPress={() => navigation.navigate("General-Trivia")}
            >General Trivia</FilterCard> */}
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    userIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
})