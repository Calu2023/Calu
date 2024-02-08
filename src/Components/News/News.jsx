import React from 'react';
import './news.css';
import Slider from '../Slider/Slider';
import { useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { useEffect } from 'react';
import { db } from '../../firebase-config';
import PostNews from './postNews';

const News = () => {
  const [newsinfo, setNewsinfo] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      const NewsDoc = doc(db, 'home', 'News');
      const docSnapshot = await getDoc(NewsDoc);
      if (docSnapshot.exists()) {
        setNewsinfo(docSnapshot.data());
      }
    };
    getNews();
  }, []);
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 1280;
  React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);
  return (
    <div className='novedades_container'>
      <div className='novedades_items'>
        <div className='news_text'>
          <div className='edit'>
            <h1 className='title_novedades'>{newsinfo.title}</h1>
          </div>

          <div className='edit'>
            <p>{newsinfo.t1}</p>
          </div>
        </div>

        <div className='cards_novedades'>
          {width > breakpoint ? (
            <PostNews />
          ) : (
            <Slider>
              <PostNews />
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;
