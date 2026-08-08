import { Navigate } from "react-router-dom";
import { useBuilder } from "../../context/Builder.context";

export default function SignIn() {
  const { user } = useBuilder();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
  

<div className='w-screen h-screen' style={{ width: '100%', height: '600px', position: 'relative' }}>
 
  
</div>
  )
}
