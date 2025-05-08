import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/signup");
  };
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="page-container">
      <header>
        <h1 className="logo" onClick={handleLogoClick}>
          BOOKLY
        </h1>
        <nav className="nav-bar">
          <a href="#" className="nav-item">
            MY BOOKS
          </a>
          <a href="#" className="nav-item">
            CHATS
          </a>
          <a href="#" className="nav-item">
            SEARCH
          </a>
        </nav>

        <div className="profile-button" onClick={handleProfileClick}>
          <span className="profile-icon"></span>
          LogIn / SignUp
        </div>
      </header>

      <main className="content">
        <img className="img-books" src="/books.png" alt="books" />
        <div className="inter-text">
          <h2>Exchange Books, Discover Stories</h2>
          <p>
            Join a community of readers sharing and discovering new books. List
            your books, find exciting reads, connect with others, and track
            exchanges—all in one place! Let's make book swapping simple and
            enjoyable.
          </p>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}

export default App;
