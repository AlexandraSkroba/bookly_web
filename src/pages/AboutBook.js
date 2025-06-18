import "../App.css";
import "../pages/AboutBook.css";
import { Layout } from "../components/Layout";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function AboutBook() {
  // const book = {
  //   cover: "/covers/clean.jpg",
  //   title: "Чистая архитектура",
  //   author: "Роберт Мартин",
  //   description:
  //     "Роберт Мартин дает прямые и лаконичные ответы на ключевые вопросы архитектуры и дизайна. «Чистую архитектуру» обязаны прочитать разработчики всех уровней, системные аналитики, архитекторы и каждый программист, который желает подняться по карьерной лестнице или хотя бы повлиять на людей, которые занимаются данной работой. Все архитектуры подчиняются одним и тем же правилам! ",
  //   genre: ["Программирование"],
  //   fromOwner: "",
  //   ownerId: 2,
  // };

  const book = {
    cover: "/covers/solaris.jpg",
    title: "Солярис",
    author: "Станислав Лем",
    description:
      "",
    genre: [""],
    fromOwner: "",
    ownerId: 2,
  };

  const owner = {
    username: "GogaBurak",
  };

  const currentUserId = 2;
  const isMyBook = book.ownerId === currentUserId;

  const location = useLocation();
  const startInEditMode = location.state?.editMode || false;

  const [editMode, setEditMode] = useState(startInEditMode);
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [description, setDescription] = useState(book.description);
  const [genre, setGenre] = useState(book.genre.join(", "));
  const [fromOwner, setFromOwner] = useState(book.fromOwner);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showRequestNotification, setShowRequestNotification] = useState(false);

  const handleGenerate = () => {
    const btn = document.querySelector(".book-generate-button");
    btn.disabled = true;

    setTimeout(() => {
      const description = document.getElementById("description");
      const genre = document.getElementById("genre");

      if (description) description.value = "Философская фантастика о попытке установить контакт с разумным океаном на далёкой планете. Через призму науки и психологии роман исследует природу человеческого сознания, вины и невозможности истинного понимания иного разума.";
      if (genre) genre.value = "Научная фантастика, Роман";

      btn.disabled = false; // включим кнопку обратно
    }, 1500);
};

  return (
    <Layout>
      <div className="about-container">
        <div className="about-book">
          <div
            className={`book-left ${editMode ? "book-editable-avatar" : ""}`}
          >
            <div
              className={`cover-wrapper ${editMode ? "cover-editable" : ""}`}
            >
              <img src={book.cover} alt={title} className="about-book-cover" />
              {editMode && <span className="cover-overlay-text">CHANGE</span>}
            </div>
            {isMyBook ? (
              <p></p>
            ) : (
              <p className="book-owner">Owner: {owner.username}</p>
            )}
          </div>

          <div className="book-right">
            {editMode ? (
              <>
                <input
                  className="book-edit-title"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  className="book-edit-author"
                  placeholder="Author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />

                <p className="edit-book-section-title">Description</p>
                <textarea
                  id="description"
                  className="book-edit-textarea"
                  placeholder="Text something or generate..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <p className="edit-book-section-title">Genre</p>
                <input
                  id="genre"
                  className="book-edit-input"
                  placeholder="Text something or generate..."
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                />

                <p className="edit-book-section-title">From owner</p>
                <input
                  className="book-edit-input"
                  placeholder="Text something..."
                  value={fromOwner}
                  onChange={(e) => setFromOwner(e.target.value)}
                />

                <div className="owner-buttons">
                  <button
                    className="book-save-button"
                    onClick={() => setEditMode(false)}
                  >
                    Save
                  </button>
                  <button className="book-generate-button" onClick={handleGenerate}>
                    Generate and wait
                  </button>
                </div>
                <p className="generation-hint">
                  IMPORTANT: The button generates only description and genres.
                  <br />
                  Before clicking, be sure to fill in the AUTHOR and TITLE
                  fields
                </p>
              </>
            ) : (
              <>
                <h2 className="book-title">{title}</h2>
                <p className="book-author">{author}</p>

                <p className="book-section-title">Description</p>
                <p className="book-description">{description}</p>

                <p className="book-section-title">Genre</p>
                <p className="book-description">{genre}</p>

                <p className="book-section-title">From owner</p>
                <p className="book-description">{fromOwner}</p>

                {isMyBook ? (
                  <div className="owner-buttons">
                    <button
                      className="book-edit-button"
                      onClick={() => setEditMode(true)}
                    >
                      Edit
                    </button>
                    <button
                      className="book-delete-button"
                      onClick={() => setShowDeleteModal(true)}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <button
                    className="request-button"
                    onClick={() => {
                      setShowRequestNotification(true);
                      setTimeout(() => setShowRequestNotification(false), 3000); // 3 сек
                    }}
                  >
                    REQUEST EXCHANGE
                  </button>
                )}
              </>
            )}
          </div>
          {showRequestNotification && (
            <div className="notification-banner">Exchange request sent!</div>
          )}

          {showDeleteModal && (
            <div className="book-modal-overlay">
              <div className="book-modal-content">
                <div className="book-modal-header">DELETE BOOK?</div>
                <p>Are you sure you want to delete this book?</p>
                <button
                  className="book-del-btn book-submit-delete-button"
                  onClick={() => {
                    alert("Book deleted."); // Тут можно отправить запрос на удаление
                    setShowDeleteModal(false);
                  }}
                >
                  DELETE
                </button>
                <button
                  className="book-del-btn book-cancel-btn"
                  onClick={() => setShowDeleteModal(false)}
                >
                  CANCEL
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default AboutBook;
