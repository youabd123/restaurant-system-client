import api from "../api/axiosClient";

export async function registerUser(fullName, email, password) {
  const response = await api.post("/auth/register", {
    fullName,
    email,
    password
  });

  return response.data;
}

