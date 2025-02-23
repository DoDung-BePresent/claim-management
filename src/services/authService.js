import API from "./axiosClient";

export const authService = {
  async login(credentials) {
    try {
      const { data } = await API.get("/users", {
        params: {
          email: credentials.email,
        },
      });
      console.log(data);
      const user = data.find(
        (user) =>
          user.email === credentials.email &&
          user.password === credentials.password,
      );
      
      if (!user) {
        throw new Error("Invalid credentials");
      }

      return user;
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  },

  async register(userData) {
    try {
      const { data } = await API.get("/users");
      const existingUser = data.find((user) => user.email === userData.email);

      if (existingUser) {
        throw new Error("Email already exists");
      }

      const response = await API.post("/users", {
        ...userData,
        avatar: "",
        role: "claimer",
      });

      return response.data;
    } catch (error) {
      if (error.message === "Email already exists") {
        throw error;
      }
      throw new Error("Registration failed. Please try again.");
    }
  },
};
