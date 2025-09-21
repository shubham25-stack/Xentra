import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Customize from "./pages/Costomize.jsx";
import Home from "./pages/Home.jsx";
import { UserDataContext } from "./context/UserContext.jsx";

function App() {
  const { userData, loading } = useContext(UserDataContext);

  if (loading) {
    return <div>Loading...</div>; // Or a more sophisticated loading indicator
  }

  return (
    <Routes>
      <Route path="/" element={userData ? <Home /> : <Navigate to="/signin" />} />
      <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to="/" />} />
      <Route path="/signin" element={!userData ? <SignIn /> : <Navigate to="/" />} />
      <Route path="/customize" element={userData ? <Customize /> : <Navigate to="/signin" />} />
    </Routes>
  );
}

export default App;
