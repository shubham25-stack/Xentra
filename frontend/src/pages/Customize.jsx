import React, { useState, useRef, useContext, useEffect } from "react";
import { UserDataContext } from "../context/UserContext.jsx";
import Card from "../components/Card.jsx";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/authBg.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.jpeg";
import image7 from "../assets/image7.jpeg";
import { LuImagePlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function Customize() {
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const inputImage = useRef(null);
  const { userData, serverUrl, handleCurrentUser, setUserData } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      handleCurrentUser();
    }
  }, [handleCurrentUser, userData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFrontendImage(URL.createObjectURL(file));
      setBackendImage(file); // Store the actual file for upload
      setSelectedImage("input");
    }
  };

  const handleNext = async () => {
    if (!backendImage) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", backendImage);

    try {
      const response = await fetch(`${serverUrl}/api/user/customize`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Image uploaded successfully", data);
        // Update user data in context
        setUserData(prev => ({ ...prev, assistantImage: data.assistantImage }));
        await handleCurrentUser();
        navigate("/"); // Redirect to home page
      } else {
        console.error("Image upload failed", response.status);
      }
    } catch (error) {
      console.error("There was an error uploading the image", error);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#020220] flex flex-col items-center">
      <h1 className="text-white text-[30px] text-center p-[20px]">
        Select your <span className='text-blue-400'>Assistant Image</span>
      </h1>
      <div className="max-full w-[90%] max-w-[60%] flex justify-center items-center gap-5 flex-wrap m-auto p-[20px]">
        <Card image={image1} setSelectedImage={setSelectedImage} selectedImage={selectedImage} />
        <Card image={image2} setSelectedImage={setSelectedImage} selectedImage={selectedImage} />
        <Card image={image3} setSelectedImage={setSelectedImage} selectedImage={selectedImage} />
        <Card image={image4} setSelectedImage={setSelectedImage} selectedImage={selectedImage} />
        <Card image={image5} setSelectedImage={setSelectedImage} selectedImage={selectedImage} />
        <Card image={image6} setSelectedImage={setSelectedImage} selectedImage={selectedImage} />
        <Card image={image7} setSelectedImage={setSelectedImage} selectedImage={selectedImage} />
        <div
          className="w-[150px] h-[250px] bg-[#030326] border-2 border-[blue] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white flex items-center justify-center"
          onClick={() => inputImage.current.click()}
        >
          {!frontendImage && <LuImagePlus className="text-white w-[25px] h-[25px]" />}
          {frontendImage && <img src={frontendImage} className='w-full h-full object-cover' alt="Selected" />}
        </div>
        <input
          type="file"
          accept="image/*"
          ref={inputImage}
          hidden
          onChange={handleImageChange}
        />
      </div>

      <button
        className="min-w-[150px] mt-5 h-14 bg-white rounded-full text-black font-semibold cursor-pointer"
        onClick={()=>navigate("/customize2")}
      >
        Next
      </button>
    </div>
  );
}

export default Customize;
