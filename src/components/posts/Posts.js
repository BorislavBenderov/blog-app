import { PostContext } from "../../contexts/PostContext";
import { useContext, useState } from "react";
import { Post } from "./Post";
import { Pagination } from "./Pagination";

export const Posts = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(3);
    const { posts } = useContext(PostContext);
    const [search, setSearch] = useState('');
    const searchedPosts = posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase())
        || post.description.toLowerCase().includes(search.toLowerCase())
        || post.author.toLowerCase().includes(search.toLowerCase()));

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = searchedPosts.slice(firstPostIndex, lastPostIndex);
    return (
        <section>
            <div className="container">
                {currentPage === 1
                    ? <div className="search-conteiner">
                        <input
                            className="search-bar"
                            type="search"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)} /> </div>
                    : ''}
                {posts.length > 0
                    ? currentPosts.map(post => <Post key={post.id} post={post} currentPage={currentPage} />)
                    : <p>No posts in database!</p>}
                <Pagination
                    totalPosts={searchedPosts.length}
                    postsPerPage={postsPerPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </section>
    );
}