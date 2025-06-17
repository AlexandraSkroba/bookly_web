import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAuthStatus } from "../utils/auth";

export const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const [hasUnreadMessages, setHasUnreadMessages] = useState(true);

  useEffect(() => {
    fetchAuthStatus().then((user) => {
      if (user) setUserData(user);
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
    if (userData.username) {
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
            {/* USERS */}
          </a>
          <div
            className="nav-item-wrapper"
            onClick={() => protectedNavigate("/chats")}
          >
            <a className="nav-item">CHATS</a>
            {/* {hasUnreadMessages && <span className="chat-notification-dot" />} */}
          </div>
          <a onClick={() => protectedNavigate("/catalog")} className="nav-item">
            CATALOG
          </a>
        </nav>
        <div className="profile-button" onClick={handleProfileClick}>
          {userData?.avatar ? (
            <img
              src={`http://localhost:3001${userData.avatar}?${Date.now()}`}
              alt="avatar"
              className="profile-avatar-header"
            />
          ) : (
            <span className="profile-icon"></span>
          )}
          {userData ? userData.username.toUpperCase() : "LogIn / SignUp"}
        </div>
      </header>

      <main className="content">{children}</main>
      <footer></footer>
    </div>
  );
};
