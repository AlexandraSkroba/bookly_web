import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [username] = useState("Alexandra");

  const handleProfileClick = () => {
    if (username) {
      navigate("/profile");
    } else {
      navigate("/signup");
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleCatalogClick = () => {
    navigate("/catalog");
  };

  const handleMyBooksClick = () => {
    navigate("/my-books");
  };

  const handleChatsClick = () => {
    navigate("/chats");
  };

  return (
    <div className="page-container">
      <header>
        <h1 className="logo" onClick={handleLogoClick}>
          BOOKLY
        </h1>
        <nav className="nav-bar">
          <a onClick={handleMyBooksClick} className="nav-item">
            MY BOOKS
          </a>
          <a onClick={handleChatsClick} className="nav-item">
            CHATS
          </a>
          <a onClick={handleCatalogClick} className="nav-item">
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
