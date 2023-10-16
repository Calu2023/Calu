import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { Header } from '../Header/header';
import './BlogView.css';
import './blog.css';
import Sidebar from './Sidebar';
import Contact_button from '../Home/Contact_button/Contact_button';
import '../Home/Contact_button/contact_button.css';
import YouTube from 'react-youtube';
import { useCustomContext } from '../../Hooks/Context/Context';
import arrow_L from '../Home/icon_arrow_left.svg';
function BlogView() {
  const { cart, removeFromCart } = useCustomContext();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const firstSection = useRef(null);
  const scrollToTop = () => {
    firstSection.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const scroll_top = () => {
    window.scroll({
      top: 0,
    });
  };

  useEffect(() => {
    scroll_top();
    const getPost = async () => {
      const postDoc = doc(db, 'posts', id);
      const docSnapshot = await getDoc(postDoc);
      if (docSnapshot.exists()) {
        const date = new Date(docSnapshot.data().time).toLocaleDateString();
        setPost({ ...docSnapshot.data(), date });
      } else {
        console.log('El post no existe');
      }
    };

    getPost();
  }, [id]);
  console.log(post);

  if (!post) {
    return <div>Loading...</div>;
  }

  function getYouTubeVideoId(url) {
    if (!url) {
      return null;
    }
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/;
    const match = url.match(regExp);
    return match && match[1];
  }

  return (
    <>
      <div className='BlogView' ref={firstSection}>
        <Header cartItem={cart} handleDelete={removeFromCart} />
        <button onClick={scrollToTop}>
          <img className='arrow_up' src={arrow_L} alt='Arrow Up' />
        </button>
        <Contact_button />

        <div className='blogView-sidebar'>
          <div className='blogContainer'>
            <h2 className='blogTitle'>{post.title}</h2>
            <div className='blogCard'>
              <div className='banner'>
                <img src={post.coverUrl} alt={post.coverUrl} />
              </div>

              <div className='blogText'>
                <h3 className='mini-description'>{post.postText}</h3>
                {post.youtubeLink && (
                  <div className='youtubePlayer'>
                    <YouTube videoId={getYouTubeVideoId(post.youtubeLink)} />
                  </div>
                )}
                {post.additionalContent && (
                  <div>
                    <p className='aditional-content'>{post.additionalContent}</p>
                  </div>
                )}
              </div>
              <div className='date-tagContainer'></div>
              <div className='date-tags'>
                <p>{post.date}</p>
              </div>
            </div>
          </div>
          <Sidebar />
        </div>
      </div>
    </>
  );
}

export default BlogView;
