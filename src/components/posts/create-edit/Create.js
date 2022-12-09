import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { PostContext } from "../../../contexts/PostContext";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";

export const Create = () => {
    const [err, setErr] = useState('');
    const { auth } = useContext(AuthContext);
    const { collectionRef } = useContext(PostContext);
    const navigate = useNavigate();

    const onCreate = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const title = formData.get('title');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');
        const content = formData.get('content');

        if (title === '' || description === '' || imageUrl === '' || content === '') {
            setErr('Please fill all the fields');
            return;
        }

        const allBookData = {
            title,
            description,
            imageUrl,
            content,
            timestamp: serverTimestamp(),
            ownerId: auth.currentUser.uid,
            likes: []
        };

        addDoc(collectionRef, allBookData)
            .then(() => {
                navigate('/');
            })
            .setErr((err) => {
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
            <p className="error">{err}</p>
        </form>
    );
}