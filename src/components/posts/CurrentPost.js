import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthContext';
import { useContext, useEffect, useState } from "react";
import { doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { database } from '../../firebaseConfig';
import { UserContext } from "../../contexts/UserContext";
import { Likes } from "./Likes";
import { CreateComment } from "./comments/CreateComment";
import { Comments } from "./comments/Comments";

export const CurrentPost = () => {
    const [currentPost, setCurrentPost] = useState([]);
    const { auth, loggedUser } = useContext(AuthContext);
    const { users } = useContext(UserContext);
    const { postId } = useParams();
    const navigate = useNavigate();
    const currentUser = users.find(user => user.uid === currentPost.ownerId);

    useEffect(() => {
        onSnapshot(doc(database, 'posts', postId), (snapshot) => {
            setCurrentPost({ ...snapshot.data(), id: snapshot.id })
        })
    }, []);

    let isOwner = null;

    if (auth.currentUser) {
        isOwner = currentPost.ownerId === auth.currentUser.uid;
    }

    const onDelete = (id, e) => {
        const confirmation = window.confirm('Are you sure you want to delete this post?');

        if (confirmation) {
            e.preventDefault();

            deleteDoc(doc(database, 'posts', id))
                .then(() => {
                    navigate('/');
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
                            Author: {currentUser?.username}
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
                            : ''}
                        {loggedUser
                            ? <><Likes currentPost={currentPost} />
                                <CreateComment currentPost={currentPost} /></>
                            : <i>Likes: {currentPost.likes ? currentPost.likes.length : 0}</i>}

                    </div>
                    <div className="col-md-5 comments">
                        <h4 className="comments-title">
                            Comments
                        </h4>
                        <Comments currentPost={currentPost} />
                    </div>
                </div>
            </div>
        </section>
    );
}