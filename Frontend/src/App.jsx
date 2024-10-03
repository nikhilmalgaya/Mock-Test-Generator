import React, { useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TextExtractor from './components/text_extracter';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/register";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/profile";
import { useState } from "react";
import { auth } from "./components/firebase";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";

function App() {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);
      setIsLoading(false);
    });
  });
  return (
    <Router>
      <div>
            <Routes>
              <Route path="/" element={<HomePage />}>
                <Route path="/login" element={isLoading ? "LOADING...": user ? <Navigate to="/profile" />:<Login />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
                <Route path="/textextractor" element={<TextExtractor />} />
              </Route>
            </Routes>
            <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
