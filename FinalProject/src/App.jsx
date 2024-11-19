import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import HomePage from "./Pages/homePage.jsx";
import CreatePost from "./Pages/createPost.jsx";
import PostInfo from "./Pages/postInfo.jsx";
import EditPost from "./Pages/editPost.jsx";

const App = () => {
  const [search, setSearch] = useState(' ');
  console.log(search);
  return (
    <div className="App">
      <BrowserRouter>
        <div className="header">
          <Link to={"/"} > <h2 className="siteTitle"> MusiChat </h2> </Link>
          <input type="text" placeholder="Search" className="siteSearch" onChange={(e) => setSearch(e.target.value)}/>
          <Link to={"/create"}> <h2 className="siteCreate"> Create New Post </h2> </Link>
        </div>

        <Routes>
          <Route path="/" element={<HomePage search={search}/>} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostInfo />} />
          <Route path="/post/:id/edit" element={<EditPost />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
