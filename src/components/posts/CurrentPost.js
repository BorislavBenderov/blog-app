import { Link, useParams, useNavigate } from "react-router-dom";
import { PostContext } from '../../contexts/PostContext';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from "react";
import { doc, deleteDoc } from 'firebase/firestore';
import { database } from '../../firebaseConfig';

export const CurrentPost = () => {
    const { posts } = useContext(PostContext);
    const { auth } = useContext(AuthContext);
    const { postId } = useParams();
    const navigate = useNavigate();

    const currentPost = posts.find(post => post.id === postId);

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

    return (
        <section>
            <div className="container">
                <div className="row justify-content-between align-items-center">
                    <div className="col-md-6">
                        <div className="img-wrapper">
                            <div className="after" />
                            <img src={currentPost.imageUrl} className="w-100" alt="About Us" />
                        </div>
                    </div>
                    <div className="col-md-5">
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
                                <a className="btn btn-outline-primary btn-sm" onClick={(e) => onDelete(postId, e)}>Delete</a> </>
                            : ''}
                    </div>
                </div>
            </div>
        </section>
    );
}