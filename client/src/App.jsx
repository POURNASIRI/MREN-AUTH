import {Routes,Route} from 'react-router-dom'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Home from './pages/Home'
import Header from './components/Header'
import  { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <div>
       <Toaster />
      <Header/>
      <div className='md:px-[100px] px-[20px]'>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/sign-in' element={<SignIn/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
      <Route path='/Profile' element={<Profile/>}/>
    </Routes>
      </div>
    </div>
  )
}


