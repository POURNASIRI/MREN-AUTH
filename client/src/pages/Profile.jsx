import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { useRef } from 'react'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase'


function Profile() {
  const {currentUser,loading} = useSelector(state=>state.user)
  const refFile = useRef(null)
  const [image,setImage] = useState(null)
  const[imageError,setImageError] = useState(false)
  const [imagePercent, setImagePercent] = useState(0);
  const [formData,setFormData] = useState({})

  useEffect(()=>{
    if(image){
      handleFileUpload(image)
    }
  },[image])

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
            setFormData({ ...formData, profilePicture: downloadURL })
          );
        }
      )
  }

 

  // upload image to firebase Storage functionality
 
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl capitalize font-semibold text-center mt-[40px]'>
        profile
      </h1>
      <form className='flex flex-col gap-4'>
        <input type="file" ref={refFile} hidden accept='image/*' 
        onChange={(e)=>setImage(e.target.files[0])}/>
        <img className='w-[60px] h-[60px] 
        rounded-full self-center my-5 cursor-pointer' 
        src={currentUser.profilePhoto} alt="" 
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