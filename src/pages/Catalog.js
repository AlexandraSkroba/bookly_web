import "../App.css";
import "../pages/Catalog.css";
import { Layout } from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const genreList = [
  "Фэнтези",
  "Детектив",
  "Триллер",
  "Комедия",
  "Романтика",
  "Драма",
  "Классика",
];

const aiRecommendations = [
  {
    cover: "covers/ai1.png",
    title: "Чистый код",
    author: "Роберт Мартин",
  },
  {
    cover: "covers/ai2.png",
    title: "Программист-прагматик",
    author: "Эндрю Хант",
  },
];

const books = [
  {
    cover: "covers/1.png",
    title: "Чистая архитектура",
    author: "Роберт Мартин",
  },
  {
    cover: "covers/2.png",
    title: "Мартин Иден",
    author: "Джек Лондон",
  },
  {
    cover: "covers/3.png",
    title: "Generation «П»",
    author: "Виктор Пелевин",
  },
  {
    cover: "covers/4.png",
    title: "Финансист",
    author: "Теодор Драйзер",
  },
  {
    cover: "covers/2.png",
    title: "Мартин Иден",
    author: "Джек Лондон",
  },
  {
    cover: "covers/3.png",
    title: "Generation «П»",
    author: "Виктор Пелевин",
  },
  {
    cover: "covers/4.png",
    title: "Финансист",
    author: "Теодор Драйзер",
  },
];

const recommendations = [
  {
    cover: "covers/5.png",
    title: "Голова профессора Доуэля",
    author: "Александр Беляев",
  },
  {
    cover: "covers/6.png",
    title: "Хроники Нарнии",
    author: "Клайв Льюис",
  },
  {
    cover: "covers/7.png",
    title: "Автостопом по галактике",
    author: "Дуглас Адамс",
  },
  {
    cover: "covers/6.png",
    title: "Хроники Нарнии",
    author: "Клайв Льюис",
  },
  {
    cover: "covers/7.png",
    title: "Автостопом по галактике",
    author: "Дуглас Адамс",
  },
];

const newRecommendations = [
  {
    cover: "covers/ai2.jpg",
    title: "Программист-прагматик",
    author: "Эндрю Хант",
  },
  {
    cover: "covers/sicp.jpg",
    title: "Структура и интерпретация компьютерных программ",
    author: "Харольд Абельсон",
  },
  {
    cover: "covers/6.png",
    title: "Хроники Нарнии",
    author: "Клайв Льюис",
  },
  {
    cover: "covers/stalker.jpg",
    title: "Пикник на обочине",
    author: "Аркадий и Борис Стругацикие",
  },
  {
    cover: "covers/solaris.jpg",
    title: "Солярис",
    author: "Станислав Лем",
  },
]

const allBooks = [...books, ...recommendations];

function Catalog() {
  const navigate = useNavigate();
  const handleBookClick = () => {
    setNewRecommendations()
    navigate("/about-book");
  };

  const setNewRecommendations = () => {
    setTimeout(() => {
      localStorage.setItem("recommendations", JSON.stringify(newRecommendations))
    }, 3000)
  }

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [searchSubmitted, setSearchSubmitted] = useState(false);

  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiResults, setAIResults] = useState([]);

  const handleSearchSubmit = () => {
    setSearchSubmitted(true);

    if (!searchQuery) {
      setAIResults([]);
      return;
    }

    setIsLoadingAI(true);

    setTimeout(() => {
      const lowerQuery = searchQuery.toLowerCase();

      const exactMatches = allBooks.filter(
        (book) =>
          book.title.toLowerCase() === lowerQuery ||
          book.author.toLowerCase() === lowerQuery
      );

      const partialMatches = allBooks.filter(
        (book) =>
          !exactMatches.includes(book) &&
          (book.title.toLowerCase().includes(lowerQuery) ||
            book.author.toLowerCase().includes(lowerQuery))
      );

      const finalList =
        exactMatches.length > 0 || partialMatches.length > 0
          ? [...exactMatches, ...partialMatches]
          : aiRecommendations;

      setAIResults(finalList);
      setIsLoadingAI(false);
    }, 2000);
  };

  const filteredBooks = allBooks.filter((book) => {
    const matchesQuery =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGenre =
      selectedGenres.length === 0 || selectedGenres.includes(book.genre);

    return matchesQuery && matchesGenre;
  });

  const showAIRecommendations =
    searchSubmitted && searchQuery && filteredBooks.length === 0;

  const similarBooks = allBooks.filter((book) => {
    return (
      searchQuery &&
      !filteredBooks.includes(book) &&
      (book.title.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        book.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase().split(" ")[0]))
    );
  });

  const renderBookRow = (book, i) => (
    <tr key={i}>
      <td className="td-img">
        <img
          src={book.cover}
          alt={book.title}
          className="book-cover"
          onClick={handleBookClick}
        />
      </td>
      <td>{book.title}</td>
      <td>{book.author}</td>
    </tr>
  );

  return (
    <Layout>
      <div className="catalog-container">
        <div className="book-section">
          <div className="search-filter-bar">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchSubmitted(false); // сбрасываем при вводе
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearchSubmit();
                }}
                onBlur={handleSearchSubmit}
              />
            </div>

            <div className="genre-filter-dropdown">
              <div
                className="dropdown-toggle"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Filter by genre ▾
              </div>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  {genreList.map((genre) => (
                    <label key={genre} className="dropdown-item">
                      <input
                        type="text"
                        placeholder="Search by title or author..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setSearchSubmitted(false);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSearchSubmit();
                        }}
                        onBlur={handleSearchSubmit}
                      />
                      {genre}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <table className="book-table">
            <thead>
              <tr>
                <th>COVER</th>
                <th>TITLE</th>
                <th>AUTHOR</th>
              </tr>
            </thead>
            <tbody>
              {searchSubmitted ? (
                isLoadingAI ? (
                  <tr>
                    <td
                      colSpan="3"
                      style={{ textAlign: "center", padding: "20px" }}
                    >
                      Пожалуйста, подождите...
                    </td>
                  </tr>
                ) : aiResults.length > 0 ? (
                  aiResults.map(renderBookRow)
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      style={{ textAlign: "center", padding: "20px" }}
                    >
                      Ничего не найдено
                    </td>
                  </tr>
                )
              ) : (
                allBooks.map(renderBookRow)
              )}
              <tr className="line-extension-row">
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="recommend-panel">
          <h3>RECOMMEND</h3>
          {console.log(JSON.parse(localStorage.getItem("recommendations")))}
          {(JSON.parse(localStorage.getItem("recommendations")) || recommendations).map((rec, i) => (
            <div className="recommend-item" key={i}>
              <img
                src={rec.cover}
                alt={rec.title}
                className="recommend-cover"
                onClick={handleBookClick}
              />
              <p className="recommend-title">{rec.title}</p>
              <p className="recommend-author">{rec.author}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Catalog;
