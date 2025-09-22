import React from 'react'

function Card({image}) {
  return (
    <div className='w-[150px] h-[250px] bg-[#030326] border-2 border-[blue] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white'>
        <img src={image} className='w-full h-full object-cover' alt="Card Image" />
    </div>
  )
}

export default Card
