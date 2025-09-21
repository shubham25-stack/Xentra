import React, { useState, useContext } from "react";
import bg from "../assets/authBg.png";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext.jsx"; // ✅ fixed import
import axios from "axios";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { serverUrl, handleCurrentUser } = useContext(UserDataContext);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please fill all fields");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      // Login request
      await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      // Update user context after login
      await handleCurrentUser();

      // Redirect to home/dashboard
      navigate("/");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Signin failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <form
        className="w-[90%] max-w-[500px] h-[600px] bg-[#00000062] backdrop-blur-md flex flex-col items-center justify-center gap-5 p-5"
        onSubmit={handleSignIn}
      >
        <h1 className="text-white text-3xl font-semibold mb-5">
          Sign In <span className="text-blue-400">Virtual Assistant</span>
        </h1>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-14 rounded-full border-2 border-white px-5 bg-transparent text-white outline-none placeholder-gray-300"
        />

        <div className="w-full h-14 rounded-full border-2 border-white bg-transparent flex items-center relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-full px-5 bg-transparent text-white outline-none placeholder-gray-300 rounded-full"
          />
          {showPassword ? (
            <IoIosEyeOff className="absolute right-5 w-6 h-6 text-white cursor-pointer" onClick={togglePassword} />
          ) : (
            <IoIosEye className="absolute right-5 w-6 h-6 text-white cursor-pointer" onClick={togglePassword} />
          )}
        </div>

        <button
          disabled={isLoading}
          className="min-w-[150px] mt-5 h-14 bg-white rounded-full text-black font-semibold"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>

        <p
          className="text-white cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Don't have an account? <span className="text-blue-400">Sign Up</span>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
