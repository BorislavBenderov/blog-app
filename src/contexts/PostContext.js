import { createContext, useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { database } from '../firebaseConfig';

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    const collectionRef = collection(database, 'posts');

    useEffect(() => {
        const q = query(collectionRef, orderBy("timestamp", "desc"));
        onSnapshot(q, (data) => {
            setPosts(data.docs.map(item => {
                return { ...item.data(), id: item.id };
            }))
        })
    }, []);

    return (
        <PostContext.Provider value={{ posts, collectionRef }}>
            {children}
        </PostContext.Provider>
    );
}