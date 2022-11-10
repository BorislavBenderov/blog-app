import { PostContext } from "../../contexts/PostContext";
import { useContext } from "react";
import { Post } from "./Post";

export const Posts = () => {
    const { posts } = useContext(PostContext);
    return (
        <section>
            <div className="container">
                {posts.length > 0
                    ? posts.map(post => <Post key={post.id} post={post} />)
                    : <p>No posts in database!</p>}
            </div>
        </section>
    );
}