import { toast } from 'react-toastify';
import axiosInstance from '@/configs/axiosInstance';

export const APITasks = {
  createTask: async (taskData) => {
    try {
      const response = await axiosInstance.post('/tasks', taskData, {
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

  getAllTasks: async () => {
    try {
      const response = await axiosInstance.get('/tasks', {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  getTaskById: async (id) => {
    try {
      const response = await axiosInstance.get(`/tasks/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  updateTaskById: async (id, taskData) => {
    try {
      const response = await axiosInstance.put(`/tasks/${id}`, taskData, {
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

  deleteTaskById: async (id) => {
    try {
      const response = await axiosInstance.delete(`/tasks/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  },

  getTaskProgress: async () => {
    try {
      const response = await axiosInstance.get('/tasks/progress-bar');
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
};

