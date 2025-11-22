import axios from "axios";

const api = axios.create({
  baseURL: "https://portfolio-api-production-de3d.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const projectService = {
  getAllProjects: async () => {
    const response = await api.get("/projects");
    return response.data;
  },

  createProject: async (projectData) => {
    const response = await api.post("/projects", projectData);
    return response.data;
  },
};

export default api;
