import { useState } from "react";
import { Layout } from "../../components/Layout";
import "./AdminChats.css";

const users = [
  {
    id: 1,
    username: "MimiMumu",
    avatar: "/avatars/ava2.jpg",
    city: "Minsk",
    genres: ["Романы", "Программирование"],
    status: "active",
  },
  {
    id: 2,
    username: "alexandra.skroba",
    avatar: "/avatars/ava1.jpg",
    city: "Minsk",
    genres: ["Детектив", "Триллер"],
    status: "banned",
  },
  {
    id: 3,
    username: "Anna ChikiPiki",
    avatar: "/avatars/ava6.jpg",
    city: "Warsaw",
    genres: ["Классика"],
    status: "active",
  },
  {
    id: 4,
    username: "EricCartman",
    avatar: "/avatars/ava5.jpg",
    city: "South Park",
    genres: ["Комедия", "Триллер"],
    status: "active",
  },
  {
    id: 5,
    username: "StanMarsh",
    avatar: "/avatars/ava7.jpg",
    city: "South Park",
    genres: ["Драма", "Фэнтези"],
    status: "active",
  },
  {
    id: 6,
    username: "KyleBroflovski",
    avatar: "/avatars/ava8.jpg",
    city: "Denver",
    genres: ["Фэнтези", "Романтика"],
    status: "banned",
  },
  {
    id: 7,
    username: "KennyMcCormick",
    avatar: "/avatars/ava7.jpg",
    city: "South Park",
    genres: ["Триллер"],
    status: "active",
  },
  {
    id: 8,
    username: "ButtersStotch",
    avatar: "/avatars/ava8.jpg",
    city: "Boulder",
    genres: ["Комедия", "Классика"],
    status: "active",
  },
  {
    id: 9,
    username: "WendyTestaburger",
    avatar: "/avatars/ava9.jpg",
    city: "Salt Lake City",
    genres: ["Романтика", "Драма"],
    status: "active",
  },
  {
    id: 10,
    username: "TokenBlack",
    avatar: "/avatars/ava10.jpg",
    city: "South Park",
    genres: ["Классика", "Программирование"],
    status: "banned",
  },
];

const chatsMock = {
  "1-2": [
    { from: "1", text: "Привет! Интересует книга «The Great Gatsby». Можно обсудить обмен?" },
    { from: "2", text: "Привет. Окей, кидай адрес, я отправлю" },
  ],
  "1-3": [
    { from: "1", text: "Интересует книга «1984»" },
    { from: "3", text: "Я уже передала её." },
  ],
  "4-5": [
    { from: "4", text: "Стан, ты принес книгу по математике?" },
    { from: "5", text: "Да, забирай в школе после уроков." },
  ],
  "6-7": [
    { from: "6", text: "Привет! У тебя осталась книга про хакеров?" },
    { from: "7", text: "Да, могу завтра передать." },
  ],
  "8-9": [
    { from: "8", text: "Как тебе роман, который я дал?" },
    { from: "9", text: "Очень понравился, спасибо!" },
  ],
  "3-10": [
    { from: "3", text: "Привет. Я бы хотела забрать классику." },
    { from: "10", text: "Без проблем, когда удобно?" },
    { from: "3", text: "Сегодня вечером подойдет?" },
  ],
  "2-6": [
    { from: "2", text: "У тебя детективы еще есть?" },
    { from: "6", text: "Остался один, могу зарезервировать." },
  ],
  "1-9": [
    { from: "9", text: "Спасибо за прошлый обмен!" },
    { from: "1", text: "Всегда пожалуйста 😊" },
  ],
  "5-10": [
    { from: "5", text: "Интересуют учебники по программированию." },
    { from: "10", text: "Могу дать парочку завтра." },
  ],
  "7-4": [
    { from: "7", text: "Ты вернул мне мою книгу?" },
    { from: "4", text: "Ой, забыл! Завтра обязательно!" },
  ],
};

function AdminChats() {
  const [selectedChatKey, setSelectedChatKey] = useState("1-2");

  const chatKeys = Object.keys(chatsMock);

  const selectedMessages = chatsMock[selectedChatKey] || [];

  const [id1, id2] = selectedChatKey.split("-");
  const user1 = users.find((u) => u.id === +id1);
  const user2 = users.find((u) => u.id === +id2);

  return (
    <Layout>
      <div className="admin-chats-page">
        <div className="chat-list">
          <h3>All Chats</h3>
          <ul>
            {chatKeys.map((key) => {
              const [u1, u2] = key.split("-");
              const userA = users.find((u) => u.id === +u1);
              const userB = users.find((u) => u.id === +u2);
              return (
                <li
                  key={key}
                  className={key === selectedChatKey ? "active" : ""}
                  onClick={() => setSelectedChatKey(key)}
                >
                  {userA?.username} ↔ {userB?.username}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="chat-window">
          <h3>
            Chat between {user1?.username} and {user2?.username}
          </h3>
          <div className="messages">
            {selectedMessages.map((msg, idx) => {
              const isFrom1 = msg.from === id1;
              const sender = isFrom1 ? user1 : user2;
              return (
                <div
                  key={idx}
                  className={`message ${isFrom1 ? "from-left" : "from-right"}`}
                >
                  <img
                    src={sender?.avatar}
                    alt="avatar"
                    className="msg-avatar"
                  />
                  <div className="msg-bubble">
                    <strong>{sender?.name}</strong>
                    <p>{msg.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminChats;
