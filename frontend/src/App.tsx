import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import ResumeEditor from "./pages/ResumeEditor";
import { BuilderContextProvider } from "../context/Builder.context.tsx";
import { ThemeProvider } from "./context/Theme.context.tsx";
import ThemeToggle from "./components/ThemeToggle.tsx";
import Interview from "./pages/Interview.tsx";
import Protected from "./components/Protected/Protected.tsx";

export default function App() {

  return (
    <>
      <ThemeProvider>
        <BuilderContextProvider>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/dashboard" element={<Protected><Dashboard/></Protected>}/>
            <Route path="/reports" element={<Protected><Reports/></Protected>}/>
            <Route path="/resume/result" element={<Protected><ResumeEditor/></Protected>}/>
            <Route path="/interview/:id" element={<Protected><Interview/></Protected>}/>
          </Routes>
          <ThemeToggle />
          <Toaster 
            position="bottom-right" 
            toastOptions={{
              className: 'dark:bg-gray-800 dark:text-white',
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            }} 
          />
        </BuilderContextProvider>
      </ThemeProvider>
    </>
  )
}

