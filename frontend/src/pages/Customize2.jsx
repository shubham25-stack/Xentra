import React, { useState, useContext } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoIosArrowBack } from 'react-icons/io'; // Import back arrow icon

function Customize2() {
  const [assistantName, setAssistantName] = useState('');
  const { serverUrl, userData, handleCurrentUser, setUserData } = useContext(UserDataContext);
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setAssistantName(e.target.value);
  };

  const handleNext = async () => {
    if (!assistantName) {
      alert('Please enter an assistant name');
      return;
    }

    try {
      const response = await axios.post(
        `${serverUrl}/api/user/customize2`,
        { assistantName },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const data = response.data;
        console.log('Assistant name updated successfully', data);
        // Update user data in context
        setUserData(prev => ({ ...prev, assistantName: data.assistantName }));
        await handleCurrentUser();
        navigate('/'); // Redirect to home page
      } else {
        console.error('Assistant name update failed', response.status);
      }
    } catch (error) {
      console.error('There was an error updating the assistant name', error);
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#020220] flex flex-col items-center justify-center">
      <button
        className="absolute top-5 left-5 text-white text-5xl cursor-pointer"
        onClick={handleBack}
      >
        <IoIosArrowBack />
      </button>
      <h1 className="text-white text-[30px] text-center p-[20px]">
        Enter your <span className="text-blue-400">Assistant Name</span>
      </h1>

      <input
        type="text"
        placeholder="eg.siri"
        className="w-[80%] max-w-[400px] h-14 rounded-full border-2 border-white px-5 bg-transparent text-white outline-none placeholder-gray-300"
        value={assistantName}
        onChange={handleNameChange}
      />

      {assistantName && (
        <button
          className="min-w-[150px] mt-5 h-14 bg-white rounded-full text-black font-semibold cursor-pointer"
          onClick={handleNext}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default Customize2;
