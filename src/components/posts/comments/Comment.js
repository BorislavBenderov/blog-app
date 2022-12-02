import { doc, deleteDoc } from 'firebase/firestore';
import { database } from '../../../firebaseConfig';
import { AuthContext } from '../../../contexts/AuthContext';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';

export const Comment = ({ comment }) => {
    const { auth } = useContext(AuthContext);
    const { users } = useContext(UserContext);
    const currentUser = users.find(user => user.uid === comment.uid);

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
                {currentUser.username}
            </h6>
            <p>
                {comment.text}
            </p>
            {commentOwner
                ? <button className="btn btn-outline-primary btn-sm" onClick={(e) => onDeleteComment(comment.id, e)}>Delete</button>
                : ''}

        </li>
    );
}