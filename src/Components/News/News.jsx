import React, { useState, useEffect } from "react";
import { getDocs, getDoc, collection, query, doc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import Card_news from "./Card_news/Card_news";
import Slider from "../Portfolio/Slider/Slider";
import { db } from "../../firebase-config";
import "./news.css";

const News = () => {
  const [newsinfo, setNewsinfo] = useState({});
  const [posts, setPosts] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const breakpoint = 1280;

  useEffect(() => {
    const fetchNews = async () => {
      const newsDoc = await getDoc(doc(db, "home", "News"));
      if (newsDoc.exists()) setNewsinfo(newsDoc.data());
    };

    const fetchPosts = async () => {
      const results = await getDocs(query(collection(db, "posts")));
      setPosts(results.docs.slice(-3));
    };

    fetchNews();
    fetchPosts();
    
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePostClick = (id) => navigate(`/blog/${id}`);

  const RenderPosts = () => (
    <>
      {posts.map((post, index) => (
        <div onClick={() => handlePostClick(post.id)} key={index}>
          <Card_news
            image={<img src={post.data().imageUrl} width="120px" height="120px" />}
            title={post.data().title}
          />
        </div>
      ))}
    </>
  );

  return (
    <div className="novedades_container">
      <div className="novedades_items">
        <div className="news_text">
          <div className="edit">
            <h1 className="title_novedades">{newsinfo.title}</h1>
          </div>
          <div className="edit">
            <p>{newsinfo.t1}</p>
          </div>
        </div>
        {width > breakpoint ? (
          <div className="cards_novedades">
            <RenderPosts />
          </div>
        ) : (
          <Slider>
            {posts.map((post, index) => (
              <div onClick={() => handlePostClick(post.id)} key={index}>
                <Card_news
                  image={<img src={post.data().imageUrl} width="120px" height="120px" />}
                  title={post.data().title}
                />
              </div>
            ))}
          </Slider>
        )}
        <div className="btn_cont">
          <button className="btn_news">
            <Link className="btn_news" to="/blog" onClick={() => window.scrollTo(0, 0)}>
              Ver Más
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default News;
