// CardBlogDev.js
import React from 'react';
import logo from '../../images/logocalu.png';
import CardNews from '../News/Card_news/Card_news';
import './blog.css';

const CardBlogDev = ({ deletePost, handlePostClick }) => {
  return (
    <div className='card-blog' onClick={() => handlePostClick(1)}>
      <div className='blogImage'></div>
      <CardNews
        image={<img src={logo} alt='' width='50%' />}
        description={'Lorem ipsum Lorem ipsum'}
        title={<h2>Lorem ipsum.</h2>}
      />
      <div className='cardHeaderblog'>
        <span>1/1/1</span>
        <div className='deleteblog'>
          <>
            <button
              onClick={() => {
                deletePost(1, null);
              }}
              className='deleteblogButton'
            >
              &#128465; Delete
            </button>
            <button
              onClick={() => {
                // Lógica para editar el post
              }}
              className='editblogButton'
            >
              &#9998; Edit
            </button>
          </>
        </div>
      </div>
      <div className='cardFooterblog'></div>
    </div>
  );
};

export default CardBlogDev;
