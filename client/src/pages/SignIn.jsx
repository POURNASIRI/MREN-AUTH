import React, { useState } from 'react'
import Loader from '../components/Loader'
import { Link, useNavigate } from 'react-router-dom'

function SignIn() {

        const[formData,setFormData] = useState({})
        const[loading,setLoading] = useState(false)
        const[error,setError] = useState(false)
        const router = useNavigate()


        const handleChange = (e)=>{
            setFormData({...formData, [e.target.id]:e.target.value})
        }

        const handleSubmit = async (e)=>{
          e.preventDefault()
          if(!formData.email || !formData.password) return;

          try {
            setLoading(true)
            const res = await fetch("/api/auth/signin",{
              method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify(formData)
            })
            const data = await res.json()
            setLoading(false) 
            if(data.succsess === false){
              setError(true)
            }else{
              router('/')
            }
            
          } catch (error) {
            
          }
        }


  return (
    <div className='text-center'>
      <form onSubmit={handleSubmit}  className='text-center my-5 w-[400px] mx-auto'>
      <h1 className='text-xl my-4 font-bold'>
        SignIn
      </h1>
     
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
      type='submit'
      className='bg-blue-700 
      hover:opacity-80
       uppercase text-white w-full p-3 rounded-lg 
       text-xl mt-2  
       '> 
       {
        loading && <Loader/>
       } 
       Sign In
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
        Don't Have you an account? 
        <Link
        className='text-blue-600 ml-1 font-bold' 
        to={'/sign-up'}>
        Sign Up
        </Link>
      </span>
    </div>
  )
}

export default SignIn