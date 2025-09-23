import React, { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';

function Card({ image, setSelectedImage, selectedImage }) {
  const { userData } = useContext(UserDataContext);

  const isSelected = selectedImage === image;

  return (
    <div
      className={`w-[150px] h-[250px] bg-[#030326] border-2 border-[blue] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white ${
        isSelected ? 'border-4 border-white' : ''
      }`}
      onClick={() => setSelectedImage(image)}
    >
      <img src={image} className="w-full h-full object-cover" alt="Card Image" />
    </div>
  );
}

export default Card;
