import "../App.css";
import "../pages/MyBooks.css";
import { Layout } from "../components/Layout";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const allBooks = [
  {
    cover: "covers/1.png",
    title: "Чистая архитектура",
    author: "Роберт Мартин",
    ownerId: 1,
  },
  {
    cover: "covers/2.png",
    title: "Мартин Иден",
    author: "Джек Лондон",
    ownerId: 1,
  },
  {
    cover: "covers/3.png",
    title: "Generation «П»",
    author: "Виктор Пелевин",
    ownerId: 2,
  },
  {
    cover: "covers/4.png",
    title: "Финансист",
    author: "Теодор Драйзер",
    ownerId: 3,
  },
  {
    cover: "covers/2.png",
    title: "Мартин Иден",
    author: "Джек Лондон",
    ownerId: 2,
  },
  {
    cover: "covers/3.png",
    title: "Generation «П»",
    author: "Виктор Пелевин",
    ownerId: 1,
  },
  {
    cover: "covers/4.png",
    title: "Финансист",
    author: "Теодор Драйзер",
    ownerId: 3,
  },
];

const userNames = {
  1: "GogaBurak",
  2: "MimiMumu",
  3: "Anna ChikiPiki",
};

function MyBooks() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { userId } = useParams();

  const viewingUserId = userId ? parseInt(userId) : 1; // 1 = current user
  const isMyBooks = !userId; // Если userId нет — это свои книги

  const filteredBooks = allBooks.filter(
    (book) => book.ownerId === viewingUserId
  );

  const handleBookClick = () => {
    navigate("/about-book");
  };

  const handleAddClick = () => {
    navigate("/about-book", { state: { editMode: true } });
  };

  return (
    <Layout>
      <div className="mybook-container">
        <h2 className="my-books">
          {isMyBooks ? "MY BOOKS" : `USER'S BOOKS ${userNames[viewingUserId]}`}
        </h2>
        <div className="mybook-table-scroll">
          <table className="mybook-table">
            <thead>
              <tr>
                <th>COVER</th>
                <th>TITLE</th>
                <th>AUTHOR</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book, i) => (
                <tr key={i}>
                  <td className="td-img">
                    <img
                      src={`/${book.cover}`}
                      alt={book.title}
                      className="book-cover"
                      onClick={handleBookClick}
                    />
                  </td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                </tr>
              ))}
              <tr className="myline-extension-row">
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        {isMyBooks && (
          <button className="add-btn" onClick={handleAddClick}>
            ADD
          </button>
        )}
      </div>
    </Layout>
  );
}

export default MyBooks;
