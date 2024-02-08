import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase-config';
import { Link, useNavigate } from 'react-router-dom';
import CardNews from './Card_news/Card_news';

const PostNews = () => {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    const getPostData = async () => {
      const post = await getPost();

      setPost(post.docs.slice(-3));
    };

    getPostData();
  }, []);
  const getPost = async () => {
    const results = await getDocs(query(collection(db, 'posts')));
    return results;
  };

  const navigate = useNavigate();
  const handlePostClick = (id) => {
    navigate(`/blog/${id}`);
  };
  return (
    <>
      {posts &&
        posts.map((post) => (
          <div onClick={() => handlePostClick(post.id)}>
            <CardNews
              image={
                <img src={post.data().imageUrl} width='120px' height='120px' alt=' post name' />
              }
              title={post.data().title}
            ></CardNews>
          </div>
        ))}

      <div className='btn_cont'>
        <button className='btn_news' onClick={() => ''}>
          <Link
            className='btn_news'
            to={'/blog'}
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
    </>
  );
};
export default PostNews;
