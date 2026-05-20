import api from "../api/axiosClient";

export async function login(email, password) {
  const response = await api.post("/api/auth/login", {
    email,
    password
  });

  return response.data;
}

