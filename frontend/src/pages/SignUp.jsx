import React from 'react'
import bg from '../assets/authBg.png'

function SignUp() {
  return (
    <div className='w-full h-[100vh] bg-cover flex justify-center items-center' style={{backgroundImage:`url(${bg})`,backgroundSize:"cover",backgroundPosition:"center"}}>
      <form className='w-[90%] h-[600px] max-w-[500px] bg-[#00000062] backdrop-blur-md shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px]'>
        <h1 className='text-white text-[30'>Register to <span>virtual Assistant</span> </h1>
      </form>
    </div>
  )
}

export default SignUp
