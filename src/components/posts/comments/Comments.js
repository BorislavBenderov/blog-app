import { orderBy, query, collection, onSnapshot } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { database } from '../../../firebaseConfig';
import { Comment } from './Comment';

export const Comments = ({currentPost}) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const q = query(collection(database, 'comments'), orderBy('timestamp'));
        onSnapshot(q, (querySnapshot) => {
            setComments(querySnapshot.docs.map(item => {
                return { ...item.data(), id: item.id }
            }));
        });
    }, []);

    const currentPostComments = comments.filter(comment => comment.commentId === currentPost.id);

    return (
        <ul className="comments-section">
            {currentPostComments.length > 0
                ? currentPostComments.map(comment => <Comment key={comment.id} comment={comment} />)
                : <p className='no-comments'>No comments for current post!</p>}
        </ul>
    );
}