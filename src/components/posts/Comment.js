import { doc, deleteDoc } from 'firebase/firestore';
import { database } from '../../firebaseConfig';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';

export const Comment = ({ comment }) => {
    const { auth } = useContext(AuthContext);
    let commentOwner = null;

    if (auth.currentUser) {
        commentOwner = comment.uid === auth.currentUser.uid;
    }

    const onDeleteComment = async (id, e) => {
        const confirmation = window.confirm('Are you sure you want to delete this comment?');

        if (confirmation) {
            e.preventDefault();
            await deleteDoc(doc(database, 'comments', id));
        }
    }


    return (
        <li className="comments-box">
            <h6>
                {comment.email}
            </h6>
            <p>
                {comment.text}
            </p>
            {commentOwner
                ? <button className="comments-button" onClick={(e) => onDeleteComment(comment.id, e)}>Delete</button>
                : ''}

        </li>
    );
}