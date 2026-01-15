import { createContext, useState } from "react";
import { loginUser } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        localStorage.getItem("access") ? true : false
    );

    const login = async (username, password) => {
        try {
            const data = await loginUser(username, password);
            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
            setUser(true);
        } catch (error) {
            console.log(error)
        }
    };

    const logout = () => {
        localStorage.clear();
        setUser(false);
        window.location.href = "/login";
    };


    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
