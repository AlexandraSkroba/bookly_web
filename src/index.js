import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { SignUp } from "./pages/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import App from "./App";
import ConfirmEmail from "./pages/ConfirmEmail";
import Catalog from "./pages/Catalog";
import Profile from "./pages/Profile";
import AboutBook from "./pages/AboutBook";
import MyBooks from "./pages/MyBooks";
import Chats from "./pages/Chats";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about-book" element={<AboutBook />} />
        <Route path="/my-books" element={<MyBooks />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/user-books/:userId" element={<MyBooks />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
