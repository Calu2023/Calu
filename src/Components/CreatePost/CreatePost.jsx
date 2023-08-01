import React, { useState, useEffect } from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db, auth, storage } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./createPost.css";

function CreatePost({ location }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState(null);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [additionalContent, setAdditionalContent] = useState("");
  const [category, setCategory] = useState("");
  const postsCollectionRef = collection(db, "posts");
  const navigate = useNavigate();
  const timestamp = new Date();
  const time = timestamp.toLocaleDateString();

  const editPost = location?.state?.editPost || null;

  useEffect(() => {
    const checkAuthentication = () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/admin-login");
      }
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    if (editPost) {
      setTitle(editPost.title);
      setPostText(editPost.postText);
      setYoutubeLink(editPost.youtubeLink);
      setAdditionalContent(editPost.additionalContent);
      setCategory(editPost.category);
    }
  }, [editPost]);

  const createPost = async () => {
    let imageUrl = "";
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(storageRef);
    }

    const newPost = {
      title,
      postText,
      imageUrl,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      youtubeLink,
      additionalContent,
      category,
      time,
    };

    await addDoc(postsCollectionRef, newPost);
    navigate("/blog");
  };

  const updatePost = async () => {
    if (!image) {
      const updatedPost = {
        ...editPost,
        title,
        postText,
        youtubeLink,
        additionalContent,
        category,
      };

      await setDoc(doc(db, "posts", editPost.id), updatedPost);
    } else {
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);

      const updatedPost = {
        ...editPost,
        title,
        postText,
        imageUrl,
        youtubeLink,
        additionalContent,
        category,
      };

      await setDoc(doc(db, "posts", editPost.id), updatedPost);
    }
    navigate("/blog");
  };

  const handleSubmit = () => {
    if (editPost) {
      updatePost();
    } else {
      createPost();
    }
  };

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>{editPost ? "Edit Post" : "Create A Post"}</h1>
        <div className="inputGp">
          <label>Title:</label>
          <input
            placeholder="Title..."
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="inputGp">
          <label>Post:</label>
          <textarea
            placeholder="Post..."
            value={postText}
            onChange={(event) => setPostText(event.target.value)}
          />
        </div>
        <div className="inputGp">
          <label>Image:</label>
          <input
            type="file"
            onChange={(event) => setImage(event.target.files[0])}
          />
        </div>
        <div className="inputGp">
          <label>YouTube Link:</label>
          <input
            placeholder="YouTube link..."
            value={youtubeLink}
            onChange={(event) => setYoutubeLink(event.target.value)}
          />
        </div>
        <div className="inputGp">
          <label>Additional Content:</label>
          <textarea
            placeholder="Additional content..."
            value={additionalContent}
            onChange={(event) => setAdditionalContent(event.target.value)}
          />
        </div>
        <div className="inputGp">
          <label>Category:</label>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="">Select a category</option>
            <option value="technology">Tecnologia</option>
            <option value="social media">Redes Sociales</option>
            <option value="community management">Manejo de comunidad</option>
            {/* Add more categories as needed */}
          </select>
        </div>
        <button onClick={handleSubmit}>
          {editPost ? "Update Post" : "Submit Post"}
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
