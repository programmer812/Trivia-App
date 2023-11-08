import { StatusBar } from 'expo-status-bar';
import { useContext, useState, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

import HomeScreen from './screens/HomeScreen';
import AcademicsScreen from './screens/AcademicsScreen';
import GeneralTriviaScreen from './screens/GeneralTriviaScreen';
import InformationScreen from './screens/InformationScreen';
import QuestionScreen from './screens/QuestionScreen';
import ResultsScreen from './screens/ResultsScreen';
import UserAnalyticsScreen from './screens/UserAnalyticsScreen';

import Colors from './constants/colors';

import QuizScoresContextProvider from './store/context/quiz-score-context';
import { initDB } from './components/util/database';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

// function UnAuthNavigation() {
//   return (
//     <NavigationContainer theme={navTheme}>
//       <Stack.Navigator screenOptions={{
//         headerTitleAlign: "center",
//         headerBackground: () => (
//           <ImageBackground></ImageBackground>
//         ),
//         headerTintColor: Colors.header,
//         headerTitleStyle: {
//           fontSize: 25,
//           fontFamily: 'Poppins-Medium'
//         }
//       }}>
//         <Stack.Screen name='Login' component={LoginScreen} />
//         <Stack.Screen name='SignUp' component={SignUpScreen} options={{
//           title: "Sign Up"
//         }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }

// function AuthNavigation() {
//   return (
//     <NavigationContainer theme={navTheme}>
//       <Stack.Navigator screenOptions={{
//         headerTitleAlign: "center",
//         headerBackground: () => (
//           <ImageBackground></ImageBackground>
//         ),
//         headerTintColor: Colors.header,
//         headerTitleStyle: {
//           fontSize: 25,
//           fontFamily: 'Poppins-Medium'
//         }
//       }}>
//         <Stack.Screen name="Home" component={HomeScreen} options={{
//           title: "Trivia King"
//         }} />
//         <Stack.Screen name="Academics" component={AcademicsScreen} />
//         <Stack.Screen name="General-Trivia" component={GeneralTriviaScreen} />
//         <Stack.Screen name="Information-Screen" component={InformationScreen} />
//         <Stack.Screen name="Question-Screen" component={QuestionScreen} options={{
//           headerBackVisible: false
//         }} />
//         <Stack.Screen name="Results-Screen" component={ResultsScreen} options={{
//           title: "Quiz Results",
//           headerBackVisible: false
//         }} />
//         <Stack.Screen name="User-Analytics" component={UserAnalyticsScreen} options={{
//           title: "User Analytics"
//         }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }

// function Application() {

//   const [loading, setLoading] = useState(true);

//   const authCtx = useContext(AuthContext);

//   useEffect(() => {
//     const fetchToken = async () => {
//         const token = await AsyncStorage.getItem('token');

//         if (token) {
//           authCtx.authenticate(token);
//         }

//         setLoading(false);
//     }

//     fetchToken();
//   }, []);

//   useEffect(() => {
//     const handleSplashScreen = async () => {
//       if (!loading) {
//         await SplashScreen.hideAsync();
//       }
//     }

//     handleSplashScreen();
//   }, [loading])

//   if (loading) {
//     return null;
//   }

//   return (
//     <>
//       {!authCtx.isAuthenticated && <UnAuthNavigation />}
//       {authCtx.isAuthenticated && <AuthNavigation />}
//     </>
//   )
// }

export default function App() {
  const [DBInit, setDBInit] = useState(false);

  useEffect(() => {
    initDB()
      .then(() => {
        console.log("Successfully initialized db!");
        setDBInit(true);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  const [fontsLoaded] = useFonts({
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf')
  })

  useEffect(() => {
    const handleSplashScreen = async () => {
      if (fontsLoaded && DBInit) {
        await SplashScreen.hideAsync();
      }
    }
    
    handleSplashScreen();
  }, [fontsLoaded, DBInit])

  return (
    <ImageBackground 
      style={{ flex: 1 }} 
      source={require('./assets/images/background-image.jpg')} 
      resizeMode="cover"
    >
      <QuizScoresContextProvider>
        <StatusBar style='light' />
        <NavigationContainer theme={navTheme}>
          <Stack.Navigator screenOptions={{
            headerTitleAlign: "center",
            headerBackground: () => (
              <ImageBackground></ImageBackground>
            ),
            headerTintColor: Colors.header,
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: 'Poppins-Medium'
            }
          }}>
            <Stack.Screen name="Home" component={HomeScreen} options={{
              title: "Trivia King"
            }} />
            <Stack.Screen name="Academics" component={AcademicsScreen} />
            <Stack.Screen name="General-Trivia" component={GeneralTriviaScreen} />
            <Stack.Screen name="Information-Screen" component={InformationScreen} />
            <Stack.Screen name="Question-Screen" component={QuestionScreen} options={{
              headerBackVisible: false
            }} />
            <Stack.Screen name="Results-Screen" component={ResultsScreen} options={{
              title: "Quiz Results",
              headerBackVisible: false
            }} />
            <Stack.Screen name="User-Analytics" component={UserAnalyticsScreen} options={{
              title: "User Analytics"
            }} />
          </Stack.Navigator>
        </NavigationContainer>
      </QuizScoresContextProvider>
    </ImageBackground>
  );
}
