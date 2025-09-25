import React, { useContext } from "react";
import { UserDataContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const { assistantImage, assistantName, setUserData, setAssistantImage, setAssistantName, serverUrl } =
    useContext(UserDataContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call backend logout to clear cookie
      await axios.post(`${serverUrl}/api/auth/logout`, {}, { withCredentials: true });

      // Reset context values
      setUserData(null);
      setAssistantImage(null);
      setAssistantName("");

      // Redirect to signin page
      navigate("/signin");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-black to-[#020220] relative flex flex-col items-center justify-center">
      {/* Assistant Image */}
      <div className="w-[300px] h-[400px] rounded-2xl overflow-hidden bg-[#030326] flex items-center justify-center">
        {assistantImage ? (
          <img src={assistantImage} alt="Assistant" className="w-full h-full object-cover" />
        ) : (
          <p className="text-white">No Image Selected</p>
        )}
      </div>

      {/* Assistant Name */}
      <h1 className="mt-6 text-white text-4xl font-semibold">
        I'm {assistantName || "Assistant"}
      </h1>

      {/* Top-right Buttons */}
      <div className="absolute top-5 right-5 flex flex-col gap-4">
        <button
          onClick={handleLogout}
          className="px-7 py-3 text-xl bg-white text-black rounded-full shadow hover:bg-red-500 transition cursor-pointer"
        >
          Log Out
        </button>
        <button
          onClick={() => navigate("/customize")}
          className="px-7 py-3 text-xl bg-white text-black rounded-full shadow hover:bg-blue-400 transition cursor-pointer"
        >
          Customize your Assistant
        </button>
      </div>
    </div>
  );
}

export default Home;
