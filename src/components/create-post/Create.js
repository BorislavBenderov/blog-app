import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { PostContext } from "../../contexts/PostContext";
import { addDoc } from "firebase/firestore";

export const Create = () => {
    const { auth } = useContext(AuthContext);
    const { collectionRef } = useContext(PostContext);
    const navigate = useNavigate();

    const onCreate = (e) => {
        e.preventDefault();

        const bookData = Object.fromEntries(new FormData(e.target));
        const allBookData = {
            ...bookData,
            ownerId: auth.currentUser.uid
        };

        addDoc(collectionRef, allBookData)
            .then(() => {
                navigate('/');
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    return (
        <form className="auth" onSubmit={onCreate}>
            <h3>Add Post</h3>
            <label htmlFor="title"></label>
            <input type="text" placeholder="Title" id="title" name="title" />
            <label htmlFor="description"></label>
            <input type="text" placeholder="Description" id="description" name="description" />
            <label htmlFor="imageUrl"></label>
            <input type="text" placeholder="Image" id="imageUrl" name="imageUrl" />
            <label htmlFor="content"></label>
            <textarea type="text" placeholder="Content" id="content" name="content" />
            <button type="submit">Add Post</button>
        </form>
    );
}