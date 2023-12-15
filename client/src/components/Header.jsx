import { useCallback, useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { MdMenu } from "react-icons/md";
import { IoCloseCircleSharp } from "react-icons/io5";





const links = [

    {name:"About", path:"/about"},
    {name:"signin", path:"/sign-in"},
    {name:"Profile", path:"/Profile"},
]

function Header() {

        const {currentUser} = useSelector(state=>state.user)
        const[menu, setMenu] = useState(false)

        const handleMenu = useCallback(()=>{
            setMenu(perv=> !perv)
        },[])

      
         

  return (
   <>
   <div className="md:flex bg-slate-300 items-center md:justify-between 
   md:px-[100px] py-4 md:py-0 
   px-[20px]">
    <h1 className="text-xl uppercase italic 
    font-semibold">
    authentication
    </h1>
    <div className="md:flex hidden">
  
          <ul
           className=" items-center px-2 italic font-bold text-lg my-10 flex gap-4 " 
          >
            {
              currentUser && (
                <>
                <li>
                <Link to={"about"}>
                About
                </Link>
              </li>
              <li>
                <Link to={"/"}>
                Home
                </Link>
              </li>
                </>
              )
            }
           
            {
              currentUser ?
              <li>
              <Link to={"profile"}>
                <div className="flex items-center gap-3">
                <img className="w-[40px] h-[40px] rounded-full" 
                src={currentUser.profilePhoto} alt="" />
                  <p className="text-xs">{currentUser.username}</p>
                </div>
              </Link>
            </li> : 
             <li>
             <Link to={"/sign-in"}>
             signin
             </Link>
           </li>
            }
          </ul>
    </div>
    <button
        onClick={handleMenu} 
        className="fixed md:hidden right-4 top-4">
         <MdMenu size={30}/>
    </button>
   </div>

    {
      menu && (
        <div className={`bg-slate-300
        md:hidden
        min-h-[100vh] text-center fixed top-0 ${menu ? "right-0" : "right-[-100%]"} 
        w-[100vw]`}>
        <button
        onClick={handleMenu} 
        className="fixed right-1 top-1">
          <IoCloseCircleSharp size={30} />
        </button>
        <Link
        onClick={handleMenu} 
        to={"/"}>
      <h1 className="text-2xl mt-8 uppercase italic 
      font-bold">
      authentication
      </h1>
        </Link>
        {
          links.map(link=>(
            <ul
            className=" hover:scale-105 italic font-bold text-lg my-10 " 
            key={link.name}>
              <li onClick={handleMenu}>
                <Link to={link.path}>
                {link.name}
                </Link>
              </li>
            </ul>
          ))
        }
      </div>
      )
    }
    
  
   </>
  )
}

export default Header