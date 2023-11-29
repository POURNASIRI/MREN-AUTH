import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='text-center'>
      <form className='text-center my-5 w-[400px] mx-auto'>
      <h1 className='text-xl my-4 font-bold'>
        SignUp
      </h1>
      <input type="text" 
      placeholder='username' 
      id='username'
      className='p-3 rounded-lg 
      bg-slate-200 text-black w-full
      outline-none 
      transition-opacity mb-2 '
      />
      <input type="text" 
      placeholder='email' 
      id='email'
      className='p-3 rounded-lg 
      bg-slate-200 text-black w-full
      outline-none 
      transition-opacity mb-2'
      />
      <input type="text" 
      placeholder='password' 
      id='password'
      className='p-3 rounded-lg 
      bg-slate-200 text-black w-full
      outline-none 
      transition-opacity mb-2'
      />
      <button 
      type='submit'
      className='bg-blue-700 
      hover:opacity-80
       uppercase text-white w-full p-3 rounded-lg text-xl mt-2'>
        Sign up
      </button>
      <button 
      type='submit'
      className='bg-red-700
      hover:opacity-80
       uppercase text-white w-full p-3 rounded-lg text-lg mt-2'>
         with Google Account
      </button>
      </form>
      <span >
        Have you an account? 
        <Link
        className='text-blue-600 ml-1 font-bold' 
        to={'/sign-in'}>
        Sign In
        </Link>
      </span>
    </div>
  )
}
