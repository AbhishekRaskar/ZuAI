import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">About Us</h1>
        <p className="text-gray-700 mb-4">
          Welcome to our website! We are committed to delivering an exceptional
          experience with top-notch service and high-quality products.
        </p>
        <p className="text-gray-700 mb-6">
          Our platform offers a robust set of features for managing your posts.
          You can create, read, update, and delete posts, ensuring a
          comprehensive and user-friendly experience. Each user has access only
          to their own posts, providing a personalized and secure environment.
        </p>
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-800">
            CRUD Operations
          </h2>
          <ul className="list-disc list-inside mt-2 text-gray-700">
            <li>Create: Easily add new posts to your account.</li>
            <li>Read: View details of your posts at any time.</li>
            <li>Update: Modify your posts as needed.</li>
            <li>Delete: Remove posts that are no longer relevant.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
