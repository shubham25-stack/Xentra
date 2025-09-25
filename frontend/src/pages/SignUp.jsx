import React, { useState, useContext } from "react";
import bg from "../assets/authBg.png";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext.jsx";
import axios from "axios";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { serverUrl, setUserData } = useContext(UserDataContext);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMessage("Please fill all fields");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      // ✅ Signup request
      const res = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, email, password },
        { withCredentials: true }
      );

      // ✅ Directly update user context from API response
      if (res.data.user) {
        setUserData(res.data.user);
        navigate("/customize"); // navigate after setting user
      } else {
        setErrorMessage("Signup succeeded but failed to load user. Try login.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        className="w-[90%] max-w-[500px] h-[600px] bg-[#00000062] backdrop-blur-md flex flex-col items-center justify-center gap-5 p-5"
        onSubmit={handleSignUp}
      >
        <h1 className="text-white text-3xl font-semibold mb-5">
          Sign Up <span className="text-blue-400">Virtual Assistant</span>
        </h1>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full h-14 rounded-full border-2 border-white px-5 bg-transparent text-white outline-none placeholder-gray-300"
        />

        <input
          type="email"
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
            <IoIosEyeOff
              className="absolute right-5 w-6 h-6 text-white cursor-pointer"
              onClick={togglePassword}
            />
          ) : (
            <IoIosEye
              className="absolute right-5 w-6 h-6 text-white cursor-pointer"
              onClick={togglePassword}
            />
          )}
        </div>

        <button
          disabled={isLoading}
          className="min-w-[150px] mt-5 h-14 bg-white rounded-full text-black font-semibold"
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>

        <p
          className="text-white cursor-pointer"
          onClick={() => navigate("/signin")}
        >
          Already have an account? <span className="text-blue-400">Sign In</span>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
