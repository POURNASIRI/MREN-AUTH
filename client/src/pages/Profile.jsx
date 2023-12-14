import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { useRef } from 'react'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase'
import { updateUserStart, updateUserSuccess, updateUserUnSuccess } from '../redux/user/userSlice';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'



function Profile() {
  const {currentUser,loading} = useSelector(state=>state.user)
  const refFile = useRef(null)
  const [image,setImage] = useState(null)
  const[imageError,setImageError] = useState(false)
  const [imagePercent, setImagePercent] = useState(0);
  const [formData,setFormData] = useState({})
  const[updateSuccess,setUpdateSuccess] = useState(false)
  const navigate = useNavigate()

  
      const dispatch = useDispatch()

  useEffect(()=>{
    if(image){
      handleFileUpload(image)
    }
  },[image])

  const id = currentUser._id
 

  // upload image to firebase Storage functionality

  const handleFileUpload = async (image)=>{
      const storage = getStorage(app)
      const fileName = new Date().getTime() + image?.name;
      const storageRef = ref(storage,fileName)
      const uploadTask = uploadBytesResumable(storageRef,image)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImagePercent(Math.round(progress));
        },
        (error) => {
          setImageError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
            setFormData({ ...formData, profilePhoto: downloadURL })
          );
        }
      )
  }
  // upload image to firebase Storage functionality
 


    const handleChange = (e)=>{
      setFormData({...formData,[e.target.id]:e.target.value})
    }

    const handleSubmit = async(e)=>{
      e.preventDefault()
      try {
        dispatch(updateUserStart())
        const res = await fetch(`/api/user/update/${id}`,{
          method:"POST",
          headers:{
            "Content-Type": "application/json"
          },
          body:JSON.stringify(formData)
        })

        const data = await res.json()
        console.log(data)
        if(data.succsess === false){
          toast.error(data.message)
          setTimeout(() => {
            navigate('/sign-in')
          }, 1000);
          return
        }else{
          dispatch(updateUserSuccess(data))
          setUpdateSuccess(true)
          setTimeout(() => {
            setUpdateSuccess(false)
          },1000);

        }
      } catch (error) {
        dispatch(updateUserUnSuccess(error.message))
      }
    }


   
   
    
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl capitalize font-semibold text-center mt-[40px]'>
        profile
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="file" ref={refFile} hidden accept='image/*' 
        onChange={(e)=>setImage(e.target.files[0])}/>
        <img className='w-[60px] h-[60px] 
        rounded-full self-center my-5 cursor-pointer' 
        src={formData.profilePhoto|| currentUser.profilePhoto} alt="" 
        onClick={()=>refFile.current.click()}
        />


        <p className='text-sm text-center'>
          {/* this is condetion for show image uploading progress */}
        {imageError ? (
            <span className='text-red-700'>
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent === 5 ? (
            <span className='text-slate-700'>image upload</span>
          ) : imagePercent === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : (
            ''
          )}
          {/* this is condetion for show image uploading progress */}
        </p>



        <input onChange={handleChange} defaultValue={currentUser.username} type="text" id='username' placeholder='Username'
        className='bg-slate-100 rounded-lg p-3 outline-none' />
        <input onChange={handleChange} defaultValue={currentUser.email}  type="email" id='email' placeholder='Email'
        className='bg-slate-100 rounded-lg p-3 outline-none' />
        <input onChange={handleChange} type="password" id='password' placeholder='Password'
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
      {
        updateSuccess && 
        <h2 className='text-center text-green-600 font-semibold text-sm'>Profile Update Successed</h2>
      }
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