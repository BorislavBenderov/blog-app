export const Edit = () => {
    return (
        <form>
            <h3>Edit Post</h3>
            <label htmlFor="title"></label>
            <input type="text" placeholder="Title" id="title" name="title" />
            <label htmlFor="description"></label>
            <input type="text" placeholder="Description" id="description" name="description" />
            <label htmlFor="content"></label>
            <textarea type="text" placeholder="Content" id="content" name="content" />
            <button>Edit Post</button>
        </form>
    );
}