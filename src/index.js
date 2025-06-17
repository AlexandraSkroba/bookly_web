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
import { PrivateRoute } from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import UserProfile from "./pages/UserProfile";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminChats from "./pages/admin/AdminChats";
import AdminUserProfile from "./pages/admin/AdminUserProfile";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route
            path="/catalog"
            element={
              <PrivateRoute>
                <Catalog />
              </PrivateRoute>
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about-book" element={<AboutBook />} />
          <Route
            path="/my-books"
            element={
              <PrivateRoute>
                <MyBooks />
              </PrivateRoute>
            }
          />
          <Route
            path="/chats"
            element={
              <PrivateRoute>
                <Chats />
              </PrivateRoute>
            }
          />
          <Route path="/user-books/:userId" element={<MyBooks />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/chats" element={<AdminChats />} />
          <Route path="/admin/user/:id" element={<AdminUserProfile />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
