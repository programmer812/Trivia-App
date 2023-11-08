import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: (token) => {},
    logout: () => {}
});

const AuthContextProvider = ({ children }) => {

    const [authToken, setAuthToken] = useState();

    const authenticate = (token) => {
        AsyncStorage.setItem('token', token);
        setAuthToken(token);
    }

    const logout = async () => {
        AsyncStorage.removeItem('token')
        setAuthToken(null);
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}

export default AuthContextProvider;