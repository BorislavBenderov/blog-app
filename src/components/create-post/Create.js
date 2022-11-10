export const Create = () => {
    return (
        <form>
            <h3>Add Post</h3>
            <label htmlFor="title"></label>
            <input type="text" placeholder="Title" id="title" name="title" />
            <label htmlFor="description"></label>
            <input type="text" placeholder="Description" id="description" name="description" />
            <label htmlFor="content"></label>
            <textarea type="text" placeholder="Content" id="content" name="content" />
            <button>Add Post</button>
        </form>
    );
}