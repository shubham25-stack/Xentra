import React, { useState, useContext, useEffect } from "react";
import { UserDataContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

function Customize2() {
  const [name, setName] = useState("");
  const { assistantImage, setAssistantName } = useContext(UserDataContext);
  const navigate = useNavigate();

  // Redirect back if user hasn't selected image
  useEffect(() => {
    if (!assistantImage) {
      navigate("/customize");
    }
  }, [assistantImage, navigate]);

  const handleNext = () => {
    if (!name.trim()) {
      alert("Please enter a name");
      return;
    }

    setAssistantName(name); // Save in context
    navigate("/home"); // Redirect to home/dashboard
  };

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-black to-[#020220] flex flex-col items-center justify-center">
      <h1 className="text-white text-3xl mb-6">
        Enter your <span className="text-blue-400">Assistant Name</span>
      </h1>

      <input
        type="text"
        placeholder="eg. Siri"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-[80%] max-w-[400px] h-12 rounded-full border-2 border-white px-4 bg-transparent text-white placeholder-gray-300 outline-none"
      />

      <button
        onClick={handleNext}
        className="mt-6 min-w-[150px] h-12 bg-white text-black rounded-full font-semibold"
      >
        Next
      </button>
    </div>
  );
}

export default Customize2;
