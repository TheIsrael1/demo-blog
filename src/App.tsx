import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BlogContextProvider } from './context/BlogContextProvider';
import { UserContextProvider } from './context/UserContextProvider';
import Home from './pages/Home';
import SingleBlog from './pages/SingleBlog';

function App() {
  return (
    <UserContextProvider>
    <BlogContextProvider>
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/blog/:id" element={<SingleBlog />}/>
        </Routes>
    </BrowserRouter>
    </BlogContextProvider>
    </UserContextProvider>
  );
}

export default App;
