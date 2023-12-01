import React, { useState, useEffect } from 'react';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db, auth, storage } from '../../firebase-config';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './createPost.css';
import { Header } from '../Header/header';
function CreatePost() {
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');
  const [cover, setCover] = useState(null);
  const [image, setImage] = useState(null);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [additionalContent, setAdditionalContent] = useState('');
  const [category, setCategory] = useState('');

  const postsCollectionRef = collection(db, 'posts');
  const navigate = useNavigate();
  const time = new Date().getTime();
  const editPost = location?.state?.editPost || null;

  const { id } = useParams();

  useEffect(() => {
    const checkAuthentication = () => {
      const user = auth.currentUser;
      if (!user) {
        navigate('/admin-login');
      }
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    if (id && editPost) {
      setTitle(editPost.title);
      setPostText(editPost.postText);
      setYoutubeLink(editPost.youtubeLink);
      setAdditionalContent(editPost.additionalContent);
      setCategory(editPost.category);
    }
  }, [id, editPost]);

  const createPost = async () => {
    let imageUrl = '';
    let coverUrl = '';
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(storageRef);
    }
    if (cover) {
      const storageRef = ref(storage, `images/${cover.name}`);
      await uploadBytes(storageRef, cover);
      coverUrl = await getDownloadURL(storageRef);
    }

    const newPost = {
      title,
      postText,
      coverUrl,
      imageUrl,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      youtubeLink,
      additionalContent,
      category,
      time,
    };

    await addDoc(postsCollectionRef, newPost);
    navigate('/blog');
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
        time,
      };

      await setDoc(doc(db, 'posts', editPost.id), updatedPost);
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
        time,
      };

      await setDoc(doc(db, 'posts', editPost.id), updatedPost);
    }
    navigate('/blog');
  };

  const handleSubmit = () => {
    if (editPost) {
      updatePost();
    } else {
      createPost();
    }
  };

  return (
    <div>


      <Header/>
     
    <div className='createPostPage'>
      <div className='cpContainer'>
        <h1>{editPost ? 'Edit Post' : 'Create A Post'}</h1>
        <div className='inputGp'>
          <label>Title:</label>
          <input
            placeholder='Title...'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className='inputGp'>
          <label>Post:</label>
          <textarea
            placeholder='Post...'
            value={postText}
            onChange={(event) => setPostText(event.target.value)}
          />
        </div>
        <div className='inputGp'>
          <label>Portada:</label>
          <input type='file' onChange={(event) => setCover(event.target.files[0])} />
        </div>
        <div className='inputGp'>
          <label>Imagen Miniatura:</label>
          <input type='file' onChange={(event) => setImage(event.target.files[0])} />
        </div>
        <div className='inputGp'>
          <label>YouTube Link:</label>
          <input
            placeholder='YouTube link...'
            value={youtubeLink}
            onChange={(event) => setYoutubeLink(event.target.value)}
          />
        </div>
        <div className='inputGp'>
          <label>Additional Content:</label>
          <textarea
            placeholder='Additional content...'
            value={additionalContent}
            onChange={(event) => setAdditionalContent(event.target.value)}
          />
        </div>
        <div className='inputGp'>
          <label>Category:</label>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value=''>Select a category</option>
            <option value='technology'>Tecnologia</option>
            <option value='social media'>Redes Sociales</option>
            <option value='community management'>Manejo de comunidad</option>
            {/* Add more categories as needed */}
          </select>
        </div>
        <div className='inputGp'>
          <button onClick={handleSubmit}>{editPost ? 'Update Post' : 'Submit Post'}</button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default CreatePost;
