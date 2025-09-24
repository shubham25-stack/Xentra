import React, { useState, useRef, useContext } from "react";
import { UserDataContext } from "../context/UserContext.jsx";
import { LuImagePlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

// Predefined assistant images
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/authBg.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.jpeg";
import image7 from "../assets/image7.jpeg";

function Customize() {
  const [frontendImage, setFrontendImage] = useState(null);
  const inputImage = useRef(null);
  const { setAssistantImage } = useContext(UserDataContext);
  const navigate = useNavigate();

  // Handle local upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result;
        setFrontendImage(base64data);
        setAssistantImage(base64data); // Save to context
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle predefined selection
  const handlePredefinedSelect = (img) => {
    setFrontendImage(img);
    setAssistantImage(img);
  };

  // List of predefined images
  const predefinedImages = [image1, image2, image3, image4, image5, image6, image7];

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-black to-[#020220] flex flex-col items-center overflow-auto">
      <h1 className="text-white text-[30px] text-center p-[20px]">
        Select your <span className="text-blue-400">Assistant Image</span>
      </h1>

      {/* Image Grid */}
      <div className="flex flex-wrap justify-center gap-5 w-[90%] max-w-[900px] p-5">
        {predefinedImages.map((img, index) => (
          <div
            key={index}
            className={`w-[150px] h-[220px] rounded-2xl overflow-hidden cursor-pointer border-2 ${
              frontendImage === img ? "border-white" : "border-blue-500"
            }`}
            onClick={() => handlePredefinedSelect(img)}
          >
            <img src={img} alt={`Option ${index}`} className="w-full h-full object-cover" />
          </div>
        ))}

        {/* Upload new image */}
        <div
          className="w-[150px] h-[220px] bg-[#030326] border-2 border-blue-500 rounded-2xl flex items-center justify-center cursor-pointer"
          onClick={() => inputImage.current.click()}
        >
          {!frontendImage && <LuImagePlus className="text-white w-[25px] h-[25px]" />}
          {frontendImage && frontendImage.startsWith("data:") && (
            <img src={frontendImage} alt="Uploaded" className="w-full h-full object-cover" />
          )}
        </div>
        <input type="file" accept="image/*" ref={inputImage} hidden onChange={handleImageChange} />
      </div>

      {/* Next Button */}
      <button
        className="min-w-[150px] mt-5 h-14 bg-white rounded-full text-black font-semibold cursor-pointer"
        onClick={() => navigate("/customize2")}
      >
        Next
      </button>
    </div>
  );
}

export default Customize;
