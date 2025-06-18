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
    cover: "covers/clean.jpg",
    title: "Чистая архитектура",
    author: "Роберт Мартин",
  },
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
    cover: "covers/patterns.jpg",
    title: "Паттерны проектирования",
    author: "Эрик Фримен",
  },
  {
    cover: "covers/kabanchik.jpg",
    title: "Высоконагруженные приложения. Программирование, масштабирование, поддержка",
    author: "Мартин Клеппман",
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

let newRec;

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

const aiRecommendations2 = [
  {
    cover: "covers/idiot.jpg",
    title: "Идиот",
    author: "Фёдор Достоевский",
  },
  {
    cover: "covers/brothers.jpg",
    title: "Братья Карамазовы",
    author: "Фёдор Достоевский",
  },
  {
    cover: "covers/crime.jpg",
    title: "Преступление и наказание",
    author: "Фёдор Достоевский",
  },
  {
    cover: "covers/oblomov.jpg",
    title: "Обломов",
    author: "Иван Гончаров",
  },
  {
    cover: "covers/fathers.jpg",
    title: "Отцы и дети",
    author: "Иван Тургенев",
  },
];

const allBooks = [...books, ...recommendations];

function Catalog() {
  const navigate = useNavigate();
  const handleBookClick = () => {
    navigate("/about-book");
    setNewRecommendations()
  };

  const setNewRecommendations = () => {

      newRec = true
      localStorage.setItem("recommendations", JSON.stringify(newRecommendations))
  }

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiResults, setAIResults] = useState([]);
  const [recs, setRecs] = useState()

  const handleSearchSubmit = () => {
    if (!searchQuery.trim()) {
      setAIResults([]);
      return;
    }

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

    const hasMatches = [...exactMatches, ...partialMatches].length > 0;

    if (!hasMatches && (lowerQuery === 'грокаем')) {
      setIsLoadingAI(true);
      setTimeout(() => {
        setAIResults(aiRecommendations);
        setIsLoadingAI(false);
      }, 2000);
    } else if(!hasMatches && (lowerQuery === 'игрок')) {
      setIsLoadingAI(true);
      setTimeout(() => {
        setAIResults(aiRecommendations2);
        setIsLoadingAI(false);
      }, 2000);
    } else {
      setAIResults([]);
    }
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
    searchQuery && filteredBooks.length === 0;

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

  const getRecommenations = () => {
    if (newRec) {
      setTimeout(() => {
        setRecs(JSON.parse(localStorage.getItem("recommendations")).map((rec, i) => (
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
        )))
      }, 1500)
    } else {
      setTimeout(() => {
        setRecs((recommendations).map((rec, i) => (
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
        )))
      }, 0)
    }
  }

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
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearchSubmit();
                  }
                }}
                onBlur={() => {
                  setTimeout(() => handleSearchSubmit(), 150);
                }}
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
              {filteredBooks.length > 0
                ? filteredBooks.map(renderBookRow)
                : isLoadingAI
                ? (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center", padding: "20px" }}>
                      Пожалуйста, подождите...
                    </td>
                  </tr>
                )
                : aiResults.length > 0
                ? aiResults.map(renderBookRow)
                : (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center", padding: "20px" }}>
                      Ничего не найдено
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>

        <div className="recommend-panel">
          <h3>RECOMMEND</h3>
          {getRecommenations()}
          {recs}
        </div>
      </div>
    </Layout>
  );
}

export default Catalog;
