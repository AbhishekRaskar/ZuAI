import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); 
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://zuai-be.onrender.com/posts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchPost();
  }, [id, token]);
  console.log(post);

  return (
    <div className="p-4">
      {loading ? (
        <p className="text-center text-green-500 text-3xl">Loading post...</p>
      ) : post ? (
        <div className="bg-white shadow-xl rounded-lg p-6 border border-gray-200">
          <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
          <p className="text-gray-600 mb-4">Created By: {post.user}</p>
          <p className="text-gray-800 mb-4">Content: {post.content}</p>
          <div className="text-sm text-gray-500">
            <p>Created At: {new Date(post.createdAt).toLocaleDateString()}</p>
            <p>User ID: {post.userID}</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-red-500 text-lg">Post not found</p>
      )}
    </div>
  );
};

export default SinglePost;
