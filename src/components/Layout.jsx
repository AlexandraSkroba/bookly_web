import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAuthStatus } from "../utils/auth";

export const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    fetchAuthStatus().then((user) => {
      if (user) setUsername(user.username);
    });
  }, []);

  const protectedNavigate = (path) => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(path);
    } else {
      navigate("/signup");
    }
  };

  const handleProfileClick = () => {
    if (username) {
      navigate("/profile");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="page-container">
      <header>
        <h1 className="logo" onClick={() => navigate("/")}>
          BOOKLY
        </h1>
        <nav className="nav-bar">
          <a
            onClick={() => protectedNavigate("/my-books")}
            className="nav-item"
          >
            MY BOOKS
          </a>
          <a onClick={() => protectedNavigate("/chats")} className="nav-item">
            CHATS
          </a>
          <a onClick={() => protectedNavigate("/catalog")} className="nav-item">
            CATALOG
          </a>
        </nav>
        <div className="profile-button" onClick={handleProfileClick}>
          <span className="profile-icon"></span>
          {username ? username.toUpperCase() : "LogIn / SignUp"}
        </div>
      </header>

      <main className="content">{children}</main>
      <footer></footer>
    </div>
  );
};
