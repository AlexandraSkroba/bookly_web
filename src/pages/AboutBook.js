import "../App.css";
import "../pages/AboutBook.css";
import { Layout } from "../components/Layout";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function AboutBook() {
  const book = {
    cover: "/covers/8.png",
    title: "Гордость и предубеждение",
    author: "Джейн Остен",
    description:
      "Классический роман Джейн Остин о любви и предрассудках. Элизабет Беннет и мистер Дарси проходят путь от взаимного непонимания к глубокому чувству, преодолевая гордость и предубеждения. История полна остроумия, романтики и социальной сатиры.",
    genre: ["Классика", "Роман"],
    fromOwner:
      "Книга в отличном состоянии. Для тех кто любит сопли и романтику",
    ownerId: 1,
  };

  const owner = {
    username: "GogaBurak",
  };

  const currentUserId = 1;
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
                  className="book-edit-textarea"
                  placeholder="Text something or generate..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <p className="edit-book-section-title">Genre</p>
                <input
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
                  <button className="book-generate-button">
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
                  <button className="request-button">REQUEST EXCHANGE</button>
                )}
              </>
            )}
          </div>
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
