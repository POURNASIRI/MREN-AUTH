import React from 'react'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'

function Profile() {
  const {currentUser,loading} = useSelector(state=>state.user)
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl capitalize font-semibold text-center mt-[40px]'>
        profile
      </h1>
      <form className='flex flex-col gap-4'>
        <img className='w-[60px] h-[60px] 
        rounded-full self-center my-5 cursor-pointer' 
        src={currentUser.profilePhoto} alt="" />
        <input defaultValue={currentUser.username} type="text" id='username' placeholder='Username'
        className='bg-slate-100 rounded-lg p-3 outline-none' />
        <input defaultValue={currentUser.email}  type="email" id='email' placeholder='Email'
        className='bg-slate-100 rounded-lg p-3 outline-none' />
        <input type="password" id='password' placeholder='Password'
        className='bg-slate-100 rounded-lg p-3 outline-none' />
      <button
      type='submit'
      className='bg-blue-700 
      hover:opacity-80
       uppercase text-white w-full p-3 rounded-lg 
       text-xl mt-2  
       '> 
       {
        loading && <Loader/>
       } 
        Update
      </button>
      </form>
      <div className='flex justify-between my-4'>
        <button className='py-2
         bg-red-700 px-3 rounded-md text-white hover:shadow-lg 
         text-sm font-semibold hover:scale-105 transition-all '>Delete Account</button>
        <button className='py-2 bg-red-700 px-3 
        rounded-md text-white hover:scale-105 transition-all 
        text-sm font-semibold'>Sign out</button>
      </div>
    </div>
  )
}

export default Profile