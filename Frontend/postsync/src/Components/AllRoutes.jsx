import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Signup from "../Pages/Signup";
import SinglePost from "../Pages/SinglePost";
import Login from "../Pages/Login";
import Contact from "../Pages/Contact";
import About from "../Pages/About";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/post/:id" element={<SinglePost />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/contact" element={<Contact />}/>
    </Routes>
  );
};

export default AllRoutes;
