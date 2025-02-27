import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user ? user.access_token : null;

        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get("http://127.0.0.1:8000/api/posts", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setPosts(response.data);
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy danh sách bài viết!", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Danh sách bài viết</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;