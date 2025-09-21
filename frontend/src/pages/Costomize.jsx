import React, { useContext } from "react";
import { UserDataContext } from "../context/UserContext.jsx";

function Customize() {
  const { userData } = useContext(UserDataContext);

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#020236]">
      
    </div>
  );
}

export default Customize;
