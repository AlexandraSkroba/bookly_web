import { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import "./AdminUsers.css";

const mockedUsers = [
  {
    id: 1,
    username: "GogaBurak",
    avatar: "/avatars/ava3.jpg",
    city: "Minsk",
    genres: ["Романы", "Программирование"],
    status: "active",
  },
  {
    id: 2,
    username: "MimiMumu",
    avatar: "/avatars/ava2.jpg",
    city: "Minsk",
    genres: ["Детектив", "Триллер"],
    status: "banned",
  },
  {
    id: 3,
    username: "Anna ChikiPiki",
    avatar: "/avatars/ava6.jpg",
    city: "Molodechno",
    genres: ["Классика"],
    status: "active",
  },
  {
    id: 4,
    username: "EricCartman",
    avatar: "/avatars/eric.jpg",
    city: "Grodno",
    genres: ["Комедия", "Триллер"],
    status: "active",
  },
  {
    id: 5,
    username: "StanMarsh",
    avatar: "/avatars/ava7.jpg",
    city: "Brest",
    genres: ["Драма", "Фэнтези"],
    status: "active",
  },
  {
    id: 6,
    username: "KyleBroflovski",
    avatar: "/avatars/ava9.jpg",
    city: "Gomel",
    genres: ["Фэнтези", "Романтика"],
    status: "banned",
  },
  {
    id: 7,
    username: "KennyMcCormick",
    avatar: "/avatars/ava10.jpg",
    city: "Bobruisk",
    genres: ["Триллер"],
    status: "active",
  },
  {
    id: 8,
    username: "ButtersStotch",
    avatar: "/avatars/ava8.jpg",
    city: "Mozyr",
    genres: ["Комедия", "Классика"],
    status: "active",
  },
  {
    id: 9,
    username: "WendyTestaburger",
    avatar: "/avatars/ava9.jpg",
    city: "Orsha",
    genres: ["Романтика", "Драма"],
    status: "active",
  },
  {
    id: 10,
    username: "TokenBlack",
    avatar: "/avatars/ava10.jpg",
    city: "Pinsk",
    genres: ["Классика", "Программирование"],
    status: "banned",
  },
];

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // в будущем можно заменить запросом
    setUsers(mockedUsers);
  }, []);

  const filtered = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="admin-users-page">
        <h2>Users Management</h2>
        <input
          className="admin-search"
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="admin-users-wrapper">
          <table className="admin-users-table">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>City</th>
                <th>Genres</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id}>
                  <td>
                    <img
                      src={user.avatar}
                      alt="avatar"
                      className="user-avatar"
                    />
                  </td>
                  <td>{user.username}</td>
                  <td>{user.city}</td>
                  <td>{user.genres.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default AdminUsers;
