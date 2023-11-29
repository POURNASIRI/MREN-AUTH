import { Link } from "react-router-dom"



const links = [

    {name:"About", path:"/about"},
    {name:"signin", path:"/sign-in"},
    {name:"signup", path:"/sign-up"},
    {name:"Profile", path:"/Profile"},
]

function Header() {
  return (
    <div className="flex gap-5 justify-between h-[70px] px-[100px]
     shadow-lg items-center text-lg">
       <Link to={'/'} className="italic font-semibold">
        Auth Aplication
       </Link>
       <div className="flex gap-5 ">
        {
            links.map(link=>(
            <ul key={link.name}>
                <li>
                    <Link to={link.path}>
                        {link.name}
                    </Link>
                </li>
            </ul>
            ))
        }
       </div>
    </div>
  )
}

export default Header