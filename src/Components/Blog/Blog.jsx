import React, { useEffect, useState, useRef } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { ref, deleteObject, getDownloadURL } from "firebase/storage";
import { Header } from "../Header/header";
import "./blog.css";
import Sidebar from "./Sidebar";
import Contact_button from "../Home/Contact_button/Contact_button";
import "../Home/Contact_button/contact_button.css";
import CardNews from "../News/Card_news/Card_news";
import arrow_L from "../Home/icon_arrow_left.svg";
import { useCustomContext } from "../../Hooks/Context/Context";

function Blog() {
  const [isAuth, setIsAuth] = useState(false);
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const postsCollectionRef = collection(db, "posts");
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCustomContext();
  const [visibleCards, setVisibleCards] = useState(6);
  const cardsPerPage = 3;
  useEffect(() => {
    setIsAuth(localStorage.getItem("isAuth") === "true");
  }, []);

  const deletePost = async (id, imageUrl) => {
    setIsLoading(true);

    const postDoc = doc(db, "posts", id);

    try {
      if (imageUrl) {
        const imageRef = ref(storage, imageUrl);
        await getDownloadURL(imageRef);
        await deleteObject(imageRef);
      }

      await deleteDoc(postDoc);
      setPostList((prevPostList) =>
        prevPostList.filter((post) => post.id !== id)
      );
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const editPost = (id) => {
    const postToEdit = postList.find((post) => post.id === id);
    navigate(`/edit-post/${id}`, { state: { editPost: postToEdit } });
  };

  const handlePostClick = (id) => {
    navigate(`/blog/${id}`);
    window.scroll({
      top: 0,
    });
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          date: new Date(doc.data().time).toLocaleDateString(),
        }))
      );
    };
    getPosts();
  }, []);
  const firstSection = useRef(null);
  const scrollToTop = () => {
    firstSection.current?.scrollIntoView({ behavior: "smooth" });
  };
  const sortedPostList = postList.sort((a, b) => b.time - a.time);
  return (
    <div className="blog" ref={firstSection}>
      <button className="arrow_up12" onClick={scrollToTop}>
        <img className="arrow_up" src={arrow_L} alt="Arrow Up" />
      </button>

      <Header cartItem={cart} handleDelete={removeFromCart} />
      <Contact_button />
      <div className="BlogPage" >
  
        <div className="blog-sidebar">
          <div className="postContainer">
          <h1 className="blogTitle_">NUESTRO BLOG</h1>
            <div className="cardContainerblog">
              {sortedPostList.slice(0, visibleCards).map((post) => (
                <div className="card-blog" key={post.id}>
                  <div
                    className="blogImage"
                    onClick={() => handlePostClick(post.id)}
                  >
                    <CardNews
                      image={
                        <img
                          className="icons_novedades"
                          src={post.imageUrl}
                          alt={post.imageUrl}
                        />
                      }
                      description={post.postText}
                      title={<h2>{post.title}</h2>}
                    />
                  </div>

                  
                    <span>{post.date}</span>
                  <div className="cardHeaderblog">
                    <div className="deleteblog">
                      {isAuth && post.author && (
                        <>
                          <button
                            onClick={() => {
                              deletePost(post.id, post.imageUrl);
                            }}
                            className="deleteblogButton"
                            disabled={isLoading}
                          >
                            {isLoading ? "Deleting..." : "Delete"}
                          </button>
                          <button
                            onClick={() => {
                              editPost(post.id);
                            }}
                            className="editblogButton"
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="cardFooterblog"></div>
                </div>
              ))}
            </div>
            {visibleCards < sortedPostList.length && (
              <div className="vermas-btn">
                <button
                  className="more_products"
                  onClick={() => setVisibleCards(visibleCards + cardsPerPage)}
                >
                  Ver más
                </button>
              </div>
            )}
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default Blog;