import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (username, password) => {
  const response = await axios.post(
    `${API_URL}/token/`,
    { username, password },
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};
