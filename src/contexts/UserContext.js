import { createContext, useEffect, useState } from "react";
import { database } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        onSnapshot(collection(database, 'users'), (snapshot) => {
            setUsers(snapshot.docs.map((item) => {
                return { ...item.data(), id: item.id };
            }));
        });
    }, []);

    return (
        <UserContext.Provider value={{ users }}>
            {children}
        </UserContext.Provider>
    );
}