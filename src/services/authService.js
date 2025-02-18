import { useAuth } from "../contexts/AuthProvider";
import API from "./axiosClient";

export const authService = {
  async login(credentials) {
    const { data } = await API.get("/users", {
      params: {
        email: credentials.email,
      },
    });

    const user = data.find(
      (user) =>
        user.email === credentials.email &&
        user.password === credentials.password,
    );

    if (!user) {
      throw new Error("Invalid credentials");
    }

    return user;
  },

  async register(userData) {
    const { data: existingUsers } = await API.get("/users", {
      params: {
        email: userData.email,
      },
    });

    if (existingUsers.length > 0) {
      throw new Error("Email already exists");
    }

    const { data } = await API.post("/users", {
      ...userData,
      avatar: "",
      role: "claimer",
    });
    return data;
  },
};
