import { useContext } from "react";
import { PostContext } from "../../../contexts/PostContext";
import { AuthContext } from "../../../contexts/AuthContext";
import { MyPost } from "./MyPost";

export const MyPosts = () => {
    const { posts } = useContext(PostContext);
    const { auth } = useContext(AuthContext);

    const postOwner = posts.filter(post => post.ownerId === auth.currentUser.uid);

    return (
        <section>
            {postOwner.length > 0
                ? postOwner.map(post => <MyPost key={post.id} post={post} />)
                : <p className="no-posts">No posts in database!</p>}
        </section>
    );
}