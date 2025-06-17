import { useState, useEffect } from "react";
import "../../pages/Profile.css";
import { Layout } from "../../components/Layout";
import { useParams } from "react-router-dom";

const genreOptions = [
  "Фэнтези",
  "Детектив",
  "Триллер",
  "Комедия",
  "Романтика",
  "Драма",
  "Классика",
];

const mockedUsers = [
  {
    id: 1,
    username: "GogaBurak",
    avatar: "/avatars/ava3.jpg",
    city: "Minsk",
    genres: ["Романы", "Программирование"],
  },
  // другие пользователи...
];

function AdminUserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newGenre, setNewGenre] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    const found = mockedUsers.find((u) => u.id === +id);
    setUser(found);
  }, [id]);

  const toggleGenre = (genre) => {
    setUser((prev) => {
      const currentGenres = Array.isArray(prev.genres) ? prev.genres : [];
      return {
        ...prev,
        genres: currentGenres.includes(genre)
          ? currentGenres.filter((g) => g !== genre)
          : [...currentGenres, genre],
      };
    });
  };

  const handleSave = () => {
    console.log("Saving changes:", user);
    setEditMode(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      console.log("Deleting user:", user.id);
    }
  };

  if (!user)
    return (
      <Layout>
        <div className="loading">Loading...</div>
      </Layout>
    );

  return (
    <Layout>
      <div className="profile-container">
        <div className="profile-card">
          <button
            className="books-icon"
            onClick={() => alert("Reported user!")}
          />
          <div
            className={`avatar-wrapper ${editMode ? "editable-avatar" : ""}`}
          >
            <label className="avatar-label">
              <img
                src={avatarPreview || user.avatar || "/avatars/ava1.jpg"}
                alt="Avatar"
                className="avatar-img"
              />
              {editMode && <span className="change-text">CHANGE</span>}
              {editMode && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setUser((prev) => ({ ...prev, avatar: file }));
                      setAvatarPreview(URL.createObjectURL(file));
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
                value={user.username}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, username: e.target.value }))
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
              <h2 className="username">{user.username}</h2>
              <p className="profile-city">{user.city}</p>
            </>
          )}

          <div className="section">
            <strong>Genres</strong>
            {editMode ? (
              <div className="genre-edit-container">
                <div className="selected-genres">
                  {user.genres.map((g) => (
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

          <div className="button-row">
            {editMode ? (
              <button className="save-button" onClick={handleSave}>
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
                <button
                  className="logout-button"
                  onClick={() => alert(`Messaging ${user.username}...`)}
                >
                  Message
                </button>
                <button className="delete-button" onClick={handleDelete}>
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminUserProfile;
