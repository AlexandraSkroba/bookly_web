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

const mockedReviews = [
  {
    from: "alexandra.skroba",
    avatar: "/avatars/ava1.jpg",
    text: "Все супер! Отправил быстро",
  },
  {
    from: "Vanyya",
    avatar: "/avatars/ava4.jpg",
    text: "Все прошло гладко! Рекомендую",
  },
  {
    from: "Chev4Onka",
    avatar: "/avatars/ava5.jpg",
    text: "Спасибо за обмен, книга в отличном состоянии!",
  },
  {
    from: "Anna ChikiPiki",
    avatar: "/avatars/ava3.jpg",
    text: "Все прошло гладко! Рекомендую 😊",
  },
];

function UserProfile() {
  const [editMode, setEditMode] = useState(false);
  const [newGenre, setNewGenre] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [shake, setShake] = useState(false);
  const [user, setUser] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");

  const { logout } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      // Вместо запроса с axios мокнем вручную:
      const mockedUser = {
        username: "GogaBurak",
        avatar: "/avatars/ava3.jpg", // путь должен быть доступен для отображения
        city: "Minsk",
        genres: ["Романы", "Программирование"],
      };

      setUser(mockedUser);
    };

    fetchProfile();
  }, []);

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
            className="report-icon"
            onClick={() => setShowReportModal(true)}
          />
          <button
            className="books-icon"
            onClick={() => alert("Reported user!")}
          />
          <div
            className={`avatar-wrapper ${editMode ? "editable-avatar" : ""}`}
          >
            <label className="avatar-label">
              <img
                src={
                  avatarPreview ||
                  (typeof user.avatar === "string"
                    ? user.avatar
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
                        {/* <button onClick={() => toggleGenre(g)}>×</button> */}
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
                      //   onClick={() => toggleGenre(g)}
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
                        // toggleGenre(newGenre.trim());
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
          <div className="section reviews-section">
            <strong className="str-rew">Reviews</strong>
            {mockedReviews.length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              mockedReviews.map((review, index) => (
                <div key={index} className="review-item">
                  <img
                    src={review.avatar}
                    alt={`${review.from}'s avatar`}
                    className="review-avatar"
                  />
                  <div className="review-content">
                    <span className="review-author">{review.from}</span>
                    <p className="review-text">{review.text}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {showReportModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">REPORT THIS USER</div>
              <p className="select-p">Select a reason:</p>
              <div className="report-reasons">
                {[
                  "Inappropriate content",
                  "Scam or fraud",
                  "Spam",
                  "Other",
                ].map((reason) => (
                  <label key={reason} className="report-option">
                    <input
                      type="radio"
                      name="report"
                      value={reason}
                      checked={selectedReason === reason}
                      onChange={() => setSelectedReason(reason)}
                    />
                    {reason}
                  </label>
                ))}
              </div>
              <div style={{ marginTop: "20px" }}>
                <button
                  className="submit-report-button"
                  onClick={() => {
                    if (selectedReason) {
                      alert(`Reported for: ${selectedReason}`);
                      setShowReportModal(false);
                      setSelectedReason("");
                    } else {
                      alert("Please select a reason.");
                    }
                  }}
                >
                  Submit Report
                </button>
                <button
                  className="cancel-btn del-btn"
                  onClick={() => setShowReportModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default UserProfile;
