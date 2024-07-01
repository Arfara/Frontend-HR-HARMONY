import { toast } from 'react-toastify';
import axiosInstance from '@/configs/axiosInstance';

export const APIProjects = {
  getAllProjects: async () => {
    try {
      const result = await axiosInstance.get('/projects', {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  getAllProjectsNonPagination: async () => {
    try {
      const result = await axiosInstance.get('/projects/non-pagination');
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  createProject: async (projectData) => {
    try {
      const response = await axiosInstance.post('/projects', projectData, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  },

  getProjectById: async (id) => {
    try {
      const response = await axiosInstance.get(`/projects/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  editProjectById: async (id, projectData) => {
    try {
      const response = await axiosInstance.put(`/projects/${id}`, projectData, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  },
  
  deleteProjectById: async (id) => {
    try {
      const response = await axiosInstance.delete(`/projects/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  },

  getProjectProgress: async () => {
    try {
      const response = await axiosInstance.get(`/projects/progress-bar`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
};

