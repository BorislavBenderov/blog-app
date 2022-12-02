import { doc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { database } from '../../firebaseConfig';

export const Likes = ({ currentPost }) => {
    const { loggedUser } = useContext(AuthContext);

    const likeHandler = async () => {
        if (currentPost.likes?.includes(loggedUser.uid)) {
            try {
                await updateDoc(doc(database, 'posts', currentPost.id), {
                    likes: arrayRemove(loggedUser.uid)
                });
            } catch (error) {
                alert(error.message);
            }

        } else {
            try {
                await updateDoc(doc(database, 'posts', currentPost.id), {
                    likes: arrayUnion(loggedUser.uid)
                });
            } catch (error) {
                alert(error.message);
            }
        }
    }

    return (
        <div className="like-container">
            <i className={`fa fa-heart${!currentPost.likes?.includes(loggedUser.uid) ? '-o' : ''} fa-lg`}
                style={{ cursor: 'pointer', color: currentPost.likes?.includes(loggedUser.uid) ? 'red' : null }}
                onClick={likeHandler}>{currentPost.likes ? currentPost.likes.length : 0}</i>
        </div>
    );
}