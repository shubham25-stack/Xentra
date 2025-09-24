import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Customize from "./pages/Customize";
import { useContext } from "react";
import { UserDataContext } from "./context/UserContext";

function App() {
  const { user } = useContext(UserDataContext);

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/customize" /> : <Navigate to="/signup" />} />
      <Route path="/signup" element={user ? <Navigate to="/customize" /> : <SignUp />} />
      <Route path="/signin" element={user ? <Navigate to="/customize" /> : <SignIn />} />
      <Route path="/customize" element={user ? <Customize /> : <Navigate to="/signup" />} />
      <Route path="*" element={<Navigate to="/signup" />} />
    </Routes>
  );
}

export default App;
