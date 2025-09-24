import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserDataContext = createContext();

function UserContextProvider({ children }) {
  const serverUrl = "http://localhost:8000";

  // 🔹 Data from backend
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Data from customize steps
  const [assistantName, setAssistantName] = useState("");
  const [assistantImage, setAssistantImage] = useState(null);

  const handleCurrentUser = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true,
      });
      setUserData(res.data);
    } catch (error) {
      console.error("Fetching user failed:", error);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCurrentUser();
  }, []);

  return (
    <UserDataContext.Provider
      value={{
        serverUrl,
        userData,
        setUserData,
        loading,
        handleCurrentUser,
        assistantName,
        setAssistantName,
        assistantImage,
        setAssistantImage,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export default UserContextProvider;
