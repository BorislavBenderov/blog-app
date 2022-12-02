import { serverTimestamp, addDoc, collection } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { database } from '../../../firebaseConfig';

export const CreateComment = ({ currentPost }) => {
    const [input, setInput] = useState([]);
    const { auth } = useContext(AuthContext);

    const onCreateComment = async (e) => {
        e.preventDefault();

        if (input === '') {
            alert('Please enter a valid comment');
            return;
        }

        await addDoc(collection(database, 'comments'), {
            text: input,
            commentId: currentPost.id,
            uid: auth.currentUser.uid,
            email: auth.currentUser.email,
            timestamp: serverTimestamp()
        });

        setInput('');
    }

    return (
        <form className="comment-form" onSubmit={onCreateComment}>
            <textarea
                type="text"
                rows='1'
                placeholder="Add a comment"
                name="comment"
                id="comment"
                value={input}
                onChange={(e) => setInput(e.target.value)} />
            <button className="btn btn-outline-primary btn-sm" type="submit">Add</button>
        </form>
    );
}