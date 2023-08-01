import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { Header } from "../Header/header";
import "./BlogView.css";
import "./blog.css";
import Footer from "../Footer/Footer";
import Sidebar from "./Sidebar";
import CTN from "../CTN/CTN";
import Contact_button from "../Home/Contact_button/Contact_button";
import "../Home/Contact_button/contact_button.css";
import YouTube from "react-youtube";
import { LoadingComponent } from "../LoadingComponent/LoadingComponent";

function BlogView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar si se está cargando el contenido del post

  useEffect(() => {
    const getPost = async () => {
      try {
        const postDoc = doc(db, "posts", id);
        const docSnapshot = await getDoc(postDoc);
        if (docSnapshot.exists()) {
          setPost(docSnapshot.data());
        } else {
          console.log("El post no existe");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setIsLoading(false); // Indicar que el contenido del post se ha cargado correctamente o ha ocurrido un error al cargarlo
      }
    };

    getPost();
  }, [id]);

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
      <div className="BlogView">
        <Header />
        <Contact_button />

        {isLoading ? (
          <LoadingComponent /> // Mostrar LoadingComponent mientras se obtiene el contenido del post
        ) : (
          <>
            <h1 className="blogTitle">{post.title}</h1>
            <div className="blogView-sidebar">
              <div className="blogContainer">
                <div className="blogCard">
                  <img className="blogImg" src={post.imageUrl} alt="" />
                  <div className="blogText">
                    <h3 className="mini-description">{post.postText}</h3>
                    {post.youtubeLink && (
                      <div className="youtubePlayer">
                        <YouTube videoId={getYouTubeVideoId(post.youtubeLink)} />
                      </div>
                    )}
                    {post.additionalContent && (
                      <div>
                        <p className="aditional-content">
                          {post.additionalContent}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Sidebar />
            </div>

            <div className="date-tagContainer">
              <div className="date-tags">
                <p>{post.time}</p>
                <hr />
              </div>
            </div>
          </>
        )}

        <div className="ctn">
          <CTN />
        </div>
        <div className="footer-blogView">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default BlogView;
