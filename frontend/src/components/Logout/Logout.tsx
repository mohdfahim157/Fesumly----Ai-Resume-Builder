import {useAuth} from "../../hooks/auth.hook"

export default function Logout(){
  const {handleLogout} = useAuth()
  return (<button onClick={()=>{handleLogout()}} className="hidden md:inline-block bg-green-600 hover:bg-green-700 text-white px-4 md:px-4 py-1.5 m-1.5 md:py-3 rounded-full text-xs md:text-sm transition cursor-pointer">Logout</button>)
}



