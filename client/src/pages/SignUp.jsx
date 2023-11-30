import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import toast from 'react-hot-toast';

export default function SignUp() {

        const[formData,setFormData] = useState({})
        const[loading,setLoading] = useState(false)
        const[error,setError] = useState(false)
        
        const handleChange = ((e)=>{
              setFormData({...formData,[e.target.id]:e.target.value})
        })
          
        const handleSubmit = async(e)=>{
          e.preventDefault()
          if(!formData.username || !formData.email || !formData.password ) return;
          try {
            setLoading(true)
            setError(false)
            const res = await fetch('/api/auth/signup', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
            const data = await res.json();
            setLoading(false)
            console.log(data)
            if(data.succsess === false){
              setError(true)
            }
          } catch (error) {
            
          }
        }
        

  return (
    <div className='text-center'>
      <form onSubmit={handleSubmit} className='text-center my-5 w-[400px] mx-auto'>
      <h1 className='text-xl my-4 font-bold'>
        SignUp
      </h1>
      <input type="text" 
      placeholder='username' 
      id='username'
      className='p-3 rounded-lg 
      bg-slate-200 text-black w-full
      outline-none 
      transition-opacity mb-2'
      onChange={handleChange}
      />
      <input type="text" 
      placeholder='email' 
      id='email'
      className='p-3 rounded-lg 
      bg-slate-200 text-black w-full
      outline-none 
      transition-opacity mb-2'
      onChange={handleChange}
      />
      <input type="password" 
      placeholder='password' 
      id='password'
      className='p-3 rounded-lg 
      bg-slate-200 text-black w-full
      outline-none 
      transition-opacity mb-2'
      onChange={handleChange}
      />
      <span className='text-red-600 font-bold text-sm'>
        {
          error && "Something Wrong please try again!"
        }
      </span>
      <button
      disabled={loading} 
      type='submit'
      className='bg-blue-700 
      hover:opacity-80
       uppercase text-white w-full p-3 rounded-lg 
       text-xl mt-2  
       '>
        {
          loading &&
          <Loader/> 
        }
       
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
