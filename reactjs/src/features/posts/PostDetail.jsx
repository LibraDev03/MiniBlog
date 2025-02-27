import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user ? user.access_token : null;

        if (!token) {
          throw new Error("No token found");
        }

        const postResponse = await axios.get(`http://127.0.0.1:8000/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setPost(postResponse.data);
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy chi tiết bài viết!", error);
        setError("Có lỗi xảy ra khi lấy chi tiết bài viết!");
      }
    };

    fetchPostDetail();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <h2>Bình luận</h2>
      <ul>
        {post.c.map(comment => (
          <li key={comment.id}>
            <p>{comment.content}</p>
            <p><strong>{comment.user.name}</strong></p>
            {comment.replies && comment.replies.length > 0 && (
              <ul>
                {comment.replies.map(reply => (
                  <li key={reply.id}>
                    <p>{reply.content}</p>
                    <p><strong>{reply.user.name}</strong></p>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostDetail;