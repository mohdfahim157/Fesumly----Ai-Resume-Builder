import DotGrid from "../components/Background/DotGrid";
import LoginPage from "../components/Login/LoginPage";
import { Navigate } from "react-router-dom";
import { useBuilder } from "../../context/Builder.context";

export default function Login() {
  const { user } = useBuilder();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="">
      <DotGrid
        className="bg-green-500 dark:bg-gray-900"
        dotSize={5}
        gap={15}
        baseColor="#2F293A"
        activeColor="#16A34A" // changed from #5227FF to green
        proximity={120}
        shockRadius={250}
        shockStrength={5}
        resistance={750}
        returnDuration={1.5}
      />
      <LoginPage/>
    </div>
  )
}
