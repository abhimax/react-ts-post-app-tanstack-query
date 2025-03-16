// src/App.tsx
import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import Posts from "./components/Posts";
import PaginatedPosts from "./components/PaginatedPosts";
import PostMutation from "./components/PostMutation";
import PostDetails from "./components/PostDetails";
import OptimisticUpdate from "./components/OptimisticUpdate";

const App: React.FC = () => {
  return (
    <Router>
      {/* Top Navigation */}
      <nav>
        <ul style={{ display: "flex", listStyle: "none", gap: "15px" }}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/paginated"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Paginated Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-post"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Add Post
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/optimistic-update"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Optimistic Update
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/paginated" element={<PaginatedPosts />} />
        <Route path="/add-post" element={<PostMutation />} />
        <Route path="/post/:postId" element={<PostDetails />} />
        <Route path="/optimistic-update" element={<OptimisticUpdate />} />
      </Routes>
    </Router>
  );
};

export default App;
