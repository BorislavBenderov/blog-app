import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PostContext } from "../../../contexts/PostContext";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../../../firebaseConfig";

export const Edit = () => {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { postId } = useParams();
  const { posts } = useContext(PostContext);
  const currentPost = posts.find((post) => post.id === postId);

  const [values, setValues] = useState({
    author: currentPost.author,
    title: currentPost.title,
    description: currentPost.description,
    imageUrl: currentPost.imageUrl,
    content: currentPost.content,
  });

  const changeHandler = (e) => {
    setValues((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };

  const onEdit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const author = formData.get("author");
    const title = formData.get("title");
    const description = formData.get("description");
    const imageUrl = formData.get("imageUrl");
    const content = formData.get("content");

    if (
      author === "" ||
      title === "" ||
      description === "" ||
      imageUrl === "" ||
      content === ""
    ) {
      setErr("Please fill all the fields");
      return;
    }

    const bookData = {
      author,
      title,
      description,
      imageUrl,
      content,
    };

    const docToUpdate = doc(database, "posts", postId);

    setLoading(true);

    updateDoc(docToUpdate, bookData)
      .then(() => {
        navigate(`/posts/${postId}`);
        setLoading(false);
      })
      .catch((err) => {
        setErr(err.message);
        setLoading(false);
      });
  };

  return (
    <form className="auth" onSubmit={onEdit}>
      <h3>Edit Post</h3>
      <label htmlFor="title"></label>
      <input
        type="text"
        placeholder="Title"
        id="title"
        name="title"
        value={values.title}
        onChange={changeHandler}
      />
      <label htmlFor="description"></label>
      <input
        type="text"
        placeholder="Description"
        id="description"
        name="description"
        value={values.description}
        onChange={changeHandler}
      />
      <label htmlFor="imageUrl"></label>
      <input
        type="text"
        placeholder="Image"
        id="imageUrl"
        name="imageUrl"
        value={values.imageUrl}
        onChange={changeHandler}
      />
      <label htmlFor="content"></label>
      <textarea
        type="text"
        placeholder="Content"
        id="content"
        name="content"
        value={values.content}
        onChange={changeHandler}
      />
      <button type="submit">{loading ? "Loading..." : "Edit Post"}</button>
      <p className="error">{err}</p>
    </form>
  );
};
