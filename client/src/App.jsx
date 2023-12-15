import {Routes,Route} from 'react-router-dom'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Home from './pages/Home'
import Header from './components/Header'
import  { Toaster } from 'react-hot-toast';
import PrivateRoute from './components/PrivateRoute'

export default function App() {
  return (
    <div>
       <Toaster />
      <Header/>
      <div className='md:px-[100px] px-[20px]'>
    <Routes>
      <Route path='/sign-in' element={<SignIn/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
      <Route element={<PrivateRoute/>}>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/Profile' element={<Profile/>}/>
      </Route>
    </Routes>
      </div>
    </div>
  )
}


