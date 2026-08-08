import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useBuilder } from "../../context/Builder.context";
import {
  generateReport,
  generateResumePdf,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/auth.api";

export const useAuth = () => {
  const navigate = useNavigate();
  const { setUser, setLoadingStatus } = useBuilder();

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoadingStatus(true);
      const data = await loginUser(email, password);
      if (data) {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));

        navigate("/dashboard", { replace: true });
        return data;
      }
      console.log(data);
    } catch (error: any) {
      throw error;
    } finally {
      setLoadingStatus(false);
    }
  };

  const handleRegister = async (
    username: string,
    email: string,
    password: string,
  ) => {
    try {
      setLoadingStatus(true);
      const { data } = await registerUser(username, email, password);
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
     
      navigate("/dashboard", { replace: true });
      return data;
    } catch (error: any) {
    
      throw error;
    } finally {
      setLoadingStatus(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoadingStatus(true);
      await logoutUser();
      setUser(null);
      localStorage.removeItem("user");
     
      navigate("/", { replace: true });
    } catch (error: any) {
   
      throw error;
    } finally {
      setLoadingStatus(false);
    }
  };

  const handleGenerateReport = async (formData: FormData) => {
    try {
      const response = await generateReport(formData);
      toast.success("Strategy generated successfully!");
      return response;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "Failed to generate interview strategy.";
      toast.error(message);
      throw error;
    }
  };

  const handleGenerateResume = async (formData: FormData) => {
    try {
      const response = await generateResumePdf(formData);
      toast.success("Resume generated successfully!");
      return response;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to generate resume.";
      toast.error(message);
      throw error;
    }
  };

  return {
    handleLogin,
    handleRegister,
    handleLogout,
    handleGenerateReport,
    handleGenerateResume,
  };
};
