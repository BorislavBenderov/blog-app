import { PostContext } from "../../contexts/PostContext";
import { useContext, useState } from "react";
import { Post } from "./Post";

export const Posts = () => {
    const { posts } = useContext(PostContext);
    const [search, setSearch] = useState('');
    const searchedPosts = posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase())
        || post.description.toLowerCase().includes(search.toLowerCase())
        || post.author.toLowerCase().includes(search.toLowerCase()));

    return (
        <section>
            <div className="container">
                <input type="search" placeholder="search" value={search} onChange={(e) => setSearch(e.target.value)} />
                {posts.length > 0
                    ? searchedPosts.map(post => <Post key={post.id} post={post} />)
                    : <p>No posts in database!</p>}
            </div>
        </section>
    );
}