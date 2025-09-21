import React, { useContext } from "react";
import { UserDataContext } from "../context/UserContext.jsx";

function Home() {
  const { userData, loading } = useContext(UserDataContext);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white text-xl">
        Loading...
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-red-500 text-xl">
        No user data found. Please sign in.
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-5">
        Welcome, {userData.name || "Guest"}!
      </h1>

      {userData.assistantImage ? (
        <img
          src={userData.assistantImage}
          alt="Assistant"
          className="w-48 h-48 object-cover rounded-full shadow-lg"
        />
      ) : (
        <p className="text-gray-400">Your assistant is not yet customized.</p>
      )}

      {/* Add more user-specific content here */}
    </div>
  );
}

export default Home;
