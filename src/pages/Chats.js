import { useState, useRef, useEffect } from "react";
import { Layout } from "../components/Layout";
import "../pages/Chats.css";
import { useNavigate } from "react-router-dom";

const users = [
  {
    id: 1,
    name: "GogaBurak",
    city: "Minsk",
    avatar: "avatars/ava3.jpg",
  },
  {
    id: 2,
    name: "MimiMumu",
    city: "Minsk",
    avatar: "avatars/ava2.jpg",
  },
  {
    id: 3,
    name: "Anna ChikiPiki",
    city: "Warsaw",
    avatar: "avatars/ava3.jpg",
  },
];

const messagesMock = {
  2: [
    {
      from: "them",
      text: "Привет! Интересует книга «The Great Gatsby». Можно обсудить обмен?",
    },
    { from: "me", text: "Привет. Окей, кидай адрес, я отправлю" },
  ],
  1: [
    {
      from: "me",
      text: "Привет! Интересует книга «Чистая архитектура». Можно обсудить обмен?",
    },
    {
      from: "them",
      text: "Привет! Да, давай. Кинь адрес я отправлю",
    },
    {
      from: "me",
      text: "ул. Гикало 9, Минск, 220005",
    },
    {
      from: "them",
      text: "Отправил, жди. Трек LP007307038345862",
    },
  ],
  3: [
    {
      from: "them",
      text: "Привет! Интересует книга «Гордость и предубеждение». Можно обсудить обмен?",
    },
  ],
};

const currentUserId = 0;

function Chats() {
  const [selectedUserId, setSelectedUserId] = useState(2);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState(messagesMock);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const [deliveryConfirmedMap, setDeliveryConfirmedMap] = useState({});

  const [showReviewInput, setShowReviewInput] = useState(false);
  const [reviewText, setReviewText] = useState("");

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [hasLeftReviewMap, setHasLeftReviewMap] = useState({});

  const [exchangeAcceptedMap, setExchangeAcceptedMap] = useState({
    1: true,
    2: false,
    3: false,
  });

  const selectedMessages = messages[selectedUserId] || [];
  const exchangeAccepted = exchangeAcceptedMap[selectedUserId];

  const selectedUser = users.find((u) => u.id === selectedUserId);

  const handleConfirmDelivery = () => {
    setDeliveryConfirmedMap((prev) => ({
      ...prev,
      [selectedUserId]: true,
    }));
  };

  const handleSend = () => {
    if (!messageInput.trim() || !exchangeAccepted) return;
    setMessages((prev) => ({
      ...prev,
      [selectedUserId]: [
        ...(prev[selectedUserId] || []),
        { from: "me", text: messageInput },
      ],
    }));
    setMessageInput("");
  };

  const handleAcceptExchange = () => {
    setExchangeAcceptedMap((prev) => ({
      ...prev,
      [selectedUserId]: true,
    }));
  };

  const handleRejectExchange = () => {
    setExchangeAcceptedMap((prev) => ({
      ...prev,
      [selectedUserId]: "rejected",
    }));
  };

  const handleViewBooks = () => {
    navigate(`/user-books/${selectedUserId}`);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, selectedUserId]);

  const isMeInitiator =
    selectedMessages.length > 0 && selectedMessages[0].from === "me";

  return (
    <Layout>
      <div className="chat-page">
        <div className="chat-users">
          {users.map((user) => (
            <div
              key={user.id}
              className={`chat-user ${
                user.id === selectedUserId ? "selected" : ""
              }`}
              onClick={() => setSelectedUserId(user.id)}
            >
              {user.name}
            </div>
          ))}
        </div>

        <div className="chat-window">
          {exchangeAccepted === true &&
            isMeInitiator &&
            !deliveryConfirmedMap[selectedUserId] && (
              <div className="chat-confirm-banner">
                <p>
                  Confirm you’ve received the book from {selectedUser.name}.
                </p>
                <button
                  className="confirm-button"
                  onClick={handleConfirmDelivery}
                >
                  Confirm delivery
                </button>
              </div>
            )}

          {exchangeAccepted === false &&
            selectedMessages.length > 0 &&
            selectedMessages[0].from !== "me" && (
              <div className="chat-accept-banner">
                <h3>
                  {selectedUser.name} ({selectedUser.city}) offered a trade!
                </h3>
                <p>You can agree to start communicating.</p>
                <div className="chat-accept-actions">
                  <button
                    className="accept-button"
                    onClick={handleAcceptExchange}
                  >
                    Accept the exchange
                  </button>
                  <button
                    className="reject-button"
                    onClick={handleRejectExchange}
                  >
                    Reject
                  </button>
                  <button
                    className="view-books-button"
                    onClick={handleViewBooks}
                  >
                    View books
                  </button>
                </div>
              </div>
            )}

          {exchangeAccepted !== "rejected" && (
            <>
              <div className="chat-messages">
                {selectedMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`chat-bubble ${
                      msg.from === "me" ? "me" : "them"
                    }`}
                  >
                    <div className="chat-avatar-container">
                      <img
                        src={
                          msg.from === "me"
                            ? "avatars/ava1.jpg"
                            : selectedUser.avatar
                        }
                        className="chat-avatar-img"
                        onClick={() => {
                          if (msg.from !== "me") {
                            navigate(`/profile/${selectedUserId}`);
                          } else {
                            navigate(`/my-profile`);
                          }
                        }}
                        style={{ cursor: "pointer" }}
                      />

                      <span className="chat-avatar">
                        {msg.from === "me"
                          ? "aalexandra"
                          : selectedUser.name.toLowerCase()}
                      </span>
                    </div>
                    <div className="bubble-text">{msg.text}</div>
                    <div ref={messagesEndRef} />
                  </div>
                ))}
              </div>

              <div className="chat-input-bar">
                <input
                  type="text"
                  placeholder="Text something..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  disabled={!exchangeAccepted}
                />
                <button onClick={handleSend} disabled={!exchangeAccepted}>
                  <img src="/send2.png"></img>
                </button>
              </div>
            </>
          )}
          {deliveryConfirmedMap[selectedUserId] &&
            isMeInitiator &&
            !hasLeftReviewMap[selectedUserId] && (
              <div className="chat-confirmed-message">
                Delivery confirmed. You can now leave a review!
                {!showReviewInput ? (
                  <button
                    className="review-button"
                    onClick={() => setShowReviewInput(true)}
                  >
                    Leave a review
                  </button>
                ) : (
                  <div className="review-section">
                    <input
                      className="review-textarea"
                      placeholder="Write your review..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                    />
                    <button
                      className="submit-review-button"
                      onClick={() => {
                        if (reviewText.trim()) {
                          setShowReviewInput(false);
                          setReviewText("");
                          setHasLeftReviewMap((prev) => ({
                            ...prev,
                            [selectedUserId]: true,
                          }));
                          setShowSuccessMessage(true);
                          setTimeout(() => setShowSuccessMessage(false), 3000);
                        }
                      }}
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
            )}

          {showSuccessMessage && (
            <div className="review-success-toast">
              Thank you! Your review has been submitted.
            </div>
          )}

          {exchangeAccepted === "rejected" && (
            <div className="chat-rejected-message">
              You have declined the exchange offer. Chat is unavailable.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Chats;
