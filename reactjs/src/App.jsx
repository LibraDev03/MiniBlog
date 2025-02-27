import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/login";
import Register from "./auth/register";
import Home from "./pages/home";
import Post from "./features/posts/post";
import PostDetail from "./features/posts/PostDetail";
import ProtectedRoute from "./auth/ProtectedRoute";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router> 
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post" element={<ProtectedRoute element={Post} />} />
        <Route path="/post/:id" element={<ProtectedRoute element={PostDetail} />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;