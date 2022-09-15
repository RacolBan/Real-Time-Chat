import React, { useEffect, useState, createContext } from 'react'
import { auth } from "../firebase/config"
import { useNavigate } from 'react-router-dom';
import { Spin } from "antd"
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const unsubcribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, email, photoURL, uid } = user
                setUser({
                    displayName, email, photoURL, uid
                })
                setIsLoading(false)
                navigate('/')
                return
            }
            // reset user info 
            setUser({});
            setIsLoading(false);
            navigate("/login")
        })
        // clean function
        return () => {
            unsubcribe()
        }
    }, [navigate])

    return (
        <AuthContext.Provider value={{ user }}>
            {isLoading ? <Spin /> : children}
        </AuthContext.Provider>
    )
}

