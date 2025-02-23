import API from "@/services/axiosClient";

const statuses = ["Draft", "Pending", "Approved", "Cancelled", "Paid"];

export const claimerService = {
  async getUserInfo(id) {
    try {
      const response = await API.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching staff info!");
    }
  },

  async getClaims() {
    try {
      const response = await API.get("/claims");
      return response.data;
    } catch (error) {
      throw new Error("Error fetching claims!");
    }
  },

  async getClaimById(id) {
    try {
      const response = await API.get(`/claims/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching claim details!");
    }
  },

  async createClaim(data) {
    try {
      const response = await API.post("/claims", data);
      return response.data;
    } catch (error) {
      throw new Error("Error creating claim!");
    }
  },

  async deleteClaimById(id) {
    try {
      const response = await API.delete(`/claims/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Error delete claims!");
    }
  },

  async updateClaimById(id, data) {
    try {
      const response = await API.put(`/claims/${id}`, data);
      console.log("Phản hồi API:", response.data);
      return response.data;
    } catch (error) {
      throw new Error("Error update claim!");
    }
  },
};
