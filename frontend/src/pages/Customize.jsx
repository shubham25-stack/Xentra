import React, { useState, useRef, useContext } from "react";
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

function Customize() {
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const inputImage = useRef(null);
  const {userData, serverUrl, handleCurrentUser} = useContext(UserDataContext)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFrontendImage(file);
      // You can also handle the backend upload here if needed
    }
  };

  const handleNext = async () => {
    if (!frontendImage) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", frontendImage);

    try {
      const response = await fetch(`${serverUrl}/api/user/customize`, {
        method: "POST",
        body: formData,
        headers: {
          //'Content-Type': 'multipart/form-data' - Browser sets this automatically
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Image uploaded successfully", data);
        await handleCurrentUser()
        // Handle success - maybe navigate to the next page
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
        Select your <span>Assistant Image</span>
      </h1>
      <div className="max-full w-[90%] max-w-[60%] flex justify-center items-center gap-15 flex-wrap m-auto p-[20px]">
        <Card image={image1} />
        <Card image={image2} />
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />
        <div
          className="w-[150px] h-[250px] bg-[#030326] border-2 border-[blue] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white flex items-center justify-center"
          onClick={() => inputImage.current.click()}
        >
          <LuImagePlus className="text-white w-[25px] h-[25px]" />
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
        className="min-w-[150px] mt-5 h-14 bg-white rounded-full text-black font-semibold"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
}

export default Customize;
