import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import Login from "./Login";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [editPost, setEditPost] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      fetchPosts();
    }
  }, [token]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("https://zuai-be.onrender.com/posts/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleUpdate = async (id, updatedPost) => {
    try {
      await fetch(`https://zuai-be.onrender.com/posts/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedPost),
      });
      setAlertMessage("Post updated successfully!");
      setEditPost(null);
      fetchPosts();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleCreate = async (newPost) => {
    try {
      await fetch("https://zuai-be.onrender.com/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPost),
      });
      setNewPost({ title: "", content: "" });
      setAlertMessage("Post created successfully!");
      fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://zuai-be.onrender.com/posts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAlertMessage("Post deleted successfully!");
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditChange = (e) => {
    setEditPost({
      ...editPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreate(newPost);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editPost) {
      handleUpdate(editPost._id, editPost);
    }
  };

  return (
    <div className="p-4">
      {isLoggedIn ? (
        <div>
          {alertMessage && (
            <div className="bg-green-100 align-middle text-green-800 p-4 mb-4 rounded">
              {alertMessage}
            </div>
          )}
          <div className="flex justify-center mb-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <input
                type="text"
                name="title"
                value={newPost.title}
                onChange={handleChange}
                placeholder="Title"
                className="border p-2 mb-2 w-full"
              />
              <textarea
                name="content"
                value={newPost.content}
                onChange={handleChange}
                placeholder="Content"
                className="border p-2 mb-2 w-full"
                rows="4"
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Create Post
              </button>
            </form>
          </div>

          {editPost && (
            <div className="flex justify-center mb-4">
              <form onSubmit={handleEditSubmit} className="w-full max-w-md">
                <input
                  type="text"
                  name="title"
                  value={editPost.title}
                  onChange={handleEditChange}
                  placeholder="Title"
                  className="border p-2 mb-2 w-full"
                />
                <textarea
                  name="content"
                  value={editPost.content}
                  onChange={handleEditChange}
                  placeholder="Content"
                  className="border p-2 mb-2 w-full"
                  rows="4"
                />
                <button
                  type="submit"
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Update Post
                </button>
                <button
                  type="button"
                  onClick={() => setEditPost(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                >
                  Cancel
                </button>
              </form>
            </div>
          )}

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white shadow-2xl rounded-lg p-4 border-2 border-dotted border-black"
              >
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-700 mb-4">{post.content}</p>
                <div className="flex space-x-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => setEditPost(post)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                  <Link
                    to={`/post/${post._id}`}
                    className="text-blue-500 px-2 py-1 rounded"
                  >
                    More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Home;
