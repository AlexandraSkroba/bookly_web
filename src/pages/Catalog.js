import "../App.css";
import "../pages/Catalog.css";
import { Layout } from "../components/Layout";
import { useNavigate } from "react-router-dom";

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

function Catalog() {
  const navigate = useNavigate();
  const handleBookClick = () => {
    navigate("/about-book");
  };

  return (
    <Layout>
      <div className="catalog-container">
        <table className="book-table">
          <thead>
            <tr>
              <th>COVER</th>
              <th>TITLE</th>
              <th>AUTHOR</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, i) => (
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
            ))}
            <tr className="line-extension-row">
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <div className="recommend-panel">
          <h3>RECOMMEND</h3>
          {recommendations.map((rec, i) => (
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
