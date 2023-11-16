import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  collection,
  getDocs,
  limitToLast,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase-config";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  ///////GET BLOGS
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

  ///////////////////////////
  const handlePostClick = (id) => {
    navigate(`/blog/${id}`);
  };
  return (
    <aside className="lateralBar">
      <h2 className="lateralBarTitle">Sugerencias</h2>
      <div className="lateralContainer">
        {posts &&
          posts.map(
            (post, index) =>
              // Comprueba si la URL actual coincide con la del post
              location.pathname !== `/blog/${post.id}` && (
                <div key={index}>
                  <p onClick={() => handlePostClick(post.id)}>
                    <div className="sb_blog_image">
                      <img
                        src={post.data().imageUrl}
                        alt={`Imagen ${post.data().title}`}
                      />
                    </div>
                    <div className="sb_blog_title">{post.data().title}</div>
                  </p>
                  <hr />
                </div>
              )
          )}
      </div>

      <div className="lateralContainer">
        <div className="lastBlogs"></div>
      </div>
    </aside>
  );
};
export default Sidebar;
