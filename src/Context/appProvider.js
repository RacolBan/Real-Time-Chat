import React, { useState, createContext, useMemo, useContext } from 'react'

import useFirestore from '../hooks/useFirestore';
import { AuthContext } from './authProvider';
export const AppContext = createContext();

export default function AppProvider({ children }) {
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false)
    const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false)
    const [selectedRoomId, setSelectedRoomId] = useState("")
    const { user: { uid } } = useContext(AuthContext)
    const roomCondition = useMemo(() => {
        return {
            fieldName: "members",
            operator: "array-contains",
            compareValue: uid
        };
    }, [uid])
    const rooms = useFirestore('rooms', roomCondition)
    const selectedRoom = useMemo(
        () => rooms.find((room) => room.id === selectedRoomId) || {},
        [rooms, selectedRoomId]
    );
    const usersCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom.members,
        };
    }, [selectedRoom.members]);

    const members = useFirestore('users', usersCondition);
    return (
        <AppContext.Provider value={{ rooms, members, isInviteMemberVisible, setIsInviteMemberVisible, selectedRoom, isAddRoomVisible, setIsAddRoomVisible, selectedRoomId, setSelectedRoomId }}>
            {children}
        </AppContext.Provider>
    )
}

