import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import {useDispatch} from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'

function OtherAuth() {
    const dispatch = useDispatch()
    const handleGoogleClick = async ()=>{
            try {
                const provider = new GoogleAuthProvider()
                const auth = getAuth(app)

                const result = await signInWithPopup(auth,provider)
                const res = await fetch("/api/auth/google",{
                    method:"POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify({
                        name:result.user.displayName,
                        email:result.user.email,
                        photo:result.user.photoURL
                    })
                })

                const data = await res.json()
                console.log(data)
                dispatch(signInSuccess(data))
            } catch (error) {
                console.log('Could not login whit google',error)
            }
    }
  return (
    <button 
    onClick={handleGoogleClick}
    type='submit'
    className='bg-red-700
    hover:opacity-80
     uppercase text-white w-full p-3 rounded-lg text-lg mt-2'>
       with Google Account
    </button>
  )
}

export default OtherAuth