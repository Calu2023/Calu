import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { useEffect, useState } from 'react';
import { collection, getDocs, limitToLast, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase-config';

const Sidebar = () => {
  const [postList, setPostList] = useState([]);
  const navigate = useNavigate();
  const queryDocs = query(collection(db, 'posts'));

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

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(queryDocs);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, [queryDocs]);
  const handlePostClick = (id) => {
    navigate(`/blog/${id}`);
  };
  return (
    <aside className='lateralBar'>
      <h2 className='lateralBarTitle'>Sugerencias</h2>
      <div className='lateralContainer'>
        {posts &&
          posts.map((post) => (
            <div className='sb_blog_title'>
              <p className='sb_blog_title' onClick={() => handlePostClick(post.id)}>
                {post.data().title}
                {/* <Link className="sb_blog_title" to={post.id}>
                </Link> */}
              </p>
              <hr />
            </div>
          ))}
      </div>

      <div className='lateralContainer'>
        <div className='lastBlogs'>
          {/*  {postList.map((post, index) => (
            <div className='last' onClick={() => handlePostClick(post.id)} key={index}>
              <img src={post.imageUrl} alt={post.imageUrl} />
              <p>{post.title}</p>
            </div>
          ))} */}
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
