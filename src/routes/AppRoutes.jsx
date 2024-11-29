import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import CreateBlogPost from '../pages/CreateBlogPost';
import SinglePage from '../pages/SinglePage';
import UpdatePage from '../pages/UpdatePage';

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-blog" element={<CreateBlogPost />} />
        <Route path="/read-more" element={<SinglePage />} />
        {/*<Route path="/update" element={<UpdatePage />} />
        <Route path="/update/:id" element={<UpdatePage />} />*/}
        <Route path="/blogs/update/:id" element={<UpdatePage />} />
      </Routes>
    
  )
}

export default AppRoutes;