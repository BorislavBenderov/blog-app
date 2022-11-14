import { Link } from "react-router-dom";

export const Post = ({post}) => {

    return (
        <div className="row justify-content-between align-items-center">
            <div className="col-md-6">
                <div className="img-wrapper">
                    <div className="after" />
                    <img src={post.imageUrl} className="w-100" alt="About Us" />
                </div>
            </div>
            <div className="col-md-5">
                <h6 className="title mb-3">
                    {post.title}
                </h6>
                <p>
                    Author: {post.author}
                </p>
                <p>
                    {post.description}
                </p>
                <Link className="btn btn-outline-primary btn-sm" to={`/posts/${post.id}`}>Read</Link>
            </div>
        </div>
    );
}