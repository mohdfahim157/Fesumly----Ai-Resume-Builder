import axios from "axios";
import toast from "react-hot-toast";
const apiUrl = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: api+"/api",
  withCredentials: true, // Include credentials in requests
});

export async function registerUser(
  username: string,
  email: string,
  password: string,
) {
  try {
    const { data } = await api.post(
      "/auth/register",
      {
        username,
        email,
        password,
      },
      { withCredentials: true },
    ); // Include credentials in the request
     toast.success("Registration successful!");
    return data;
  } catch (error : any) {
      const message =
        error.response?.data?.message || "Registration failed. Try again.";
      toast.error(message);
    if (axios.isAxiosError(error instanceof Error)) {
      console.error("Error registering user:", error);
      throw error;
    }
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const { data } = await api.post("/auth/login", {
      email,
      password,
    }); // Include credentials in the request
     toast.success("Successfully logged in!");
    return data;

  } catch (error : any) {
    const message = error.response?.data?.message || "Failed to login. Please check your credentials.";
            toast.error(message);
    if (axios.isAxiosError(error instanceof Error)) {
      console.error("Error logging in user:", error);
      throw error;
    }
  }
}

export async function logoutUser() {
  try {
    const response = await api.get("/auth/logout");
     toast.success("Logged out successfully");
    return response.data;
  } catch (error) {
       toast.error("Failed to logout. Please try again.");
    if (axios.isAxiosError(error instanceof Error)) {
      console.error("Error logging out user:", error);
      throw error;
    }
  }
}

export async function getCurrentUser() {
  try {
    const { data } = await api.get("/auth/getUser");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error instanceof Error)) {
      console.error("Error fetching current user:", error);
      throw error;
    }
  }
}

export async function generateReport(formData: FormData) {
  try {
    const response = await api.post("/interview/report", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error instanceof Error)) {
      console.error("Error generating report:", error);
    }
    throw error;
  }
}
export async function generateResumePdf(formData: FormData) {
  try {
    const response = await api.post("/interview/pdf", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error instanceof Error)) {
      console.error("Error generating resume:", error);
    }
    throw error;
  }
}
