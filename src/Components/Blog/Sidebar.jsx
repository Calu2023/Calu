import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, getDocs, limitToLast, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase-config';

import Slider from '../Portfolio/Slider/Slider';
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  ///////GET BLOGS
  const [posts, setPost] = useState([]);

  const getPost = async () => {
    const results = await getDocs(query(collection(db, 'posts')));
    return results;
  };
  useEffect(() => {
    getPostData();
  }, []);

  const getPostData = async () => {
    const post = await getPost();

    setPost(post.docs.slice(-3));
  };

  ///////////////////////////
  const handlePostClick = (id) => {
    navigate(`/blog/${id}`);
  };

  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 500;
  React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  if (width > breakpoint) {
    return (
      <aside className='lateralBar'>
        <h2 className='lateralBarTitle'>Sugerencias</h2>
        <div className='lateralContainer'>
          {posts &&
            posts.map(
              (post, index) =>
                // Comprueba si la URL actual coincide con la del post
                location.pathname !== `/blog/${post.id}` && (
                  <div key={index}>
                    <p onClick={() => handlePostClick(post.id)}>
                      <div className='sb_blog_image'>
                        <img src={post.data().imageUrl} alt={`Imagen ${post.data().title}`} />
                      </div>
                      <div className='sb_blog_title'>{post.data().title}</div>
                    </p>
                    <hr />
                  </div>
                )
            )}
        </div>

        <div className='lastBlogs'></div>
      </aside>
    );
  }

  return (
    <aside className='lateralBar'>
      <h2 className='lateralBarTitle'>Sugerencias</h2>
      <div className='sidebarSlider'>
        <Slider>
          {posts &&
            posts.map(
              (post, index) =>
                // Comprueba si la URL actual coincide con la del post
                location.pathname !== `/blog/${post.id}` && (
                  <div key={index}>
                    <p onClick={() => handlePostClick(post.id)}>
                      <div className='sb_blog_image'>
                        <img src={post.data().imageUrl} alt={`Imagen ${post.data().title}`} />
                      </div>
                      <div className='sb_blog_title'>{post.data().title}</div>
                    </p>
                    <hr />
                  </div>
                )
            )}
        </Slider>
      </div>
      <div className='lastBlogs'></div>
    </aside>
  );
};

export default Sidebar;
