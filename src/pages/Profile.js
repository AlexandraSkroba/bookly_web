import { useState } from "react";
import "../pages/Profile.css";
import { Layout } from "../components/Layout";
import { useAuth } from "../context/AuthContext";

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
  const [name] = useState("AALEXANDRA");
  const [city] = useState("Minsk");
  const [genres] = useState(["Фэнтези", "Детектив"]);
  const [newGenre, setNewGenre] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [shake, setShake] = useState(false);

  const [user, setUser] = useState({
    name: "AALEXANDRA",
    city: "Minsk",
    genres: ["Фэнтези", "Детектив"],
    avatar: "/avatars/ava1.jpg",
  });

  const toggleGenre = (genre) => {
    setUser((prevUser) => ({
      ...prevUser,
      genres: prevUser.genres.includes(genre)
        ? prevUser.genres.filter((g) => g !== genre)
        : [...prevUser.genres, genre],
    }));
  };

  const handleDelete = () => {
    if (confirmText === "DELETE ACCOUNT") {
      alert("Account deleted.");
      // отправь запрос на удаление здесь
      setShowDeleteModal(false);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const { logout } = useAuth();

  return (
    <Layout>
      <div className="profile-container">
        <div className="profile-card">
          <div
            className={`avatar-wrapper ${editMode ? "editable-avatar" : ""}`}
          >
            <label className="avatar-label">
              <img src={user.avatar} alt="Avatar" className="avatar-img" />
              {editMode && <span className="change-text">CHANGE</span>}
              {editMode && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setUser((prev) => ({ ...prev, avatar: reader.result }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  style={{ display: "none" }}
                />
              )}
            </label>
          </div>

          {editMode ? (
            <>
              <input
                className="edit-name"
                value={user.name}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <input
                className="edit-city"
                value={user.city}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, city: e.target.value }))
                }
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
              <p>{user.genres.join(", ")}</p>
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
                <button className="logout-button" onClick={logout}>
                  Logout
                </button>
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
          <div className={`modal-content ${shake ? "shake" : ""}`}>
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
