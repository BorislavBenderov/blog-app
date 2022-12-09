import { doc, deleteDoc } from 'firebase/firestore';
import { database } from '../../../firebaseConfig';
import { AuthContext } from '../../../contexts/AuthContext';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { CommentLikes } from './CommentLikes';

export const Comment = ({ comment }) => {
    const { auth, loggedUser } = useContext(AuthContext);
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

            try {
                await deleteDoc(doc(database, 'comments', id));
            } catch (error) {
                alert(error.message);
            }

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
            {loggedUser
                ? <CommentLikes comment={comment} />
                : comment.likes?.length > 0
                    ? <p>Likes: {comment.likes?.length}</p>
                    : ''}

        </li>
    );
}