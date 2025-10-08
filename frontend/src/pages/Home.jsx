import React, { useContext, useEffect, useRef } from "react";
import { UserDataContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const {
    assistantImage,
    assistantName,
    setUserData,
    setAssistantImage,
    setAssistantName,
    serverUrl,
  } = useContext(UserDataContext);

  const navigate = useNavigate();
  const recognitionRef = useRef(null);

  const speak = (text) => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${serverUrl}/api/auth/logout`, {}, { withCredentials: true });
      setUserData(null);
      setAssistantImage(null);
      setAssistantName("");
      navigate("/signin");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = async (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      console.log("Voice Input:", transcript);

      if (!transcript) return;

      const hotword = assistantName?.toLowerCase() || "assistant";
      if (!transcript.startsWith(hotword)) return;

      const command = transcript.replace(hotword, "").trim();
      if (!command) return;

      try {
        const res = await axios.post(
          `${serverUrl}/api/user/ask`,
          { command },
          { withCredentials: true }
        );

        if (res.data.success) {
          const action = res.data.action;
          if (action.text) speak(action.text);
          if (action.url) window.open(action.url, "_blank");
        } else {
          speak("Sorry, I couldn't process your request.");
        }
      } catch (err) {
        console.error("Assistant command error:", err);
        speak("Something went wrong while processing your request.");
      }
    };

    recognition.onerror = (event) => {
      if (event.error !== "aborted") {
        console.error("Speech Recognition error:", event);
      }
    };

    recognition.onend = () => {
      // Auto-restart only if not unmounted
      if (recognitionRef.current) {
        recognition.start();
      }
    };

    recognition.start();
    recognitionRef.current = recognition; // Save reference

    return () => {
      // Proper cleanup on unmount
      recognitionRef.current = null;
      recognition.stop();
      recognition.onend = null; // Prevent auto-restart
    };
  }, [serverUrl, assistantName]);

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-black to-[#020220] relative flex flex-col items-center justify-center">
      <div className="w-[300px] h-[400px] rounded-2xl overflow-hidden bg-[#030326] flex items-center justify-center">
        {assistantImage ? (
          <img src={assistantImage} alt="Assistant" className="w-full h-full object-cover" />
        ) : (
          <p className="text-white">No Image Selected</p>
        )}
      </div>

      <h1 className="mt-6 text-white text-4xl font-semibold">
        I'm {assistantName || "Assistant"}
      </h1>

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
