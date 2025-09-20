import React, { useContext, useState } from 'react';
import bg from '../assets/authBg.png';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { userDateaContext } from '../context/userContext';
import axios from "axios";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl } = useContext(userDateaContext);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    // Basic client-side validation
    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(""); // Clear previous error messages
    try {
      let result = await axios.post(`${serverUrl}/api/auth/login`, {
        email, password
      }, { withCredentials: true });
      console.log(result.data);
      // Optionally redirect or display a success message
      navigate("/"); // Example: Redirect to dashboard
    } catch (error) {
      console.error("Signin error:", error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message); // Use server-provided error message
      } else {
        setErrorMessage("Signin failed. Please check your credentials and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="w-full h-[100vh] bg-cover flex justify-center items-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <form className="w-[90%] h-[600px] max-w-[500px] bg-[#00000062] backdrop-blur-md shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px]" onSubmit={handleSignIn}>
        <h1 className="text-white text-[30px] font-semibold mb-[30px]">
          Sign In to <span className="text-blue-400">Virtual Assistant</span>
        </h1>
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        <input
          type="text"
          placeholder="Enter your email"
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
          required onChange={(e) => setEmail(e.target.value)}
        />
        <div className="w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] flex items-center relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            className="w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-[20px] py-[10px]"
            required onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ? (
            <IoIosEyeOff
              className="absolute top-1/2 right-[20px] transform -translate-y-1/2 w-[25px] h-[25px] text-[white] cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          ) : (
            <IoIosEye
              className="absolute top-1/2 right-[20px] transform -translate-y-1/2 w-[25px] h-[25px] text-[white] cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          )}
        </div>
        {errorMessage.length > 0 && <p className='text-red-500'>
          {errorMessage}
        </p>}
        <button className='min-w-[150px] mt-[30px] h-[60px] bg-white rounded-full text-black font-semibold text-[19px] text-[18px]' disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
        <p className='text-[white]' onClick={() => navigate("/signup")}>Don't have an account ? <span className='text-blue-400 '>Sign Up</span></p>
      </form>
    </div>
  );
}
//just for github streak
export default SignIn;
