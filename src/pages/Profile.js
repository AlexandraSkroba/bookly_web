import { useState, useEffect } from "react";
import "../pages/Profile.css";
import { Layout } from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

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
  const [newGenre, setNewGenre] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [shake, setShake] = useState(false);
  const [user, setUser] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const { logout } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3001/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

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

  const handleSave = async () => {
    if (!user.username?.trim()) {
      alert("Name is required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("username", user.username.trim());
      formData.append("city", user.city || "");
      formData.append("genres", JSON.stringify(user.genres || []));

      // Добавить аватар, если он — файл:
      if (user.avatar instanceof File) {
        formData.append("avatar", user.avatar);
      }

      const res = await axios.put(
        "http://localhost:3001/user/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUser(res.data.user);
      setEditMode(false);
    } catch (err) {
      console.error("Failed to save profile:", err);
    }
  };

  const handleDelete = async () => {
    if (confirmText === "DELETE ACCOUNT") {
      try {
        const token = localStorage.getItem("token");

        await axios.delete("http://localhost:3001/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        localStorage.removeItem("token");
        logout();
      } catch (error) {
        console.error("Failed to delete account:", error);
        alert("Something went wrong while deleting account.");
      }
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
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
          <div
            className={`avatar-wrapper ${editMode ? "editable-avatar" : ""}`}
          >
            <label className="avatar-label">
              <img
                src={
                  avatarPreview ||
                  (typeof user.avatar === "string"
                    ? `http://localhost:3001${user.avatar}`
                    : "avatars/ava1.jpg")
                }
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
                      setUser((prev) => ({
                        ...prev,
                        avatar: file,
                      }));
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
                value={user.username || ""}
                placeholder="Enter your name"
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, username: e.target.value }))
                }
              />
              <input
                className="edit-city"
                value={user.city || ""}
                placeholder="Enter your city"
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, city: e.target.value }))
                }
              />
            </>
          ) : (
            <>
              <h2 className="username">{user.username}</h2>
              <p className="profile-city">
                {user.city || "City not specified"}
              </p>
            </>
          )}

          <div className="section">
            <strong>Genres</strong>
            {editMode ? (
              <div className="genre-edit-container">
                <div className="selected-genres">
                  {Array.isArray(user.genres) && user.genres.length > 0 ? (
                    user.genres.map((g) => (
                      <span key={g} className="genre-tag">
                        {g}
                        <button onClick={() => toggleGenre(g)}>×</button>
                      </span>
                    ))
                  ) : (
                    <p>No genres selected</p>
                  )}
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
              <p>
                {Array.isArray(user.genres)
                  ? user.genres.join(", ")
                  : "No genres selected"}
              </p>
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
