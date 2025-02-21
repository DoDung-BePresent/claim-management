import API from "@/services/axiosClient";

export const claimerService = {
  async getUserInfo(id) {
    try {
      const response = await API.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching staff info!");
    }
  },
};
