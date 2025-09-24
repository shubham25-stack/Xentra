import React, { useContext } from "react";
import { UserDataContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

function Home() {
  const { assistantImage, assistantName } = useContext(UserDataContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Example logout logic
    window.location.reload();
  };

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-black to-[#020220] relative flex items-center justify-center">
      
      {/* Assistant Image */}
      <div className="w-[300px] h-[400px] rounded-2xl overflow-hidden bg-[#030326] flex items-center justify-center">
        {assistantImage ? (
          <img
            src={assistantImage}
            alt="Assistant"
            className="w-full h-full object-cover"
          />
        ) : (
          <p className="text-white">No Image Selected</p>
        )}
      </div>

      {/* Assistant Name */}
      <h1 className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[250px] text-white text-4xl font-semibold">
        I'm {assistantName || "Assistant"}
      </h1>

      {/* Right Top Buttons */}
      <div className="absolute top-5 right-5 flex flex-col gap-4">
        <button
          onClick={handleLogout}
          className="px-7 py-3 text-2xl pt-5px mr-10 m-5 bg-white text-black rounded-full shadow hover:bg-red-500 transition cursor-pointer"
        >
          Log Out
        </button>
        <button
          onClick={() => navigate("/customize")}
          className="px-7 py-3 text-2xl pt-5px mr-10 bg-white text-black rounded-full shadow hover:bg-blue-400 transition cursor-pointer"
        >
          Customize your Assistant
        </button>
      </div>
    </div>
  );
}

export default Home;
