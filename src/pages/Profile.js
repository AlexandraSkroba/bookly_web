import { useState } from "react";
import "../pages/Profile.css";
import { Layout } from "../components/Layout";

const genreOptions = [
  "Фэнтези",
  "Детектив",
  "Триллер",
  "Комедия",
  "Романтика",
  "Драма",
  "Классика",
];

function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("AALEXANDRA");
  const [city, setCity] = useState("Minsk");
  const [genres, setGenres] = useState(["Фэнтези", "Детектив"]);
  const [newGenre, setNewGenre] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const toggleGenre = (genre) => {
    setGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleDelete = () => {
    if (confirmText === "DELETE ACCOUNT") {
      alert("Account deleted.");
      // отправь запрос на удаление здесь
      setShowDeleteModal(false);
    } else {
      alert("Wrong confirmation text!");
    }
  };

  return (
    <Layout>
      <div className="profile-container">
        <div className="profile-card">
          <div className={`avatar ${editMode ? "editable-avatar" : ""}`}>
            {editMode && <span>CHANGE</span>}
          </div>

          {editMode ? (
            <>
              <input
                className="edit-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="edit-city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </>
          ) : (
            <>
              <h2 className="username">{name}</h2>
              <p className="profile-city">{city}</p>
            </>
          )}

          <div className="section">
            <strong>Genres</strong>

            {editMode ? (
              <div className="genre-edit-container">
                <div className="selected-genres">
                  {genres.map((g) => (
                    <span key={g} className="genre-tag">
                      {g}
                      <button onClick={() => toggleGenre(g)}>×</button>
                    </span>
                  ))}
                </div>
                <div className="genre-list">
                  {genreOptions.map((g) => (
                    <div
                      key={g}
                      className="genre-option"
                      onClick={() => toggleGenre(g)}
                    >
                      {g}
                    </div>
                  ))}
                  <input
                    placeholder="Add new…"
                    className="input-add-new genre-option"
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newGenre.trim()) {
                        toggleGenre(newGenre.trim());
                        setNewGenre("");
                      }
                    }}
                  />
                </div>
              </div>
            ) : (
              <p>{genres.join(", ")}</p>
            )}
          </div>

          {!editMode && (
            <div className="section track">
              <strong>Track</strong>
              <br />
              <input
                className="track-input"
                type="text"
                placeholder="Enter track number..."
              />
              <br />
              <button className="search-button">Search</button>
            </div>
          )}

          <div className="button-row">
            {editMode ? (
              <button
                className="save-button"
                onClick={() => setEditMode(false)}
              >
                SAVE
              </button>
            ) : (
              <>
                <button
                  className="edit-button"
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </button>
                <button className="logout-button">Logout</button>
                <button
                  className="delete-button"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">DELETE ACCOUNT?</div>
            <p>
              To delete an account, enter <b>DELETE ACCOUNT</b> in the box
              below.
            </p>
            <input
              className="delete-input"
              placeholder="DELETE ACCOUNT"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
            />
            <br />
            <button
              className="del-btn submit-delete-button"
              onClick={handleDelete}
            >
              SUBMIT :(
            </button>
            <button
              className="del-btn cancel-btn"
              onClick={() => {
                setShowDeleteModal(false);
                setConfirmText("");
              }}
            >
              CANCEL!
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Profile;
