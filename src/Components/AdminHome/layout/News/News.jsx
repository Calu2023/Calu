import React from "react";
import "../../../News/news.css";
import Card_news from "../../../News/Card_news/Card_news";
import Slider from "./Slider/Slider";
import { useState } from "react";
import {
  doc,
  getDoc,
  getDocs,
  query,
  collection,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../../../firebase-config";
import Modal from "../Modal/modal";
const News = () => {
  /*setDoc(doc(db, "home", "News"), {
    title: "NOVEDADES",
    t1: "   No te pierdas los úlimos contenidos de nuestro blog.",
    
  });*/

  const [newsinfo, setNewsinfo] = useState([]);

  const [title, setTitle] = useState("");
  const [t1, setT1] = useState("");

  const updateTitle = async () => {
    const news_info = doc(db, "home", "News");
    await updateDoc(news_info, {
      title: title,
    });
    alert("¡ Texto modificado con exito !");
  };

  const updateT1 = async () => {
    const news_info = doc(db, "home", "News");
    await updateDoc(news_info, {
      t1: t1,
    });
    alert("¡ Texto modificado con exito !");
  };

  ////////////////////////// GET POST
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
  /////////////////////

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

  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 1024;
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
        <div className="news_text">
          <div className="edit">
            <h1 className="title_novedades">{newsinfo.title}</h1>
            <Modal>
              <input
                style={{ width: "300px", height: "30px" }}
                type="text"
                placeholder="Ingrese titulo"
                onChange={(e) => setTitle(e.target.value)}
              />
              <button onClick={() => updateTitle()}>GUARDAR</button>
            </Modal>
          </div>

          <div className="edit">
            <p>{newsinfo.t1}</p>
            <Modal>
              <input
                style={{ width: "300px", height: "30px" }}
                type="text"
                placeholder="Ingrese texto 1"
                onChange={(e) => setT1(e.target.value)}
              />
              <button onClick={() => updateT1()}>GUARDAR</button>
            </Modal>
          </div>
        </div>

        <div className="cards_novedades">
          {posts &&
            posts.map((post) => (
              <a href="">
                <Card_news
                  image={<img src={post.data().imageUrl} width="150px" />}
                  title={post.data().title}
                ></Card_news>
              </a>
            ))}
        </div>
      </div>
    );
  }
  return (
    <div className="novedades_container">
      <div className="news_text">
        <div className="edit">
          <h1 className="title_novedades">{newsinfo.title}</h1>
          <Modal>
            <input
              style={{ width: "300px", height: "30px" }}
              type="text"
              placeholder="Ingrese titulo"
              onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={() => updateTitle()}>GUARDAR</button>
          </Modal>
        </div>

        <div className="edit">
          <p>{newsinfo.t1}</p>
          <Modal>
            <input
              style={{ width: "300px", height: "30px" }}
              type="text"
              placeholder="Ingrese texto 1"
              onChange={(e) => setT1(e.target.value)}
            />
            <button onClick={() => updateT1()}>GUARDAR</button>
          </Modal>
        </div>
        <div className="cards_novedades"></div>
        <Slider>
          <a href="">
            <Card_news
              image={
                <img className="icons_novedades" src={""} alt="" width="50%" />
              }
              title={"TENDENCIAS 2023"}
            ></Card_news>{" "}
          </a>
          <a href="">
            <Card_news
              image={
                <img className="icons_novedades" src={""} alt="" width="50%" />
              }
              title={"TENDENCIAS 2023"}
            ></Card_news>
          </a>
          <a href="">
            <Card_news
              image={
                <img className="icons_novedades" src={""} alt="" width="50%" />
              }
              title={"TENDENCIAS 2023"}
            ></Card_news>
          </a>
        </Slider>
      </div>
      <div className="btn_cont">
        <button className="news_btn"></button>
      </div>
    </div>
  );
};

export default News;
