import { Comment } from "./Comment";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthContext';
import { useContext, useEffect, useState } from "react";
import { doc, deleteDoc, onSnapshot, orderBy, query, collection, serverTimestamp, addDoc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { database } from '../../firebaseConfig';

export const CurrentPost = () => {
    const [currentPost, setCurrentPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [input, setInput] = useState([]);
    const { auth, loggedUser } = useContext(AuthContext);
    const { postId } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        onSnapshot(doc(database, 'posts', postId), (snapshot) => {
            setCurrentPost({...snapshot.data(), id: snapshot.id })
        })
    }, []);

    useEffect(() => {
        const q = query(collection(database, 'comments'), orderBy('timestamp'));
        onSnapshot(q, (querySnapshot) => {
            setComments(querySnapshot.docs.map(item => {
                return { ...item.data(), id: item.id }
            }));
        });
    }, []);

    const currentPostComments = comments.filter(comment => comment.commentId === postId);

    let isOwner = null;

    if (auth.currentUser) {
        isOwner = currentPost.ownerId === auth.currentUser.uid;
    }

    const onDelete = async (id, e) => {
        const confirmation = window.confirm('Are you sure you want to delete this post?');

        if (confirmation) {
            e.preventDefault();
            navigate('/');
            await deleteDoc(doc(database, 'posts', id));
        }
    }

    const onCreateComment = async (e) => {
        e.preventDefault();

        if (input === '') {
            alert('Please enter a valid comment');
            return;
        }

        await addDoc(collection(database, 'comments'), {
            text: input,
            commentId: postId,
            uid: auth.currentUser.uid,
            email: auth.currentUser.email,
            timestamp: serverTimestamp()
        });

        setInput('');
    }

    const likeHandler = () => {
        if (currentPost.likes?.includes(currentPost.ownerId)) {
            updateDoc(doc(database, 'posts', postId), {
                likes: arrayRemove(currentPost.ownerId)
            })
                .then(() => {
                    console.log('unliked');
                })
                .catch((err) => {
                    alert(err.message);
                })
        } else {
            updateDoc(doc(database, 'posts', postId), {
                likes: arrayUnion(currentPost.ownerId)
            })
                .then(() => {
                    console.log('liked');
                })
                .catch((err) => {
                    alert(err.message);
                })
        }
    }

    return (
        <section>
            <div className="container">
                <div className="row current-post">
                    <div className="col-md-6">
                        <div className="img-wrapper">
                            <div className="after" />
                            <img src={currentPost.imageUrl} className="w-100" alt="About Us" />
                        </div>
                    </div>
                    <div className="col-md-5">
                    <p>
                            Author: {currentPost.author}
                        </p>
                        <h6 className="title mb-3">
                            {currentPost.title}
                        </h6>
                        <p>
                            {currentPost.description}
                        </p>
                        <p>
                            {currentPost.content}
                        </p>
                        {isOwner
                            ? <> <Link className="btn btn-outline-primary btn-sm" to={`/edit/${postId}`}>Edit</Link>
                                <a className="btn btn-outline-primary btn-sm delete" onClick={(e) => onDelete(postId, e)}>Delete</a> </>
                            : loggedUser
                                ? <div className="like-container">
                                    <i className={`fa fa-heart${!currentPost.likes?.includes(currentPost.ownerId) ? '-o' : ''} fa-lg`}
                                        style={{ cursor: 'pointer', color: currentPost.likes?.includes(currentPost.ownerId) ? 'red' : null }}
                                        onClick={likeHandler}>{currentPost.likes ? currentPost.likes.length : 0}</i>
                                </div>
                                : ''}
                        {loggedUser
                            ? <form className="comment-form" onSubmit={onCreateComment}>
                                <input type="text" placeholder="Add a comment" name="comment" id="comment" value={input} onChange={(e) => setInput(e.target.value)} />
                                <button className="btn btn-outline-primary btn-sm" type="submit">Add</button>
                            </form>
                            : ''}

                    </div>
                    <div className="col-md-5 comments">
                        <h4 className="comments-title">
                            Comments
                        </h4>
                        <ul className="comments-section">
                            {currentPostComments.length > 0
                                ? currentPostComments.map(comment => <Comment key={comment.id} comment={comment} />)
                                : <p>No comment in database!</p>}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}