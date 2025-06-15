import { useState, useRef, useEffect } from "react";
import { Layout } from "../components/Layout";
import "../pages/Chats.css";
import { useNavigate } from "react-router-dom";

const users = [
  { id: 1, name: "GogaBurak", city: "Minsk" },
  { id: 2, name: "MimiMumu", city: "Vilnius" },
  { id: 3, name: "Anna ChikiPiki", city: "Warsaw" },
];

const messagesMock = {
  2: [
    {
      from: "them",
      text: "Привет! Интересует книга «Гордость и предубеждение». Можно обсудить обмен?",
    },
    { from: "me", text: "Привет. Окей, кидай адрес, я отправлю" },
  ],
  1: [
    {
      from: "me",
      text: "Привет! Интересует книга «Гордость и предубеждение». Можно обсудить обмен?",
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

  const [exchangeAcceptedMap, setExchangeAcceptedMap] = useState({
    1: false,
    2: false,
    3: false,
  });

  const selectedMessages = messages[selectedUserId] || [];
  const exchangeAccepted = exchangeAcceptedMap[selectedUserId];

  const selectedUser = users.find((u) => u.id === selectedUserId);

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
                      <img src="/logo512.png" className="chat-avatar-img" />
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
