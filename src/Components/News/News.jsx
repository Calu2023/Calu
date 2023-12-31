import React from "react";
import "./news.css";
import Card_news from "./Card_news/Card_news";
import Slider from "../Portfolio/Slider/Slider";
import { useState } from "react";
import { getDocs, getDoc, collection, doc, query } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const News = () => {
  const [newsinfo, setNewsinfo] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      const NewsDoc = doc(db, "home", "News");
      const docSnapshot = await getDoc(NewsDoc);
      if (docSnapshot.exists()) {
        setNewsinfo(docSnapshot.data());
      }
    };
    getNews();
  }, []);
  //////////////////////////////// GET POSTS
  const [posts, setPost] = useState([]);

  const getPost = async () => {
    const results = await getDocs(query(collection(db, "posts")));
    return results;
  };
  useEffect(() => {
    getPostData();
  }, []);

  const getPostData = async () => {
    const post = await getPost();

    setPost(post.docs.slice(-3));
  };
  /////////////////////////////////
  const navigate = useNavigate();
  const handlePostClick = (id) => {
    navigate(`/blog/${id}`);
  };

  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 1280;
  React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);
  if (width > breakpoint) {
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

          <div className="cards_novedades">
            {posts &&
              posts.map((post, index) => (
                <div onClick={() => handlePostClick(post.id)} key={index}>
                  <Card_news
                    image={
                      <img
                        src={post.data().imageUrl}
                        width="120px"
                        height="120px"
                      />
                    }
                    title={post.data().title}
                  ></Card_news>
                </div>
              ))}
          </div>
          <button className="btn_news">
            <Link
              className="btn_news"
              to={"/blog"}
              onClick={() => {
                window.scroll({
                  top: 0,
                });
              }}
            >
              Ver Más
            </Link>
          </button>
        </div>
      </div>
    );
  }
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
        <div className="cards_novedades"></div>
        <Slider>
          {posts &&
            posts.map((post) => (
              <div onClick={() => handlePostClick(post.id)}>
                <Card_news
                  image={
                    <img
                      src={post.data().imageUrl}
                      width="120px"
                      height="120px"
                    />
                  }
                  title={post.data().title}
                ></Card_news>
              </div>
            ))}
        </Slider>

        <div className="btn_cont">
          <button className="btn_news" onClick={() => ""}>
            <Link
              className="btn_news"
              to={"/blog"}
              onClick={() => {
                window.scroll({
                  top: 0,
                });
              }}
            >
              Ver Más
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default News;
