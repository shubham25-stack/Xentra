import React, { createContext, useState } from "react";
import axios from "axios";

export const UserDataContext = createContext();

export default function UserContextProvider({ children }) {
  const serverUrl = "http://localhost:5000";

  const [user, setUserData] = useState(null);
  const [assistantImage, setAssistantImage] = useState(null);
  const [assistantName, setAssistantName] = useState("");

  // Fetch current user from backend
  const handleCurrentUser = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true,
      });

      if (res.data.user) {
        setUserData(res.data.user);
        setAssistantImage(res.data.user.assistantImage || null);
        setAssistantName(res.data.user.assistantName || "");
        return res.data.user;
      } else {
        clearUserData();
        return null;
      }
    } catch (err) {
      console.error(err);
      clearUserData();
      return null;
    }
  };

  // Reset all context data
  const clearUserData = () => {
    setUserData(null);
    setAssistantImage(null);
    setAssistantName("");
  };

  return (
    <UserDataContext.Provider
      value={{
        serverUrl,
        user,
        setUserData,
        assistantImage,
        setAssistantImage,
        assistantName,
        setAssistantName,
        handleCurrentUser,
        clearUserData,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}
