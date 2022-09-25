import React, { useState, createContext, useMemo, useContext } from 'react'

import useFirestore from '../hooks/useFirestore';
import { AuthContext } from './authProvider';
export const AppContext = createContext();

export default function AppProvider({ children }) {
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false)
    const { user: { uid } } = useContext(AuthContext)
    const roomCondition = useMemo(() => {
        return {
            fieldName: "members",
            operator: "array-contains",
            compareValue: uid
        }
    }, [uid])
    const rooms = useFirestore('rooms', roomCondition)
    return (
        <AppContext.Provider value={{ rooms, isAddRoomVisible, setIsAddRoomVisible }}>
            {children}
        </AppContext.Provider>
    )
}

