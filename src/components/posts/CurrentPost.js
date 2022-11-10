import { useParams } from "react-router-dom";
import { PostContext } from '../../contexts/PostContext';
import { useContext } from "react";

export const CurrentPost = () => {
    const { posts } = useContext(PostContext);
    const { postId } = useParams();

    const currentPost = posts.find(post => post.id === postId);
    console.log(currentPost);

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
                        <a className="btn btn-outline-primary btn-sm">Edit</a>
                        <a className="btn btn-outline-primary btn-sm">Delete</a>
                    </div> 
                </div>
            </div>
        </section>
    );
}