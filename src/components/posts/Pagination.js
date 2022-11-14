export const Pagination = ({ totalPosts, postsPerPage, currentPage, setCurrentPage }) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }
    return (
        <div className="pagination">
            {pages.map((page, index) => {
                return (<button
                    key={index}
                    onClick={() => setCurrentPage(page)}
                    className={page === currentPage ? 'active' : ''}>
                    {page}
                </button>
                );
            })}
        </div>
    );
}