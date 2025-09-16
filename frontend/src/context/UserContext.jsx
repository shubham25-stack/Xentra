import React, { createContext } from 'react';

export const userDateaContext = createContext();

function UserContext({ children }) {
  const serverUrl = "http://localhost:8000";

  const value = {
    serverUrl
  };

  return (
    <userDateaContext.Provider value={value}>
      {children}
    </userDateaContext.Provider>
  );
}

export default UserContext;
