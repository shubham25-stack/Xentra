import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Customize from "./pages/Customize";
import Customize2 from "./pages/Customize2";
import Home from "./pages/Home";
import { useContext } from "react";
import { UserDataContext } from "./context/UserContext";

function App() {
  const { user, assistantImage, assistantName } = useContext(UserDataContext);

  return (
    <Routes>
      {/* Root route */}
      <Route
        path="/"
        element={
          user
            ? assistantImage && assistantName
              ? <Home />       // Existing user → Home
              : <Navigate to="/customize" /> // New user → Customize
            : <Navigate to="/signin" /> // Not logged in
        }
      />

      {/* SignUp */}
      <Route
        path="/signup"
        element={user ? <Navigate to="/" /> : <SignUp />}
      />

      {/* SignIn */}
      <Route
        path="/signin"
        element={user ? <Navigate to="/" /> : <SignIn />}
      />

      {/* Customize */}
      <Route
        path="/customize"
        element={user ? <Customize /> : <Navigate to="/signin" />}
      />

      {/* Customize2 (assistant name) */}
      <Route
        path="/customize2"
        element={user ? <Customize2 /> : <Navigate to="/signin" />}
      />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
